import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p } from "../../questions/bank";

const T = "sequences";
const L = "arithmetic-sequences";
const { mc, num } = bank(T);

export const arithmeticSequences: Lesson = lesson(T, 3, {
  id: L,
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
    [
      "Using two known terms",
      [
        p("If you know two terms, find $d$ first. Divide the change in value by the number of steps between them."),
        mth(m`a_3 = 11, \ a_7 = 23: \quad d = \frac{23 - 11}{7 - 3} = 3`),
        mth("a_1 = a_3 - 2d = 11 - 2(3) = 5"),
        co("tip", "Count steps", "Between the 3rd and the 7th term there are $7 - 3 = 4$ steps."),
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
    mc("sq-qc-2-1", L, "qc", "e", m`What is the common difference of $12, 9, 6, 3, \ldots$?`,
      [["$3$", "The terms decrease, so the difference is negative."], "$-3$", ["$4$", "$12 \\div 3 = 4$ is a ratio, not the difference."], ["$-9$", "Subtract consecutive terms: $9 - 12 = -3$."]],
      1, ["Subtract each term from the next.", "$9 - 12$.", "Is it positive or negative?"],
      "$9 - 12 = -3$, and every pair gives the same result.", ["$9 - 12 = -3$.", "$6 - 9 = -3$."]),
    num("sq-qc-2-2", L, "qc", "m", m`Find the 10th term of $2, 5, 8, \ldots$`, 29,
      ["The common difference is 3.", "$a_{10} = 2 + (10 - 1)(3)$.", "$2 + 27$."],
      "$a_{10} = 2 + 9(3) = 29$.", ["$d = 3$.", "$a_{10} = 2 + 27 = 29$."],
      [[32, "Use $n - 1 = 9$ steps, not 10: $2 + 9(3)$."]]),
    num("sq-qc-2-3", L, "qc", "m", "In an arithmetic sequence, $a_2 = 9$ and $a_5 = 18$. What is the common difference $d$?", 3,
      ["There are $5 - 2 = 3$ steps between the terms.", "The values change by $18 - 9 = 9$.", "Divide 9 by 3."],
      "$d = \\frac{18 - 9}{5 - 2} = 3$.", ["Change in value: 9.", "Number of steps: 3.", "$d = 3$."],
      [[9, "The 9 is the total change. Divide by the 3 steps between the terms."]]),
  ],
});
