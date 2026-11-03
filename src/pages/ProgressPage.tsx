import { Link } from "react-router-dom";
import { curriculumConfig, getLesson, getLessonTitle, getTopic } from "@/content";
import { useProgress } from "@/hooks/ProgressContext";
import { Icon } from "@/components/common/Icon";
import { BackupPanel } from "@/components/progress/BackupPanel";
import { ScoreChart } from "@/components/progress/ScoreChart";
import { Card, ButtonLink, EmptyState, LoadingState, PageHeader, Pill, ProgressBar, StatusBadge } from "@/components/common/ui";
import { getOverallProgress, getTopicViews, getTopicsNeedingPractice } from "@/utils/insights";
import { formatDateTime } from "@/utils/format";

const MODE_LABEL = { practice: "Practice", assessment: "Assessment", prerequisite: "Skills check" } as const;

export default function ProgressPage() {
  const { state, snapshot } = useProgress();
  if (state === "loading") return <LoadingState />;

  const overall = getOverallProgress(snapshot);
  const views = getTopicViews(snapshot);
  const studying = views.filter((v) => v.status === "in_progress");
  const withScores = views.filter((v) => v.progress?.bestScore != null);
  const needsPractice = getTopicsNeedingPractice(snapshot);
  const completedLessons = Object.values(snapshot.lessons)
    .filter((l) => l.status === "completed" && getLesson(l.lessonId))
    .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0));
  const attempts = snapshot.attempts;

  return (
    <div className="space-y-6">
      <PageHeader title="My Progress" subtitle="A look at what you’ve learned and where to focus next. Only you see this – there are no rankings." />

      <Card>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-slate-600">Overall learning progress</p>
            <p className="text-4xl font-bold text-slate-900">{overall.percent}%</p>
          </div>
          <p className="text-sm text-slate-600">
            {overall.completedLessons} of {overall.totalLessons} lessons completed · {overall.assessmentsPassed} assessment
            {overall.assessmentsPassed === 1 ? "" : "s"} passed
          </p>
        </div>
        <ProgressBar value={overall.percent} label="Overall learning progress" className="mt-3" />
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-bold text-slate-900">Topics you’re studying</h2>
          {studying.length === 0 ? (
            <p className="mt-2 text-slate-600">Nothing in progress yet. Start a lesson and it will appear here.</p>
          ) : (
            <ul className="mt-3 space-y-4">
              {studying.map((v) => (
                <li key={v.topic.id}>
                  <Link to={`/topics/${v.topic.id}`} className="font-semibold text-slate-900 hover:text-indigo-700">
                    {v.topic.title}
                  </Link>
                  <div className="mt-1 flex items-center gap-3">
                    <ProgressBar value={v.percent} label={`${v.topic.title} progress`} />
                    <span className="w-12 shrink-0 text-right text-sm font-semibold">{v.percent}%</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-slate-900">Best scores by topic</h2>
          {withScores.length === 0 ? (
            <p className="mt-2 text-slate-600">Complete a practice set or assessment to see your best scores.</p>
          ) : (
            <table className="mt-3 w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="py-1 font-semibold">Topic</th>
                  <th className="py-1 font-semibold">Best</th>
                  <th className="py-1 font-semibold">Assessment</th>
                  <th className="py-1 text-right font-semibold">Attempts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {withScores.map((v) => (
                  <tr key={v.topic.id}>
                    <td className="py-2 pr-2 font-semibold text-slate-900">{v.topic.title}</td>
                    <td className="py-2">{v.progress?.bestScore}%</td>
                    <td className="py-2">
                      {v.progress?.bestAssessmentScore == null ? (
                        <span className="text-slate-500">—</span>
                      ) : v.progress.assessmentPassed ? (
                        <Pill tone="emerald">{v.progress.bestAssessmentScore}% passed</Pill>
                      ) : (
                        <Pill tone="amber">{v.progress.bestAssessmentScore}%</Pill>
                      )}
                    </td>
                    <td className="py-2 text-right">{v.progress?.totalAttempts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>

      <Card className={needsPractice.length ? "border-amber-300 bg-amber-50" : undefined}>
        <h2 className="text-lg font-bold text-slate-900">Needs more practice</h2>
        {needsPractice.length === 0 ? (
          <p className="mt-2 text-slate-600">No weak spots spotted so far. If a lesson trips you up in practice, it will be listed here with a suggestion.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {needsPractice.map((n) => (
              <li key={n.topic.id} className="rounded-xl bg-white p-4">
                <p className="font-semibold text-slate-900">{n.topic.title}</p>
                <p className="text-sm text-slate-700">{n.reason}</p>
                {n.lessonIds.length > 0 && (
                  <p className="mt-1 text-sm text-slate-700">Focus on: {n.lessonIds.map((id) => getLessonTitle(id)).join(", ")}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  <ButtonLink to={n.lessonIds[0] ? `/lessons/${n.topic.id}/${n.lessonIds[0]}` : `/topics/${n.topic.id}`} variant="secondary" className="min-h-10 px-3 py-1.5 text-sm">
                    Review lesson
                  </ButtonLink>
                  <ButtonLink to={`/practice/${n.topic.id}${n.lessonIds[0] ? `?lesson=${n.lessonIds[0]}` : ""}`} variant="ghost" className="min-h-10 px-3 py-1.5 text-sm">
                    Practice
                  </ButtonLink>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <h2 className="text-lg font-bold text-slate-900">Completed lessons</h2>
        {completedLessons.length === 0 ? (
          <EmptyState title="No completed lessons yet" message="Finish a lesson’s quick check to mark it complete." action={<ButtonLink to="/topics">Go to lessons</ButtonLink>} />
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {completedLessons.map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
                <Link to={`/lessons/${l.topicId}/${l.lessonId}`} className="min-w-0 hover:text-indigo-700">
                  <span className="flex items-center gap-2 font-semibold text-slate-900">
                    <Icon name="check" className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="truncate">{getLessonTitle(l.lessonId)}</span>
                  </span>
                  <span className="ml-6 block text-sm text-slate-500">
                    {getTopic(l.topicId)?.title}
                    {l.completedAt ? ` · ${formatDateTime(l.completedAt)}` : ""}
                  </span>
                </Link>
                <StatusBadge status="completed" />
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <h2 className="text-lg font-bold text-slate-900">Practice history</h2>
        {attempts.length === 0 ? (
          <EmptyState title="No practice attempts yet" message="Your scores will be tracked here so you can see yourself improve." action={<ButtonLink to="/practice/algebraic-expressions">Start practice</ButtonLink>} />
        ) : (
          <>
            <div className="mt-4">
              <ScoreChart attempts={attempts} passing={curriculumConfig.passingScore} />
            </div>
            <ul className="mt-5 divide-y divide-slate-100">
              {attempts.slice(0, 20).map((a) => (
                <li key={a.id}>
                  <Link to={`/results/${a.id}`} className="flex min-h-14 items-center justify-between gap-3 py-2 hover:text-indigo-700">
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2 font-semibold text-slate-900">
                        {MODE_LABEL[a.mode]}
                        {a.lessonId && <span className="truncate text-sm font-normal text-slate-600">· {getLessonTitle(a.lessonId)}</span>}
                      </span>
                      <span className="text-sm text-slate-500">
                        {getTopic(a.topicId)?.title} · {formatDateTime(a.completedAt)}
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="block text-lg font-bold text-slate-900">{a.score}%</span>
                      <span className="text-xs text-slate-500">
                        {a.correctAnswers}/{a.totalQuestions}
                        {a.passed === true && " · passed"}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>

      <BackupPanel />
    </div>
  );
}
