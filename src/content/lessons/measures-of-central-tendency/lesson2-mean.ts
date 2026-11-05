import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "measures-of-central-tendency";
const L = "mean";
const { num } = bank(T);

export const mean: Lesson = lesson(T, 2, {
  id: L,
  title: "The Mean",
  summary: "Find the average of a data set and use it to find a missing value.",
  minutes: 15,
  objectives: [
    "Compute the mean of a data set",
    "Find a missing value when the mean is known",
    "Explain how a very large or small value affects the mean",
  ],
  introTitle: "One number to describe a class",
  intro: [
    p("A teacher has the quiz scores of 5 students and wants **one** number that describes how the class did. A common choice is the **mean**, or average."),
    mth(m`\text{mean} = \frac{\text{sum of all the values}}{\text{number of values}}`),
    co("real-life", "Sharing equally", "The mean is the value each person would have if the total were shared equally among everyone."),
  ],
  concept: [
    [
      "Computing the mean",
      [
        p("Add all the values, then divide by how many values there are."),
        mth(m`\text{Data: } 6, 8, 9, 10, 12 \quad \text{mean} = \frac{6 + 8 + 9 + 10 + 12}{5} = \frac{45}{5} = 9`),
      ],
    ],
    [
      "Working backwards",
      [
        p("If you know the mean, then **total = mean × number of values**. This helps you find a missing value."),
        table(
          ["Situation", "Total needed", "Missing value"],
          [
            ["Mean of 4 numbers is 12; three are 10, 14, 11", "$4 \\times 12 = 48$", "$48 - 35 = 13$"],
          ],
        ),
        co("warning", "Outliers", "One extremely large or small value can pull the mean away from where most of the data are."),
      ],
    ],
    [
      "Mean from a frequency table",
      [
        p("When values repeat, multiply each value by its frequency, add the products, and divide by the total number of values."),
        table(
          ["Score", "Frequency"],
          [
            ["$80$", "2"],
            ["$90$", "3"],
          ],
        ),
        mth(m`\text{mean} = \frac{80(2) + 90(3)}{2 + 3} = \frac{430}{5} = 86`),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-mean1",
      "Mean of quiz scores",
      "Find the mean of the scores $72, 85, 90, 78, 85$.",
      [
        ["Add the scores.", "$72 + 85 + 90 + 78 + 85 = 410$.", "410"],
        ["Divide by the number of scores.", "There are 5 scores.", m`\frac{410}{5} = 82`],
      ],
      "$82$",
      ["$410 \\div 4 = 102.5$", "There are 5 scores, so divide by 5.", "Count the values before dividing."],
    ),
    ex(
      "ex-mean2",
      "A missing score",
      "Ben's first four test scores are $76, 82, 78, 84$. What must he score on the fifth test to have a mean of 82?",
      [
        ["Find the total needed.", "Mean × number of tests: $82 \\times 5 = 410$.", "410"],
        ["Add the scores so far.", "$76 + 82 + 78 + 84 = 320$.", "320"],
        ["Subtract.", "The fifth score makes up the difference.", "410 - 320 = 90"],
      ],
      "$90$",
    ),
  ],
  quickCheck: [
    num("ct-qc-1-1", L, "qc", "e", "What is the mean of $5, 7, 9, 11, 13$?", 9,
      ["Add the five values.", "$5 + 7 + 9 + 11 + 13 = 45$.", "Divide by 5."],
      "The sum is 45 and there are 5 values, so the mean is $45 \\div 5 = 9$.", ["Sum: 45.", "$45 \\div 5 = 9$."],
      [[45, "That is the sum. Divide by the number of values."]]),
    num("ct-qc-1-2", L, "qc", "m", "The mean of three numbers is 10. Two of them are 8 and 9. What is the third number?", 13,
      ["Total = mean × number of values.", "$3 \\times 10 = 30$.", "Subtract $8 + 9$."],
      "The total must be $3 \\times 10 = 30$. The third number is $30 - 8 - 9 = 13$.", ["Total: 30.", "$30 - 17 = 13$."]),
    num("ct-qc-1-3", L, "qc", "m", "A score of 70 appears 4 times and a score of 80 appears once. What is the mean score?", 72,
      ["Total = $70(4) + 80(1)$.", "$280 + 80 = 360$.", "There are 5 values in all."],
      "The total is $4(70) + 80 = 360$ over 5 values, so the mean is 72.", ["Total: 360.", "$360 \\div 5 = 72$."],
      [[75, "That averages 70 and 80 as if they appeared equally often. 70 appears 4 times."]]),
  ],
});
