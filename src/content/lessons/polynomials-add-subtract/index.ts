import type { Lesson } from "@/types/content";
import { introPolynomials } from "./lesson1-intro-polynomials";
import { addingPolynomials } from "./lesson2-adding-polynomials";
import { subtractingPolynomials } from "./lesson3-subtracting-polynomials";
export { questions } from "../../questions/polynomialsAddSubtract";

export const lessons: Lesson[] = [introPolynomials, addingPolynomials, subtractingPolynomials];
