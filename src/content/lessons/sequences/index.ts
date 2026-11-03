import type { Question } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "sequences";
const N = "number-patterns";
const A = "arithmetic-sequences";
const { mc, num } = bank(T);

export const lessons = [
  lesson(T, 1, {
    id: N,
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
      mc("sq-qc-1-1", N, "qc", "e", m`What is the next term of $4, 9, 14, 19, \ldots$?`,
        [["$23$", "Each term goes up by 5. $19 + 5 = 24$."], ["$25$", "The difference is 5, not 6."], "$24$", ["$38$", "The rule is adding 5, not multiplying by 2."]],
        2, ["Find the difference between consecutive terms.", "$9 - 4 = 5$.", "Add 5 to the last term."],
        "The rule is “add 5”, so the next term is $19 + 5 = 24$.", ["Difference: 5.", "$19 + 5 = 24$."]),
      num("sq-qc-1-2", N, "qc", "e", m`What is the next term of $3, 6, 12, 24, \ldots$?`, 48,
        ["Check the differences: they are not constant.", "Each term is twice the one before.", "$24 \\times 2$."],
        "The rule is “multiply by 2”, so the next term is $24 \\times 2 = 48$.", ["Ratio: 2.", "$24 \\times 2 = 48$."],
        [[30, "That is $24 + 6$. The terms are doubling, so multiply by 2."]]),
    ],
  }),
  lesson(T, 2, {
    id: A,
    title: "Arithmetic Sequences",
    summary: "Use a common difference and the nth term formula to find any term.",
    minutes: 20,
    objectives: [
      "Identify an arithmetic sequence and its common difference",
      "Use the nth term formula",
      "Find which term has a given value",
    ],
    introTitle: "Seats in a theater",
    intro: [
      p("The first row of a theater has 10 seats. Each row behind it has 2 more seats than the row before. The rows have 10, 12, 14, 16, ... seats."),
      mth(m`10, \ 12, \ 14, \ 16, \ \ldots`),
      co("definition", "Arithmetic sequence", "In an **arithmetic sequence**, the same number is added each time. That number is the **common difference**, $d$."),
    ],
    concept: [
      [
        "The nth term formula",
        [
          mth("a_n = a_1 + (n - 1)d"),
          p("Here $a_1$ is the first term, $d$ is the common difference and $n$ is the position of the term."),
          mth("5, 8, 11, 14, \\ldots \\quad a_n = 5 + (n - 1)(3) = 3n + 2"),
        ],
      ],
      [
        "Finding a term, or its position",
        [
          p("For $3, 7, 11, \\ldots$: $d = 4$, so the 20th term is $a_{20} = 3 + 19(4) = 79$. To find which term equals 47, solve $3 + (n - 1)(4) = 47$."),
          mth("4(n - 1) = 44 \\Rightarrow n - 1 = 11 \\Rightarrow n = 12"),
          co("warning", "Negative differences", "If the terms decrease, $d$ is negative. For $20, 17, 14, \\ldots$ we have $d = -3$ and $a_n = 20 + (n - 1)(-3) = 23 - 3n$."),
        ],
      ],
    ],
    examples: [
      ex(
        "ex-as1",
        "Find a term",
        m`Find the 15th term of $6, 10, 14, \ldots$`,
        [
          ["Find the common difference.", "$10 - 6 = 4$.", "d = 4"],
          ["Use the formula.", "$a_1 = 6$, $n = 15$, $d = 4$.", "a_{15} = 6 + (15 - 1)(4)"],
          ["Compute.", "$6 + 14 \\cdot 4 = 6 + 56$.", "62"],
        ],
        "$62$",
        ["$6 + 15(4) = 66$", "The formula uses $n - 1$, not $n$, because the first term needs no steps.", "Use $(n - 1)$ copies of $d$."],
      ),
      ex(
        "ex-as2",
        "Find the position of a term",
        m`Which term of $4, 10, 16, \ldots$ is $94$?`,
        [
          ["Find $d$.", "$10 - 4 = 6$.", "d = 6"],
          ["Set $a_n = 94$.", "Use the formula.", "4 + (n - 1)(6) = 94"],
          ["Solve for $n$.", "$6(n - 1) = 90$, so $n - 1 = 15$.", "n = 16"],
        ],
        "The 16th term",
      ),
    ],
    quickCheck: [
      mc("sq-qc-2-1", A, "qc", "e", m`What is the common difference of $12, 9, 6, 3, \ldots$?`,
        [["$3$", "The terms decrease, so the difference is negative."], "$-3$", ["$4$", "$12 \\div 3 = 4$ is a ratio, not the difference."], ["$-9$", "Subtract consecutive terms: $9 - 12 = -3$."]],
        1, ["Subtract each term from the next.", "$9 - 12$.", "Is it positive or negative?"],
        "$9 - 12 = -3$, and every pair gives the same result.", ["$9 - 12 = -3$.", "$6 - 9 = -3$."]),
      num("sq-qc-2-2", A, "qc", "m", m`Find the 10th term of $2, 5, 8, \ldots$`, 29,
        ["The common difference is 3.", "$a_{10} = 2 + (10 - 1)(3)$.", "$2 + 27$."],
        "$a_{10} = 2 + 9(3) = 29$.", ["$d = 3$.", "$a_{10} = 2 + 27 = 29$."],
        [[32, "Use $n - 1 = 9$ steps, not 10: $2 + 9(3)$."]]),
    ],
  }),
];

export const questions: Question[] = [
  num("sq-p-1-1", N, "p", "e", m`What is the next term of $10, 7, 4, 1, \ldots$?`, -2,
    ["Find the difference between consecutive terms.", "$7 - 10 = -3$.", "Add $-3$ to the last term."],
    "The rule is “subtract 3”, so the next term is $1 - 3 = -2$.", ["Difference: $-3$.", "$1 + (-3) = -2$."]),
  num("sq-p-1-2", N, "p", "c", m`What is the next term of $1, 3, 6, 10, 15, \ldots$?`, 21,
    ["The differences are not constant.", "The differences are 2, 3, 4, 5.", "The next difference is 6."],
    "The differences go up by 1 each time, so the next difference is 6 and the next term is $15 + 6 = 21$.", ["Differences: 2, 3, 4, 5.", "Next: 6.", "$15 + 6 = 21$."]),
  mc("sq-p-2-1", A, "p", "e", m`What is the 8th term of $4, 9, 14, \ldots$?`,
    [["$44$", "Use $n - 1 = 7$ steps: $4 + 7(5)$."], ["$34$", "The common difference is 5, so $4 + 7(5) = 39$."], "$39$", ["$32$", "The rule is adding 5, not multiplying by 4."]],
    2, ["$d = 5$.", "$a_8 = 4 + (8 - 1)(5)$.", "$4 + 35$."],
    "$a_8 = 4 + 7(5) = 39$.", ["$d = 5$.", "$a_8 = 4 + 35 = 39$."]),
  num("sq-p-2-2", A, "p", "c", m`Which term of $5, 9, 13, \ldots$ equals $97$? (Give the position $n$.)`, 24,
    ["$d = 4$.", "Solve $5 + (n - 1)(4) = 97$.", "$(n - 1)(4) = 92$."],
    "$4(n - 1) = 92$, so $n - 1 = 23$ and $n = 24$.", ["Set up the equation.", "$n - 1 = 23$.", "$n = 24$."]),
  mc("sq-a-1-1", N, "a", "m", m`Which rule describes $7, 14, 28, 56, \ldots$?`,
    [["Add 7 each time", "Adding 7 would give 7, 14, 21, 28."], "Multiply by 2 each time", ["Add 14 each time", "The differences are 7, 14, 28, which are not constant."], ["Multiply by 7 each time", "$7 \\times 7 = 49$, not 14."]],
    1, ["Check the differences.", "Check the ratios between consecutive terms.", "$14 \\div 7$ and $28 \\div 14$."],
    "Each term is twice the one before: $7 \\times 2 = 14$, $14 \\times 2 = 28$, $28 \\times 2 = 56$.", ["Differences are not constant.", "Ratio is 2."]),
  num("sq-a-1-2", N, "a", "m", m`What is the next term of $1, 2, 4, 7, 11, \ldots$?`, 16,
    ["Find the differences.", "The differences are 1, 2, 3, 4.", "The next difference is 5."],
    "The differences increase by 1, so the next difference is 5 and the next term is $11 + 5 = 16$.", ["Differences: 1, 2, 3, 4.", "Next: 5.", "$11 + 5 = 16$."]),
  num("sq-a-2-1", A, "a", "m", m`Find the 12th term of $100, 94, 88, \ldots$`, 34,
    ["$d = -6$.", "$a_{12} = 100 + (12 - 1)(-6)$.", "$100 - 66$."],
    "$a_{12} = 100 + 11(-6) = 100 - 66 = 34$.", ["$d = -6$.", "$a_{12} = 100 - 66 = 34$."]),
  mc("sq-a-2-2", A, "a", "m", m`Which formula gives the nth term of $7, 10, 13, 16, \ldots$?`,
    [["$a_n = 3n + 7$", "Check $n = 1$: this gives 10, but the first term is 7."], ["$a_n = 4n + 3$", "Check $n = 2$: this gives 11, not 10."], ["$a_n = 7n$", "This gives 7, 14, 21, so it does not match."], "$a_n = 3n + 4$"],
    3, ["Find $d$ and $a_1$.", "$d = 3$ and $a_1 = 7$.", "$a_n = 7 + (n - 1)(3)$."],
    "$a_n = 7 + 3(n - 1) = 3n + 4$. Check: $n = 1$ gives 7 and $n = 2$ gives 10.", ["$d = 3$.", "$a_n = 7 + 3n - 3 = 3n + 4$."]),
];
