import type {
  Difficulty,
  MultipleChoiceQuestion,
  NumericQuestion,
  QuestionPool,
} from "@/types/content";

export const ALGEBRA_TOPIC_ID = "algebraic-expressions";

interface Common {
  id: string;
  lessonId: string;
  pool: QuestionPool;
  difficulty: Difficulty;
  prompt: string;
  math?: string;
  hints: string[];
  explanation: string;
  steps: string[];
  reviewNote?: string;
  topicId?: string;
}

const CHOICE_IDS = ["a", "b", "c", "d", "e"];

/** Choices are `text` or `[text, feedbackIfChosen]`. `correct` is the index of the right choice. */
export function mcq(
  spec: Common & { choices: Array<string | [string, string]>; correct: number },
): MultipleChoiceQuestion {
  const { choices, correct, topicId, ...rest } = spec;
  return {
    ...rest,
    type: "mcq",
    topicId: topicId ?? ALGEBRA_TOPIC_ID,
    choices: choices.map((c, i) => ({
      id: CHOICE_IDS[i],
      text: Array.isArray(c) ? c[0] : c,
      feedback: Array.isArray(c) ? c[1] : undefined,
    })),
    correctChoiceId: CHOICE_IDS[correct],
  };
}

export function numeric(
  spec: Common & {
    answer: number;
    unit?: string;
    tolerance?: number;
    commonErrors?: Array<[number, string]>;
  },
): NumericQuestion {
  const { commonErrors, topicId, ...rest } = spec;
  return {
    ...rest,
    type: "numeric",
    topicId: topicId ?? ALGEBRA_TOPIC_ID,
    commonErrors: commonErrors?.map(([value, feedback]) => ({ value, feedback })),
  };
}
