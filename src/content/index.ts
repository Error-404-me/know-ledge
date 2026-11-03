import type { Lesson, Question, QuestionPool, Topic } from "@/types/content";
import { allLessons, topicQuestions } from "./lessons";
import { algebraicExpressionQuestions } from "./questions/algebraicExpressions";
import { curriculumConfig, topics as topicList } from "./topics";

export { curriculumConfig };

/** Topics in curriculum order. */
export const topics: Topic[] = [...topicList].sort((a, b) => a.order - b.order);

/** Practice, assessment and prerequisite questions for all topics. */
const questionBank: Question[] = [...algebraicExpressionQuestions, ...topicQuestions];

const lessonById = new Map<string, Lesson>(allLessons.map((l) => [l.id, l]));

const questionById = new Map<string, Question>();
for (const q of questionBank) questionById.set(q.id, q);
for (const lesson of allLessons) for (const q of lesson.quickCheck) questionById.set(q.id, q);

export function getTopic(topicId: string): Topic | undefined {
  return topics.find((t) => t.id === topicId);
}

export function getLesson(lessonId: string): Lesson | undefined {
  return lessonById.get(lessonId);
}

/** Lessons of a topic in the order configured on the topic. */
export function getLessonsForTopic(topicId: string): Lesson[] {
  const topic = getTopic(topicId);
  if (!topic) return [];
  return topic.lessonIds.map((id) => lessonById.get(id)).filter((l): l is Lesson => Boolean(l));
}

export function getQuestion(questionId: string): Question | undefined {
  return questionById.get(questionId);
}

export function getQuestions(topicId: string, pool: QuestionPool): Question[] {
  if (pool === "quickcheck") {
    return getLessonsForTopic(topicId).flatMap((l) => l.quickCheck);
  }
  return questionBank.filter((q) => q.topicId === topicId && q.pool === pool);
}

export function getLessonTitle(lessonId: string): string {
  if (lessonId === "prerequisite") return "Grade 7 skills";
  return lessonById.get(lessonId)?.title ?? lessonId;
}

export function isTopicOpenable(topic: Topic): boolean {
  return topic.availability === "active" && topic.lessonIds.length > 0;
}
