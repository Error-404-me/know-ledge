import type { Question } from "@/types/content";
import { bank, m } from "./bank";

const T = "sequences";
const N = "number-patterns";
const A = "arithmetic-sequences";
const { mc, num } = bank(T);

/** Practice and assessment questions. Quick-check questions live inside each lesson file. */
export const questions: Question[] = [
  num("sq-p-0-1", "intro-sequences", "p", "e", "In the sequence $10, 20, 30, 40, 50$, what is $a_4$?", 40,
    ["$a_4$ is the fourth term.", "Count: 10 is first, 20 is second, ...", "The fourth term is 40."],
    "The fourth term is 40.", ["Count to the fourth term.", "$a_4 = 40$."]),
  num("sq-p-0-2", "intro-sequences", "p", "m", "A sequence has rule $a_n = n^2 + 1$. What is $a_6$?", 37,
    ["Substitute $n = 6$.", "$6^2 + 1$.", "$36 + 1$."],
    "$a_6 = 6^2 + 1 = 37$.", ["$6^2 = 36$.", "$36 + 1 = 37$."],
    [[13, "$n^2$ means $n \\cdot n$, not $2n$: $6^2 = 36$."]]),
  num("sq-a-0-1", "intro-sequences", "a", "m", "A sequence has rule $a_n = 2n^2 - 3$. What is $a_4$?", 29,
    ["Substitute $n = 4$.", "$2(4^2) - 3$.", "Square first: $4^2 = 16$."],
    "$a_4 = 2(16) - 3 = 32 - 3 = 29$.", ["$4^2 = 16$.", "$2 \\cdot 16 = 32$.", "$32 - 3 = 29$."]),
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
