import { curriculumConfig, getLesson, getLessonsForTopic, getTopic, isTopicOpenable, topics } from "@/content";
import type { Topic } from "@/types/content";
import type { PracticeAttemptRecord, ProgressStatus, TopicProgressRecord } from "@/database/schema";
import type { ProgressSnapshot } from "@/services/progressService";
import { lessonRecordId } from "@/database/schema";

/**
 * Derived views over saved progress: topic availability, weak areas,
 * "continue" targets and recommendations. Pure functions – no database access.
 */

export interface NextAction {
  label: string;
  description: string;
  to: string;
  cta: string;
}

export type TopicAvailability = "open" | "locked" | "coming-soon";

export interface TopicView {
  topic: Topic;
  progress?: TopicProgressRecord;
  status: ProgressStatus;
  percent: number;
  availability: TopicAvailability;
  lockedReason?: string;
}

export function getTopicViews(snapshot: ProgressSnapshot): TopicView[] {
  return topics.map((topic, i) => {
    const progress = snapshot.topics[topic.id];
    const base = {
      topic,
      progress,
      status: progress?.status ?? ("not_started" as ProgressStatus),
      percent: progress?.completionPercentage ?? 0,
    };
    if (!isTopicOpenable(topic)) return { ...base, availability: "coming-soon" as const };
    const prev = i > 0 ? topics[i - 1] : undefined;
    const prevDone = !prev || snapshot.topics[prev.id]?.status === "completed";
    if (curriculumConfig.sequentialUnlock && !prevDone && prev) {
      return {
        ...base,
        availability: "locked" as const,
        lockedReason: `Complete “${prev.title}” to unlock this topic.`,
      };
    }
    return { ...base, availability: "open" as const };
  });
}

/** The topic the student should be working on now. */
export function getActiveTopic(snapshot: ProgressSnapshot): Topic | undefined {
  const views = getTopicViews(snapshot).filter((v) => v.availability === "open");
  return views.find((v) => v.status !== "completed")?.topic ?? views[views.length - 1]?.topic;
}

export interface WeakLesson {
  lessonId: string;
  accuracy: number;
  total: number;
}

/** Lessons with low accuracy across the most recent practice/assessment attempts. */
export function getWeakLessons(topicId: string, attempts: PracticeAttemptRecord[]): WeakLesson[] {
  const recent = attempts.filter((a) => a.topicId === topicId && a.mode !== "prerequisite").slice(0, 5);
  const tally = new Map<string, { correct: number; total: number }>();
  for (const attempt of recent) {
    for (const answer of attempt.answers) {
      if (!getLesson(answer.lessonId)) continue;
      const t = tally.get(answer.lessonId) ?? { correct: 0, total: 0 };
      t.total += 1;
      if (answer.correct) t.correct += 1;
      tally.set(answer.lessonId, t);
    }
  }
  return [...tally.entries()]
    .map(([lessonId, t]) => ({ lessonId, total: t.total, accuracy: Math.round((t.correct / t.total) * 100) }))
    .filter((w) => w.total >= 2 && w.accuracy < curriculumConfig.weakAreaThreshold)
    .sort((a, b) => a.accuracy - b.accuracy);
}

/** Topics that are started but not mastered and show signs of struggle. */
export function getTopicsNeedingPractice(snapshot: ProgressSnapshot): { topic: Topic; reason: string; lessonIds: string[] }[] {
  const result: { topic: Topic; reason: string; lessonIds: string[] }[] = [];
  for (const topic of topics) {
    const progress = snapshot.topics[topic.id];
    if (!progress || progress.status === "completed") continue;
    const weak = getWeakLessons(topic.id, snapshot.attempts);
    const failedAssessment = progress.bestAssessmentScore !== null && !progress.assessmentPassed;
    if (weak.length || failedAssessment) {
      result.push({
        topic,
        lessonIds: weak.map((w) => w.lessonId),
        reason: failedAssessment
          ? `Best assessment score is ${progress.bestAssessmentScore}% – the passing score is ${curriculumConfig.passingScore}%.`
          : "Some recent practice answers need review.",
      });
    }
  }
  return result;
}

/** Where the "Continue Learning" button should go. */
export function getContinueTarget(snapshot: ProgressSnapshot): NextAction | null {
  const topic = getActiveTopic(snapshot);
  if (!topic) return null;
  const lessons = getLessonsForTopic(topic.id);
  const records = lessons.map((l) => ({ lesson: l, rec: snapshot.lessons[lessonRecordId(topic.id, l.id)] }));

  const inProgress = records
    .filter((r) => r.rec?.status === "in_progress")
    .sort((a, b) => (b.rec?.lastAccessedAt ?? 0) - (a.rec?.lastAccessedAt ?? 0))[0];
  if (inProgress) {
    return {
      label: `Resume: ${inProgress.lesson.title}`,
      description: `You’re ${inProgress.rec?.completionPercentage ?? 0}% through this lesson.`,
      to: `/lessons/${topic.id}/${inProgress.lesson.id}`,
      cta: "Continue Learning",
    };
  }
  const next = records.find((r) => r.rec?.status !== "completed");
  if (next) {
    const started = records.some((r) => r.rec);
    return {
      label: `${started ? "Next" : "Start"}: ${next.lesson.title}`,
      description: next.lesson.summary,
      to: `/lessons/${topic.id}/${next.lesson.id}`,
      cta: started ? "Continue Learning" : "Start Learning",
    };
  }
  if (!snapshot.topics[topic.id]?.assessmentPassed) {
    return {
      label: `Take the ${topic.title} assessment`,
      description: `You’ve finished the lessons. Score ${curriculumConfig.passingScore}% or more to complete the topic.`,
      to: `/practice/${topic.id}`,
      cta: "Go to Practice",
    };
  }
  return {
    label: `${topic.title} is complete`,
    description: "Revisit any lesson or practice again whenever you like.",
    to: "/topics",
    cta: "Browse Topics",
  };
}

/** Suggested next activity, based on saved history. */
export function getRecommendation(snapshot: ProgressSnapshot): NextAction | null {
  const topic = getActiveTopic(snapshot);
  if (!topic) return null;
  const progress = snapshot.topics[topic.id];
  const topicAttempts = snapshot.attempts.filter((a) => a.topicId === topic.id);
  const lessons = getLessonsForTopic(topic.id);
  const allLessonsDone = lessons.every((l) => snapshot.lessons[lessonRecordId(topic.id, l.id)]?.status === "completed");

  const weak = getWeakLessons(topic.id, snapshot.attempts)[0];
  if (weak) {
    return {
      label: `Review: ${getLesson(weak.lessonId)?.title}`,
      description: `Your recent accuracy here is ${weak.accuracy}%. A short, focused practice set will help.`,
      to: `/practice/${topic.id}?lesson=${weak.lessonId}`,
      cta: "Practice this lesson",
    };
  }
  if (!progress && topic.hasPrerequisiteCheck && !topicAttempts.some((a) => a.mode === "prerequisite")) {
    return {
      label: "Check your Grade 7 skills",
      description: "A quick optional check of the skills this topic builds on – negatives, exponents and order of operations.",
      to: `/practice/${topic.id}?mode=prerequisite`,
      cta: "Start skills check",
    };
  }
  if (allLessonsDone && !progress?.assessmentPassed) {
    const practiced = topicAttempts.some((a) => a.mode === "practice");
    return practiced
      ? {
          label: `Take the ${topic.title} assessment`,
          description: `Score ${curriculumConfig.passingScore}% or higher to complete this topic.`,
          to: `/practice/${topic.id}?mode=assessment`,
          cta: "Take assessment",
        }
      : {
          label: "Warm up with a practice set",
          description: "Practice with hints and retries before you take the assessment.",
          to: `/practice/${topic.id}`,
          cta: "Start practice",
        };
  }
  if (!allLessonsDone) {
    const next = lessons.find((l) => snapshot.lessons[lessonRecordId(topic.id, l.id)]?.status !== "completed");
    if (next) {
      return {
        label: `Lesson: ${next.title}`,
        description: next.summary,
        to: `/lessons/${topic.id}/${next.id}`,
        cta: "Open lesson",
      };
    }
  }
  return {
    label: "Keep your skills sharp",
    description: "Mixed practice helps you remember what you’ve learned.",
    to: `/practice/${topic.id}`,
    cta: "Start practice",
  };
}

export interface OverallProgress {
  percent: number;
  completedLessons: number;
  totalLessons: number;
  topicsCompleted: number;
  totalTopics: number;
  assessmentsPassed: number;
}

/** Overall progress across every topic that has content, calculated from saved records. */
export function getOverallProgress(snapshot: ProgressSnapshot): OverallProgress {
  const open = topics.filter(isTopicOpenable);
  let steps = 0;
  let done = 0;
  let completedLessons = 0;
  let totalLessons = 0;
  let assessmentsPassed = 0;
  for (const topic of open) {
    const lessons = getLessonsForTopic(topic.id);
    const completed = lessons.filter(
      (l) => snapshot.lessons[lessonRecordId(topic.id, l.id)]?.status === "completed",
    ).length;
    const passed = snapshot.topics[topic.id]?.assessmentPassed ? 1 : 0;
    steps += lessons.length + 1;
    done += completed + passed;
    completedLessons += completed;
    totalLessons += lessons.length;
    assessmentsPassed += passed;
  }
  return {
    percent: steps ? Math.round((done / steps) * 100) : 0,
    completedLessons,
    totalLessons,
    topicsCompleted: topics.filter((t) => snapshot.topics[t.id]?.status === "completed").length,
    totalTopics: topics.length,
    assessmentsPassed,
  };
}

export interface ResultSuggestion {
  tone: "success" | "info" | "warn";
  headline: string;
  message: string;
  actions: { label: string; to: string; primary?: boolean }[];
  reviewLessonIds: string[];
}

/** Suggested next step after finishing a session. */
export function getResultSuggestion(attempt: PracticeAttemptRecord, snapshot: ProgressSnapshot): ResultSuggestion {
  const pass = curriculumConfig.passingScore;
  const topic = getTopic(attempt.topicId);
  const topicId = attempt.topicId;
  const missedLessons = [
    ...new Set(attempt.answers.filter((a) => !a.correct && getLesson(a.lessonId)).map((a) => a.lessonId)),
  ];
  const lessonActions = missedLessons.slice(0, 3).map((id) => ({
    label: `Review: ${getLesson(id)?.title}`,
    to: `/lessons/${topicId}/${id}`,
  }));
  const lessons = getLessonsForTopic(topicId);
  const incompleteLessons = lessons.filter(
    (l) => snapshot.lessons[lessonRecordId(topicId, l.id)]?.status !== "completed",
  );

  if (attempt.mode === "prerequisite") {
    return attempt.score >= pass
      ? {
          tone: "success",
          headline: "You’re ready to go!",
          message: "Your Grade 7 foundations look solid for this topic.",
          actions: [{ label: "Start the first lesson", to: `/lessons/${topicId}/${lessons[0]?.id}`, primary: true }],
          reviewLessonIds: [],
        }
      : {
          tone: "info",
          headline: "A little review will help",
          message: "Brush up on the skills listed below, then continue. You can retake this check any time.",
          actions: [
            { label: "Start the first lesson", to: `/lessons/${topicId}/${lessons[0]?.id}`, primary: true },
            { label: "Retake the skills check", to: `/practice/${topicId}?mode=prerequisite` },
          ],
          reviewLessonIds: [],
        };
  }

  if (attempt.mode === "assessment") {
    if (attempt.passed) {
      const done = incompleteLessons.length === 0;
      return {
        tone: "success",
        headline: done ? `${topic?.title} completed!` : "Assessment passed!",
        message: done
          ? "You finished every lesson and passed the assessment. Great work!"
          : `You passed the assessment. To complete the topic, finish the remaining lessons (${incompleteLessons.length} left).`,
        actions: done
          ? [{ label: "See my progress", to: "/progress", primary: true }, { label: "Back to topics", to: "/topics" }]
          : [
              {
                label: `Open: ${incompleteLessons[0].title}`,
                to: `/lessons/${topicId}/${incompleteLessons[0].id}`,
                primary: true,
              },
            ],
        reviewLessonIds: missedLessons,
      };
    }
    return {
      tone: "warn",
      headline: "Not there yet – and that’s okay",
      message: `The passing score is ${pass}%. Your attempt was saved, and the topic stays in progress. Review the areas below, then try again.`,
      actions: [
        ...lessonActions.map((a, i) => ({ ...a, primary: i === 0 })),
        ...(missedLessons[0]
          ? [{ label: "Practice the weakest lesson", to: `/practice/${topicId}?lesson=${missedLessons[0]}` }]
          : []),
        { label: "Retake the assessment", to: `/practice/${topicId}?mode=assessment` },
      ],
      reviewLessonIds: missedLessons,
    };
  }

  // Practice
  if (attempt.score >= pass) {
    const ready = incompleteLessons.length === 0 && !snapshot.topics[topicId]?.assessmentPassed;
    return {
      tone: "success",
      headline: "Strong practice!",
      message: ready
        ? "You’ve finished the lessons and practiced well – you’re ready for the topic assessment."
        : "You’re getting the hang of it. Keep going with the next step.",
      actions: ready
        ? [{ label: "Take the assessment", to: `/practice/${topicId}?mode=assessment`, primary: true }]
        : incompleteLessons.length
          ? [
              { label: `Next lesson: ${incompleteLessons[0].title}`, to: `/lessons/${topicId}/${incompleteLessons[0].id}`, primary: true },
              { label: "Practice again", to: `/practice/${topicId}` },
            ]
          : [{ label: "Practice again", to: `/practice/${topicId}`, primary: true }],
      reviewLessonIds: missedLessons,
    };
  }
  return {
    tone: "warn",
    headline: "Let’s strengthen a few skills",
    message: "Review the explanations below, revisit the lessons that gave you trouble, then try another set.",
    actions: [
      ...lessonActions.map((a, i) => ({ ...a, primary: i === 0 })),
      { label: "Try another practice set", to: `/practice/${topicId}${missedLessons[0] ? `?lesson=${missedLessons[0]}` : ""}` },
    ],
    reviewLessonIds: missedLessons,
  };
}
