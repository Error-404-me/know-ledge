/**
 * Record types stored in IndexedDB. Only *student progress* is stored here –
 * curriculum content lives in `src/content`.
 *
 * Timestamps are epoch milliseconds (numbers) so they can be indexed and sorted.
 * IDs are stable strings so records can be merged/synced in the future.
 */

export type ProgressStatus = "not_started" | "in_progress" | "completed";
export type AttemptMode = "practice" | "assessment" | "prerequisite";

export interface TopicProgressRecord {
  /** Primary key */
  topicId: string;
  status: ProgressStatus;
  /** 0–100, derived from lesson completion + assessment pass */
  completionPercentage: number;
  /** Best percentage across practice + assessment attempts */
  bestScore: number | null;
  bestAssessmentScore: number | null;
  assessmentPassed: boolean;
  /** Practice + assessment attempts (prerequisite checks excluded) */
  totalAttempts: number;
  lastAccessedAt: number;
  completedAt: number | null;
}

export interface LessonProgressRecord {
  /** Primary key: `${topicId}:${lessonId}` – prevents duplicates */
  id: string;
  topicId: string;
  lessonId: string;
  status: ProgressStatus;
  completionPercentage: number;
  /** Furthest page reached, used to resume the lesson */
  lastPage: number;
  lastAccessedAt: number;
  completedAt: number | null;
}

export interface AttemptAnswer {
  questionId: string;
  lessonId: string;
  correct: boolean;
  /** Number of submissions made for this question */
  attempts: number;
  hintsUsed: number;
  viewedSolution: boolean;
  /** Final response (choice ID or typed number) */
  response: string;
}

export interface PracticeAttemptRecord {
  /** Primary key (UUID) */
  id: string;
  topicId: string;
  /** Lesson focus, or null for mixed sessions */
  lessonId: string | null;
  mode: AttemptMode;
  /** Percentage 0–100 */
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  /** For assessments: whether the passing score was met. Otherwise null. */
  passed: boolean | null;
  answers: AttemptAnswer[];
  completedAt: number;
}

export const lessonRecordId = (topicId: string, lessonId: string) => `${topicId}:${lessonId}`;
