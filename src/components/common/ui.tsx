import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ProgressStatus } from "@/database/schema";
import { cn } from "@/utils/cn";
import { Icon } from "./Icon";

/* Shared class strings so buttons look consistent everywhere */
const btnBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-base font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50";
export const btn = {
  primary: cn(btnBase, "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"),
  secondary: cn(btnBase, "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"),
  ghost: cn(btnBase, "text-indigo-700 hover:bg-indigo-50"),
  danger: cn(btnBase, "border border-rose-300 bg-white text-rose-700 hover:bg-rose-50"),
};

export function ButtonLink({
  to,
  variant = "primary",
  children,
  className,
}: {
  to: string;
  variant?: keyof typeof btn;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} className={cn(btn[variant], className)}>
      {children}
    </Link>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6", className)}>{children}</section>;
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 max-w-2xl text-slate-600">{subtitle}</p>}
      </div>
      {children}
    </header>
  );
}

export function ProgressBar({
  value,
  label,
  tone = "indigo",
  className,
}: {
  value: number;
  label: string;
  tone?: "indigo" | "emerald" | "amber";
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  const color = { indigo: "bg-indigo-600", emerald: "bg-emerald-600", amber: "bg-amber-500" }[tone];
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2.5 w-full overflow-hidden rounded-full bg-slate-200", className)}
    >
      <div className={cn("h-full rounded-full transition-all duration-300", color)} style={{ width: `${v}%` }} />
    </div>
  );
}

const STATUS_STYLE: Record<ProgressStatus, { label: string; cls: string }> = {
  not_started: { label: "Not started", cls: "bg-slate-100 text-slate-700" },
  in_progress: { label: "In progress", cls: "bg-amber-100 text-amber-900" },
  completed: { label: "Completed", cls: "bg-emerald-100 text-emerald-900" },
};

export function StatusBadge({ status }: { status: ProgressStatus }) {
  const s = STATUS_STYLE[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", s.cls)}>
      {status === "completed" && <Icon name="check" className="h-3.5 w-3.5" />}
      {s.label}
    </span>
  );
}

export function Pill({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "indigo" | "emerald" | "amber" | "rose" }) {
  const cls = {
    slate: "bg-slate-100 text-slate-700",
    indigo: "bg-indigo-100 text-indigo-800",
    emerald: "bg-emerald-100 text-emerald-900",
    amber: "bg-amber-100 text-amber-900",
    rose: "bg-rose-100 text-rose-900",
  }[tone];
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", cls)}>{children}</span>;
}

export function LoadingState({ label = "Loading your progress…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-600" role="status">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      <p>{label}</p>
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", message, onRetry }: { title?: string; message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="mx-auto max-w-xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-950">
      <div className="flex items-start gap-3">
        <Icon name="alert" className="mt-0.5 h-6 w-6 shrink-0 text-rose-600" />
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-1 text-rose-900">{message}</p>
          {onRetry && (
            <button type="button" onClick={onRetry} className={cn(btn.secondary, "mt-4")}>
              <Icon name="refresh" className="h-4 w-4" /> Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ title, message, action }: { title: string; message: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-slate-600">{message}</p>
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
