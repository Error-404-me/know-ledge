import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "rational-expressions-add-subtract";
const L = "intro-adding-rational-expressions";
const { mc, num } = bank(T);

export const introAddingRationalExpressions: Lesson = lesson(T, 1, {
  id: L,
  title: "Introduction to Adding and Subtracting Rational Expressions",
  summary: "Review adding fractions with the least common denominator, the idea behind all the work in this topic.",
  minutes: 15,
  objectives: [
    "Add and subtract fractions with like denominators",
    "Find the least common multiple and the least common denominator",
    "See how the same steps carry over to rational expressions",
  ],
  introTitle: "Sharing a pizza",
  intro: [
    p(m`You eat $\frac{1}{4}$ of a pizza and your friend eats $\frac{1}{6}$. How much was eaten? The slices are different sizes, so first find a common denominator.`),
    mth(m`\frac{1}{4} + \frac{1}{6} = \frac{3}{12} + \frac{2}{12} = \frac{5}{12}`),
    co("real-life", "Same size slices", "You can only add fractions when the slices are the same size. Rational expressions follow exactly the same rule."),
  ],
  concept: [
    [
      "Like denominators",
      [
        p("When denominators are the same, add or subtract the numerators and keep the denominator."),
        mth(m`\frac{3}{8} + \frac{2}{8} = \frac{5}{8}`),
      ],
    ],
    [
      "LCM and LCD",
      [
        p("The **least common multiple (LCM)** of two numbers is the smallest number that both divide into. The LCM of the denominators is the **least common denominator (LCD)**."),
        table(
          ["Denominators", "LCD"],
          [
            ["$4$ and $6$", "$12$"],
            ["$6$ and $8$", "$24$"],
            ["$3$ and $9$", "$9$"],
          ],
        ),
      ],
    ],
    [
      "What changes with variables",
      [
        p("With rational expressions you take the same steps. The only difference is that the LCD can contain variables, such as $x^2$ or $(x + 1)(x - 1)$."),
        co("remember", "Three steps", "1) Find the LCD. 2) Rewrite each fraction with the LCD. 3) Add or subtract the numerators."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-lcm",
      "Least common multiple",
      "Find the LCM of 6 and 8.",
      [
        ["List multiples of the larger number.", "Multiples of 8: 8, 16, 24, ...", "8, \\ 16, \\ 24"],
        ["Find the first one divisible by 6.", "$24 \\div 6 = 4$, and 8 and 16 are not divisible by 6.", "24"],
      ],
      "$24$",
    ),
    ex(
      "ex-add-fractions",
      "Unlike denominators",
      m`Add $\dfrac{2}{3} + \dfrac{3}{4}$.`,
      [
        ["Find the LCD.", "The LCM of 3 and 4 is 12.", "12"],
        ["Rewrite each fraction with denominator 12.", "$\\frac{2}{3} = \\frac{8}{12}$ and $\\frac{3}{4} = \\frac{9}{12}$.", m`\frac{8}{12} + \frac{9}{12}`],
        ["Add the numerators.", "The denominator stays 12.", m`\frac{17}{12}`],
      ],
      m`$\dfrac{17}{12}$`,
      [m`$\frac{5}{7}$`, "The numerators and denominators were added straight across.", "Rewrite with a common denominator first."],
    ),
  ],
  quickCheck: [
    num("ra-qc-0-1", L, "qc", "e", "What is the LCM of 4 and 10?", 20,
      ["List multiples of 10: 10, 20, 30, ...", "Which is the first multiple of 10 divisible by 4?", "Check 10, then 20."],
      "$20 \\div 4 = 5$, and 10 is not divisible by 4. The LCM is 20.", ["Multiples of 10: 10, 20.", "20 is divisible by 4."],
      [[40, "40 is a common multiple, but 20 is smaller."]]),
    num("ra-qc-0-2", L, "qc", "e", m`Compute $\dfrac{3}{5} + \dfrac{1}{5}$ as a decimal.`, 0.8,
      ["The denominators are the same.", "Add the numerators and keep the denominator.", "$\\frac{4}{5} = ?$ as a decimal."],
      m`$\frac{3 + 1}{5} = \frac{4}{5} = 0.8$.`, ["Add numerators: 4.", "$\\frac{4}{5} = 0.8$."]),
    mc("ra-qc-0-3", L, "qc", "e", m`What is the LCD of $\dfrac{1}{6}$ and $\dfrac{1}{9}$?`,
      [["$54$", "That is a common multiple, but the LCM is smaller."], ["$3$", "The LCD must be a multiple of both 6 and 9."], "$18$", ["$15$", "15 is not divisible by 6 or 9."]],
      2, ["Find the LCM of 6 and 9.", "Multiples of 9: 9, 18, 27, ...", "Which is divisible by 6?"],
      "The LCM of 6 and 9 is 18.", ["Multiples of 9: 9, 18.", "18 is divisible by 6."]),
  ],
});
