import { useState, type FormEvent } from "react";
import { curriculumConfig } from "@/content";
import type { Question } from "@/types/content";
import type { AttemptAnswer } from "@/database/schema";
import { validateAnswer } from "@/utils/answerValidation";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/common/Icon";
import { MathBlock, RichText } from "@/components/common/RichText";
import { Pill, btn } from "@/components/common/ui";

/**
 * learn  – retries allowed, progressive hints, solution unlocked after repeated misses
 * assess – one submission, no hints; the explanation is shown straight after
 */
export type QuestionMode = "learn" | "assess";

const HINT_LABELS = ["Understand the question", "Recall the rule", "Try the next step"];
const DIFFICULTY_TONE = { easy: "emerald", moderate: "amber", challenging: "rose" } as const;

type Status = "answering" | "correct" | "incorrect";

interface Props {
  question: Question;
  mode: QuestionMode;
  onResolved: (answer: AttemptAnswer) => void;
  /** When revisiting a finished question, show it in its resolved state */
  previous?: AttemptAnswer;
  showDifficulty?: boolean;
}

export function QuestionCard({ question, mode, onResolved, previous, showDifficulty = true }: Props) {
  const [response, setResponse] = useState(previous?.response ?? "");
  const [attempts, setAttempts] = useState(previous?.attempts ?? 0);
  const [eliminated, setEliminated] = useState<string[]>([]);
  const [hintsShown, setHintsShown] = useState(previous?.hintsUsed ?? 0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [viewedSolution, setViewedSolution] = useState(previous?.viewedSolution ?? false);
  const [status, setStatus] = useState<Status>(previous ? (previous.correct ? "correct" : "incorrect") : "answering");

  const resolved = status !== "answering";
  const maxHints = Math.min(3, question.hints.length);
  const canSeeSolution = mode === "learn" && !resolved && attempts >= curriculumConfig.attemptsBeforeSolution;

  function finish(correct: boolean, finalAttempts: number, finalResponse: string, solutionViewed: boolean) {
    setStatus(correct ? "correct" : "incorrect");
    onResolved({
      questionId: question.id,
      lessonId: question.lessonId,
      correct,
      attempts: finalAttempts,
      hintsUsed: hintsShown,
      viewedSolution: solutionViewed,
      response: finalResponse,
    });
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (resolved) return;
    const result = validateAnswer(question, response);
    if (result.invalid) {
      setNotice(result.feedback);
      return;
    }
    setNotice(null);
    const n = attempts + 1;
    setAttempts(n);
    if (result.correct) {
      setFeedback(null);
      finish(true, n, response, false);
      return;
    }
    setFeedback(result.feedback);
    if (mode === "assess") {
      finish(false, n, response, false);
      return;
    }
    if (question.type === "mcq") {
      setEliminated((prev) => [...prev, response]);
      setResponse("");
    }
  }

  function revealSolution() {
    setViewedSolution(true);
    finish(false, attempts, response, true);
  }

  const wrongTries = attempts - (status === "correct" ? 1 : 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {showDifficulty && <Pill tone={DIFFICULTY_TONE[question.difficulty]}>{question.difficulty}</Pill>}
        {mode === "assess" && <Pill tone="slate">One attempt – no hints</Pill>}
      </div>

      <div className="text-xl font-medium leading-relaxed text-slate-900">
        <RichText text={question.prompt} />
      </div>
      {question.math && <MathBlock tex={question.math} />}

      <form onSubmit={submit} className="space-y-4">
        {question.type === "mcq" ? (
          <fieldset disabled={resolved}>
            <legend className="sr-only">Answer choices</legend>
            <div className="grid gap-3">
              {question.choices.map((choice, i) => {
                const isSelected = response === choice.id;
                const isEliminated = eliminated.includes(choice.id);
                const isCorrect = choice.id === question.correctChoiceId;
                const showCorrect = resolved && isCorrect;
                const showWrong = resolved && mode === "assess" && isSelected && !isCorrect;
                const lastWrong = resolved && status === "incorrect" && isSelected && !isCorrect;
                return (
                  <label
                    key={choice.id}
                    className={cn(
                      "flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 bg-white px-4 py-3 text-lg transition",
                      "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo-600",
                      !resolved && !isEliminated && "hover:border-indigo-300 hover:bg-indigo-50/40",
                      isSelected && !resolved && "border-indigo-600 bg-indigo-50",
                      !isSelected && !showCorrect && "border-slate-200",
                      isEliminated && "cursor-not-allowed border-rose-200 bg-rose-50/60 text-slate-500",
                      showCorrect && "border-emerald-500 bg-emerald-50",
                      (showWrong || lastWrong) && "border-rose-500 bg-rose-50",
                    )}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={choice.id}
                      checked={isSelected}
                      disabled={resolved || isEliminated}
                      onChange={() => {
                        setResponse(choice.id);
                        setNotice(null);
                      }}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold",
                        showCorrect
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : isSelected && !resolved
                            ? "border-indigo-600 bg-indigo-600 text-white"
                            : "border-slate-300 text-slate-600",
                      )}
                    >
                      {showCorrect ? <Icon name="check" className="h-4 w-4" /> : isEliminated ? <Icon name="x" className="h-4 w-4" /> : String.fromCharCode(65 + i)}
                    </span>
                    <span className={cn("flex-1", isEliminated && "line-through decoration-rose-300")}>
                      <RichText text={choice.text} />
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : (
          <div>
            <label htmlFor={`num-${question.id}`} className="mb-2 block text-sm font-semibold text-slate-700">
              Your answer
            </label>
            <div className="flex items-center gap-3">
              <input
                id={`num-${question.id}`}
                type="text"
                inputMode="text"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                value={response}
                disabled={resolved}
                onChange={(e) => {
                  setResponse(e.target.value);
                  setNotice(null);
                }}
                placeholder="Type a number"
                className="min-h-12 w-full max-w-xs rounded-xl border-2 border-slate-300 bg-white px-4 text-xl text-slate-900 focus:border-indigo-600 focus:outline-none disabled:bg-slate-100"
              />
              {question.unit && <span className="text-lg text-slate-600">{question.unit}</span>}
            </div>
          </div>
        )}

        {notice && (
          <p role="alert" className="rounded-lg bg-amber-50 px-3 py-2 text-amber-950">
            {notice}
          </p>
        )}

        {!resolved && (
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className={btn.primary} disabled={!response.trim()}>
              {attempts > 0 ? "Check again" : "Check answer"}
            </button>
            {mode === "learn" && hintsShown < maxHints && (
              <button type="button" className={btn.secondary} onClick={() => setHintsShown((h) => h + 1)}>
                <Icon name="bulb" className="h-4 w-4" />
                {hintsShown === 0 ? "Need a hint?" : `Next hint (${hintsShown}/${maxHints})`}
              </button>
            )}
            {canSeeSolution && (
              <button type="button" className={btn.ghost} onClick={revealSolution}>
                Show the solution
              </button>
            )}
          </div>
        )}
      </form>

      {/* Progressive hints */}
      {mode === "learn" && hintsShown > 0 && (
        <ol className="space-y-2" aria-label="Hints">
          {question.hints.slice(0, hintsShown).map((hint, i) => (
            <li key={i} className="rounded-xl border border-teal-200 bg-teal-50 p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-teal-900">
                Hint {i + 1} · {HINT_LABELS[i]}
              </p>
              <p className="mt-0.5 text-slate-800">
                <RichText text={hint} />
              </p>
            </li>
          ))}
        </ol>
      )}

      {/* Corrective feedback after a wrong answer */}
      <div aria-live="polite">
        {feedback && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <p className="font-bold text-rose-900">{resolved ? "Not quite" : "Not quite – try again"}</p>
            <p className="mt-1 text-slate-800">
              <RichText text={feedback} />
            </p>
            {!resolved && mode === "learn" && (
              <p className="mt-2 text-sm text-slate-600">
                {hintsShown < maxHints
                  ? "Tip: use a hint if you’re not sure where to start."
                  : "You’ve seen all the hints – use them to work through it step by step."}
                {attempts < curriculumConfig.attemptsBeforeSolution &&
                  ` The full solution unlocks after ${curriculumConfig.attemptsBeforeSolution} tries.`}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Resolved state: explanation + steps */}
      {resolved && (
        <div className="space-y-3">
          {status === "correct" ? (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4">
              <p className="flex items-center gap-2 font-bold text-emerald-900">
                <Icon name="check" className="h-5 w-5" /> Correct!
              </p>
              {wrongTries > 0 && (
                <p className="mt-1 text-emerald-900">
                  You worked it out after {attempts} tries – sticking with it is how learning happens.
                </p>
              )}
            </div>
          ) : (
            viewedSolution && (
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-950">
                <p className="font-bold">Here’s the full solution.</p>
                <p className="mt-1">Read through each step, then try a similar question to check you’ve got it.</p>
              </div>
            )
          )}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Why this is the answer</p>
            <p className="mt-1 text-slate-800">
              <RichText text={question.explanation} />
            </p>
            <details className="mt-3" open={status === "incorrect"}>
              <summary className="cursor-pointer font-semibold text-indigo-700">Step-by-step solution</summary>
              <ol className="mt-2 list-decimal space-y-1.5 pl-6 text-slate-800">
                {question.steps.map((s, i) => (
                  <li key={i}>
                    <RichText text={s} />
                  </li>
                ))}
              </ol>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}
