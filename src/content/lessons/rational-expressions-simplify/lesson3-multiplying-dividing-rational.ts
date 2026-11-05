import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p } from "../../questions/bank";

const T = "rational-expressions-simplify";
const L = "multiplying-dividing-rational";
const { mc, num } = bank(T);

export const multiplyingDividingRational: Lesson = lesson(T, 3, {
  id: L,
  title: "Multiplying and Dividing Rational Expressions",
  summary: "Multiply across after canceling, and divide by multiplying by the reciprocal.",
  minutes: 20,
  objectives: [
    "Multiply rational expressions after factoring",
    "Divide by multiplying by the reciprocal",
    "Cancel common factors between different fractions",
  ],
  introTitle: "Fractions you already know",
  intro: [
    p(m`$\frac{2}{3} \div \frac{4}{9} = \frac{2}{3} \cdot \frac{9}{4} = \frac{18}{12} = \frac{3}{2}$. Algebraic fractions follow the same steps: flip the second fraction and multiply.`),
    co("remember", "Same rules", "Factor everything first. Then cancel common factors, even between the numerator of one fraction and the denominator of the other."),
  ],
  concept: [
    [
      "Multiplying",
      [
        p("Factor, cancel, then multiply the remaining numerators and denominators."),
        mth(m`\frac{x}{x + 2} \cdot \frac{x^2 - 4}{3x} = \frac{x}{x + 2} \cdot \frac{(x + 2)(x - 2)}{3x} = \frac{x - 2}{3}`),
      ],
    ],
    [
      "Dividing",
      [
        p("Keep the first fraction, flip the second, and multiply."),
        mth(m`\frac{6}{x - 1} \div \frac{3}{x^2 - 1} = \frac{6}{x - 1} \cdot \frac{(x + 1)(x - 1)}{3} = 2(x + 1)`),
        co("warning", "Flip only the second", "Only the fraction **after** the division sign is turned upside down."),
      ],
    ],
    [
      "Check with a number",
      [
        p("Substitute a value for $x$ before and after simplifying. The two results should match."),
        mth(m`\frac{x}{x + 1} \cdot \frac{x + 1}{3} = \frac{x}{3} \quad \text{at } x = 6: \ \frac{6}{7} \cdot \frac{7}{3} = 2 = \frac{6}{3}`),
        co("tip", "Avoid excluded values", "Pick a value that does not make any denominator 0."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-rmul",
      "Multiply and cancel",
      m`Simplify $\dfrac{x^2 - 1}{x + 3} \cdot \dfrac{2x + 6}{x - 1}$.`,
      [
        ["Factor every numerator and denominator.", "$x^2 - 1 = (x + 1)(x - 1)$ and $2x + 6 = 2(x + 3)$.", m`\frac{(x + 1)(x - 1)}{x + 3} \cdot \frac{2(x + 3)}{x - 1}`],
        ["Cancel $x - 1$ and $x + 3$.", "Each appears once on top and once on the bottom.", m`2(x + 1)`],
      ],
      "$2(x + 1)$",
    ),
    ex(
      "ex-rdiv",
      "Divide and cancel",
      m`Simplify $\dfrac{x^2 + 2x}{x - 3} \div \dfrac{x + 2}{x^2 - 9}$.`,
      [
        ["Flip the second fraction and multiply.", "Division becomes multiplication by the reciprocal.", m`\frac{x^2 + 2x}{x - 3} \cdot \frac{x^2 - 9}{x + 2}`],
        ["Factor.", "$x^2 + 2x = x(x + 2)$ and $x^2 - 9 = (x + 3)(x - 3)$.", m`\frac{x(x + 2)}{x - 3} \cdot \frac{(x + 3)(x - 3)}{x + 2}`],
        ["Cancel $x + 2$ and $x - 3$.", "What is left is the product.", "x(x + 3)"],
      ],
      "$x(x + 3)$",
    ),
  ],
  quickCheck: [
    mc("rs-qc-2-1", L, "qc", "e", m`Multiply: $\dfrac{3}{x} \cdot \dfrac{x^2}{6}$.`,
      [m`$\dfrac{x}{2}$`, [m`$\dfrac{x^2}{2}$`, "Cancel a factor of $x$ as well: $\\frac{x^2}{x} = x$."], [m`$\dfrac{1}{2x}$`, "$x^2$ is in the numerator, so the $x$ stays on top."], [m`$2x$`, "$\\frac{3}{6} = \\frac{1}{2}$, so the 2 is in the denominator."]],
      0, ["Multiply across: $\\frac{3x^2}{6x}$.", "Cancel the common numbers and powers of $x$.", "$\\frac{3}{6} = \\frac{1}{2}$ and $\\frac{x^2}{x} = x$."],
      m`$\frac{3x^2}{6x} = \frac{x}{2}$.`, ["Multiply: $\\frac{3x^2}{6x}$.", "Simplify: $\\frac{x}{2}$."]),
    num("rs-qc-2-2", L, "qc", "m", m`Simplify $\dfrac{x + 1}{2} \div \dfrac{x + 1}{6}$ to a single number.`, 3,
      ["Flip the second fraction and multiply.", m`$\frac{x + 1}{2} \cdot \frac{6}{x + 1}$.`, "Cancel $x + 1$."],
      m`$\frac{x + 1}{2} \cdot \frac{6}{x + 1} = \frac{6}{2} = 3$.`, ["Flip and multiply.", "Cancel $x + 1$.", "$\\frac{6}{2} = 3$."]),
    num("rs-qc-2-3", L, "qc", "m", m`$\dfrac{x}{x + 2} \cdot \dfrac{x + 2}{5}$ simplifies to $\dfrac{x}{5}$. What is its value when $x = 10$?`, 2,
      ["Cancel $x + 2$.", "The result is $\\frac{x}{5}$.", "Substitute $x = 10$."],
      m`$\frac{x}{x + 2} \cdot \frac{x + 2}{5} = \frac{x}{5}$. With $x = 10$ the value is $\frac{10}{5} = 2$.`, ["Cancel: $\\frac{x}{5}$.", "$\\frac{10}{5} = 2$."]),
  ],
});
