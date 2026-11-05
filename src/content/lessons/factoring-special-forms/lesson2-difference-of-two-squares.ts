import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "factoring-special-forms";
const L = "difference-of-two-squares";
const { mc, num } = bank(T);

export const differenceOfTwoSquares: Lesson = lesson(T, 2, {
  id: L,
  title: "Difference of Two Squares",
  summary: "Factor a difference of two squares into conjugate binomials by recognizing perfect squares.",
  minutes: 15,
  objectives: [
    "Recognize perfect squares",
    "Factor a difference of two squares",
    "Factor out a GCF before using the pattern",
  ],
  introTitle: "Running the pattern backwards",
  intro: [
    p("You learned that $(x + 5)(x - 5) = x^2 - 25$. Factoring reverses this:"),
    mth("x^2 - 25 = (x + 5)(x - 5)"),
    co("remember", "Pattern", "$a^2 - b^2 = (a + b)(a - b)$. Two perfect squares with a **minus** between them factor into conjugates."),
  ],
  concept: [
    [
      "Recognize perfect squares",
      [
        table(
          ["Number or term", "It is the square of"],
          [
            ["$1, 4, 9, 16, 25$", "$1, 2, 3, 4, 5$"],
            ["$36, 49, 64, 81, 100$", "$6, 7, 8, 9, 10$"],
            ["$x^2, x^4, x^6$", "$x, x^2, x^3$"],
            ["$9x^2$", "$3x$"],
          ],
        ),
      ],
    ],
    [
      "Factor it",
      [
        p("Take the square root of each term, then write the sum times the difference."),
        mth("9x^2 - 49 = (3x)^2 - 7^2 = (3x + 7)(3x - 7)"),
        co("warning", "Sum of squares", "$x^2 + 25$ **cannot** be factored this way. The pattern needs a minus sign. Also factor out a GCF first: $2x^2 - 50 = 2(x^2 - 25) = 2(x + 5)(x - 5)$."),
      ],
    ],
    [
      "Factor completely",
      [
        p("Sometimes a factor is itself a difference of two squares. Keep factoring until you cannot go further."),
        mth(m`16x^4 - 81 = (4x^2 + 9)(4x^2 - 9) = (4x^2 + 9)(2x + 3)(2x - 3)`),
        co("tip", "Which one splits?", "$4x^2 - 9$ is a difference of squares, so it splits. $4x^2 + 9$ is a sum, so it stays."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-dos",
      "Factor with a GCF first",
      "Factor $3x^2 - 75$.",
      [
        ["Factor out the GCF.", "Both terms are multiples of 3.", "3(x^2 - 25)"],
        ["Recognize the difference of squares.", "$x^2 = (x)^2$ and $25 = 5^2$.", "3(x^2 - 5^2)"],
        ["Factor the difference of squares.", "Sum times difference.", "3(x + 5)(x - 5)"],
      ],
      "$3(x + 5)(x - 5)$",
      ["$(3x + 15)(3x - 15)$", "75 is not a perfect square, so the pattern does not apply until the GCF is out.", "Factor out the common factor first."],
    ),
    ex(
      "ex-dos-two-vars",
      "Two variables",
      "Factor $9a^2 - 100b^2$.",
      [
        ["Write each term as a square.", "$9a^2 = (3a)^2$ and $100b^2 = (10b)^2$.", m`(3a)^2 - (10b)^2`],
        ["Write the sum times the difference.", "The two factors differ only in the middle sign.", "(3a + 10b)(3a - 10b)"],
      ],
      "$(3a + 10b)(3a - 10b)$",
      ["$(3a - 10b)^2$", "That expands to $9a^2 - 60ab + 100b^2$. A difference of squares has no middle term.", "Write one factor with $+$ and one with $-$."],
    ),
  ],
  quickCheck: [
    mc("fs-qc-1-1", L, "qc", "e", "Factor $x^2 - 64$.",
      [["$(x - 8)^2$", "That expands to $x^2 - 16x + 64$, not $x^2 - 64$."], ["$(x + 8)^2$", "That expands to $x^2 + 16x + 64$."], "$(x + 8)(x - 8)$", ["$(x + 4)(x - 16)$", "Expanding gives $x^2 - 12x - 64$."]],
      2, ["Is $64$ a perfect square?", "$64 = 8^2$.", "Write the sum times the difference."],
      "$x^2 - 8^2 = (x + 8)(x - 8)$.", ["$x^2$ and $8^2$.", "$(x + 8)(x - 8)$."]),
    num("fs-qc-1-2", L, "qc", "e", "$49x^2 - 25 = (7x + a)(7x - a)$. What is $a$?", 5,
      ["$49x^2 = (7x)^2$.", "$25$ is the square of what?", "$5^2 = 25$."],
      "$49x^2 - 25 = (7x)^2 - 5^2 = (7x + 5)(7x - 5)$, so $a = 5$.", ["Square roots: $7x$ and $5$.", "$a = 5$."]),
    mc("fs-qc-1-3", L, "qc", "m", "Factor $4x^2 - 25$.",
      [["$(2x - 5)^2$", "That expands to $4x^2 - 20x + 25$."], ["$(4x + 5)(4x - 5)$", "$4x^2 = (2x)^2$, so the first term is $2x$, not $4x$."], "$(2x + 5)(2x - 5)$", ["$(2x + 25)(2x - 25)$", "$25 = 5^2$, so the second term is 5, not 25."]],
      2, ["Find the square root of each term.", "$4x^2 = (2x)^2$ and $25 = 5^2$.", "Sum times difference."],
      "$(2x)^2 - 5^2 = (2x + 5)(2x - 5)$.", ["Roots: $2x$ and 5.", "$(2x + 5)(2x - 5)$."]),
  ],
});
