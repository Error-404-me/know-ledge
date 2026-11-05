import type { Lesson } from "@/types/content";
import { introSpecialForms } from "./lesson1-intro-special-forms";
import { differenceOfTwoSquares } from "./lesson2-difference-of-two-squares";
import { perfectSquareTrinomials } from "./lesson3-perfect-square-trinomials";
import { quadraticTrinomials } from "./lesson4-quadratic-trinomials";
export { questions } from "../../questions/factoringSpecialForms";

export const lessons: Lesson[] = [introSpecialForms, differenceOfTwoSquares, perfectSquareTrinomials, quadraticTrinomials];
