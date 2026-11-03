import { curriculumConfig, getQuestions } from "@/content";
import type { Difficulty, Question } from "@/types/content";
import type { AttemptMode } from "@/database/schema";

const ORDER: Record<Difficulty, number> = { easy: 0, moderate: 1, challenging: 2 };

export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface SessionOptions {
  topicId: string;
  mode: AttemptMode;
  lessonId?: string | null;
  difficulty?: Difficulty | "mixed";
}

/** Chooses the questions for a session. Practice is ordered easy → challenging. */
export function buildSession({ topicId, mode, lessonId, difficulty = "mixed" }: SessionOptions): Question[] {
  if (mode === "assessment") return shuffle(getQuestions(topicId, "assessment"));
  if (mode === "prerequisite") return getQuestions(topicId, "prerequisite");

  let pool = getQuestions(topicId, "practice");
  if (lessonId) pool = pool.filter((q) => q.lessonId === lessonId);
  if (difficulty !== "mixed") pool = pool.filter((q) => q.difficulty === difficulty);
  const chosen = shuffle(pool).slice(0, curriculumConfig.practiceSessionLength);
  return chosen.sort((a, b) => ORDER[a.difficulty] - ORDER[b.difficulty]);
}

export function countAvailable(topicId: string, lessonId: string | null, difficulty: Difficulty | "mixed"): number {
  let pool = getQuestions(topicId, "practice");
  if (lessonId) pool = pool.filter((q) => q.lessonId === lessonId);
  if (difficulty !== "mixed") pool = pool.filter((q) => q.difficulty === difficulty);
  return Math.min(pool.length, curriculumConfig.practiceSessionLength);
}
