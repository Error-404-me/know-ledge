import { useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  curriculumConfig,
  getLessonsForTopic,
  getTopic,
  isTopicOpenable,
  topics,
} from "@/content";
import type { Difficulty, Question, Topic } from "@/types/content";
import {
  lessonRecordId,
  type AttemptAnswer,
  type AttemptMode,
} from "@/database/schema";
import { useProgress } from "@/hooks/ProgressContext";
import { QuestionCard } from "@/components/practice/QuestionCard";
import { Icon } from "@/components/common/Icon";
import {
  Card,
  ButtonLink,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  Pill,
  ProgressBar,
  btn,
} from "@/components/common/ui";
import { buildSession, countAvailable } from "@/utils/sessionBuilder";
import { cn } from "@/utils/cn";

interface ActiveSession {
  mode: AttemptMode;
  lessonId: string | null;
  questions: Question[];
}

const DIFFICULTIES: { value: Difficulty | "mixed"; label: string }[] = [
  { value: "mixed", label: "Mixed" },
  { value: "easy", label: "Easy" },
  { value: "moderate", label: "Moderate" },
  { value: "challenging", label: "Challenging" },
];

export default function PracticePage() {
  const { topicId = "" } = useParams();
  const { state } = useProgress();
  const topic = getTopic(topicId);
  const [session, setSession] = useState<ActiveSession | null>(null);

  if (state === "loading") return <LoadingState />;
  if (!topic || !isTopicOpenable(topic)) {
    return (
      <EmptyState
        title="Practice isn’t available yet"
        message="This topic doesn’t have practice activities yet. Head back to the topics list."
        action={<ButtonLink to="/topics">Browse topics</ButtonLink>}
      />
    );
  }
  if (session) {
    return (
      <PracticeSession
        key={session.questions.map((q) => q.id).join()}
        topic={topic}
        session={session}
        onExit={() => setSession(null)}
      />
    );
  }
  return <PracticeSetup key={topic.id} topic={topic} onStart={setSession} />;
}

/* --------------------------------- Setup screen -------------------------------- */

function PracticeSetup({
  topic,
  onStart,
}: {
  topic: Topic;
  onStart: (s: ActiveSession) => void;
}) {
  const { snapshot } = useProgress();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const openTopics = topics.filter(isTopicOpenable);
  const lessons = getLessonsForTopic(topic.id);
  const initialLesson = lessons.some((l) => l.id === params.get("lesson"))
    ? params.get("lesson")
    : null;
  const highlight = params.get("mode");

  const [lessonId, setLessonId] = useState<string | null>(initialLesson);
  const [difficulty, setDifficulty] = useState<Difficulty | "mixed">("mixed");

  const available = countAvailable(topic.id, lessonId, difficulty);
  const progress = snapshot.topics[topic.id];
  const incomplete = lessons.filter(
    (l) =>
      snapshot.lessons[lessonRecordId(topic.id, l.id)]?.status !== "completed",
  );
  const prereqAttempts = snapshot.attempts.filter(
    (a) => a.topicId === topic.id && a.mode === "prerequisite",
  );
  const assessmentCount = buildSession({
    topicId: topic.id,
    mode: "assessment",
  }).length;

  const start = (mode: AttemptMode) => {
    const questions = buildSession({
      topicId: topic.id,
      mode,
      lessonId: mode === "practice" ? lessonId : null,
      difficulty,
    });
    if (questions.length)
      onStart({
        mode,
        lessonId: mode === "practice" ? lessonId : null,
        questions,
      });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Practice"
        subtitle={`${topic.title} – practice with hints and retries, then show what you know in the assessment.`}
      >
        <ButtonLink to={`/topics/${topic.id}`} variant="ghost">
          <Icon name="arrowLeft" className="h-4 w-4" /> Topic page
        </ButtonLink>
      </PageHeader>

      <div className="space-y-5">
        <Card>
          <label
            htmlFor="practice-topic"
            className="text-sm font-semibold text-slate-700"
          >
            Topic
          </label>
          <select
            id="practice-topic"
            value={topic.id}
            onChange={(e) => navigate(`/practice/${e.target.value}`)}
            className="mt-2 min-h-12 w-full rounded-xl border-2 border-slate-300 bg-white px-3 text-base text-slate-900 focus:border-indigo-600 focus:outline-none"
          >
            {openTopics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.order}. {t.title}
              </option>
            ))}
          </select>
        </Card>
        <Card
          className={cn(highlight === "practice" && "ring-2 ring-indigo-400")}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-slate-900">Practice set</h2>
            <Pill tone="indigo">Hints and retries on</Pill>
          </div>
          <p className="mt-1 text-slate-600">
            Work through questions at your own pace. Wrong answers come with an
            explanation, and hints are there when you need them.
          </p>

          <fieldset className="mt-4">
            <legend className="mb-2 text-sm font-semibold text-slate-700">
              Focus
            </legend>
            <div className="flex flex-wrap gap-2">
              <Chip
                active={lessonId === null}
                onClick={() => setLessonId(null)}
              >
                All lessons
              </Chip>
              {lessons.map((l) => (
                <Chip
                  key={l.id}
                  active={lessonId === l.id}
                  onClick={() => setLessonId(l.id)}
                >
                  {l.order}. {l.title}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-4">
            <legend className="mb-2 text-sm font-semibold text-slate-700">
              Difficulty
            </legend>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map((d) => (
                <Chip
                  key={d.value}
                  active={difficulty === d.value}
                  onClick={() => setDifficulty(d.value)}
                >
                  {d.label}
                </Chip>
              ))}
            </div>
          </fieldset>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className={btn.primary}
              disabled={available === 0}
              onClick={() => start("practice")}
            >
              Start practice ({available} question{available === 1 ? "" : "s"})
            </button>
            {available === 0 && (
              <p className="text-sm text-slate-600">
                No questions match this choice. Try a different difficulty.
              </p>
            )}
          </div>
        </Card>

        <Card
          className={cn(highlight === "assessment" && "ring-2 ring-indigo-400")}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Topic assessment
            </h2>
            {progress?.assessmentPassed ? (
              <Pill tone="emerald">
                Passed · best {progress.bestAssessmentScore}%
              </Pill>
            ) : progress?.bestAssessmentScore != null ? (
              <Pill tone="amber">
                Best so far {progress.bestAssessmentScore}%
              </Pill>
            ) : (
              <Pill>Not attempted</Pill>
            )}
          </div>
          <p className="mt-1 text-slate-600">
            {assessmentCount} questions covering every lesson, one attempt each
            and no hints. Score {curriculumConfig.passingScore}% or more – and
            finish all lessons – to complete the topic.
          </p>
          {incomplete.length > 0 && (
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-950">
              You haven’t finished {incomplete.length} lesson
              {incomplete.length === 1 ? "" : "s"} yet. You can still try the
              assessment, but the topic is marked complete only after every
              lesson is done.{" "}
              <Link
                to={`/topics/${topic.id}`}
                className="font-semibold underline"
              >
                See lessons
              </Link>
            </p>
          )}
          <div className="mt-4">
            <button
              type="button"
              className={btn.primary}
              onClick={() => start("assessment")}
            >
              {progress?.bestAssessmentScore != null
                ? "Retake assessment"
                : "Start assessment"}
            </button>
          </div>
        </Card>

        {topic.hasPrerequisiteCheck && (
          <Card
            className={cn(
              highlight === "prerequisite" && "ring-2 ring-indigo-400",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                Grade 7 skills check
              </h2>
              <Pill tone="slate">Optional</Pill>
            </div>
            <p className="mt-1 text-slate-600">
              Six quick questions on the Grade 7 skills this topic builds on:
              integers, exponents, order of operations and fractions.
              {prereqAttempts[0] && ` Last score: ${prereqAttempts[0].score}%.`}
            </p>
            <div className="mt-4">
              <button
                type="button"
                className={btn.secondary}
                onClick={() => start("prerequisite")}
              >
                {prereqAttempts.length
                  ? "Retake skills check"
                  : "Start skills check"}
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        active
          ? "border-indigo-600 bg-indigo-600 text-white"
          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------- Running session ------------------------------- */

const MODE_TITLE: Record<AttemptMode, string> = {
  practice: "Practice",
  assessment: "Topic assessment",
  prerequisite: "Grade 7 skills check",
};

function PracticeSession({
  topic,
  session,
  onExit,
}: {
  topic: Topic;
  session: ActiveSession;
  onExit: () => void;
}) {
  const { recordAttempt } = useProgress();
  const navigate = useNavigate();
  const { questions, mode, lessonId } = session;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AttemptAnswer>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const savingRef = useRef(false);

  const question = questions[index];
  const resolved = answers[question.id];
  const isLast = index === questions.length - 1;

  async function finish(finalAnswers: Record<string, AttemptAnswer>) {
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    setSaveError(null);
    try {
      const record = await recordAttempt({
        topicId: topic.id,
        lessonId,
        mode,
        answers: questions.map((q) => finalAnswers[q.id]).filter(Boolean),
      });
      navigate(`/results/${record.id}`, { replace: true });
    } catch (e) {
      setSaveError(
        e instanceof Error ? e.message : "Your results could not be saved.",
      );
      savingRef.current = false;
      setSaving(false);
    }
  }

  function quit() {
    if (
      Object.keys(answers).length === 0 ||
      window.confirm("Leave this session? Your answers so far won’t be saved.")
    )
      onExit();
  }

  if (saveError) {
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <ErrorState
          title="Results not saved"
          message={`${saveError} Your answers are still here – try saving again.`}
          onRetry={() => void finish(answers)}
        />
      </div>
    );
  }
  if (saving) return <LoadingState label="Saving your results…" />;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
            {MODE_TITLE[mode]}
          </p>
          <p className="text-sm text-slate-600">{topic.title}</p>
        </div>
        <button type="button" onClick={quit} className={btn.ghost}>
          <Icon name="x" className="h-4 w-4" /> Quit
        </button>
      </div>

      <ProgressBar
        value={(Object.keys(answers).length / questions.length) * 100}
        label="Session progress"
      />
      <p className="mt-1 text-sm text-slate-600">
        Question {index + 1} of {questions.length}
      </p>

      <Card className="mt-4">
        <QuestionCard
          key={question.id}
          question={question}
          mode={mode === "assessment" ? "assess" : "learn"}
          showDifficulty={mode !== "assessment"}
          onResolved={(a) =>
            setAnswers((prev) => ({ ...prev, [question.id]: a }))
          }
        />
      </Card>

      {resolved && (
        <div className="mt-5 flex justify-end">
          {isLast ? (
            <button
              type="button"
              className={btn.primary}
              onClick={() => void finish(answers)}
            >
              Finish and see results{" "}
              <Icon name="arrowRight" className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              className={btn.primary}
              onClick={() => setIndex((i) => i + 1)}
            >
              Next question <Icon name="arrowRight" className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
