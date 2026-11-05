import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "sequences";
const L = "number-patterns";
const { mc, num } = bank(T);

export const numberPatterns: Lesson = lesson(T, 2, {
  id: L,
  title: "Number Patterns",
  summary: "Spot the rule in a list of numbers and use it to find the next terms.",
  minutes: 15,
  objectives: [
    "Define a sequence and its terms",
    "Describe a pattern by adding, multiplying or using differences",
    "Find the next terms of a sequence",
  ],
  introTitle: "Stacking cans",
  intro: [
    p("A store stacks cans in a pyramid: 1 can on top, 3 in the next row, 5 in the next, 7 in the next. The numbers follow a pattern."),
    mth(m`1, \ 3, \ 5, \ 7, \ 9, \ \ldots`),
    co("definition", "Sequence", "A **sequence** is an ordered list of numbers that follows a rule. Each number is called a **term**."),
  ],
  concept: [
    [
      "Find the rule",
      [
        p("Look at how each term changes into the next one."),
        table(
          ["Sequence", "Rule", "Next term"],
          [
            [m`$5, 8, 11, 14, \ldots$`, "Add 3", "$17$"],
            [m`$2, 4, 8, 16, \ldots$`, "Multiply by 2", "$32$"],
            [m`$1, 4, 9, 16, \ldots$`, "Perfect squares", "$25$"],
          ],
        ),
      ],
    ],
    [
      "Use differences",
      [
        p("If the rule is not obvious, subtract each term from the next. If these differences are not constant, look at the differences of the differences."),
        mth(m`2, \ 5, \ 10, \ 17, \ 26 \quad \text{differences: } 3, \ 5, \ 7, \ 9`),
        p("The differences grow by 2 each time, so the next difference is 11 and the next term is $26 + 11 = 37$."),
      ],
    ],
    [
      "Choosing a method",
      [
        table(
          ["Clue", "Try"],
          [
            ["Terms change by the same amount", "Add (or subtract) that amount"],
            ["Each term is a multiple of the one before", "Multiply by the ratio"],
            ["Differences change steadily", "Use the differences of the differences"],
          ],
        ),
        co("tip", "Check two pairs", "Test your rule on at least two consecutive pairs of terms before using it."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-np1",
      "Differences that change",
      m`Find the next term of $2, 5, 10, 17, 26, \ldots$`,
      [
        ["Find the differences.", "Subtract each term from the next.", m`3, \ 5, \ 7, \ 9`],
        ["Describe the pattern of differences.", "They increase by 2 each time, so the next difference is 11.", "11"],
        ["Add the next difference.", "$26 + 11 = 37$.", "37"],
      ],
      "$37$",
    ),
    ex(
      "ex-np2",
      "A multiplying pattern",
      m`Find the next term of $81, 27, 9, 3, \ldots$`,
      [
        ["Check the differences.", "$-54, -18, -6$ are not constant.", m`-54, \ -18, \ -6`],
        ["Check the ratios.", "$27 \\div 81 = \\frac{1}{3}$ and $9 \\div 27 = \\frac{1}{3}$. Each term is one third of the one before.", m`\times \frac{1}{3}`],
        ["Apply the rule.", "$3 \\times \\frac{1}{3} = 1$.", "1"],
      ],
      "$1$",
    ),
  ],
  quickCheck: [
    mc("sq-qc-1-1", L, "qc", "e", m`What is the next term of $4, 9, 14, 19, \ldots$?`,
      [["$23$", "Each term goes up by 5. $19 + 5 = 24$."], ["$25$", "The difference is 5, not 6."], "$24$", ["$38$", "The rule is adding 5, not multiplying by 2."]],
      2, ["Find the difference between consecutive terms.", "$9 - 4 = 5$.", "Add 5 to the last term."],
      "The rule is “add 5”, so the next term is $19 + 5 = 24$.", ["Difference: 5.", "$19 + 5 = 24$."]),
    num("sq-qc-1-2", L, "qc", "e", m`What is the next term of $3, 6, 12, 24, \ldots$?`, 48,
      ["Check the differences: they are not constant.", "Each term is twice the one before.", "$24 \\times 2$."],
      "The rule is “multiply by 2”, so the next term is $24 \\times 2 = 48$.", ["Ratio: 2.", "$24 \\times 2 = 48$."],
      [[30, "That is $24 + 6$. The terms are doubling, so multiply by 2."]]),
    num("sq-qc-1-3", L, "qc", "m", m`What is the next term of $2, 6, 18, 54, \ldots$?`, 162,
      ["The differences are 4, 12, 36, which are not constant.", "Each term is 3 times the one before.", "$54 \\times 3$."],
      "The rule is “multiply by 3”, so the next term is $54 \\times 3 = 162$.", ["Ratio: 3.", "$54 \\times 3 = 162$."],
      [[108, "That is $54 \\times 2$. Check the ratio: $6 \\div 2 = 3$."]]),
  ],
});
