import type { PracticeAttemptRecord } from "@/database/schema";
import { cn } from "@/utils/cn";
import { formatShortDate } from "@/utils/format";

/** Simple bar chart of the most recent attempts (oldest on the left). */
export function ScoreChart({ attempts, passing }: { attempts: PracticeAttemptRecord[]; passing: number }) {
  const data = attempts.slice(0, 10).reverse();
  return (
    <figure>
      <div className="relative flex h-44 items-end gap-2 border-b border-slate-300 pt-4">
        <div
          className="pointer-events-none absolute inset-x-0 border-t border-dashed border-emerald-500"
          style={{ bottom: `${passing}%` }}
          aria-hidden="true"
        >
          <span className="absolute -top-5 right-0 text-xs font-semibold text-emerald-700">Passing {passing}%</span>
        </div>
        {data.map((a) => (
          <div key={a.id} className="flex h-full flex-1 flex-col justify-end" title={`${a.score}% on ${formatShortDate(a.completedAt)}`}>
            <div
              className={cn(
                "w-full rounded-t-md",
                a.mode === "assessment" ? "bg-indigo-600" : a.mode === "prerequisite" ? "bg-slate-400" : "bg-sky-500",
              )}
              style={{ height: `${Math.max(a.score, 3)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-2">
        {data.map((a) => (
          <span key={a.id} className="flex-1 text-center text-[11px] leading-tight text-slate-500">
            <span className="block font-semibold text-slate-700">{a.score}%</span>
            {formatShortDate(a.completedAt)}
          </span>
        ))}
      </div>
      <figcaption className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
        <Legend color="bg-sky-500" label="Practice" />
        <Legend color="bg-indigo-600" label="Assessment" />
        <Legend color="bg-slate-400" label="Skills check" />
      </figcaption>
    </figure>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("h-3 w-3 rounded-sm", color)} /> {label}
    </span>
  );
}
