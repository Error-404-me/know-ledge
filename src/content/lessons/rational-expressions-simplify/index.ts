import type { Lesson } from "@/types/content";
import { introRationalExpressions } from "./lesson1-intro-rational-expressions";
import { simplifyingRationalExpressions } from "./lesson2-simplifying-rational-expressions";
import { multiplyingDividingRational } from "./lesson3-multiplying-dividing-rational";
export { questions } from "../../questions/rationalExpressionsSimplify";

export const lessons: Lesson[] = [introRationalExpressions, simplifyingRationalExpressions, multiplyingDividingRational];
