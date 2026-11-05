import type { Lesson } from "@/types/content";
import { introFactoring } from "./lesson1-intro-factoring";
import { greatestCommonFactor } from "./lesson2-greatest-common-factor";
import { factoringByGrouping } from "./lesson3-factoring-by-grouping";
export { questions } from "../../questions/factoringMonomialGrouping";

export const lessons: Lesson[] = [introFactoring, greatestCommonFactor, factoringByGrouping];
