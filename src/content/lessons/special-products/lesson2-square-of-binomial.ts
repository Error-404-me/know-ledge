import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p } from "../../questions/bank";

const T = "special-products";
const L = "square-of-binomial";
const { mc, num } = bank(T);

export const squareOfBinomial: Lesson = lesson(T, 2, {
  id: L,
  title: "Square of a Binomial",
  summary: "Expand the square of a sum or a difference with a pattern instead of long multiplication.",
  minutes: 18,
  objectives: [
    "Expand the square of a sum",
    "Expand the square of a difference",
    "Explain why the middle term is never missing",
  ],
  introTitle: "A square tile",
  intro: [
    p("A square tile has sides of length $(x + 3)$. Its area is $(x + 3)(x + 3)$, written $(x + 3)^2$. Multiplying it out:"),
    mth("(x + 3)(x + 3) = x^2 + 3x + 3x + 9 = x^2 + 6x + 9"),
    co("real-life", "Look at the shape", "The area splits into a big square $x^2$, two rectangles of area $3x$, and a small square of area 9. That is why a middle term appears."),
  ],
  concept: [
    [
      "Square of a sum",
      [
        mth("(a + b)^2 = a^2 + 2ab + b^2"),
        p("First term squared, plus **twice the product** of the two terms, plus last term squared."),
        mth("(x + 5)^2 = x^2 + 10x + 25"),
        co("warning", "Not just a² + b²", "$(x + 5)^2$ is **not** $x^2 + 25$. The middle term $10x$ is easy to forget."),
      ],
    ],
    [
      "Square of a difference",
      [
        mth("(a - b)^2 = a^2 - 2ab + b^2"),
        mth("(2x - 3)^2 = 4x^2 - 12x + 9"),
        co("tip", "Only the middle sign changes", "The first and last terms are always positive, because a square is never negative."),
      ],
    ],
    [
      "Using the pattern for numbers",
      [
        p("Write a number as a sum or a difference of an easy number and a small one, then use the pattern."),
        mth(m`13^2 = (10 + 3)^2 = 10^2 + 2(10)(3) + 3^2 = 100 + 60 + 9 = 169`),
        co("tip", "Close to a round number", "$49^2 = (50 - 1)^2 = 2500 - 100 + 1 = 2401$."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-square",
      "Expand a square of a sum",
      "Expand $(3x + 4)^2$.",
      [
        ["Identify the two terms.", "Here $a = 3x$ and $b = 4$.", "(3x + 4)^2"],
        ["Square each term and find the middle term.", "$a^2 = 9x^2$, $2ab = 2(3x)(4) = 24x$, $b^2 = 16$.", "9x^2 + 24x + 16"],
      ],
      "$9x^2 + 24x + 16$",
      ["$9x^2 + 16$", "The middle term $2ab = 24x$ was left out.", "Always write three terms for a squared binomial."],
    ),
    ex(
      "ex-square-two-vars",
      "A square of a difference",
      "Expand $(2a - 5b)^2$.",
      [
        ["Identify the two terms.", "Here the first term is $2a$ and the second is $5b$.", "(2a - 5b)^2"],
        ["Square each term and find the middle term.", "$(2a)^2 = 4a^2$, the middle is $-2(2a)(5b) = -20ab$, and $(5b)^2 = 25b^2$.", "4a^2 - 20ab + 25b^2"],
      ],
      "$4a^2 - 20ab + 25b^2$",
      ["$4a^2 + 25b^2$", "The middle term $-20ab$ was left out.", "A squared binomial always has three terms."],
    ),
  ],
  quickCheck: [
    mc("sp-qc-1-1", L, "qc", "e", "Expand $(x + 7)^2$.",
      [["$x^2 + 49$", "The middle term $2 \\cdot x \\cdot 7 = 14x$ is missing."], ["$x^2 + 7x + 49$", "The middle term is twice the product: $2 \\cdot 7 \\cdot x = 14x$."], "$x^2 + 14x + 49$", ["$x^2 + 14x + 7$", "The last term is $7^2 = 49$."]],
      2, ["Use first squared, plus twice the product, plus last squared.", "First: $x^2$. Last: $7^2$.", "Twice the product of $x$ and 7."],
      "$x^2 + 2(x)(7) + 49 = x^2 + 14x + 49$.", ["$x^2$.", "$14x$.", "$49$."]),
    num("sp-qc-1-2", L, "qc", "m", "$(x - 6)^2 = x^2 + bx + c$. What is $b$?", -12,
      ["Use $(a - b)^2 = a^2 - 2ab + b^2$.", "The middle term is $-2 \\cdot x \\cdot 6$.", "Compute $-2 \\cdot 6$."],
      "$(x - 6)^2 = x^2 - 12x + 36$, so $b = -12$.", ["Middle term: $-2(x)(6) = -12x$.", "$b = -12$."],
      [[12, "For a difference, the middle term is negative: $-12x$."], [0, "The middle term is never missing: $-2(x)(6) = -12x$."]]),
    mc("sp-qc-1-3", L, "qc", "m", "Expand $(2y - 1)^2$.",
      [["$4y^2 - 1$", "The middle term is missing: $-2(2y)(1) = -4y$."], ["$4y^2 - 2y + 1$", "The middle term is twice the product: $2(2y)(1) = 4y$."], ["$2y^2 - 4y + 1$", "Square the whole $2y$: $(2y)^2 = 4y^2$."], "$4y^2 - 4y + 1$"],
      3, ["Use $(a - b)^2 = a^2 - 2ab + b^2$.", "$a = 2y$ and $b = 1$.", "$(2y)^2$, $2(2y)(1)$, $1^2$."],
      "$(2y)^2 - 2(2y)(1) + 1 = 4y^2 - 4y + 1$.", ["$4y^2$.", "$-4y$.", "$+1$."]),
  ],
});
