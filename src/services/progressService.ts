import { curriculumConfig, getTopic, topics } from "@/content";
import { db } from "@/database/db";
import {
  lessonRecordId,
  type AttemptAnswer,
  type AttemptMode,
  type LessonProgressRecord,
  type PracticeAttemptRecord,
  type TopicProgressRecord,
} from "@/database/schema";
import { computeScore, computeTopicProgress } from "@/utils/progressCalc";

/**
 * Progress service – the ONLY place that reads or writes IndexedDB.
 * Components call these functions (via the ProgressContext); they never touch Dexie.
 */

export class ProgressStorageError extends Error {
  cause?: unknown;
  constructor(message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = "ProgressStorageError";
    this.cause = options?.cause;
  }
}

function wrap(message: string, cause: unknown): ProgressStorageError {
  console.error(message, cause);
  return new ProgressStorageError(message, { cause });
}

export interface ProgressSnapshot {
  topics: Record<string, TopicProgressRecord>;
  lessons: Record<string, LessonProgressRecord>;
  /** Newest first */
  attempts: PracticeAttemptRecord[];
}

export const emptySnapshot: ProgressSnapshot = { topics: {}, lessons: {}, attempts: [] };

const progressTables = () => [db.topicProgress, db.lessonProgress, db.practiceAttempts];

/** Opens the database. Fails (with a friendly error) if IndexedDB is unavailable. */
export async function initProgressDb(): Promise<void> {
  try {
    if (!db.isOpen()) await db.open();
  } catch (e) {
    throw wrap(
      "Your browser could not open its local storage, so progress cannot be saved. This can happen in private browsing mode or when storage is blocked.",
      e,
    );
  }
}

export async function loadSnapshot(): Promise<ProgressSnapshot> {
  await initProgressDb();
  try {
    const [topicRows, lessonRows, attemptRows] = await Promise.all([
      db.topicProgress.toArray(),
      db.lessonProgress.toArray(),
      db.practiceAttempts.orderBy("completedAt").reverse().toArray(),
    ]);
    return {
      topics: Object.fromEntries(topicRows.map((t) => [t.topicId, t])),
      lessons: Object.fromEntries(lessonRows.map((l) => [l.id, l])),
      attempts: attemptRows,
    };
  } catch (e) {
    throw wrap("Your saved progress could not be loaded.", e);
  }
}

/** Recomputes and stores the topic record. Must run inside a transaction on all three tables. */
async function recomputeTopic(topicId: string, now: number): Promise<void> {
  const topic = getTopic(topicId);
  if (!topic) return;
  const [lessonRows, attemptRows, existing] = await Promise.all([
    db.lessonProgress.where("topicId").equals(topicId).toArray(),
    db.practiceAttempts.where("topicId").equals(topicId).toArray(),
    db.topicProgress.get(topicId),
  ]);
  const next = computeTopicProgress(topic, lessonRows, attemptRows, existing, curriculumConfig.passingScore, now);
  await db.topicProgress.put(next);
}

/** Saves the furthest page reached in a lesson (never lowers progress or un-completes a lesson). */
export async function saveLessonPage(params: {
  topicId: string;
  lessonId: string;
  page: number;
  totalPages: number;
}): Promise<void> {
  const { topicId, lessonId, page, totalPages } = params;
  const id = lessonRecordId(topicId, lessonId);
  const now = Date.now();
  try {
    await db.transaction("rw", progressTables(), async () => {
      const existing = await db.lessonProgress.get(id);
      if (existing?.status === "completed") {
        await db.lessonProgress.put({ ...existing, lastAccessedAt: now });
      } else {
        const furthest = Math.max(existing?.lastPage ?? 0, page);
        const pct = totalPages > 1 ? Math.min(95, Math.round((furthest / (totalPages - 1)) * 100)) : 0;
        await db.lessonProgress.put({
          id,
          topicId,
          lessonId,
          status: "in_progress",
          completionPercentage: pct,
          lastPage: furthest,
          lastAccessedAt: now,
          completedAt: null,
        });
      }
      await recomputeTopic(topicId, now);
    });
  } catch (e) {
    throw wrap("We couldn’t save your lesson progress.", e);
  }
}

export async function completeLesson(params: { topicId: string; lessonId: string; lastPage: number }): Promise<void> {
  const { topicId, lessonId, lastPage } = params;
  const id = lessonRecordId(topicId, lessonId);
  const now = Date.now();
  try {
    await db.transaction("rw", progressTables(), async () => {
      const existing = await db.lessonProgress.get(id);
      await db.lessonProgress.put({
        id,
        topicId,
        lessonId,
        status: "completed",
        completionPercentage: 100,
        lastPage: Math.max(existing?.lastPage ?? 0, lastPage),
        lastAccessedAt: now,
        completedAt: existing?.completedAt ?? now,
      });
      await recomputeTopic(topicId, now);
    });
  } catch (e) {
    throw wrap("We couldn’t save your lesson completion.", e);
  }
}

export interface AttemptInput {
  topicId: string;
  lessonId: string | null;
  mode: AttemptMode;
  answers: AttemptAnswer[];
}

/** Saves a finished practice/assessment/prerequisite session and updates topic progress atomically. */
export async function recordPracticeAttempt(input: AttemptInput): Promise<PracticeAttemptRecord> {
  const now = Date.now();
  const correctAnswers = input.answers.filter((a) => a.correct).length;
  const totalQuestions = input.answers.length;
  const score = computeScore(correctAnswers, totalQuestions);
  const record: PracticeAttemptRecord = {
    id: crypto.randomUUID(),
    topicId: input.topicId,
    lessonId: input.lessonId,
    mode: input.mode,
    score,
    totalQuestions,
    correctAnswers,
    incorrectAnswers: totalQuestions - correctAnswers,
    passed: input.mode === "assessment" ? score >= curriculumConfig.passingScore : null,
    answers: input.answers,
    completedAt: now,
  };
  try {
    await db.transaction("rw", progressTables(), async () => {
      await db.practiceAttempts.add(record);
      await recomputeTopic(input.topicId, now);
    });
    return record;
  } catch (e) {
    throw wrap("We couldn’t save your results.", e);
  }
}

export async function getAttempt(id: string): Promise<PracticeAttemptRecord | undefined> {
  await initProgressDb();
  try {
    return await db.practiceAttempts.get(id);
  } catch (e) {
    throw wrap("We couldn’t load those results.", e);
  }
}

/* ------------------------------ Backup / restore ------------------------------ */

export const BACKUP_FORMAT = "grade8-math-progress";
export const BACKUP_VERSION = 1;

export interface ProgressBackup {
  format: typeof BACKUP_FORMAT;
  version: number;
  exportedAt: string;
  lessonProgress: LessonProgressRecord[];
  practiceAttempts: PracticeAttemptRecord[];
}

/** Topic progress is derived data, so the backup stores only lessons + attempts. */
export async function exportProgress(): Promise<ProgressBackup> {
  await initProgressDb();
  try {
    const [lessonProgress, practiceAttempts] = await Promise.all([
      db.lessonProgress.toArray(),
      db.practiceAttempts.toArray(),
    ]);
    return {
      format: BACKUP_FORMAT,
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      lessonProgress,
      practiceAttempts,
    };
  } catch (e) {
    throw wrap("We couldn’t read your progress for export.", e);
  }
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;
const STATUSES = ["not_started", "in_progress", "completed"];
const MODES = ["practice", "assessment", "prerequisite"];

function validLesson(v: unknown): v is LessonProgressRecord {
  return (
    isObj(v) &&
    typeof v.topicId === "string" &&
    typeof v.lessonId === "string" &&
    typeof v.status === "string" &&
    STATUSES.includes(v.status) &&
    typeof v.completionPercentage === "number" &&
    typeof v.lastAccessedAt === "number"
  );
}

function validAttempt(v: unknown): v is PracticeAttemptRecord {
  return (
    isObj(v) &&
    typeof v.id === "string" &&
    typeof v.topicId === "string" &&
    typeof v.mode === "string" &&
    MODES.includes(v.mode) &&
    typeof v.score === "number" &&
    typeof v.totalQuestions === "number" &&
    typeof v.correctAnswers === "number" &&
    typeof v.completedAt === "number" &&
    Array.isArray(v.answers)
  );
}

/** Validates and restores a backup, replacing current progress. Throws a ProgressStorageError on bad files. */
export async function importProgress(raw: unknown): Promise<{ lessons: number; attempts: number }> {
  if (!isObj(raw) || raw.format !== BACKUP_FORMAT) {
    throw new ProgressStorageError("This file isn’t a progress backup from this app.");
  }
  if (typeof raw.version !== "number" || raw.version > BACKUP_VERSION) {
    throw new ProgressStorageError("This backup was made by a newer version of the app and can’t be read.");
  }
  if (!Array.isArray(raw.lessonProgress) || !Array.isArray(raw.practiceAttempts)) {
    throw new ProgressStorageError("The backup file is missing data.");
  }
  if (!raw.lessonProgress.every(validLesson) || !raw.practiceAttempts.every(validAttempt)) {
    throw new ProgressStorageError("The backup file contains records that look damaged.");
  }
  const lessons = (raw.lessonProgress as LessonProgressRecord[]).map((l) => ({
    ...l,
    id: lessonRecordId(l.topicId, l.lessonId),
    lastPage: typeof l.lastPage === "number" ? l.lastPage : 0,
    completedAt: typeof l.completedAt === "number" ? l.completedAt : null,
  }));
  const attempts = raw.practiceAttempts as PracticeAttemptRecord[];

  await initProgressDb();
  const now = Date.now();
  try {
    await db.transaction("rw", progressTables(), async () => {
      await Promise.all(progressTables().map((t) => t.clear()));
      await db.lessonProgress.bulkPut(lessons);
      await db.practiceAttempts.bulkPut(attempts);
      for (const topic of topics) await recomputeTopic(topic.id, now);
    });
  } catch (e) {
    throw wrap("We couldn’t restore your progress. Your existing progress was not changed.", e);
  }
  return { lessons: lessons.length, attempts: attempts.length };
}

export async function resetAllProgress(): Promise<void> {
  await initProgressDb();
  try {
    await db.transaction("rw", progressTables(), async () => {
      await Promise.all(progressTables().map((t) => t.clear()));
    });
  } catch (e) {
    throw wrap("We couldn’t reset your progress.", e);
  }
}
