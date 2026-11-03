/**
 * Content model. All curriculum content (topics, lessons, questions) is
 * authored as typed data and lives in `src/content`. Student-specific
 * progress is stored separately in IndexedDB (see `src/database`).
 *
 * Text fields support a tiny rich-text syntax:
 *   $...$   inline KaTeX math
 *   **...** bold text
 */

export type Difficulty = "easy" | "moderate" | "challenging";

/** Where a question is used. Keeps one question bank per topic. */
export type QuestionPool = "quickcheck" | "practice" | "assessment" | "prerequisite";

export type CalloutVariant = "definition" | "tip" | "warning" | "real-life" | "remember";

export interface TermPart {
  /** KaTeX source, e.g. "-3x" */
  display: string;
  coefficient: string;
  variable: string;
  label: string;
}

export type Block =
  | { type: "p"; text: string }
  | { type: "math"; tex: string; caption?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; variant: CalloutVariant; title?: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "termBreakdown"; title?: string; terms: TermPart[] };

export interface ConceptSection {
  id: string;
  title: string;
  blocks: Block[];
}

export interface WorkedStep {
  /** What we do */
  action: string;
  /** Why we do it */
  why: string;
  /** Optional display math showing the state of the problem after this step */
  math?: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  problem: string;
  steps: WorkedStep[];
  answer: string;
  mistake?: { wrong: string; whyWrong: string; fix: string };
}

/* ---------------------------------- Questions --------------------------------- */

interface QuestionBase {
  /** Stable ID – never reuse or renumber. Progress records refer to it. */
  id: string;
  topicId: string;
  lessonId: string;
  pool: QuestionPool;
  difficulty: Difficulty;
  prompt: string;
  /** Optional display math shown under the prompt */
  math?: string;
  /** Progressive hints: 1) understand the task, 2) recall the rule, 3) next step */
  hints: string[];
  explanation: string;
  /** Step-by-step solution */
  steps: string[];
  /** Short note on the prerequisite skill to review (prerequisite pool) */
  reviewNote?: string;
}

export interface Choice {
  id: string;
  text: string;
  /** Explains the misconception behind this wrong choice */
  feedback?: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: "mcq";
  choices: Choice[];
  correctChoiceId: string;
}

export interface NumericQuestion extends QuestionBase {
  type: "numeric";
  answer: number;
  tolerance?: number;
  unit?: string;
  /** Typical wrong answers with an explanation of what likely went wrong */
  commonErrors?: { value: number; feedback: string }[];
}

export type Question = MultipleChoiceQuestion | NumericQuestion;

/* ----------------------------------- Lessons ---------------------------------- */

export interface Lesson {
  id: string;
  topicId: string;
  order: number;
  title: string;
  summary: string;
  minutes: number;
  objectives: string[];
  introduction: { title: string; blocks: Block[] };
  concept: ConceptSection[];
  examples: WorkedExample[];
  quickCheck: Question[];
}

/* ------------------------------------ Topics ---------------------------------- */

export interface Topic {
  id: string;
  order: number;
  unit: string;
  title: string;
  description: string;
  objectives: string[];
  /** Ordered lesson IDs. Empty for topics whose content is not written yet. */
  lessonIds: string[];
  /** "active" topics have content; "coming-soon" topics are visible but not yet open */
  availability: "active" | "coming-soon";
  /** Outline shown for upcoming topics */
  outline?: string[];
  hasPrerequisiteCheck?: boolean;
}

export interface CurriculumConfig {
  /** Percentage needed on the topic assessment */
  passingScore: number;
  /** When true, a topic opens only after the previous topic is completed */
  sequentialUnlock: boolean;
  /** Lessons below this accuracy (%) are flagged for review */
  weakAreaThreshold: number;
  practiceSessionLength: number;
  /** Max wrong attempts before "Show solution" becomes available (practice) */
  attemptsBeforeSolution: number;
}
