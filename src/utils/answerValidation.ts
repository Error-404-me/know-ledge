import type { Question } from "@/types/content";

/**
 * Answer checking. Kept separate from question data and from the UI so it can
 * later move to a backend service without touching components.
 */

export interface ValidationResult {
  correct: boolean;
  /** Corrective message shown when the answer is wrong (or empty) */
  feedback: string;
  /** Set when the response could not be interpreted at all */
  invalid?: boolean;
}

/** Parses "12", "-3.5", "−4" (unicode minus), "3/4", "-1/2", "1,000". Returns null if invalid. */
export function parseNumericInput(raw: string): number | null {
  const cleaned = raw.trim().replace(/\u2212/g, "-").replace(/,/g, "").replace(/\s+/g, "");
  if (cleaned === "") return null;
  const fraction = cleaned.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (fraction) {
    const den = Number(fraction[2]);
    if (den === 0) return null;
    return Number(fraction[1]) / den;
  }
  if (!/^-?\d*\.?\d+$/.test(cleaned)) return null;
  return Number(cleaned);
}

const DEFAULT_TOLERANCE = 0.0001;

export function validateAnswer(question: Question, response: string): ValidationResult {
  if (question.type === "mcq") {
    if (!response) return { correct: false, invalid: true, feedback: "Choose one of the answers first." };
    if (response === question.correctChoiceId) return { correct: true, feedback: "" };
    const chosen = question.choices.find((c) => c.id === response);
    return {
      correct: false,
      feedback:
        chosen?.feedback ??
        "That choice isn’t correct. Re-read the question and compare the choices carefully.",
    };
  }

  const value = parseNumericInput(response);
  if (value === null) {
    return {
      correct: false,
      invalid: true,
      feedback: "Type your answer as a number, for example 12, -5, 0.75 or 3/4.",
    };
  }
  const tolerance = question.tolerance ?? DEFAULT_TOLERANCE;
  if (Math.abs(value - question.answer) <= tolerance) return { correct: true, feedback: "" };

  const known = question.commonErrors?.find((e) => Math.abs(e.value - value) <= Math.max(tolerance, 0.001));
  if (known) return { correct: false, feedback: known.feedback };

  if (question.answer !== 0 && Math.abs(value + question.answer) <= tolerance) {
    return {
      correct: false,
      feedback: "You have the right size but the wrong sign. Check each negative sign as you work.",
    };
  }
  return {
    correct: false,
    feedback:
      "That isn’t right yet. Go back over each step carefully – a hint can help you find where it went off track.",
  };
}

/** Human-readable correct answer, used on the results page. */
export function describeCorrectAnswer(question: Question): string {
  if (question.type === "mcq") {
    return question.choices.find((c) => c.id === question.correctChoiceId)?.text ?? "";
  }
  return `${formatNumber(question.answer)}${question.unit ? ` ${question.unit}` : ""}`;
}

export function describeResponse(question: Question, response: string): string {
  if (!response) return "No answer";
  if (question.type === "mcq") return question.choices.find((c) => c.id === response)?.text ?? response;
  return response;
}

export function formatNumber(n: number): string {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 10000) / 10000);
}
