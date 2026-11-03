import type { Topic } from "@/types/content";
import type {
  LessonProgressRecord,
  PracticeAttemptRecord,
  ProgressStatus,
  TopicProgressRecord,
} from "@/database/schema";

/**
 * Pure functions that derive topic progress from saved lesson records and
 * attempt history. The same function is used everywhere so progress is always
 * calculated consistently.
 *
 * Completion rule (configurable via `passingScore`):
 *   topic completed  ⇔  every lesson completed  AND  assessment score ≥ passingScore
 *   completion %     =  (completed lessons + 1 if assessment passed) / (lessons + 1)
 */
export function computeTopicProgress(
  topic: Topic,
  lessonRecords: LessonProgressRecord[],
  attempts: PracticeAttemptRecord[],
  existing: TopicProgressRecord | undefined,
  passingScore: number,
  now: number,
): TopicProgressRecord {
  const lessonIds = new Set(topic.lessonIds);
  const relevantLessons = lessonRecords.filter((l) => l.topicId === topic.id && lessonIds.has(l.lessonId));
  const completedLessons = relevantLessons.filter((l) => l.status === "completed").length;

  const topicAttempts = attempts.filter((a) => a.topicId === topic.id);
  const scored = topicAttempts.filter((a) => a.mode !== "prerequisite");
  const assessments = topicAttempts.filter((a) => a.mode === "assessment");

  const bestScore = scored.length ? Math.max(...scored.map((a) => a.score)) : null;
  const bestAssessmentScore = assessments.length ? Math.max(...assessments.map((a) => a.score)) : null;
  const assessmentPassed = bestAssessmentScore !== null && bestAssessmentScore >= passingScore;

  const totalSteps = topic.lessonIds.length + 1;
  const doneSteps = completedLessons + (assessmentPassed ? 1 : 0);
  const completionPercentage = topic.lessonIds.length === 0 ? 0 : Math.round((doneSteps / totalSteps) * 100);

  const isCompleted = topic.lessonIds.length > 0 && completedLessons === topic.lessonIds.length && assessmentPassed;
  const hasActivity = relevantLessons.length > 0 || topicAttempts.length > 0;
  const status: ProgressStatus = isCompleted ? "completed" : hasActivity ? "in_progress" : "not_started";

  const lastAccessedAt = Math.max(
    existing?.lastAccessedAt ?? 0,
    ...relevantLessons.map((l) => l.lastAccessedAt),
    ...topicAttempts.map((a) => a.completedAt),
  );

  return {
    topicId: topic.id,
    status,
    completionPercentage,
    bestScore,
    bestAssessmentScore,
    assessmentPassed,
    totalAttempts: scored.length,
    lastAccessedAt: lastAccessedAt || now,
    completedAt: isCompleted ? (existing?.completedAt ?? now) : null,
  };
}

/** Percentage 0–100 for a practice session. */
export function computeScore(correct: number, total: number): number {
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}
