import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "rational-expressions-simplify";
const L = "intro-rational-expressions";
const { mc, num } = bank(T);

export const introRationalExpressions: Lesson = lesson(T, 1, {
  id: L,
  title: "Introduction to Rational Expressions",
  summary: "Learn what a rational expression is, which values are not allowed, and how to evaluate one.",
  minutes: 15,
  objectives: [
    "Explain what a rational expression is",
    "Find the values that make a rational expression undefined",
    "Evaluate a rational expression",
  ],
  introTitle: "Sharing a bill",
  intro: [
    p("A group of $n$ friends shares a ₱600 bill equally. Each person pays $\\frac{600}{n}$ pesos. This is a fraction with a variable in the denominator. We call it a **rational expression**."),
    mth(m`\text{each share} = \frac{600}{n}`),
    co("real-life", "Fractions with variables", "Rational expressions behave like the fractions you already know. The only new thing to watch is what happens when the denominator could be zero."),
  ],
  concept: [
    [
      "From fractions to rational expressions",
      [
        co("definition", "Rational expression", "A **rational expression** is a fraction whose numerator and denominator are polynomials, and whose denominator is not zero."),
        table(
          ["Rational number", "Rational expression"],
          [
            [m`$\frac{3}{4}$`, m`$\frac{x + 3}{x - 4}$`],
            [m`$\frac{5}{8}$`, m`$\frac{5}{2x}$`],
            [m`$\frac{7}{1}$`, m`$\frac{x^2 + 1}{3}$`],
          ],
        ),
      ],
    ],
    [
      "Values that are not allowed",
      [
        p("Division by zero is undefined. So we exclude any value of the variable that makes the **denominator** equal to 0."),
        mth(m`\frac{x + 2}{x - 3} \ \text{is undefined when } x = 3`),
        co("warning", "Only the denominator", "A numerator of 0 is fine. Only a zero denominator causes a problem."),
      ],
    ],
    [
      "Evaluating",
      [
        p("Substitute the value for the variable, then simplify the fraction."),
        mth(m`\frac{x + 1}{x - 2} \ \text{at } x = 5: \quad \frac{5 + 1}{5 - 2} = \frac{6}{3} = 2`),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-excluded",
      "Find the excluded value",
      m`For what value of $x$ is $\dfrac{5}{x - 4}$ undefined?`,
      [
        ["Set the denominator equal to zero.", "The expression is undefined when the denominator is 0.", "x - 4 = 0"],
        ["Solve.", "Add 4 to both sides.", "x = 4"],
      ],
      "$x = 4$",
    ),
    ex(
      "ex-evaluate-rational",
      "Evaluate",
      m`Evaluate $\dfrac{2x + 1}{x - 1}$ when $x = 3$.`,
      [
        ["Substitute $x = 3$.", "Replace each $x$ by 3.", m`\frac{2(3) + 1}{3 - 1}`],
        ["Simplify.", "The numerator is 7 and the denominator is 2.", m`\frac{7}{2} = 3.5`],
      ],
      "$3.5$",
    ),
  ],
  quickCheck: [
    num("rs-qc-0-1", L, "qc", "e", m`For what value of $x$ is $\dfrac{7}{x - 6}$ undefined?`, 6,
      ["The expression is undefined when the denominator is 0.", "Solve $x - 6 = 0$.", "Add 6 to both sides."],
      "$x - 6 = 0$ gives $x = 6$.", ["Set the denominator to 0.", "$x = 6$."]),
    mc("rs-qc-0-2", L, "qc", "e", m`For which value of $x$ is $\dfrac{3}{x + 2}$ undefined?`,
      ["$-2$", ["$2$", "Set the denominator equal to 0: $x + 2 = 0$ gives $x = -2$."], ["$0$", "When $x = 0$ the denominator is 2, which is fine."], ["$3$", "The numerator does not matter; only the denominator can cause a problem."]],
      0, ["Set the denominator equal to 0.", "$x + 2 = 0$.", "Subtract 2 from both sides."],
      "$x + 2 = 0$ gives $x = -2$.", ["Denominator $= 0$.", "$x = -2$."]),
    num("rs-qc-0-3", L, "qc", "m", m`Evaluate $\dfrac{2x + 1}{x - 1}$ when $x = 3$. (Type a decimal or a fraction.)`, 3.5,
      ["Substitute $x = 3$.", "$\\frac{2(3) + 1}{3 - 1}$.", "$\\frac{7}{2}$."],
      m`$\frac{2(3) + 1}{3 - 1} = \frac{7}{2} = 3.5$.`, ["Substitute.", "$\\frac{7}{2} = 3.5$."]),
  ],
});
