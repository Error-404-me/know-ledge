import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, mth, p } from "../../questions/bank";

const T = "factoring-special-forms";
const L = "quadratic-trinomials";
const { mc, num } = bank(T);

export const quadraticTrinomials: Lesson = lesson(T, 4, {
  id: L,
  title: "Quadratic Trinomials",
  summary: "Factor quadratic trinomials, including ones where the first coefficient is not 1.",
  minutes: 22,
  objectives: [
    "Factor trinomials with first coefficient 1 by finding two numbers",
    "Choose the signs of the two numbers correctly",
    "Factor trinomials with any first coefficient by splitting the middle term",
  ],
  introTitle: "Looking for two numbers",
  intro: [
    p("Multiply $(x + 2)(x + 3)$ and you get $x^2 + 5x + 6$. Notice that $2 \\times 3 = 6$ and $2 + 3 = 5$."),
    mth("(x + 2)(x + 3) = x^2 + 5x + 6"),
    co("tip", "The rule", "To factor $x^2 + bx + c$, find two numbers whose **product is $c$** and whose **sum is $b$**."),
  ],
  concept: [
    [
      "When the last term is positive",
      [
        p("Both numbers have the same sign as the middle term."),
        mth("x^2 + 7x + 12 = (x + 3)(x + 4)"),
        mth("x^2 - 9x + 20 = (x - 4)(x - 5)"),
      ],
    ],
    [
      "When the last term is negative",
      [
        p("The numbers have opposite signs. The one with the larger size takes the sign of the middle term."),
        mth("x^2 + 2x - 15 = (x + 5)(x - 3)"),
        mth("x^2 - x - 12 = (x - 4)(x + 3)"),
      ],
    ],
    [
      "When the first coefficient is not 1",
      [
        p("Multiply $a \\cdot c$. Find two numbers with that product that add to $b$. Use them to split the middle term, then factor by grouping."),
        mth("2x^2 + 7x + 3: \\ ac = 6, \\ 6 + 1 = 7"),
        mth("2x^2 + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3)"),
        co("tip", "Always check", "Multiply the two binomials back out and compare with the original trinomial."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-qt1",
      "A negative last term",
      "Factor $x^2 + x - 12$.",
      [
        ["Find two numbers with product $-12$ and sum $1$.", "Opposite signs, and the larger one is positive. Try $4$ and $-3$.", "4 \\times (-3) = -12, \\quad 4 + (-3) = 1"],
        ["Write the factors.", "Use the two numbers in the binomials.", "(x + 4)(x - 3)"],
      ],
      "$(x + 4)(x - 3)$",
    ),
    ex(
      "ex-qt2",
      "Split the middle term",
      "Factor $3x^2 + 10x + 8$.",
      [
        ["Find $ac$ and two numbers.", "$ac = 3 \\cdot 8 = 24$. Two numbers with product 24 and sum 10 are 6 and 4.", "24 = 6 \\times 4, \\quad 6 + 4 = 10"],
        ["Split the middle term.", "Replace $10x$ with $6x + 4x$.", "3x^2 + 6x + 4x + 8"],
        ["Factor by grouping.", "$3x(x + 2) + 4(x + 2)$.", "(3x + 4)(x + 2)"],
      ],
      "$(3x + 4)(x + 2)$",
    ),
  ],
  quickCheck: [
    mc("fs-qc-3-1", L, "qc", "e", "Factor $x^2 + 9x + 20$.",
      [["$(x + 2)(x + 10)$", "These multiply to 20, but add to 12, not 9."], ["$(x - 4)(x - 5)$", "The middle term is positive, so both numbers are positive."], "$(x + 4)(x + 5)$", ["$(x + 1)(x + 20)$", "These multiply to 20, but add to 21, not 9."]],
      2, ["Find two numbers with product 20 and sum 9.", "Try the factor pairs of 20.", "4 and 5."],
      "$4 \\times 5 = 20$ and $4 + 5 = 9$, so $x^2 + 9x + 20 = (x + 4)(x + 5)$.", ["Pairs of 20: 1·20, 2·10, 4·5.", "Only 4 + 5 = 9.", "$(x + 4)(x + 5)$."]),
    num("fs-qc-3-2", L, "qc", "m", "$x^2 - 5x - 14 = (x - 7)(x + a)$. What is $a$?", 2,
      ["The two numbers multiply to $-14$.", "One of them is $-7$.", "$-7 \\times ? = -14$."],
      "$-7 \\times 2 = -14$ and $-7 + 2 = -5$, so $a = 2$.", ["Product: $-14$, so the other number is 2.", "Sum: $-7 + 2 = -5$ ✓."]),
    mc("fs-qc-3-3", L, "qc", "m", "Factor $x^2 - 3x - 10$.",
      [["$(x + 5)(x - 2)$", "These add to $+3$, not $-3$."], ["$(x - 5)(x - 2)$", "These multiply to $+10$, not $-10$."], "$(x - 5)(x + 2)$", ["$(x - 10)(x + 1)$", "These add to $-9$, not $-3$."]],
      2, ["Find two numbers with product $-10$ and sum $-3$.", "One is positive and one is negative; the larger size is negative.", "Try $-5$ and $2$."],
      "$-5 \\times 2 = -10$ and $-5 + 2 = -3$, so $x^2 - 3x - 10 = (x - 5)(x + 2)$.", ["Product $-10$.", "Sum $-3$.", "$(x - 5)(x + 2)$."]),
  ],
});
