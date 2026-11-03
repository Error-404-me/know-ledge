import { Link } from "react-router-dom";
import { curriculumConfig, getLessonsForTopic } from "@/content";
import { lessonRecordId } from "@/database/schema";
import { useProgress } from "@/hooks/ProgressContext";
import { Icon } from "@/components/common/Icon";
import { LessonRow } from "@/components/lessons/LessonRow";
import { Card, ButtonLink, LoadingState, PageHeader, Pill, ProgressBar, StatusBadge } from "@/components/common/ui";
import { getTopicViews } from "@/utils/insights";
import { cn } from "@/utils/cn";

export default function TopicsPage() {
  const { state, snapshot } = useProgress();
  if (state === "loading") return <LoadingState />;
  const views = getTopicViews(snapshot);
  let lastUnit = "";

  return (
    <div>
      <PageHeader
        title="Grade 8 Lessons"
        subtitle={`Topics follow the Grade 8 sequence. Finish all lessons and score ${curriculumConfig.passingScore}% on the topic assessment to complete a topic. You can revisit any topic at any time.`}
      />
      <div className="space-y-4">
        {views.map(({ topic, status, percent, availability, lockedReason }) => {
          const showUnit = topic.unit !== lastUnit;
          lastUnit = topic.unit;
          const open = availability === "open";
          const lessons = getLessonsForTopic(topic.id);
          return (
            <div key={topic.id}>
              {showUnit && <h2 className="mb-2 mt-4 text-sm font-bold uppercase tracking-wide text-slate-500">{topic.unit}</h2>}
              <Card className={cn(open && status !== "completed" && "border-indigo-300 ring-1 ring-indigo-200", !open && "bg-slate-50/70")}>
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold",
                      open ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500",
                    )}
                  >
                    {open ? topic.order : <Icon name="lock" className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={cn("text-lg font-bold", open ? "text-slate-900" : "text-slate-700")}>{topic.title}</h3>
                      {open && <StatusBadge status={status} />}
                      {availability === "coming-soon" && <Pill>Coming soon</Pill>}
                      {availability === "locked" && <Pill tone="amber">Locked</Pill>}
                    </div>
                    <p className="mt-1 text-slate-600">{topic.description}</p>

                    {open && (
                      <>
                        <div className="mt-3 flex items-center gap-3">
                          <ProgressBar value={percent} label={`${topic.title} completion`} tone={status === "completed" ? "emerald" : "indigo"} />
                          <span className="w-12 shrink-0 text-right text-sm font-semibold text-slate-700">{percent}%</span>
                        </div>
                        <div className="mt-4 space-y-2">
                          {lessons.map((l) => (
                            <LessonRow key={l.id} lesson={l} record={snapshot.lessons[lessonRecordId(topic.id, l.id)]} />
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <ButtonLink to={`/topics/${topic.id}`}>Open topic</ButtonLink>
                          <ButtonLink to={`/practice/${topic.id}`} variant="secondary">
                            Practice and assessment
                          </ButtonLink>
                        </div>
                      </>
                    )}

                    {availability === "locked" && <p className="mt-2 text-sm font-medium text-amber-900">{lockedReason}</p>}

                    {!open && topic.outline && (
                      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Planned lessons">
                        {topic.outline.map((o) => (
                          <li key={o} className="rounded-full bg-white px-3 py-1 text-sm text-slate-600 ring-1 ring-slate-200">
                            {o}
                          </li>
                        ))}
                      </ul>
                    )}
                    {!open && (
                      <p className="mt-3 text-sm text-slate-500">
                        <Link to={`/topics/${topic.id}`} className="font-semibold text-indigo-700 hover:underline">
                          See what’s planned
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
