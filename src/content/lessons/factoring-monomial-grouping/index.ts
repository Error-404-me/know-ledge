import type { Lesson } from "@/types/content";
import { greatestCommonFactor } from "./lesson1-greatest-common-factor";
import { factoringByGrouping } from "./lesson2-factoring-by-grouping";
export { questions } from "./factoringMonomialGrouping";

export const lessons: Lesson[] = [greatestCommonFactor, factoringByGrouping];
