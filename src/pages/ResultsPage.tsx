import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { curriculumConfig, getLessonTitle, getQuestion, getTopic } from "@/content";
import type { PracticeAttemptRecord } from "@/database/schema";
import { useProgress } from "@/hooks/ProgressContext";
import { ScoreRing } from "@/components/progress/ScoreRing";
import { RichText } from "@/components/common/RichText";
import { Icon } from "@/components/common/Icon";
import { Card, ButtonLink, EmptyState, ErrorState, LoadingState, Pill } from "@/components/common/ui";
import { describeCorrectAnswer, describeResponse } from "@/utils/answerValidation";
import { getResultSuggestion } from "@/utils/insights";
import { cn } from "@/utils/cn";
import { formatDateTime } from "@/utils/format";

const MODE_LABEL = { practice: "Practice set", assessment: "Topic assessment", prerequisite: "Grade 7 skills check" } as const;

export default function ResultsPage() {
  const { attemptId = "" } = useParams();
  const { state, snapshot, getAttempt } = useProgress();
  const [attempt, setAttempt] = useState<PracticeAttemptRecord | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getAttempt(attemptId).then(
      (a) => !cancelled && (setAttempt(a ?? null), setError(null)),
      (e: unknown) => !cancelled && setError(e instanceof Error ? e.message : "Results could not be loaded."),
    );
    return () => {
      cancelled = true;
    };
  }, [attemptId, getAttempt, tries]);

  if (error) return <ErrorState message={error} onRetry={() => setTries((t) => t + 1)} />;
  if (state === "loading" || attempt === undefined) return <LoadingState label="Loading your results…" />;
  if (attempt === null) {
    return (
      <EmptyState
        title="Results not found"
        message="We couldn’t find those results. They may have been removed or this link is from another device."
        action={<ButtonLink to="/progress">See my progress</ButtonLink>}
      />
    );
  }

  const topic = getTopic(attempt.topicId);
  const suggestion = getResultSuggestion(attempt, snapshot);
  const passing = curriculumConfig.passingScore;
  const review = attempt.answers.filter((a) => !a.correct || a.attempts > 1 || a.hintsUsed > 0 || a.viewedSolution);
  const reviewNotes =
    attempt.mode === "prerequisite"
      ? [...new Set(attempt.answers.filter((a) => !a.correct).map((a) => getQuestion(a.questionId)?.reviewNote).filter(Boolean))]
      : [];

  const toneBox = {
    success: "border-emerald-300 bg-emerald-50",
    info: "border-sky-300 bg-sky-50",
    warn: "border-amber-300 bg-amber-50",
  }[suggestion.tone];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">{MODE_LABEL[attempt.mode]} · results</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">{topic?.title}</h1>
        <p className="text-sm text-slate-500">{formatDateTime(attempt.completedAt)} · saved on this device</p>
      </div>

      <Card>
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <ScoreRing value={attempt.score} passing={passing} />
          <div className="w-full flex-1">
            <p className="text-lg font-semibold text-slate-900">
              You got {attempt.correctAnswers} out of {attempt.totalQuestions} correct
            </p>
            <dl className="mt-3 grid grid-cols-3 gap-3 text-center">
              <Stat label="Correct" value={attempt.correctAnswers} cls="bg-emerald-50 text-emerald-900" />
              <Stat label="Incorrect" value={attempt.incorrectAnswers} cls="bg-rose-50 text-rose-900" />
              <Stat label="Score" value={`${attempt.score}%`} cls="bg-indigo-50 text-indigo-900" />
            </dl>
            {attempt.mode === "assessment" && (
              <p className="mt-3 text-sm text-slate-600">
                Passing score: {passing}% ·{" "}
                <span className={cn("font-semibold", attempt.passed ? "text-emerald-700" : "text-amber-700")}>
                  {attempt.passed ? "Passed" : "Not yet passed"}
                </span>
              </p>
            )}
          </div>
        </div>
      </Card>

      <section className={cn("rounded-2xl border p-5", toneBox)}>
        <h2 className="text-xl font-bold text-slate-900">{suggestion.headline}</h2>
        <p className="mt-1 text-slate-800">{suggestion.message}</p>
        {reviewNotes.length > 0 && (
          <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-800">
            {reviewNotes.map((n) => (
              <li key={n}>Review: {n}</li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {suggestion.actions.map((a) => (
            <ButtonLink key={a.label + a.to} to={a.to} variant={a.primary ? "primary" : "secondary"}>
              {a.label}
            </ButtonLink>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-slate-900">Questions to review</h2>
        {review.length === 0 ? (
          <EmptyState title="Perfect run!" message="You answered every question correctly on the first try, without hints." />
        ) : (
          <ul className="space-y-4">
            {review.map((a) => {
              const q = getQuestion(a.questionId);
              if (!q) return null;
              const withHelp = a.correct;
              return (
                <li key={a.questionId}>
                  <Card className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {withHelp ? <Pill tone="amber">Correct with help</Pill> : <Pill tone="rose">Needs review</Pill>}
                      <Pill>{getLessonTitle(a.lessonId)}</Pill>
                    </div>
                    <div className="text-lg text-slate-900">
                      <RichText text={q.prompt} />
                    </div>
                    <dl className="grid gap-2 text-sm sm:grid-cols-2">
                      <div className="rounded-lg bg-slate-50 p-3">
                        <dt className="font-semibold text-slate-600">Your answer</dt>
                        <dd className="mt-0.5 text-base text-slate-900">
                          <RichText text={describeResponse(q, a.response)} />
                        </dd>
                      </div>
                      <div className="rounded-lg bg-emerald-50 p-3">
                        <dt className="font-semibold text-emerald-900">Correct answer</dt>
                        <dd className="mt-0.5 text-base text-slate-900">
                          <RichText text={describeCorrectAnswer(q)} />
                        </dd>
                      </div>
                    </dl>
                    <p className="text-slate-800">
                      <span className="font-semibold">Why: </span>
                      <RichText text={q.explanation} />
                    </p>
                    <details>
                      <summary className="cursor-pointer font-semibold text-indigo-700">Step-by-step solution</summary>
                      <ol className="mt-2 list-decimal space-y-1.5 pl-6 text-slate-800">
                        {q.steps.map((s, i) => (
                          <li key={i}>
                            <RichText text={s} />
                          </li>
                        ))}
                      </ol>
                    </details>
                    {a.lessonId !== "prerequisite" && (
                      <Link
                        to={`/lessons/${q.topicId}/${a.lessonId}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-700 hover:underline"
                      >
                        Revisit the lesson <Icon name="arrowRight" className="h-4 w-4" />
                      </Link>
                    )}
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, cls }: { label: string; value: number | string; cls: string }) {
  return (
    <div className={cn("rounded-xl p-3", cls)}>
      <dd className="text-2xl font-bold">{value}</dd>
      <dt className="text-xs font-semibold uppercase tracking-wide">{label}</dt>
    </div>
  );
}
