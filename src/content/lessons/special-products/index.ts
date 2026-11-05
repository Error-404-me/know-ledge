import type { Lesson } from "@/types/content";
import { introSpecialProducts } from "./lesson1-intro-special-products";
import { squareOfBinomial } from "./lesson2-square-of-binomial";
import { sumAndDifference } from "./lesson3-sum-and-difference";
export { questions } from "../../questions/specialProducts";

export const lessons: Lesson[] = [introSpecialProducts, squareOfBinomial, sumAndDifference];
