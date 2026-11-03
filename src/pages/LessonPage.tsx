import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getLesson, getLessonsForTopic, getTopic } from "@/content";
import type { Lesson } from "@/types/content";
import { lessonRecordId, type AttemptAnswer } from "@/database/schema";
import { useProgress } from "@/hooks/ProgressContext";
import { BlockRenderer } from "@/components/lessons/BlockRenderer";
import { WorkedExampleView } from "@/components/lessons/WorkedExampleView";
import { QuestionCard } from "@/components/practice/QuestionCard";
import { Icon } from "@/components/common/Icon";
import { Card, ButtonLink, EmptyState, LoadingState, ProgressBar, btn } from "@/components/common/ui";
import { cn } from "@/utils/cn";

type Stage = "intro" | "concept" | "examples" | "quick" | "complete";

interface LessonPageDef {
  stage: Stage;
  title: string;
}

const STAGES: { key: Stage; label: string }[] = [
  { key: "intro", label: "Introduction" },
  { key: "concept", label: "Concept" },
  { key: "examples", label: "Examples" },
  { key: "quick", label: "Quick check" },
  { key: "complete", label: "Finish" },
];

function buildPages(lesson: Lesson): LessonPageDef[] {
  return [
    { stage: "intro", title: lesson.introduction.title },
    ...lesson.concept.map((c) => ({ stage: "concept" as const, title: c.title })),
    ...lesson.examples.map((e) => ({ stage: "examples" as const, title: e.title })),
    { stage: "quick", title: "Quick check" },
    { stage: "complete", title: "Lesson complete" },
  ];
}

export default function LessonPage() {
  const { topicId = "", lessonId = "" } = useParams();
  const { state, snapshot } = useProgress();
  const lesson = getLesson(lessonId);
  const topic = getTopic(topicId);

  if (state === "loading") return <LoadingState label="Opening your lesson…" />;
  if (!lesson || !topic || lesson.topicId !== topic.id) {
    return (
      <EmptyState
        title="Lesson not found"
        message="This lesson doesn’t exist or may have been moved."
        action={<ButtonLink to="/topics">Browse lessons</ButtonLink>}
      />
    );
  }
  const record = snapshot.lessons[lessonRecordId(topicId, lessonId)];
  const initialPage = record && record.status !== "completed" ? record.lastPage : 0;
  return <LessonView key={lesson.id} lesson={lesson} initialPage={initialPage} />;
}

function LessonView({ lesson, initialPage }: { lesson: Lesson; initialPage: number }) {
  const { snapshot, state, saveLessonPage, completeLesson } = useProgress();
  const pages = useMemo(() => buildPages(lesson), [lesson]);
  const [page, setPage] = useState(Math.min(initialPage, pages.length - 1));
  const [results, setResults] = useState<Record<string, AttemptAnswer>>({});
  const [saveError, setSaveError] = useState<string | null>(null);
  const [finishing, setFinishing] = useState(false);

  // Keep the latest save function in a ref so the effect only runs on page changes.
  const saveRef = useRef(saveLessonPage);
  saveRef.current = saveLessonPage;
  const canSave = state === "ready";

  useEffect(() => {
    if (!canSave) return;
    saveRef.current({ topicId: lesson.topicId, lessonId: lesson.id, page, totalPages: pages.length }).then(
      () => setSaveError(null),
      (e: unknown) => setSaveError(e instanceof Error ? e.message : "Progress could not be saved."),
    );
  }, [page, lesson.id, lesson.topicId, pages.length, canSave]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  const current = pages[page];
  const record = snapshot.lessons[lessonRecordId(lesson.topicId, lesson.id)];
  const isCompleted = record?.status === "completed";
  const quickDone = lesson.quickCheck.every((q) => results[q.id]);
  const nextBlocked = current.stage === "quick" && !quickDone && !isCompleted;
  const stageIndex = STAGES.findIndex((s) => s.key === current.stage);

  const examplePageStart = pages.findIndex((p) => p.stage === "examples");
  const conceptStart = pages.findIndex((p) => p.stage === "concept");

  const siblings = getLessonsForTopic(lesson.topicId);
  const nextLesson = siblings[siblings.findIndex((l) => l.id === lesson.id) + 1];

  async function finish() {
    setFinishing(true);
    try {
      await completeLesson({ topicId: lesson.topicId, lessonId: lesson.id, lastPage: pages.length - 1 });
      setSaveError(null);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Your completion could not be saved.");
    } finally {
      setFinishing(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 flex items-center gap-2 text-sm text-slate-600" aria-label="Breadcrumb">
        <Link to={`/topics/${lesson.topicId}`} className="inline-flex items-center gap-1 font-semibold text-indigo-700 hover:underline">
          <Icon name="arrowLeft" className="h-4 w-4" /> {getTopic(lesson.topicId)?.title}
        </Link>
        <span aria-hidden="true">/</span>
        <span>Lesson {lesson.order}</span>
      </nav>

      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{lesson.title}</h1>

      {/* Stage tracker */}
      <div className="mt-4">
        <ol className="flex flex-wrap gap-1.5" aria-label="Lesson stages">
          {STAGES.map((s, i) => (
            <li
              key={s.key}
              aria-current={i === stageIndex ? "step" : undefined}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                i === stageIndex ? "bg-indigo-600 text-white" : i < stageIndex ? "bg-indigo-100 text-indigo-800" : "bg-slate-200 text-slate-600",
              )}
            >
              {s.label}
            </li>
          ))}
        </ol>
        <ProgressBar value={(page / (pages.length - 1)) * 100} label="Lesson progress" className="mt-3" />
        <p className="mt-1 text-xs text-slate-500">
          Step {page + 1} of {pages.length}
        </p>
      </div>

      {saveError && (
        <p role="alert" className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-950">
          {saveError}
        </p>
      )}

      <Card className="mt-5">
        {current.stage === "intro" && (
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">Introduction</p>
            <h2 className="text-xl font-bold text-slate-900">{lesson.introduction.title}</h2>
            <BlockRenderer blocks={lesson.introduction.blocks} />
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-900">By the end of this lesson you will be able to:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
                {lesson.objectives.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {current.stage === "concept" && (
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
              Concept · part {page - conceptStart + 1} of {lesson.concept.length}
            </p>
            <h2 className="text-xl font-bold text-slate-900">{lesson.concept[page - conceptStart].title}</h2>
            <BlockRenderer blocks={lesson.concept[page - conceptStart].blocks} />
          </div>
        )}

        {current.stage === "examples" && (
          <WorkedExampleView
            key={lesson.examples[page - examplePageStart].id}
            example={lesson.examples[page - examplePageStart]}
            index={page - examplePageStart}
            total={lesson.examples.length}
          />
        )}

        {current.stage === "quick" && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">Quick check</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">Let’s see what stuck</h2>
              <p className="mt-1 text-slate-600">
                Answer each question. You can retry and use hints – the goal is understanding, not a perfect score.
              </p>
            </div>
            {lesson.quickCheck.map((q, i) => (
              <div key={q.id} className="rounded-2xl border border-slate-200 p-4 sm:p-5">
                <p className="mb-3 text-sm font-bold text-slate-500">
                  Question {i + 1} of {lesson.quickCheck.length}
                </p>
                <QuestionCard
                  question={q}
                  mode="learn"
                  showDifficulty={false}
                  previous={results[q.id]}
                  onResolved={(a) => setResults((r) => ({ ...r, [q.id]: a }))}
                />
              </div>
            ))}
            {!quickDone && !isCompleted && (
              <p className="text-sm text-slate-600">Finish all questions to continue.</p>
            )}
          </div>
        )}

        {current.stage === "complete" && (
          <div className="space-y-5">
            {isCompleted ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Icon name="check" className="h-7 w-7" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Lesson complete!</h2>
                    <p className="text-slate-600">Your progress is saved on this device.</p>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold text-slate-700">
                    {getTopic(lesson.topicId)?.title}: {snapshot.topics[lesson.topicId]?.completionPercentage ?? 0}% complete
                  </p>
                  <ProgressBar
                    value={snapshot.topics[lesson.topicId]?.completionPercentage ?? 0}
                    label="Topic progress"
                    tone="emerald"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {nextLesson ? (
                    <ButtonLink to={`/lessons/${lesson.topicId}/${nextLesson.id}`}>
                      Next lesson: {nextLesson.title} <Icon name="arrowRight" className="h-4 w-4" />
                    </ButtonLink>
                  ) : (
                    <ButtonLink to={`/practice/${lesson.topicId}`}>
                      Go to practice and assessment <Icon name="arrowRight" className="h-4 w-4" />
                    </ButtonLink>
                  )}
                  <ButtonLink to={`/practice/${lesson.topicId}?lesson=${lesson.id}`} variant="secondary">
                    Practice this lesson
                  </ButtonLink>
                  <ButtonLink to={`/topics/${lesson.topicId}`} variant="ghost">
                    Back to topic
                  </ButtonLink>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-slate-900">You’ve reached the end of the lesson</h2>
                <p className="text-slate-700">
                  You can now: {lesson.objectives.map((o) => o.charAt(0).toLowerCase() + o.slice(1)).join("; ")}.
                </p>
                <p className="text-slate-600">Save your progress to mark this lesson as complete.</p>
                <button type="button" className={btn.primary} onClick={finish} disabled={finishing}>
                  {finishing ? "Saving…" : "Complete lesson"}
                </button>
              </>
            )}
          </div>
        )}
      </Card>

      {/* Pager */}
      <div className="mt-5 flex items-center justify-between gap-3">
        {page > 0 ? (
          <button type="button" className={btn.secondary} onClick={() => setPage((p) => p - 1)}>
            <Icon name="arrowLeft" className="h-4 w-4" /> Back
          </button>
        ) : (
          <span />
        )}
        {page < pages.length - 1 && (
          <button type="button" className={btn.primary} disabled={nextBlocked} onClick={() => setPage((p) => p + 1)}>
            {current.stage === "quick" ? "Finish lesson" : "Continue"} <Icon name="arrowRight" className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
