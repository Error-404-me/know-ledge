import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p } from "../../questions/bank";

const T = "rational-expressions-add-subtract";
const L = "like-denominators";
const { mc, num } = bank(T);

export const likeDenominators: Lesson = lesson(T, 2, {
  id: L,
  title: "Like Denominators",
  summary: "Add and subtract rational expressions that already share a denominator.",
  minutes: 15,
  objectives: [
    "Add rational expressions with the same denominator",
    "Subtract them, changing every sign in the second numerator",
    "Simplify the result",
  ],
  introTitle: "Same-size slices",
  intro: [
    p(m`$\frac{3}{8} + \frac{2}{8} = \frac{5}{8}$. When the slices are the same size, you just count the slices and keep the denominator.`),
    mth(m`\frac{2x + 1}{5} + \frac{x + 3}{5} = \frac{3x + 4}{5}`),
    co("remember", "Rule", "With a common denominator, add or subtract the numerators and keep the denominator."),
  ],
  concept: [
    [
      "Adding",
      [
        p("Add the numerators and keep the denominator. Then see whether the result simplifies."),
        mth(m`\frac{x^2}{x + 3} + \frac{6x + 9}{x + 3} = \frac{x^2 + 6x + 9}{x + 3} = \frac{(x + 3)^2}{x + 3} = x + 3`),
      ],
    ],
    [
      "Subtracting",
      [
        p("Put the second numerator in parentheses. The minus sign changes **every** sign inside it."),
        mth(m`\frac{5x + 2}{x + 1} - \frac{2x - 1}{x + 1} = \frac{5x + 2 - 2x + 1}{x + 1} = \frac{3x + 3}{x + 1} = 3`),
        co("warning", "Flip every sign", "$-(2x - 1) = -2x + 1$. Forgetting to flip the second sign is the most common error."),
      ],
    ],
    [
      "Simplify after combining",
      [
        p("After you combine the numerators, factor the numerator and see whether it cancels with the denominator."),
        mth(m`\frac{x + 4}{x + 2} + \frac{x}{x + 2} = \frac{2x + 4}{x + 2} = \frac{2(x + 2)}{x + 2} = 2`),
        co("tip", "Always look", "A result that looks messy often simplifies to something short."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-ra-like",
      "Subtract and simplify",
      m`Simplify $\dfrac{7x - 4}{x - 2} - \dfrac{3x + 4}{x - 2}$.`,
      [
        ["Combine over the common denominator, using parentheses.", "The minus applies to the whole second numerator.", m`\frac{(7x - 4) - (3x + 4)}{x - 2}`],
        ["Remove the parentheses and combine.", "$7x - 3x = 4x$ and $-4 - 4 = -8$.", m`\frac{4x - 8}{x - 2}`],
        ["Factor and cancel.", "$4x - 8 = 4(x - 2)$.", "4"],
      ],
      "$4$",
      [m`$\frac{4x}{x - 2}$`, "The $+4$ was not changed to $-4$, and the constants were not combined.", "Use parentheses around the second numerator."],
    ),
    ex(
      "ex-ra-like2",
      "Subtract and simplify",
      m`Simplify $\dfrac{3x + 5}{x + 1} - \dfrac{x + 3}{x + 1}$.`,
      [
        ["Combine over the common denominator.", "Put the second numerator in parentheses.", m`\frac{(3x + 5) - (x + 3)}{x + 1}`],
        ["Remove the parentheses and combine.", "$3x - x = 2x$ and $5 - 3 = 2$.", m`\frac{2x + 2}{x + 1}`],
        ["Factor and cancel.", "$2x + 2 = 2(x + 1)$.", "2"],
      ],
      "$2$",
      [m`$\frac{2x + 8}{x + 1}$`, "The $+3$ must be subtracted: $5 - 3 = 2$, not $5 + 3$.", "Put the second numerator in parentheses."],
    ),
  ],
  quickCheck: [
    mc("ra-qc-1-1", L, "qc", "e", m`Add: $\dfrac{3x + 2}{7} + \dfrac{2x - 1}{7}$.`,
      [[m`$\dfrac{5x + 3}{7}$`, "The second constant is $-1$, so $2 + (-1) = 1$."], [m`$\dfrac{5x + 1}{14}$`, "Keep the denominator; do not add denominators."], m`$\dfrac{5x + 1}{7}$`, [m`$\dfrac{6x^2 - 2}{7}$`, "Add the numerators; do not multiply them."]],
      2, ["The denominators match, so add the numerators.", "$(3x + 2) + (2x - 1)$.", "Keep the denominator 7."],
      m`$\frac{(3x + 2) + (2x - 1)}{7} = \frac{5x + 1}{7}$.`, ["Add numerators: $5x + 1$.", "Keep 7."]),
    num("ra-qc-1-2", L, "qc", "m", m`$\dfrac{5x - 1}{x + 2} - \dfrac{3x - 5}{x + 2}$ simplifies to a whole number. What is it?`, 2,
      ["Subtract the numerators, flipping every sign of the second.", "$5x - 1 - 3x + 5 = 2x + 4$.", "Factor: $2x + 4 = 2(x + 2)$."],
      m`$\frac{2x + 4}{x + 2} = \frac{2(x + 2)}{x + 2} = 2$.`, ["Numerator: $2x + 4$.", "Factor and cancel: 2."]),
    num("ra-qc-1-3", L, "qc", "m", m`$\dfrac{7x + 9}{x + 1} - \dfrac{4x + 6}{x + 1}$ simplifies to a whole number. What is it?`, 3,
      ["Subtract the numerators, flipping every sign of the second.", "$7x + 9 - 4x - 6 = 3x + 3$.", "Factor: $3x + 3 = 3(x + 1)$."],
      m`$\frac{3x + 3}{x + 1} = \frac{3(x + 1)}{x + 1} = 3$.`, ["Numerator: $3x + 3$.", "Factor and cancel: 3."]),
  ],
});
