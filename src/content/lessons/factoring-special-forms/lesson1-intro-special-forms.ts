import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "factoring-special-forms";
const L = "intro-special-forms";
const { mc, num } = bank(T);

export const introSpecialForms: Lesson = lesson(T, 1, {
  id: L,
  title: "Introduction to Special Forms of Factoring",
  summary: "Review perfect squares and square roots, and preview the special forms you will factor.",
  minutes: 15,
  objectives: [
    "Recognize perfect squares",
    "Find the square root of a number or a simple term",
    "Name the special forms and their factored forms",
  ],
  introTitle: "A square floor",
  intro: [
    p("A square floor has an area of 49 square meters. How long is each side? Since $7 \\times 7 = 49$, each side is 7 meters. Finding the side from the area is taking a **square root**."),
    mth(m`\sqrt{49} = 7`),
    co("real-life", "Why squares matter", "The special forms of factoring all depend on spotting perfect squares and finding their square roots."),
  ],
  concept: [
    [
      "Perfect squares",
      [
        p("A **perfect square** is the square of a whole number."),
        table(
          ["Perfect squares", "Square roots"],
          [
            ["$1, 4, 9, 16, 25$", "$1, 2, 3, 4, 5$"],
            ["$36, 49, 64, 81, 100$", "$6, 7, 8, 9, 10$"],
            ["$121, 144, 169$", "$11, 12, 13$"],
          ],
        ),
      ],
    ],
    [
      "Square roots of terms",
      [
        p("To find the square root of a term, take the square root of the number and **halve** each exponent."),
        mth(m`\sqrt{9x^2} = 3x \qquad \sqrt{25x^4} = 5x^2 \qquad \sqrt{16y^6} = 4y^3`),
        co("tip", "Check by squaring", "$(5x^2)^2 = 25x^4$, so $\\sqrt{25x^4} = 5x^2$."),
      ],
    ],
    [
      "The forms ahead",
      [
        table(
          ["Form", "Factored"],
          [
            ["$a^2 - b^2$", "$(a + b)(a - b)$"],
            ["$a^2 + 2ab + b^2$", "$(a + b)^2$"],
            ["$a^2 - 2ab + b^2$", "$(a - b)^2$"],
            ["$x^2 + bx + c$", "$(x + m)(x + n)$"],
          ],
        ),
        co("remember", "Check by multiplying", "Every factorization can be checked by multiplying the factors back out."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-sqrt-term",
      "Square root of a term",
      "Find $\\sqrt{36x^4}$.",
      [
        ["Take the square root of the number.", "$\\sqrt{36} = 6$.", "6"],
        ["Halve the exponent of the variable.", "$x^4$ has exponent 4, and half of 4 is 2.", "6x^2"],
      ],
      "$6x^2$",
      ["$6x^4$", "The exponent must be halved: $(6x^4)^2 = 36x^8$, not $36x^4$.", "Check by squaring your answer."],
    ),
    ex(
      "ex-is-dos",
      "Is it a difference of squares?",
      "Is $49x^2 - 16$ a difference of two squares?",
      [
        ["Write each term as a square.", "$49x^2 = (7x)^2$ and $16 = 4^2$.", m`(7x)^2 - 4^2`],
        ["Check the sign between them.", "There is a minus sign, so it is a **difference** of two squares."],
      ],
      "Yes: $(7x)^2 - 4^2$",
    ),
  ],
  quickCheck: [
    num("fs-qc-0-1", L, "qc", "e", "What is $\\sqrt{144}$?", 12,
      ["Find a number that multiplied by itself gives 144.", "Try 12.", "$12 \\times 12 = ?$"],
      "$12 \\times 12 = 144$, so $\\sqrt{144} = 12$.", ["$12^2 = 144$.", "$\\sqrt{144} = 12$."]),
    mc("fs-qc-0-2", L, "qc", "e", "Which number is a perfect square?",
      [["$50$", "No whole number multiplied by itself gives 50."], ["$72$", "$8 \\times 8 = 64$ and $9 \\times 9 = 81$, so 72 is between squares."], "$81$", ["$90$", "$9 \\times 9 = 81$ and $10 \\times 10 = 100$, so 90 is between squares."]],
      2, ["A perfect square is a whole number times itself.", "Try squares: 64, 81, 100.", "Which option is on the list?"],
      "$9 \\times 9 = 81$.", ["$9^2 = 81$."]),
    mc("fs-qc-0-3", L, "qc", "e", "What is $\\sqrt{16x^2}$?",
      [["$8x$", "$\\sqrt{16} = 4$, not 8."], "$4x$", ["$4x^2$", "Halve the exponent: $\\sqrt{x^2} = x$."], ["$16x$", "Take the square root of 16 as well."]],
      1, ["Take the square root of 16 and of $x^2$.", "$\\sqrt{16} = 4$ and $\\sqrt{x^2} = x$.", "Put them together."],
      "$\\sqrt{16x^2} = 4x$ because $(4x)^2 = 16x^2$.", ["$\\sqrt{16} = 4$.", "$\\sqrt{x^2} = x$."]),
  ],
});
