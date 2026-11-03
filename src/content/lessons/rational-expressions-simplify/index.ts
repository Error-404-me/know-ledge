import type { Question } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "rational-expressions-simplify";
const S = "simplifying-rational-expressions";
const M = "multiplying-dividing-rational";
const { mc, num } = bank(T);

export const lessons = [
  lesson(T, 1, {
    id: S,
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
    ],
    quickCheck: [
      mc("rs-qc-1-1", S, "qc", "e", m`Simplify $\dfrac{5x + 10}{x + 2}$.`,
        ["$5$", ["$5x$", "Factor first: $5x + 10 = 5(x + 2)$. Canceling $x + 2$ leaves 5."], ["$x + 5$", "$x$ and 2 are terms, not factors, so they cannot be canceled."], ["$5x + 5$", "Factor the numerator before canceling."]],
        0, ["Factor the numerator.", "$5x + 10 = 5(x + 2)$.", "Cancel $x + 2$."],
        m`$\frac{5(x + 2)}{x + 2} = 5$.`, ["Factor: $5(x + 2)$.", "Cancel: 5."]),
      num("rs-qc-1-2", S, "qc", "e", m`Simplify $\dfrac{x^2 - 4}{x - 2}$, then evaluate it when $x = 4$.`, 6,
        ["$x^2 - 4$ is a difference of squares.", "$(x + 2)(x - 2)$, so the fraction simplifies to $x + 2$.", "Substitute $x = 4$."],
        m`$\frac{(x + 2)(x - 2)}{x - 2} = x + 2$. When $x = 4$, it equals 6.`, ["Factor and cancel: $x + 2$.", "$4 + 2 = 6$."]),
    ],
  }),
  lesson(T, 2, {
    id: M,
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
      mc("rs-qc-2-1", M, "qc", "e", m`Multiply: $\dfrac{3}{x} \cdot \dfrac{x^2}{6}$.`,
        [m`$\dfrac{x}{2}$`, [m`$\dfrac{x^2}{2}$`, "Cancel a factor of $x$ as well: $\\frac{x^2}{x} = x$."], [m`$\dfrac{1}{2x}$`, "$x^2$ is in the numerator, so the $x$ stays on top."], [m`$2x$`, "$\\frac{3}{6} = \\frac{1}{2}$, so the 2 is in the denominator."]],
        0, ["Multiply across: $\\frac{3x^2}{6x}$.", "Cancel the common numbers and powers of $x$.", "$\\frac{3}{6} = \\frac{1}{2}$ and $\\frac{x^2}{x} = x$."],
        m`$\frac{3x^2}{6x} = \frac{x}{2}$.`, ["Multiply: $\\frac{3x^2}{6x}$.", "Simplify: $\\frac{x}{2}$."]),
      num("rs-qc-2-2", M, "qc", "m", m`Simplify $\dfrac{x + 1}{2} \div \dfrac{x + 1}{6}$ to a single number.`, 3,
        ["Flip the second fraction and multiply.", m`$\frac{x + 1}{2} \cdot \frac{6}{x + 1}$.`, "Cancel $x + 1$."],
        m`$\frac{x + 1}{2} \cdot \frac{6}{x + 1} = \frac{6}{2} = 3$.`, ["Flip and multiply.", "Cancel $x + 1$.", "$\\frac{6}{2} = 3$."]),
    ],
  }),
];

export const questions: Question[] = [
  mc("rs-p-1-1", S, "p", "e", m`Simplify $\dfrac{6x^2}{9x}$.`,
    [m`$\dfrac{2x}{3}$`, [m`$\dfrac{2}{3}$`, "$x^2 \\div x = x$, so one $x$ stays."], [m`$\dfrac{3x}{2}$`, "$\\frac{6}{9} = \\frac{2}{3}$, not $\\frac{3}{2}$."], [m`$\dfrac{2x^2}{3}$`, "Cancel one $x$ from $x^2$ and $x$."]],
    0, ["Simplify the numbers: $\\frac{6}{9}$.", "Simplify the variables: $\\frac{x^2}{x}$.", "Combine."],
    m`$\frac{6}{9} = \frac{2}{3}$ and $\frac{x^2}{x} = x$, so the result is $\frac{2x}{3}$.`, ["Numbers: $\\frac{2}{3}$.", "Variables: $x$.", "$\\frac{2x}{3}$."]),
  mc("rs-p-1-2", S, "p", "c", m`Simplify $\dfrac{x^2 + 5x + 6}{x^2 - 4}$.`,
    [[m`$\dfrac{x + 3}{x + 2}$`, "The common factor is $x + 2$; the denominator becomes $x - 2$."], m`$\dfrac{x + 3}{x - 2}$`, [m`$\dfrac{5x + 6}{-4}$`, "$x^2$ is a term, not a factor, so it cannot be canceled."], [m`$\dfrac{x + 2}{x - 3}$`, "Check the factors: $x^2 + 5x + 6 = (x + 2)(x + 3)$."]],
    1, ["Factor the numerator and the denominator.", "$(x + 2)(x + 3)$ and $(x + 2)(x - 2)$.", "Cancel the common factor."],
    m`$\frac{(x + 2)(x + 3)}{(x + 2)(x - 2)} = \frac{x + 3}{x - 2}$.`, ["Factor both.", "Cancel $x + 2$.", "$\\frac{x + 3}{x - 2}$."]),
  mc("rs-p-2-1", M, "p", "e", m`Multiply: $\dfrac{2}{5} \cdot \dfrac{10}{x}$.`,
    [[m`$\dfrac{12}{5x}$`, "Multiply the numerators ($2 \\cdot 10 = 20$) and cancel with the denominator."], m`$\dfrac{4}{x}$`, [m`$\dfrac{20}{x}$`, "Cancel the 5: $\\frac{20}{5x} = \\frac{4}{x}$."], [m`$\dfrac{1}{x}$`, "$2 \\cdot 10 = 20$ and $20 \\div 5 = 4$."]],
    1, ["Multiply the tops and the bottoms.", "$\\frac{20}{5x}$.", "Cancel the common factor of 5."],
    m`$\frac{2 \cdot 10}{5x} = \frac{20}{5x} = \frac{4}{x}$.`, ["Multiply across: $\\frac{20}{5x}$.", "Simplify: $\\frac{4}{x}$."]),
  mc("rs-p-2-2", M, "p", "c", m`Simplify $\dfrac{x^2 - 4}{x} \div \dfrac{x - 2}{x^2}$.`,
    [["$x(x - 2)$", "Flip the second fraction: you get $(x + 2)$, not $(x - 2)$ left over."], "$x(x + 2)$", [m`$\dfrac{x + 2}{x}$`, "After flipping, $x^2$ is in the numerator, so $\\frac{x^2}{x} = x$."], [m`$\dfrac{x - 2}{x^2}$`, "That is the second fraction itself. Flip it and multiply."]],
    1, ["Flip the second fraction and multiply.", "$\\frac{(x + 2)(x - 2)}{x} \\cdot \\frac{x^2}{x - 2}$.", "Cancel $x - 2$ and one $x$."],
    m`$\frac{(x + 2)(x - 2)}{x} \cdot \frac{x^2}{x - 2} = x(x + 2)$.`, ["Flip and multiply.", "Factor and cancel.", "$x(x + 2)$."]),
  mc("rs-a-1-1", S, "a", "m", m`Simplify $\dfrac{2x^2 - 8x}{2x}$.`,
    [[m`$x^2 - 4x$`, "Divide by $2x$, not just by 2."], [m`$2x - 4$`, "$\\frac{2x^2}{2x} = x$, not $2x$."], [m`$x - 8x$`, "Factor the top first: $2x(x - 4)$."], "$x - 4$"],
    3, ["Factor the numerator.", "$2x^2 - 8x = 2x(x - 4)$.", "Cancel $2x$."],
    m`$\frac{2x(x - 4)}{2x} = x - 4$.`, ["Factor: $2x(x - 4)$.", "Cancel $2x$: $x - 4$."]),
  num("rs-a-1-2", S, "a", "m", m`Simplify $\dfrac{x^2 - 9}{x^2 - 6x + 9}$, then evaluate it when $x = 5$.`, 4,
    ["$x^2 - 9 = (x + 3)(x - 3)$.", "$x^2 - 6x + 9 = (x - 3)^2$.", "The fraction simplifies to $\\frac{x + 3}{x - 3}$."],
    m`$\frac{(x + 3)(x - 3)}{(x - 3)(x - 3)} = \frac{x + 3}{x - 3}$. When $x = 5$: $\frac{8}{2} = 4$.`, ["Factor and cancel.", "Substitute: $\\frac{8}{2} = 4$."]),
  mc("rs-a-2-1", M, "a", "m", m`Simplify $\dfrac{x}{x - 5} \cdot \dfrac{x^2 - 25}{x^2}$.`,
    [[m`$\dfrac{x - 5}{x}$`, "$x^2 - 25 = (x + 5)(x - 5)$, so $x + 5$ is left."], m`$\dfrac{x + 5}{x}$`, [m`$\dfrac{x + 5}{x^2}$`, "One $x$ in the numerator cancels one $x$ from $x^2$, leaving $x$."], [m`$x + 5$`, "One $x$ remains in the denominator."]],
    1, ["Factor $x^2 - 25$.", "$\\frac{x}{x - 5} \\cdot \\frac{(x + 5)(x - 5)}{x^2}$.", "Cancel $x - 5$ and one $x$."],
    m`$\frac{x(x + 5)(x - 5)}{(x - 5)x^2} = \frac{x + 5}{x}$.`, ["Factor.", "Cancel.", "$\\frac{x + 5}{x}$."]),
  num("rs-a-2-2", M, "a", "m", m`$\dfrac{x + 2}{x - 1} \div \dfrac{x + 2}{x + 3}$ simplifies to $\dfrac{x + 3}{x - 1}$. What is its value when $x = 3$?`, 3,
    ["Substitute $x = 3$ into the simplified form.", m`$\frac{3 + 3}{3 - 1}$.`, "Compute $\\frac{6}{2}$."],
    m`Flip and cancel $x + 2$ to get $\frac{x + 3}{x - 1}$. With $x = 3$: $\frac{6}{2} = 3$.`, ["Simplified form: $\\frac{x + 3}{x - 1}$.", "$\\frac{6}{2} = 3$."]),
];
