import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, p, table } from "../../questions/bank";

const T = "measures-of-central-tendency";
const L = "median-and-mode";
const { mc, num } = bank(T);

export const medianAndMode: Lesson = lesson(T, 3, {
  id: L,
  title: "The Median and the Mode",
  summary: "Find the middle value and the most frequent value, and choose the best measure for a data set.",
  minutes: 18,
  objectives: [
    "Find the median of an ordered data set",
    "Find the mode (or modes) of a data set",
    "Choose between the mean, median and mode",
  ],
  introTitle: "The middle and the most common",
  intro: [
    p("Five friends are standing in a line from shortest to tallest. The one in the **middle** is the median. The height that **most** of them share, if any, is the mode."),
    co("definition", "Median and mode", "The **median** is the middle value of ordered data. The **mode** is the value that appears most often."),
  ],
  concept: [
    [
      "Finding the median",
      [
        p("**Order the data first.** With an odd number of values, the median is the middle one. With an even number, it is the mean of the two middle values."),
        table(
          ["Data", "Ordered", "Median"],
          [
            ["$9, 3, 7$", "$3, 7, 9$", "$7$"],
            ["$4, 12, 6, 8$", "$4, 6, 8, 12$", "$\\frac{6 + 8}{2} = 7$"],
          ],
        ),
      ],
    ],
    [
      "The mode, and which measure to use",
      [
        p("In $2, 3, 3, 5, 7, 3, 9$ the mode is 3, because it appears three times. A data set can have two modes, or none."),
        p("Compare $20, 22, 24, 26, 100$. The mean is $192 \\div 5 = 38.4$, which is larger than four of the five values. The median is 24, which describes the typical value better."),
        co("tip", "Choosing", "Use the **median** when a few extreme values would distort the mean. Use the **mode** for the most common category. Use the **mean** when the data are fairly balanced."),
      ],
    ],
    [
      "Comparing the three measures",
      [
        table(
          ["Measure", "Affected by extreme values?", "Best used for"],
          [
            ["Mean", "Yes", "Balanced data"],
            ["Median", "No", "Data with outliers"],
            ["Mode", "No", "The most common category"],
          ],
        ),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-med",
      "Median and mode together",
      "Find the median and the mode of $12, 7, 9, 15, 7, 10$.",
      [
        ["Order the data.", "The median needs ordered values.", m`7, \ 7, \ 9, \ 10, \ 12, \ 15`],
        ["Find the median.", "There are 6 values, so average the two middle ones, 9 and 10.", m`\frac{9 + 10}{2} = 9.5`],
        ["Find the mode.", "The value 7 appears twice. Every other value appears once.", "7"],
      ],
      "Median $= 9.5$; mode $= 7$",
      ["Median $= 9$ (the 3rd value of the unordered list)", "The data were not ordered, and with 6 values there are two middle values.", "Order first, then average the two middle values."],
    ),
    ex(
      "ex-choose-measure",
      "Choose a measure",
      "Which measure best describes the typical value of $20, 22, 24, 26, 100$?",
      [
        ["Compute the mean.", "$20 + 22 + 24 + 26 + 100 = 192$ and $192 \\div 5 = 38.4$.", "38.4"],
        ["Compute the median.", "The middle value of the ordered data is 24.", "24"],
        ["Compare with the data.", "The mean is higher than four of the five values because of the outlier 100. The median is close to most of the data."],
      ],
      "The median, 24",
      ["The mean, 38.4", "The outlier 100 pulls the mean above four of the five values.", "Use the median when a few extreme values distort the mean."],
    ),
  ],
  quickCheck: [
    mc("ct-qc-2-1", L, "qc", "e", "What is the median of $9, 3, 7, 1, 5$?",
      [["$7$", "That is the middle of the unordered list. Order the data first."], "$5$", ["$3$", "Order first: $1, 3, 5, 7, 9$. The middle is the 3rd value."], ["$25$", "That is the sum. The median is the middle value."]],
      1, ["Order the data from least to greatest.", "$1, 3, 5, 7, 9$.", "Pick the middle value."],
      "Ordered: $1, 3, 5, 7, 9$. The middle value is 5.", ["Order the data.", "Middle (3rd of 5): 5."]),
    num("ct-qc-2-2", L, "qc", "e", "What is the mode of $4, 6, 6, 8, 9, 6, 10$?", 6,
      ["The mode is the value that appears most often.", "Count how many times each value appears.", "6 appears several times."],
      "The value 6 appears three times, more than any other value.", ["Count: 6 appears 3 times.", "Mode = 6."]),
    num("ct-qc-2-3", L, "qc", "m", "What is the median of $12, 7, 9, 15, 7, 10, 11$?", 10,
      ["Order the data first.", "$7, 7, 9, 10, 11, 12, 15$.", "There are 7 values, so take the 4th."],
      "Ordered: $7, 7, 9, 10, 11, 12, 15$. The 4th value is 10.", ["Order the data.", "Middle (4th of 7): 10."],
      [[9, "That is the middle of the unordered list. Order the data first."]]),
  ],
});
