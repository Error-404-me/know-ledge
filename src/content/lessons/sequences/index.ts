import type { Lesson } from "@/types/content";
import { introSequences } from "./lesson1-intro-sequences";
import { numberPatterns } from "./lesson2-number-patterns";
import { arithmeticSequences } from "./lesson3-arithmetic-sequences";
export { questions } from "../../questions/sequences";

export const lessons: Lesson[] = [introSequences, numberPatterns, arithmeticSequences];
