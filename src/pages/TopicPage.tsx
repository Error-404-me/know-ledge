import { useParams } from "react-router-dom";
import { curriculumConfig, getLesson, getLessonsForTopic, getTopic } from "@/content";
import { lessonRecordId } from "@/database/schema";
import { useProgress } from "@/hooks/ProgressContext";
import { Icon } from "@/components/common/Icon";
import { LessonRow } from "@/components/lessons/LessonRow";
import { Card, ButtonLink, EmptyState, LoadingState, PageHeader, Pill, ProgressBar, StatusBadge } from "@/components/common/ui";
import { getTopicViews, getWeakLessons } from "@/utils/insights";

export default function TopicPage() {
  const { topicId = "" } = useParams();
  const { state, snapshot } = useProgress();
  const topic = getTopic(topicId);

  if (state === "loading") return <LoadingState />;
  if (!topic) {
    return <EmptyState title="Topic not found" message="We couldn’t find that topic." action={<ButtonLink to="/topics">Browse topics</ButtonLink>} />;
  }

  const view = getTopicViews(snapshot).find((v) => v.topic.id === topic.id)!;
  const lessons = getLessonsForTopic(topic.id);
  const progress = snapshot.topics[topic.id];
  const completedCount = lessons.filter((l) => snapshot.lessons[lessonRecordId(topic.id, l.id)]?.status === "completed").length;
  const weak = getWeakLessons(topic.id, snapshot.attempts);
  const failedAssessment = progress?.bestAssessmentScore != null && !progress.assessmentPassed;
  const open = view.availability === "open";

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={topic.title} subtitle={topic.description}>
        <ButtonLink to="/topics" variant="ghost">
          <Icon name="arrowLeft" className="h-4 w-4" /> All topics
        </ButtonLink>
      </PageHeader>

      <div className="space-y-5">
        {!open && (
          <Card>
            <div className="flex flex-wrap items-center gap-2">
              {view.availability === "locked" ? <Pill tone="amber">Locked</Pill> : <Pill>Coming soon</Pill>}
            </div>
            <p className="mt-2 text-slate-700">
              {view.availability === "locked"
                ? view.lockedReason
                : "Lessons for this topic are being prepared. They’ll appear here as soon as they’re added to the course sequence."}
            </p>
            {topic.outline && (
              <>
                <h2 className="mt-4 font-bold text-slate-900">What’s planned</h2>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
                  {topic.outline.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </>
            )}
          </Card>
        )}

        <Card>
          <h2 className="text-lg font-bold text-slate-900">Learning objectives</h2>
          <ul className="mt-2 space-y-2 text-slate-700">
            {topic.objectives.map((o) => (
              <li key={o} className="flex gap-2">
                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-indigo-600" />
                {o}
              </li>
            ))}
          </ul>
        </Card>

        {open && (
          <>
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-slate-900">Your progress</h2>
                <StatusBadge status={view.status} />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <ProgressBar value={view.percent} label="Topic completion" tone={view.status === "completed" ? "emerald" : "indigo"} />
                <span className="w-12 shrink-0 text-right text-sm font-semibold">{view.percent}%</span>
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-700">To complete this topic:</p>
              <ul className="mt-2 space-y-2 text-slate-700">
                <Requirement done={completedCount === lessons.length}>
                  Complete all lessons ({completedCount} of {lessons.length})
                </Requirement>
                <Requirement done={Boolean(progress?.assessmentPassed)}>
                  Score {curriculumConfig.passingScore}% or more on the topic assessment
                  {progress?.bestAssessmentScore != null && ` (best so far: ${progress.bestAssessmentScore}%)`}
                </Requirement>
              </ul>
            </Card>

            {(weak.length > 0 || failedAssessment) && (
              <Card className="border-amber-300 bg-amber-50">
                <h2 className="text-lg font-bold text-amber-950">Areas to improve</h2>
                <p className="mt-1 text-amber-950">
                  {failedAssessment
                    ? "Your assessment attempt is saved and this topic stays in progress. Review these lessons and try again."
                    : "Recent practice shows these lessons need another look."}
                </p>
                <ul className="mt-3 space-y-2">
                  {weak.map((w) => (
                    <li key={w.lessonId} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white p-3">
                      <span className="font-semibold text-slate-900">
                        {getLesson(w.lessonId)?.title} <span className="font-normal text-slate-600">· {w.accuracy}% correct</span>
                      </span>
                      <span className="flex gap-2">
                        <ButtonLink to={`/lessons/${topic.id}/${w.lessonId}`} variant="secondary" className="min-h-10 px-3 py-1.5 text-sm">
                          Review lesson
                        </ButtonLink>
                        <ButtonLink to={`/practice/${topic.id}?lesson=${w.lessonId}`} variant="ghost" className="min-h-10 px-3 py-1.5 text-sm">
                          Practice
                        </ButtonLink>
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            <section>
              <h2 className="mb-3 text-lg font-bold text-slate-900">Lessons</h2>
              <div className="space-y-2">
                {lessons.map((l) => (
                  <LessonRow key={l.id} lesson={l} record={snapshot.lessons[lessonRecordId(topic.id, l.id)]} />
                ))}
              </div>
            </section>

            <Card>
              <h2 className="text-lg font-bold text-slate-900">Practice and assessment</h2>
              <p className="mt-1 text-slate-600">Practice with hints, check your Grade 7 skills, or take the topic assessment.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonLink to={`/practice/${topic.id}`}>Go to practice</ButtonLink>
                {topic.hasPrerequisiteCheck && (
                  <ButtonLink to={`/practice/${topic.id}?mode=prerequisite`} variant="secondary">
                    Grade 7 skills check
                  </ButtonLink>
                )}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

function Requirement({ done, children }: { done: boolean; children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${done ? "bg-emerald-600 text-white" : "border-2 border-slate-300"}`}
      >
        {done && <Icon name="check" className="h-3.5 w-3.5" />}
      </span>
      <span>{children}</span>
    </li>
  );
}
