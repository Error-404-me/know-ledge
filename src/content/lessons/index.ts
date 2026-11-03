import type { Lesson, Question } from "@/types/content";
import { introAlgebraicExpressions } from "./algebraic-expressions/lesson1-intro";
import { partsOfExpression } from "./algebraic-expressions/lesson2-parts";
import { likeUnlikeTerms } from "./algebraic-expressions/lesson3-like-terms";
import { evaluatingExpressions } from "./algebraic-expressions/lesson4-evaluating";
import { simplifyingExpressions } from "./algebraic-expressions/lesson5-simplifying";
import * as polyAddSub from "./polynomials-add-subtract";
import * as polyMulDiv from "./polynomials-multiply-divide";
import * as specialProducts from "./special-products";
import * as factoringGcf from "./factoring-monomial-grouping";
import * as factoringSpecial from "./factoring-special-forms";
import * as rationalSimplify from "./rational-expressions-simplify";
import * as rationalAddSub from "./rational-expressions-add-subtract";
import * as sequences from "./sequences";
import * as centralTendency from "./measures-of-central-tendency";

/**
 * Lesson registry. Add new lessons here and list their IDs in the topic
 * definition (`content/topics`) – the order there controls the sequence.
 */
const topicModules = [
  polyAddSub,
  polyMulDiv,
  specialProducts,
  factoringGcf,
  factoringSpecial,
  rationalSimplify,
  rationalAddSub,
  sequences,
  centralTendency,
];

export const allLessons: Lesson[] = [
  introAlgebraicExpressions,
  partsOfExpression,
  likeUnlikeTerms,
  evaluatingExpressions,
  simplifyingExpressions,
  ...topicModules.flatMap((t) => t.lessons),
];

/** Practice + assessment questions for every topic except Algebraic Expressions (which has its own bank). */
export const topicQuestions: Question[] = topicModules.flatMap((t) => t.questions);
