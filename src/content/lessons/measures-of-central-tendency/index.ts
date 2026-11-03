import type { Question } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "measures-of-central-tendency";
const A = "mean";
const B = "median-and-mode";
const { mc, num } = bank(T);

export const lessons = [
  lesson(T, 1, {
    id: A,
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
      num("ct-qc-1-1", A, "qc", "e", "What is the mean of $5, 7, 9, 11, 13$?", 9,
        ["Add the five values.", "$5 + 7 + 9 + 11 + 13 = 45$.", "Divide by 5."],
        "The sum is 45 and there are 5 values, so the mean is $45 \\div 5 = 9$.", ["Sum: 45.", "$45 \\div 5 = 9$."],
        [[45, "That is the sum. Divide by the number of values."]]),
      num("ct-qc-1-2", A, "qc", "m", "The mean of three numbers is 10. Two of them are 8 and 9. What is the third number?", 13,
        ["Total = mean × number of values.", "$3 \\times 10 = 30$.", "Subtract $8 + 9$."],
        "The total must be $3 \\times 10 = 30$. The third number is $30 - 8 - 9 = 13$.", ["Total: 30.", "$30 - 17 = 13$."]),
    ],
  }),
  lesson(T, 2, {
    id: B,
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
    ],
    quickCheck: [
      mc("ct-qc-2-1", B, "qc", "e", "What is the median of $9, 3, 7, 1, 5$?",
        [["$7$", "That is the middle of the unordered list. Order the data first."], "$5$", ["$3$", "Order first: $1, 3, 5, 7, 9$. The middle is the 3rd value."], ["$25$", "That is the sum. The median is the middle value."]],
        1, ["Order the data from least to greatest.", "$1, 3, 5, 7, 9$.", "Pick the middle value."],
        "Ordered: $1, 3, 5, 7, 9$. The middle value is 5.", ["Order the data.", "Middle (3rd of 5): 5."]),
      num("ct-qc-2-2", B, "qc", "e", "What is the mode of $4, 6, 6, 8, 9, 6, 10$?", 6,
        ["The mode is the value that appears most often.", "Count how many times each value appears.", "6 appears several times."],
        "The value 6 appears three times, more than any other value.", ["Count: 6 appears 3 times.", "Mode = 6."]),
    ],
  }),
];

export const questions: Question[] = [
  num("ct-p-1-1", A, "p", "e", "What is the mean of $12, 15, 18$?", 15,
    ["Add the values.", "$12 + 15 + 18 = 45$.", "Divide by 3."],
    "$45 \\div 3 = 15$.", ["Sum: 45.", "Mean: 15."]),
  num("ct-p-1-2", A, "p", "c", "The mean of 6 numbers is 7. A seventh number is added and the mean becomes 8. What is the seventh number?", 14,
    ["Find the total of the first 6 numbers.", "The old total is $6 \\times 7 = 42$. The new total is $7 \\times 8 = 56$.", "Subtract."],
    "The total increased from $6 \\times 7 = 42$ to $7 \\times 8 = 56$, so the new number is $56 - 42 = 14$.", ["Old total: 42.", "New total: 56.", "$56 - 42 = 14$."]),
  num("ct-p-2-1", B, "p", "e", "What is the median of $2, 8, 4, 6$?", 5,
    ["Order the data first.", "$2, 4, 6, 8$.", "There are two middle values. Find their mean."],
    "Ordered: $2, 4, 6, 8$. The median is $\\frac{4 + 6}{2} = 5$.", ["Order.", "Average the middle two: 5."]),
  mc("ct-p-2-2", B, "p", "c", "Monthly salaries (in thousands of pesos) are $15, 16, 16, 17, 18, 95$. Which measure best describes a typical salary?",
    [["The mean, because it uses every value", "The mean is 29.5, pulled up by the single value 95."], "The median, because 95 would pull the mean up", ["The mode only, because 16 appears twice", "The mode here ignores most of the data."], ["The largest value", "The largest value is not typical."]],
    1, ["Compute the mean: $177 \\div 6 = 29.5$.", "Compute the median: $(16 + 17) \\div 2 = 16.5$.", "Which one is close to most salaries?"],
    "The mean is 29.5, higher than five of the six salaries because of the outlier 95. The median is 16.5, which better describes a typical salary.", ["Mean: 29.5.", "Median: 16.5.", "Median is more typical."]),
  num("ct-a-1-1", A, "a", "m", "What is the mean of $14, 18, 20, 22, 26$?", 20,
    ["Add the five values.", "$14 + 18 + 20 + 22 + 26 = 100$.", "Divide by 5."],
    "$100 \\div 5 = 20$.", ["Sum: 100.", "Mean: 20."]),
  num("ct-a-1-2", A, "a", "m", "The mean of 4 numbers is 15. Three of them are 10, 20 and 12. What is the fourth?", 18,
    ["Total = mean × number of values.", "$4 \\times 15 = 60$.", "Subtract $10 + 20 + 12$."],
    "The total is 60. The fourth number is $60 - 42 = 18$.", ["Total: 60.", "Known sum: 42.", "$60 - 42 = 18$."]),
  num("ct-a-2-1", B, "a", "m", "What is the median of $15, 11, 19, 13, 17, 21$?", 16,
    ["Order the data.", "$11, 13, 15, 17, 19, 21$.", "Average the two middle values."],
    "Ordered: $11, 13, 15, 17, 19, 21$. The median is $\\frac{15 + 17}{2} = 16$.", ["Order.", "Middle two: 15 and 17.", "Average: 16."]),
  mc("ct-a-2-2", B, "a", "m", "Data: $3, 5, 5, 7, 8, 8, 9$. Which statement is true?",
    [["The mode is 7.", "The mode is the most frequent value. 7 appears only once."], ["The median is 8.", "The median is the 4th of 7 ordered values, which is 7."], ["There is no mode.", "5 and 8 each appear twice, so there are modes."], "The data are bimodal, with modes 5 and 8."],
    3, ["Count how often each value appears.", "5 appears twice and 8 appears twice.", "Two values tie for the most."],
    "Both 5 and 8 appear twice, which is more than any other value, so there are two modes. The median is 7.", ["Counts: 5 → 2, 8 → 2, others → 1.", "Two modes: 5 and 8."]),
];
