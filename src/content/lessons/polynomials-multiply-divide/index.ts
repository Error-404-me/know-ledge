import type { Lesson } from "@/types/content";
import { introExponents } from "./lesson1-intro-exponents";
import { exponentLaws } from "./lesson2-exponent-laws";
import { multiplyDividePolynomials } from "./lesson3-multiply-divide-polynomials";
export { questions } from "../../questions/polynomialsMultiplyDivide";

export const lessons: Lesson[] = [introExponents, exponentLaws, multiplyDividePolynomials];
