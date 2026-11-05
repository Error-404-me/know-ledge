import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p } from "../../questions/bank";

const T = "polynomials-multiply-divide";
const L = "multiply-divide-polynomials";
const { mc, num } = bank(T);

export const multiplyDividePolynomials: Lesson = lesson(T, 3, {
  id: L,
  title: "Multiplying and Dividing Polynomials",
  summary: "Multiply a monomial or binomial by a polynomial, and divide a polynomial by a monomial.",
  minutes: 20,
  objectives: [
    "Multiply a monomial by a polynomial",
    "Multiply two binomials",
    "Divide a polynomial by a monomial",
  ],
  introTitle: "Area of a garden",
  intro: [
    p("A garden is 3 m wide and $(x + 4)$ m long. Its area is the width times the length:"),
    mth("3(x + 4) = 3x + 12"),
    co("real-life", "Distribute", "The 3 multiplies **every** term inside the parentheses. Multiplying polynomials is repeated use of the distributive property."),
  ],
  concept: [
    [
      "Monomial times polynomial",
      [
        p("Multiply the monomial by each term. Coefficients multiply and exponents of the same base add."),
        mth("2x(3x^2 - 5x + 4) = 6x^3 - 10x^2 + 8x"),
      ],
    ],
    [
      "Binomial times binomial",
      [
        p("Each term of the first binomial multiplies each term of the second. That makes four products. Then combine like terms."),
        mth("(x + 3)(x + 5) = x^2 + 5x + 3x + 15 = x^2 + 8x + 15"),
        co("tip", "Four products", "Check that you wrote four products before combining. Missing one is the most common slip."),
      ],
    ],
    [
      "Dividing by a monomial",
      [
        p("Divide **each** term of the polynomial by the monomial."),
        mth(m`\frac{12x^3 - 8x^2 + 4x}{4x} = 3x^2 - 2x + 1`),
        co("warning", "Every term", m`$\frac{6x + 9}{3} = 2x + 3$, not $2x + 9$. The 3 divides both terms.`),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-mult",
      "Multiply two binomials",
      "Multiply $(2x - 3)(x + 4)$.",
      [
        ["Multiply each term of the first binomial by each term of the second.", "$2x \\cdot x$, $2x \\cdot 4$, $-3 \\cdot x$ and $-3 \\cdot 4$.", "2x^2 + 8x - 3x - 12"],
        ["Combine like terms.", "$8x - 3x = 5x$.", "2x^2 + 5x - 12"],
      ],
      "$2x^2 + 5x - 12$",
    ),
    ex(
      "ex-div",
      "Divide by a monomial",
      m`Divide $15x^4 - 10x^3 + 5x^2$ by $5x^2$.`,
      [
        ["Write it as a fraction and divide each term.", "Coefficients divide and exponents subtract.", m`\frac{15x^4}{5x^2} - \frac{10x^3}{5x^2} + \frac{5x^2}{5x^2}`],
        ["Simplify each part.", "The last term is $1$ because anything divided by itself is 1.", "3x^2 - 2x + 1"],
      ],
      "$3x^2 - 2x + 1$",
    ),
  ],
  quickCheck: [
    mc("pmd-qc-2-1", L, "qc", "e", "Multiply: $3x(x - 4)$.",
      [["$3x^2 - 4$", "Multiply $3x$ by **both** terms."], "$3x^2 - 12x$", ["$4x^2 - 12x$", "$3 \\times 1 = 3$, so $3x \\cdot x = 3x^2$."], ["$3x - 12x$", "$3x \\cdot x = 3x^2$, because exponents add."]],
      1, ["Distribute $3x$ to each term.", "$3x \\cdot x$ and $3x \\cdot (-4)$.", "Combine the results."],
      "$3x \\cdot x = 3x^2$ and $3x \\cdot (-4) = -12x$.", ["First term: $3x^2$.", "Second term: $-12x$."]),
    num("pmd-qc-2-2", L, "qc", "m", "$(x + 2)(x + 5) = x^2 + bx + c$. What is $b + c$?", 17,
      ["Multiply every term by every term.", "$x^2 + 5x + 2x + 10$.", "Combine $5x + 2x$."],
      "$(x + 2)(x + 5) = x^2 + 7x + 10$, so $b + c = 7 + 10 = 17$.", ["Expand: $x^2 + 5x + 2x + 10$.", "$b = 7$, $c = 10$.", "$7 + 10 = 17$."]),
    num("pmd-qc-2-3", L, "qc", "m", "Expand $2x(3x - 4)$, then evaluate the result when $x = 2$.", 8,
      ["Distribute $2x$ to both terms.", "$2x \\cdot 3x = 6x^2$ and $2x \\cdot (-4) = -8x$.", "Substitute $x = 2$ into $6x^2 - 8x$."],
      "$2x(3x - 4) = 6x^2 - 8x$. With $x = 2$: $6(4) - 8(2) = 24 - 16 = 8$.", ["Expand: $6x^2 - 8x$.", "Substitute: $24 - 16 = 8$."]),
  ],
});
