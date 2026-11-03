import { Link } from "react-router-dom";
import { getLesson, getTopic } from "@/content";
import { useProgress } from "@/hooks/ProgressContext";
import { Icon } from "@/components/common/Icon";
import {
  Card,
  ButtonLink,
  ErrorState,
  LoadingState,
  ProgressBar,
  StatusBadge,
} from "@/components/common/ui";
import {
  getActiveTopic,
  getContinueTarget,
  getOverallProgress,
  getRecommendation,
  getTopicViews,
} from "@/utils/insights";
import { timeAgo } from "@/utils/format";

export default function HomePage() {
  const { state, snapshot, error, reload } = useProgress();
  if (state === "loading") return <LoadingState />;

  const topic = getActiveTopic(snapshot);
  const view = topic
    ? getTopicViews(snapshot).find((v) => v.topic.id === topic.id)
    : undefined;
  const cont = getContinueTarget(snapshot);
  const rec = getRecommendation(snapshot);
  const overall = getOverallProgress(snapshot);
  const hasHistory =
    Object.keys(snapshot.lessons).length > 0 || snapshot.attempts.length > 0;

  const practiceAttempts = snapshot.attempts.filter(
    (a) => a.mode === "practice" || a.mode === "assessment",
  );
  const recent = practiceAttempts.slice(0, 5);
  const avg = recent.length
    ? Math.round(recent.reduce((s, a) => s + a.score, 0) / recent.length)
    : null;
  const best = practiceAttempts.length
    ? Math.max(...practiceAttempts.map((a) => a.score))
    : null;

  const recentLessons = Object.values(snapshot.lessons)
    .filter((l) => getLesson(l.lessonId))
    .sort((a, b) => b.lastAccessedAt - a.lastAccessedAt)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {state === "error" && (
        <ErrorState
          title="We couldn’t load your saved progress"
          message={error ?? ""}
          onRetry={() => void reload()}
        />
      )}

      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {hasHistory ? "Welcome back!" : "Welcome to KnowKnow!"}
        </h1>
        <p className="mt-1 text-slate-600">
          {hasHistory
            ? "Pick up right where you left off."
            : "Learn each idea, see how problems are solved step by step, and practice until it clicks."}
        </p>
      </section>

      {/* Current topic + continue */}
      {topic && cont && (
        <Card className="border-indigo-200 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-100">
            Current topic
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold">{topic.title}</h2>
            {view && (
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold">
                {view.status === "completed"
                  ? "Completed"
                  : view.status === "in_progress"
                    ? "In progress"
                    : "Not started"}
              </span>
            )}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div
              className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/25"
              role="progressbar"
              aria-label="Current topic progress"
              aria-valuenow={view?.percent ?? 0}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{ width: `${view?.percent ?? 0}%` }}
              />
            </div>
            <span className="text-sm font-semibold">{view?.percent ?? 0}%</span>
          </div>
          <p className="mt-4 font-semibold">{cont.label}</p>
          <p className="mt-0.5 text-indigo-100">{cont.description}</p>
          <Link
            to={cont.to}
            className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {cont.cta} <Icon name="arrowRight" className="h-5 w-5" />
          </Link>
        </Card>
      )}

      {/* Stats */}
      <section
        aria-label="Your progress at a glance"
        className="grid gap-4 sm:grid-cols-3"
      >
        <Card>
          <p className="text-sm font-semibold text-slate-600">
            Overall learning progress
          </p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {overall.percent}%
          </p>
          <ProgressBar
            value={overall.percent}
            label="Overall learning progress"
            className="mt-2"
          />
          <p className="mt-2 text-sm text-slate-600">
            {overall.completedLessons} of {overall.totalLessons} lessons ·{" "}
            {overall.assessmentsPassed} assessment
            {overall.assessmentsPassed === 1 ? "" : "s"} passed
          </p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-slate-600">
            Topics completed
          </p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {overall.topicsCompleted}
            <span className="text-lg font-semibold text-slate-500">
              {" "}
              / {overall.totalTopics}
            </span>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            {overall.topicsCompleted === 0
              ? "Your first one is just ahead."
              : "Nice work – keep the streak of learning going."}
          </p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-slate-600">
            Practice performance
          </p>
          {avg === null ? (
            <>
              <p className="mt-1 text-3xl font-bold text-slate-400">—</p>
              <p className="mt-2 text-sm text-slate-600">
                Try a practice set to see your scores here.
              </p>
            </>
          ) : (
            <>
              <p className="mt-1 text-3xl font-bold text-slate-900">{avg}%</p>
              <p className="mt-2 text-sm text-slate-600">
                Average of last {recent.length} · best {best}% ·{" "}
                {practiceAttempts.length} total
              </p>
            </>
          )}
        </Card>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recommended */}
        {rec && (
          <Card>
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-teal-800">
              <Icon name="bulb" className="h-4 w-4" /> Recommended for you
            </p>
            <h2 className="mt-2 text-lg font-bold text-slate-900">
              {rec.label}
            </h2>
            <p className="mt-1 text-slate-600">{rec.description}</p>
            <div className="mt-4">
              <ButtonLink to={rec.to} variant="secondary">
                {rec.cta}
              </ButtonLink>
            </div>
          </Card>
        )}

        {/* Recently studied */}
        <Card>
          <h2 className="text-lg font-bold text-slate-900">
            Recently studied lessons
          </h2>
          {recentLessons.length === 0 ? (
            <p className="mt-2 text-slate-600">
              No lessons yet. Your recent lessons will show up here once you
              start.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100">
              {recentLessons.map((l) => (
                <li key={l.id}>
                  <Link
                    to={`/lessons/${l.topicId}/${l.lessonId}`}
                    className="flex min-h-14 items-center justify-between gap-3 py-2 hover:text-indigo-700"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-slate-900">
                        {getLesson(l.lessonId)?.title}
                      </span>
                      <span className="text-sm text-slate-500">
                        {getTopic(l.topicId)?.title} ·{" "}
                        {timeAgo(l.lastAccessedAt)}
                      </span>
                    </span>
                    <StatusBadge status={l.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <p className="rounded-xl bg-white p-4 text-sm text-slate-600 ring-1 ring-slate-200">
        Your progress is saved in this browser only. Use the backup option on{" "}
        <Link
          to="/progress"
          className="font-semibold text-indigo-700 underline"
        >
          My Progress
        </Link>{" "}
        to keep a copy in case browser data is cleared or you switch devices.
      </p>
    </div>
  );
}
