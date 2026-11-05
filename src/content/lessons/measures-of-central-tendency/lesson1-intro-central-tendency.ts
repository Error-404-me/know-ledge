import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "measures-of-central-tendency";
const L = "intro-central-tendency";
const { mc, num } = bank(T);

export const introCentralTendency: Lesson = lesson(T, 1, {
  id: L,
  title: "Introduction to Measures of Central Tendency",
  summary: "Learn about data, frequency and range, and meet the three measures that describe a typical value.",
  minutes: 15,
  objectives: [
    "Explain what data and frequency are",
    "Find the range of a data set",
    "Name the three measures of central tendency",
  ],
  introTitle: "One number for the whole class",
  intro: [
    p("Five students scored 7, 8, 8, 9 and 10 on a quiz. How can you describe how the class did with just **one** number?"),
    mth(m`7, \ 8, \ 8, \ 9, \ 10`),
    co("real-life", "A typical value", "A **measure of central tendency** is a single value that represents the center, or the typical value, of a data set."),
  ],
  concept: [
    [
      "Data and frequency",
      [
        co("definition", "Data", "**Data** are collected numbers or facts. The **frequency** of a value is the number of times it appears."),
        table(
          ["Value", "Frequency"],
          [
            ["$7$", "1"],
            ["$8$", "2"],
            ["$9$", "1"],
            ["$10$", "1"],
          ],
        ),
      ],
    ],
    [
      "Range",
      [
        p("The **range** tells how spread out the data are: the largest value minus the smallest."),
        mth(m`\text{range} = 10 - 7 = 3`),
      ],
    ],
    [
      "Three measures",
      [
        table(
          ["Measure", "Idea"],
          [
            ["Mean", "Share the total equally"],
            ["Median", "The middle value"],
            ["Mode", "The most frequent value"],
          ],
        ),
        co("remember", "Coming up", "In the next lessons you will compute each of these and decide which one best describes a data set."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-frequency",
      "Count a frequency",
      "How many times does 5 appear in $5, 3, 5, 7, 5, 5, 2$? How many values are there in all?",
      [
        ["Count the 5s.", "Go through the list one value at a time.", m`5, \ 3, \ 5, \ 7, \ 5, \ 5, \ 2`],
        ["Count all the values.", "Count every entry, not just the distinct ones."],
      ],
      "5 appears 4 times, among 7 values in all.",
    ),
    ex(
      "ex-range",
      "Find the range",
      "Find the range of $12, 5, 9, 20, 3$.",
      [
        ["Find the largest and the smallest values.", "The largest is 20 and the smallest is 3.", "20 \\ \\text{and} \\ 3"],
        ["Subtract.", "Range = largest − smallest.", "20 - 3 = 17"],
      ],
      "$17$",
      ["$20 + 3 = 23$", "The range is the difference between the largest and smallest values, not the sum.", "Subtract the smallest from the largest."],
    ),
  ],
  quickCheck: [
    num("ct-qc-0-1", L, "qc", "e", "How many values are in the data set $4, 7, 7, 9, 12, 12, 12$?", 7,
      ["Count every entry in the list, including repeats.", "4, 7, 7, 9, 12, 12, 12.", "Count them one by one."],
      "There are 7 values in all.", ["Count all entries.", "7."],
      [[4, "That counts only the distinct values. Repeats count too."]]),
    num("ct-qc-0-2", L, "qc", "e", "What is the range of $8, 15, 3, 11$?", 12,
      ["The range is the largest value minus the smallest.", "Largest: 15. Smallest: 3.", "$15 - 3$."],
      "$15 - 3 = 12$.", ["Largest 15, smallest 3.", "$15 - 3 = 12$."]),
    mc("ct-qc-0-3", L, "qc", "e", "Which of these is **not** a measure of central tendency?",
      [["Mean", "The mean is a measure of central tendency."], ["Median", "The median is a measure of central tendency."], ["Mode", "The mode is a measure of central tendency."], "Range"],
      3, ["The three measures of central tendency find a typical value.", "They are mean, median and mode.", "Which one tells about spread instead?"],
      "The range measures how spread out the data are, not the center.", ["Mean, median and mode describe the center.", "The range describes spread."]),
  ],
});
