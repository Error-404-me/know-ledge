import type { Lesson } from "@/types/content";
import { introAddingRationalExpressions } from "./lesson1-intro-adding-rational-expressions";
import { likeDenominators } from "./lesson2-like-denominators";
import { unlikeDenominators } from "./lesson3-unlike-denominators";
export { questions } from "../../questions/rationalExpressionsAddSubtract";

export const lessons: Lesson[] = [introAddingRationalExpressions, likeDenominators, unlikeDenominators];
