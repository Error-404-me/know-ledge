import { useState } from "react";
import type { WorkedExample } from "@/types/content";
import { MathBlock, RichText } from "@/components/common/RichText";
import { Icon } from "@/components/common/Icon";
import { btn } from "@/components/common/ui";
import { cn } from "@/utils/cn";

/** Shows a worked example one step at a time, with the reason for each step. */
export function WorkedExampleView({ example, index, total }: { example: WorkedExample; index: number; total: number }) {
  const [revealed, setRevealed] = useState(1);
  const allShown = revealed >= example.steps.length;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
          Worked example {index + 1} of {total}
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">{example.title}</h2>
      </div>

      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-lg text-slate-900">
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-indigo-800">Problem</p>
        <RichText text={example.problem} />
      </div>

      <ol className="space-y-3">
        {example.steps.slice(0, revealed).map((step, i) => (
          <li
            key={i}
            className={cn(
              "rounded-xl border bg-white p-4",
              i === revealed - 1 && !allShown ? "border-indigo-300 shadow-sm" : "border-slate-200",
            )}
          >
            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">
                  <RichText text={step.action} />
                </p>
                {step.math && <MathBlock tex={step.math} className="my-2 rounded-lg bg-slate-50 py-1" />}
                <p className="mt-1 text-slate-700">
                  <span className="mr-1 font-semibold text-teal-800">Why:</span>
                  <RichText text={step.why} />
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {!allShown ? (
        <div className="flex flex-wrap gap-2">
          <button type="button" className={btn.primary} onClick={() => setRevealed((r) => r + 1)}>
            Show next step ({revealed} of {example.steps.length})
          </button>
          <button type="button" className={btn.ghost} onClick={() => setRevealed(example.steps.length)}>
            Show all steps
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-slate-900">
            <p className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-emerald-900">
              <Icon name="check" className="h-4 w-4" /> Answer
            </p>
            <RichText text={example.answer} className="text-lg" />
          </div>
          {example.mistake && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-amber-950">
                <Icon name="alert" className="h-4 w-4" /> Common mistake
              </p>
              <p className="text-slate-800">
                <span className="font-semibold">A frequent wrong answer: </span>
                <RichText text={example.mistake.wrong} />
              </p>
              <p className="mt-1 text-slate-800">
                <span className="font-semibold">Why it’s wrong: </span>
                <RichText text={example.mistake.whyWrong} />
              </p>
              <p className="mt-1 text-slate-800">
                <span className="font-semibold">How to avoid it: </span>
                <RichText text={example.mistake.fix} />
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
