import type { Lesson } from "@/types/content";
import { introCentralTendency } from "./lesson1-intro-central-tendency";
import { mean } from "./lesson2-mean";
import { medianAndMode } from "./lesson3-median-and-mode";
export { questions } from "../../questions/measuresOfCentralTendency";

export const lessons: Lesson[] = [introCentralTendency, mean, medianAndMode];
