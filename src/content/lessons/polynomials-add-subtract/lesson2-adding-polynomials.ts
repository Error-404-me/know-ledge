import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "polynomials-add-subtract";
const L = "adding-polynomials";
const { mc, num } = bank(T);

export const addingPolynomials: Lesson = lesson(T, 2, {
  id: L,
  title: "Adding Polynomials",
  summary: "Add polynomials by combining like terms, horizontally or in columns.",
  minutes: 15,
  objectives: [
    "Add polynomials with the horizontal method",
    "Add polynomials with the vertical method",
    "Write the answer with the highest power first",
  ],
  introTitle: "Two baskets of fruit",
  intro: [
    p("Basket 1 has 3 mangoes and 2 bananas. Basket 2 has 4 mangoes and 5 bananas. Together there are 7 mangoes and 7 bananas. You combined only the **like** fruits."),
    mth(m`(3x + 2y) + (4x + 5y) = 7x + 7y`),
    co("real-life", "Same idea", "Adding polynomials means adding like terms. Unlike terms stay separate, just like mangoes and bananas."),
  ],
  concept: [
    [
      "Horizontal method",
      [
        p("Remove the parentheses, group like terms, then combine. A plus sign before parentheses changes nothing inside."),
        mth(m`(5x^2 + 3x) + (2x^2 - 7x) = (5x^2 + 2x^2) + (3x - 7x) = 7x^2 - 4x`),
        co("tip", "Recipe", "1) Remove parentheses. 2) Group like terms. 3) Combine the coefficients. 4) Write the highest power first."),
      ],
    ],
    [
      "Vertical method",
      [
        p("Line up like terms in columns and add each column. Write 0 for a missing term."),
        table(
          ["Row", "x²", "x", "Constant"],
          [
            ["First", "$4$", "$-2$", "$5$"],
            ["Second", "$3$", "$0$", "$-8$"],
            ["Sum", "$7$", "$-2$", "$-3$"],
          ],
        ),
        p("So $(4x^2 - 2x + 5) + (3x^2 - 8) = 7x^2 - 2x - 3$."),
      ],
    ],
    [
      "Check by substitution",
      [
        p("You can test an answer by substituting an easy number for the variable in the original sum and in your result. The two values should match."),
        mth(m`(2x + 1) + (3x + 4) = 5x + 5 \quad \text{at } x = 2: \ 5 + 10 = 15 \ \text{and} \ 5(2) + 5 = 15`),
        co("tip", "If they differ", "Look for a sign error or a term that was left out. Try $x = 1$ or $x = 2$; they keep the arithmetic easy."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-add",
      "Add three-term polynomials",
      "Add $(5x^2 - 3x + 4)$ and $(2x^2 + 7x - 9)$.",
      [
        ["Write the sum and remove the parentheses.", "The plus sign leaves every sign unchanged.", m`5x^2 - 3x + 4 + 2x^2 + 7x - 9`],
        ["Group like terms.", "Match $x^2$ with $x^2$, $x$ with $x$, and constants with constants.", m`(5x^2 + 2x^2) + (-3x + 7x) + (4 - 9)`],
        ["Combine each group.", "$5 + 2 = 7$, $-3 + 7 = 4$ and $4 - 9 = -5$.", m`7x^2 + 4x - 5`],
      ],
      "$7x^2 + 4x - 5$",
      ["$7x^2 + 4x + 13$", "The constants were added as $4 + 9$, but the 9 is negative.", "Keep each sign with its term while grouping."],
    ),
    ex(
      "ex-add-columns",
      "Add in columns",
      "Add $(3x^2 + 2x - 5)$ and $(x^2 - 6x + 8)$ using columns.",
      [
        ["Line up like terms in columns.", "Write 0 for any term that is missing.", m`3x^2 + 2x - 5 \ \text{ and } \ x^2 - 6x + 8`],
        ["Add each column.", "$3 + 1 = 4$, $2 + (-6) = -4$ and $-5 + 8 = 3$.", "4x^2 - 4x + 3"],
      ],
      "$4x^2 - 4x + 3$",
      ["$4x^2 - 4x - 3$", "The constants were combined as $-5 - 8$, but the second constant is $+8$.", "Copy each sign into its column with its term."],
    ),
  ],
  quickCheck: [
    mc("pas-qc-1-1", L, "qc", "e", "Add: $(2x + 5) + (3x - 1)$.",
      ["$5x + 4$", ["$5x + 6$", "The second constant is $-1$, so $5 + (-1) = 4$."], ["$5x^2 + 4$", "Adding like terms never changes the variable part."], ["$6x + 4$", "Add the coefficients: $2 + 3 = 5$."]],
      0,
      ["Group the $x$ terms and the constants.", "$2x + 3x$ and $5 + (-1)$.", "Add each pair."],
      "$2x + 3x = 5x$ and $5 - 1 = 4$.",
      ["Group: $(2x + 3x) + (5 - 1)$.", "Combine: $5x + 4$."]),
    num("pas-qc-1-2", L, "qc", "e", "After adding $(4x^2 + 3x - 2) + (x^2 - 8x + 6)$, what is the coefficient of $x$?", -5,
      ["Find the $x$ terms in both polynomials.", "They are $3x$ and $-8x$.", "Compute $3 + (-8)$."],
      "$3x + (-8x) = -5x$.",
      ["$x$ terms: $3x$ and $-8x$.", "$3 + (-8) = -5$."],
      [[11, "The second $x$ term is $-8x$, so add $3 + (-8)$."]]),
    mc("pas-qc-1-3", L, "qc", "m", "Add: $(x^2 + 3x) + (2x^2 - 3x + 5)$.",
      [["$3x^2 + 6x + 5$", "$3x + (-3x) = 0$, so the $x$ terms cancel."], ["$3x^4 + 5$", "Adding like terms keeps the exponent: $x^2 + 2x^2 = 3x^2$."], "$3x^2 + 5$", ["$2x^2 + 6x + 5$", "$x^2 + 2x^2 = 3x^2$."]],
      2, ["Group the $x^2$ terms, the $x$ terms and the constants.", "$3x + (-3x) = 0$.", "The $x$ terms cancel."],
      "$(x^2 + 2x^2) + (3x - 3x) + 5 = 3x^2 + 5$.", ["$x^2$ terms: $3x^2$.", "$x$ terms: 0.", "Constant: 5."]),
  ],
});
