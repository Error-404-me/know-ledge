import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "rational-expressions-simplify";
const L = "simplifying-rational-expressions";
const { mc, num } = bank(T);

export const simplifyingRationalExpressions: Lesson = lesson(T, 2, {
  id: L,
  title: "Simplifying Rational Expressions",
  summary: "Factor the numerator and denominator, then cancel the common factors.",
  minutes: 18,
  objectives: [
    "Explain what a rational expression is",
    "Simplify by factoring and canceling common factors",
    "Tell factors from terms so you only cancel what is allowed",
  ],
  introTitle: "Cancel to simplify",
  intro: [
    p(m`You know $\frac{6}{9} = \frac{2 \cdot 3}{3 \cdot 3} = \frac{2}{3}$. You factor, then cancel the common factor. Algebraic fractions work the same way.`),
    co("definition", "Rational expression", m`A **rational expression** is a fraction whose numerator and denominator are polynomials, such as $\frac{x + 2}{x - 3}$. The denominator can never be 0.`),
  ],
  concept: [
    [
      "Factor, then cancel",
      [
        mth(m`\frac{3x + 6}{x + 2} = \frac{3(x + 2)}{x + 2} = 3`),
        p("Factor the top and bottom completely, then cancel any factor that appears in both."),
      ],
    ],
    [
      "Cancel factors, never terms",
      [
        table(
          ["Expression", "Can you cancel?"],
          [
            [m`$\frac{4(x + 1)}{4}$`, "Yes. 4 is a factor of the whole numerator."],
            [m`$\frac{x + 4}{4}$`, "No. 4 is only one term of a sum."],
          ],
        ),
        co("warning", "Factors multiply, terms add", "You may cancel only what is **multiplied** in the numerator and the denominator. Never cancel pieces of a sum."),
      ],
    ],
    [
      "Excluded values still apply",
      [
        p("Even after canceling, the **original** denominator decides which values are not allowed."),
        mth(m`\frac{x^2 - 4}{x - 2} = x + 2 \quad (x \ne 2)`),
        co("warning", "Cancel with care", "The simplified form $x + 2$ would accept $x = 2$, but the original expression does not."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-rs",
      "Factor, then cancel",
      m`Simplify $\dfrac{x^2 - x - 6}{x^2 - 9}$.`,
      [
        ["Factor the numerator.", "Two numbers with product $-6$ and sum $-1$ are $-3$ and $2$.", m`(x - 3)(x + 2)`],
        ["Factor the denominator.", "It is a difference of squares.", m`(x + 3)(x - 3)`],
        ["Cancel the common factor $x - 3$.", "It appears in both the top and the bottom.", m`\frac{x + 2}{x + 3}`],
      ],
      m`$\dfrac{x + 2}{x + 3}$`,
      [m`$\frac{x+2}{x+3} \to \frac{2}{3}$ by canceling the $x$'s`, "The $x$ terms are not factors, so they cannot be canceled.", "Cancel only whole factors."],
    ),
    ex(
      "ex-rs-monomial",
      "A common monomial factor",
      m`Simplify $\dfrac{4x^2 - 12x}{8x}$.`,
      [
        ["Factor the numerator.", "Both terms contain $4x$.", m`\frac{4x(x - 3)}{8x}`],
        ["Cancel the common factor $4x$.", "$\\frac{4x}{8x} = \\frac{1}{2}$, so a 2 stays in the denominator.", m`\frac{x - 3}{2}`],
      ],
      m`$\dfrac{x - 3}{2}$`,
      ["$x - 3$", "After canceling $4x$, the denominator $8x$ leaves a factor of 2.", "Cancel the whole common factor and keep what is left in the denominator."],
    ),
  ],
  quickCheck: [
    mc("rs-qc-1-1", L, "qc", "e", m`Simplify $\dfrac{5x + 10}{x + 2}$.`,
      ["$5$", ["$5x$", "Factor first: $5x + 10 = 5(x + 2)$. Canceling $x + 2$ leaves 5."], ["$x + 5$", "$x$ and 2 are terms, not factors, so they cannot be canceled."], ["$5x + 5$", "Factor the numerator before canceling."]],
      0, ["Factor the numerator.", "$5x + 10 = 5(x + 2)$.", "Cancel $x + 2$."],
      m`$\frac{5(x + 2)}{x + 2} = 5$.`, ["Factor: $5(x + 2)$.", "Cancel: 5."]),
    num("rs-qc-1-2", L, "qc", "e", m`Simplify $\dfrac{x^2 - 4}{x - 2}$, then evaluate it when $x = 4$.`, 6,
      ["$x^2 - 4$ is a difference of squares.", "$(x + 2)(x - 2)$, so the fraction simplifies to $x + 2$.", "Substitute $x = 4$."],
      m`$\frac{(x + 2)(x - 2)}{x - 2} = x + 2$. When $x = 4$, it equals 6.`, ["Factor and cancel: $x + 2$.", "$4 + 2 = 6$."]),
    mc("rs-qc-1-3", L, "qc", "m", m`Simplify $\dfrac{x^2 - 9}{x + 3}$.`,
      [["$x + 3$", "$x^2 - 9 = (x + 3)(x - 3)$, so the factor left is $x - 3$."], "$x - 3$", ["$x^2 - 3$", "$x^2$ and $3$ are terms, not factors, so they cannot be canceled."], ["$-3$", "Cancel the factor $x + 3$, not the term $x$."]],
      1, ["Factor the numerator.", "$x^2 - 9 = (x + 3)(x - 3)$.", "Cancel the common factor $x + 3$."],
      m`$\frac{(x + 3)(x - 3)}{x + 3} = x - 3$.`, ["Factor.", "Cancel $x + 3$.", "$x - 3$."]),
  ],
});
