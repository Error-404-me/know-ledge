import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "special-products";
const L = "sum-and-difference";
const { mc, num } = bank(T);

export const sumAndDifference: Lesson = lesson(T, 3, {
  id: L,
  title: "Sum and Difference of Two Terms",
  summary: "Multiply a sum by a difference in one step and use the pattern for mental math.",
  minutes: 15,
  objectives: [
    "Multiply conjugate binomials by pattern",
    "Tell the three special products apart",
    "Use the pattern for quick mental calculation",
  ],
  introTitle: "A mental-math trick",
  intro: [
    p("How can you compute $21 \\times 19$ quickly? Write it as $(20 + 1)(20 - 1)$:"),
    mth("(20 + 1)(20 - 1) = 20^2 - 1^2 = 400 - 1 = 399"),
    co("real-life", "Why it works", "The middle terms cancel, so only a difference of two squares is left."),
  ],
  concept: [
    [
      "Sum times difference",
      [
        mth("(a + b)(a - b) = a^2 - b^2"),
        p("The two middle terms, $-ab$ and $+ab$, cancel."),
        mth("(x + 4)(x - 4) = x^2 - 4x + 4x - 16 = x^2 - 16"),
      ],
    ],
    [
      "Choose the right pattern",
      [
        table(
          ["Product", "Result", "Middle term?"],
          [
            ["$(x + 3)^2$", "$x^2 + 6x + 9$", "Yes, $6x$"],
            ["$(x - 3)^2$", "$x^2 - 6x + 9$", "Yes, $-6x$"],
            ["$(x + 3)(x - 3)$", "$x^2 - 9$", "No, it cancels"],
          ],
        ),
        co("tip", "Spot the conjugates", "Two binomials with the same terms but opposite signs in the middle, like $(x + 3)$ and $(x - 3)$, are conjugates. Their product has no middle term."),
      ],
    ],
    [
      "Terms with coefficients and two variables",
      [
        p("The same pattern works when the terms have coefficients or more than one variable. Square each term and subtract."),
        mth(m`(2x + 3y)(2x - 3y) = (2x)^2 - (3y)^2 = 4x^2 - 9y^2`),
        co("warning", "Opposite signs only", "$(x + 3)(x + 3)$ is **not** a product of conjugates. It is the square $(x + 3)^2 = x^2 + 6x + 9$."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-conj",
      "Multiply conjugates",
      "Multiply $(3x + 2)(3x - 2)$.",
      [
        ["Recognize the pattern.", "The binomials have the same terms with opposite signs, so $a = 3x$ and $b = 2$.", "(a + b)(a - b)"],
        ["Square each term and subtract.", "$a^2 = 9x^2$ and $b^2 = 4$.", "9x^2 - 4"],
      ],
      "$9x^2 - 4$",
    ),
    ex(
      "ex-mental",
      "Mental math",
      "Compute $31 \\times 29$ using a special product.",
      [
        ["Write the numbers around 30.", "$31 = 30 + 1$ and $29 = 30 - 1$.", "(30 + 1)(30 - 1)"],
        ["Apply the pattern.", "$30^2 - 1^2 = 900 - 1$.", "899"],
      ],
      "$899$",
    ),
  ],
  quickCheck: [
    mc("sp-qc-2-1", L, "qc", "e", "Multiply: $(m + 8)(m - 8)$.",
      [["$m^2 + 64$", "The product of conjugates is a **difference**: $m^2 - 64$."], ["$m^2 - 16m - 64$", "The middle terms cancel, so there is no $m$ term."], "$m^2 - 64$", ["$m^2 - 16$", "Square the 8: $8^2 = 64$."]],
      2, ["These are conjugates.", "The result is the first squared minus the last squared.", "$m^2$ and $8^2$."],
      "$(m + 8)(m - 8) = m^2 - 8^2 = m^2 - 64$.", ["Pattern: $a^2 - b^2$.", "$m^2 - 64$."]),
    num("sp-qc-2-2", L, "qc", "m", "Use $(40 + 1)(40 - 1)$ to compute $41 \\times 39$.", 1599,
      ["$41 = 40 + 1$ and $39 = 40 - 1$.", "Apply $(a + b)(a - b) = a^2 - b^2$.", "$40^2 - 1^2$."],
      "$40^2 - 1^2 = 1600 - 1 = 1599$.", ["Write $(40 + 1)(40 - 1)$.", "$1600 - 1 = 1599$."]),
    mc("sp-qc-2-3", L, "qc", "m", "Multiply: $(5a + 2b)(5a - 2b)$.",
      ["$25a^2 - 4b^2$", ["$25a^2 + 4b^2$", "A product of conjugates is a **difference** of squares."], ["$5a^2 - 2b^2$", "Square the whole terms: $(5a)^2 = 25a^2$ and $(2b)^2 = 4b^2$."], ["$25a^2 - 20ab - 4b^2$", "The middle terms cancel, so there is no $ab$ term."]],
      0, ["These are conjugates.", "Square each term and subtract.", "$(5a)^2$ and $(2b)^2$."],
      "$(5a)^2 - (2b)^2 = 25a^2 - 4b^2$.", ["$(5a)^2 = 25a^2$.", "$(2b)^2 = 4b^2$.", "Subtract."]),
  ],
});
