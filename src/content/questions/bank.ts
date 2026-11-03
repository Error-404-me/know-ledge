import type { Block, CalloutVariant, Lesson, Question, WorkedExample } from "@/types/content";
import { mcq, numeric } from "./builders";

/**
 * Compact helpers for authoring lessons and questions. They only build the
 * same typed objects used elsewhere – nothing here changes the content model.
 */

/** Raw template tag: lets you write LaTeX without doubling every backslash. */
export const m = String.raw;

export const p = (text: string): Block => ({ type: "p", text });
export const mth = (tex: string, caption?: string): Block => ({ type: "math", tex, caption });
export const co = (variant: CalloutVariant, title: string, text: string): Block => ({ type: "callout", variant, title, text });
export const table = (headers: string[], rows: string[][]): Block => ({ type: "table", headers, rows });

/** Worked example. Steps are [action, why, optionalMath]; mistake is [wrong, whyWrong, fix]. */
export function ex(
  id: string,
  title: string,
  problem: string,
  steps: Array<[string, string, string?]>,
  answer: string,
  mistake?: [string, string, string],
): WorkedExample {
  return {
    id,
    title,
    problem,
    steps: steps.map(([action, why, math]) => ({ action, why, math })),
    answer,
    mistake: mistake && { wrong: mistake[0], whyWrong: mistake[1], fix: mistake[2] },
  };
}

interface LessonSpec {
  id: string;
  title: string;
  summary: string;
  minutes: number;
  objectives: string[];
  introTitle: string;
  intro: Block[];
  concept: Array<[string, Block[]]>;
  examples: WorkedExample[];
  quickCheck: Question[];
}

export function lesson(topicId: string, order: number, s: LessonSpec): Lesson {
  return {
    id: s.id,
    topicId,
    order,
    title: s.title,
    summary: s.summary,
    minutes: s.minutes,
    objectives: s.objectives,
    introduction: { title: s.introTitle, blocks: s.intro },
    concept: s.concept.map(([title, blocks], i) => ({ id: `${s.id}-c${i + 1}`, title, blocks })),
    examples: s.examples,
    quickCheck: s.quickCheck,
  };
}

const POOL = { qc: "quickcheck", p: "practice", a: "assessment" } as const;
const DIFF = { e: "easy", m: "moderate", c: "challenging" } as const;
type PoolKey = keyof typeof POOL;
type DiffKey = keyof typeof DIFF;

/**
 * Question builders bound to one topic.
 *   pool: qc = quick check, p = practice, a = assessment
 *   d:    e = easy, m = moderate, c = challenging
 */
export function bank(topicId: string) {
  return {
    mc(
      id: string,
      lessonId: string,
      pool: PoolKey,
      d: DiffKey,
      prompt: string,
      choices: Array<string | [string, string]>,
      correct: number,
      hints: string[],
      explanation: string,
      steps: string[],
    ): Question {
      return mcq({ id, lessonId, topicId, pool: POOL[pool], difficulty: DIFF[d], prompt, choices, correct, hints, explanation, steps });
    },
    num(
      id: string,
      lessonId: string,
      pool: PoolKey,
      d: DiffKey,
      prompt: string,
      answer: number,
      hints: string[],
      explanation: string,
      steps: string[],
      commonErrors?: Array<[number, string]>,
      unit?: string,
    ): Question {
      return numeric({ id, lessonId, topicId, pool: POOL[pool], difficulty: DIFF[d], prompt, answer, hints, explanation, steps, commonErrors, unit });
    },
  };
}
