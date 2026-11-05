import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p } from "../../questions/bank";

const T = "sequences";
const L = "intro-sequences";
const { mc, num } = bank(T);

export const introSequences: Lesson = lesson(T, 1, {
  id: L,
  title: "Introduction to Sequences",
  summary: "Learn what a sequence is, how to name its terms, and how a rule can produce them.",
  minutes: 15,
  objectives: [
    "Explain what a sequence and a term are",
    "Use the notation a_n for the nth term",
    "Tell finite from infinite sequences",
  ],
  introTitle: "Saving a little more each day",
  intro: [
    p("Each day you save ₱5 more than the day before: ₱5, ₱10, ₱15, ₱20, and so on. The amounts follow a rule. A list of numbers that follows a rule is a **sequence**."),
    mth(m`5, \ 10, \ 15, \ 20, \ \ldots`),
    co("real-life", "Patterns everywhere", "Sequences describe savings, stacked objects, seat numbers in a hall, and many other patterns."),
  ],
  concept: [
    [
      "Sequences and terms",
      [
        co("definition", "Sequence and term", "A **sequence** is an ordered list of numbers. Each number in the list is called a **term**."),
        p("The order matters: $2, 4, 6$ and $6, 4, 2$ are different sequences."),
      ],
    ],
    [
      "Term notation",
      [
        p("We write $a_1$ for the first term, $a_2$ for the second, and $a_n$ for the **nth term**."),
        mth(m`4, \ 8, \ 12, \ 16: \quad a_1 = 4, \ a_2 = 8, \ a_3 = 12, \ a_4 = 16`),
      ],
    ],
    [
      "Rules, finite and infinite",
      [
        p("A rule can give any term from its position. For $a_n = 2n + 1$, we get $a_1 = 3$, $a_2 = 5$ and $a_3 = 7$."),
        p("A sequence that ends is **finite**. One that goes on forever, shown with dots, is **infinite**."),
        co("tip", "Dots mean it continues", "The dots in $1, 2, 3, \\ldots$ tell you the pattern goes on without end."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-terms",
      "Name the terms",
      "In the sequence $5, 9, 13, 17$, find $a_1$ and $a_4$.",
      [
        ["Match the terms to their positions.", "$a_1$ is the first term and $a_4$ is the fourth.", m`a_1 = 5, \ a_2 = 9, \ a_3 = 13, \ a_4 = 17`],
        ["Read off the ones you need.", "The first term is 5 and the fourth term is 17."],
      ],
      "$a_1 = 5$ and $a_4 = 17$",
    ),
    ex(
      "ex-rule",
      "Use a rule",
      "Find the first four terms of the sequence with rule $a_n = 3n - 1$.",
      [
        ["Substitute $n = 1, 2, 3, 4$.", "Each value of $n$ gives one term.", m`3(1) - 1, \ 3(2) - 1, \ 3(3) - 1, \ 3(4) - 1`],
        ["Simplify.", "$3 - 1 = 2$, $6 - 1 = 5$, $9 - 1 = 8$, $12 - 1 = 11$.", m`2, \ 5, \ 8, \ 11`],
      ],
      "$2, 5, 8, 11$",
    ),
  ],
  quickCheck: [
    num("sq-qc-0-1", L, "qc", "e", "In the sequence $4, 8, 12, 16$, what is $a_3$?", 12,
      ["$a_3$ is the third term.", "Count: 4 is first, 8 is second, ...", "The third is 12."],
      "The third term is 12.", ["Count to the third term.", "$a_3 = 12$."]),
    mc("sq-qc-0-2", L, "qc", "e", "What kind of sequence is $1, 2, 3, \\ldots$?",
      ["Infinite, because the dots show it continues", ["Finite, because it starts at 1", "Starting at 1 does not make a sequence finite."], ["Finite, because three terms are shown", "The dots mean the list continues."], ["It is not a sequence", "It is an ordered list that follows a rule, so it is a sequence."]],
      0, ["Look at the dots at the end.", "They mean the pattern continues.", "A sequence that never ends is infinite."],
      "The dots show the sequence continues forever, so it is infinite.", ["Dots mean the list continues.", "So it is infinite."]),
    num("sq-qc-0-3", L, "qc", "m", "A sequence has rule $a_n = 3n - 1$. What is $a_5$?", 14,
      ["Substitute $n = 5$.", "$3(5) - 1$.", "$15 - 1$."],
      "$a_5 = 3(5) - 1 = 14$.", ["Substitute: $3(5) - 1$.", "$15 - 1 = 14$."],
      [[15, "Do not forget to subtract 1."]]),
  ],
});
