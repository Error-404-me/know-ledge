import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, mth, p, table } from "../../questions/bank";

const T = "special-products";
const L = "intro-special-products";
const { mc, num } = bank(T);

export const introSpecialProducts: Lesson = lesson(T, 1, {
  id: L,
  title: "Introduction to Special Products",
  summary: "Review multiplying two binomials and preview the patterns that make it fast.",
  minutes: 15,
  objectives: [
    "Identify a binomial",
    "Multiply two binomials term by term",
    "Name the special product patterns you will learn",
  ],
  introTitle: "Tiling a floor",
  intro: [
    p("A rectangular floor is $(x + 2)$ meters wide and $(x + 3)$ meters long. Its area is the product of two binomials:"),
    mth("(x + 2)(x + 3) = x^2 + 5x + 6"),
    co("real-life", "Patterns save time", "Products of binomials appear so often that mathematicians found patterns for the common ones. Those are called **special products**."),
  ],
  concept: [
    [
      "Multiplying binomials",
      [
        co("definition", "Binomial", "A **binomial** is a polynomial with exactly two terms, such as $x + 2$ or $3a - 5b$."),
        p("To multiply two binomials, multiply each term of the first by each term of the second. That gives four products. Then combine like terms."),
        mth("(x + 4)(x + 1) = x^2 + x + 4x + 4 = x^2 + 5x + 4"),
      ],
    ],
    [
      "A picture of the product",
      [
        p("An area model shows the four products. The floor $(x + 2)$ by $(x + 3)$ splits into four parts:"),
        table(
          ["", "x", "3"],
          [
            ["$x$", "$x^2$", "$3x$"],
            ["$2$", "$2x$", "$6$"],
          ],
        ),
        p("Adding the parts: $x^2 + 3x + 2x + 6 = x^2 + 5x + 6$."),
      ],
    ],
    [
      "Patterns ahead",
      [
        table(
          ["Pattern", "Example"],
          [
            ["Square of a sum", "$(x + 3)^2$"],
            ["Square of a difference", "$(x - 3)^2$"],
            ["Sum times difference", "$(x + 3)(x - 3)$"],
          ],
        ),
        co("tip", "Why learn patterns?", "You will be able to write each of these products in one step, without writing all four products."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-binomials",
      "Multiply two binomials",
      "Multiply $(x - 2)(x + 5)$.",
      [
        ["Write all four products.", "$x \\cdot x$, $x \\cdot 5$, $-2 \\cdot x$ and $-2 \\cdot 5$.", "x^2 + 5x - 2x - 10"],
        ["Combine like terms.", "$5x - 2x = 3x$.", "x^2 + 3x - 10"],
      ],
      "$x^2 + 3x - 10$",
      ["$x^2 - 10$", "The two middle terms $5x$ and $-2x$ were left out.", "Write all four products before combining."],
    ),
    ex(
      "ex-binomials2",
      "A binomial with a coefficient",
      "Multiply $(2x + 1)(x + 3)$.",
      [
        ["Write all four products.", "$2x \\cdot x$, $2x \\cdot 3$, $1 \\cdot x$ and $1 \\cdot 3$.", "2x^2 + 6x + x + 3"],
        ["Combine like terms.", "$6x + x = 7x$.", "2x^2 + 7x + 3"],
      ],
      "$2x^2 + 7x + 3$",
    ),
  ],
  quickCheck: [
    mc("sp-qc-0-1", L, "qc", "e", "Multiply: $(x + 3)(x + 4)$.",
      ["$x^2 + 7x + 12$", ["$x^2 + 12$", "The middle terms $4x$ and $3x$ are missing."], ["$x^2 + 7x + 7$", "Multiply the constants: $3 \\cdot 4 = 12$."], ["$x^2 + 12x + 7$", "Add the $x$ terms: $3x + 4x = 7x$."]],
      0, ["Write all four products.", "$x^2 + 4x + 3x + 12$.", "Combine $4x + 3x$."],
      "$x^2 + 4x + 3x + 12 = x^2 + 7x + 12$.", ["Four products.", "Combine: $x^2 + 7x + 12$."]),
    num("sp-qc-0-2", L, "qc", "e", "$(x + 1)(x + 6) = x^2 + bx + c$. What is $b + c$?", 13,
      ["Multiply every term by every term.", "$x^2 + 6x + x + 6$.", "Combine $6x + x$ to find $b$."],
      "$(x + 1)(x + 6) = x^2 + 7x + 6$, so $b + c = 7 + 6 = 13$.", ["Expand: $x^2 + 7x + 6$.", "$7 + 6 = 13$."]),
    mc("sp-qc-0-3", L, "qc", "e", "Which of these is a binomial?",
      [["$7x$", "This has only one term."], ["$x^2 + 2x + 1$", "This has three terms."], "$3a - 5b$", ["$4$", "This has only one term."]],
      2, ["A binomial has exactly two terms.", "Count the terms separated by $+$ or $-$.", "Which option has two?"],
      "$3a - 5b$ has two terms: $3a$ and $-5b$.", ["Count the terms in each option.", "Only $3a - 5b$ has two."]),
  ],
});
