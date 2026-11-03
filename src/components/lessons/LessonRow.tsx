import { Link } from "react-router-dom";
import type { Lesson } from "@/types/content";
import type { LessonProgressRecord, ProgressStatus } from "@/database/schema";
import { Icon } from "@/components/common/Icon";
import { StatusBadge } from "@/components/common/ui";
import { cn } from "@/utils/cn";

export function LessonRow({ lesson, record }: { lesson: Lesson; record?: LessonProgressRecord }) {
  const status: ProgressStatus = record?.status ?? "not_started";
  return (
    <Link
      to={`/lessons/${lesson.topicId}/${lesson.id}`}
      className="group flex min-h-16 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-indigo-300 hover:bg-indigo-50/40 sm:p-4"
    >
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
          status === "completed" ? "bg-emerald-600 text-white" : status === "in_progress" ? "bg-amber-100 text-amber-900" : "bg-slate-100 text-slate-600",
        )}
      >
        {status === "completed" ? <Icon name="check" className="h-5 w-5" /> : lesson.order}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-slate-900">{lesson.title}</span>
        <span className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1">
            <Icon name="clock" className="h-3.5 w-3.5" /> {lesson.minutes} min
          </span>
          {status === "in_progress" && <span>{record?.completionPercentage ?? 0}% done</span>}
        </span>
      </span>
      <StatusBadge status={status} />
      <Icon name="arrowRight" className="hidden h-4 w-4 text-slate-400 transition group-hover:text-indigo-600 sm:block" />
    </Link>
  );
}
