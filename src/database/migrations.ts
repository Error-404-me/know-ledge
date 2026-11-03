import type Dexie from "dexie";

/**
 * Database versions. NEVER edit an existing version – add a new one and, if
 * data needs reshaping, provide an `upgrade` function.
 *
 * v1: initial schema (topicProgress, lessonProgress, practiceAttempts).
 * v2: practiceAttempts gets a `mode` index and stored per-question `answers`;
 *     topicProgress gets assessment fields. Existing rows are back-filled.
 */
export function applyMigrations(db: Dexie): void {
  db.version(1).stores({
    topicProgress: "topicId, status, lastAccessedAt",
    lessonProgress: "id, topicId, lessonId, status, lastAccessedAt",
    practiceAttempts: "id, topicId, lessonId, completedAt",
  });

  db.version(2)
    .stores({
      topicProgress: "topicId, status, lastAccessedAt",
      lessonProgress: "id, topicId, lessonId, status, lastAccessedAt",
      practiceAttempts: "id, topicId, lessonId, mode, completedAt",
    })
    .upgrade(async (tx) => {
      await tx
        .table("practiceAttempts")
        .toCollection()
        .modify((attempt: Record<string, unknown>) => {
          attempt.mode ??= "practice";
          attempt.answers ??= [];
          attempt.passed ??= null;
        });
      await tx
        .table("topicProgress")
        .toCollection()
        .modify((topic: Record<string, unknown>) => {
          topic.bestAssessmentScore ??= null;
          topic.assessmentPassed ??= false;
        });
    });
}
