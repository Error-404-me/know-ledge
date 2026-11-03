import Dexie, { type Table } from "dexie";
import { applyMigrations } from "./migrations";
import type { LessonProgressRecord, PracticeAttemptRecord, TopicProgressRecord } from "./schema";

export const DB_NAME = "grade8-math-learning";

export class MathLearningDB extends Dexie {
  topicProgress!: Table<TopicProgressRecord, string>;
  lessonProgress!: Table<LessonProgressRecord, string>;
  practiceAttempts!: Table<PracticeAttemptRecord, string>;

  constructor() {
    super(DB_NAME);
    applyMigrations(this);
  }
}

/** Single shared database instance. Only the service layer should import this. */
export const db = new MathLearningDB();
