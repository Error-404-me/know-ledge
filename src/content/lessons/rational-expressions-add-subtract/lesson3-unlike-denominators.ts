import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "rational-expressions-add-subtract";
const L = "unlike-denominators";
const { mc, num } = bank(T);

export const unlikeDenominators: Lesson = lesson(T, 3, {
  id: L,
  title: "Unlike Denominators",
  summary: "Find the least common denominator, rewrite each fraction, then add or subtract.",
  minutes: 22,
  objectives: [
    "Find the least common denominator (LCD)",
    "Rewrite each expression with the LCD",
    "Add and subtract, then simplify",
  ],
  introTitle: "Different-size slices",
  intro: [
    p(m`$\frac{1}{2} + \frac{1}{3}$: the slices are different sizes, so cut both into sixths: $\frac{3}{6} + \frac{2}{6} = \frac{5}{6}$.`),
    co("remember", "Same plan", "Find a common denominator, rewrite each fraction so it has that denominator, then add or subtract the numerators."),
  ],
  concept: [
    [
      "Find the LCD",
      [
        p("Take every factor that appears in any denominator, using the **largest** power of each."),
        table(
          ["Denominators", "LCD"],
          [
            ["$x$ and $x^2$", "$x^2$"],
            ["$2x$ and $3$", "$6x$"],
            ["$x + 1$ and $x - 1$", "$(x + 1)(x - 1)$"],
          ],
        ),
      ],
    ],
    [
      "Rewrite and combine",
      [
        p("Multiply the top and the bottom of each fraction by whatever is missing from its denominator."),
        mth(m`\frac{2}{x} + \frac{3}{x^2} = \frac{2x}{x^2} + \frac{3}{x^2} = \frac{2x + 3}{x^2}`),
        mth(m`\frac{1}{x + 1} + \frac{1}{x - 1} = \frac{(x - 1) + (x + 1)}{(x + 1)(x - 1)} = \frac{2x}{x^2 - 1}`),
        co("warning", "Top and bottom", "Multiply the numerator by the same factor you multiply the denominator by. Changing only the bottom changes the value."),
      ],
    ],
    [
      "When one denominator is a multiple of the other",
      [
        p("If one denominator is already a multiple of the other, it is the LCD. Only the other fraction needs rewriting."),
        mth(m`\frac{5}{x} + \frac{1}{3x} = \frac{15}{3x} + \frac{1}{3x} = \frac{16}{3x}`),
        co("tip", "Multiply top and bottom", "To rewrite $\\frac{5}{x}$ with denominator $3x$, multiply both the numerator and the denominator by 3."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-ra-unlike1",
      "A number and a variable",
      m`Add $\dfrac{3}{2x} + \dfrac{1}{4}$.`,
      [
        ["Find the LCD.", "The denominators are $2x$ and 4, so the LCD is $4x$.", "4x"],
        ["Rewrite each fraction with denominator $4x$.", "Multiply the first by $\\frac{2}{2}$ and the second by $\\frac{x}{x}$.", m`\frac{6}{4x} + \frac{x}{4x}`],
        ["Add the numerators.", "The denominator stays $4x$.", m`\frac{x + 6}{4x}`],
      ],
      m`$\dfrac{x + 6}{4x}$`,
    ),
    ex(
      "ex-ra-unlike2",
      "Two binomial denominators",
      m`Subtract $\dfrac{2}{x + 1} - \dfrac{1}{x - 1}$.`,
      [
        ["The LCD is the product of the two denominators.", "They share no factor.", m`(x + 1)(x - 1)`],
        ["Rewrite each fraction.", "Multiply the first by $\\frac{x - 1}{x - 1}$ and the second by $\\frac{x + 1}{x + 1}$.", m`\frac{2(x - 1) - (x + 1)}{(x + 1)(x - 1)}`],
        ["Simplify the numerator.", "$2x - 2 - x - 1 = x - 3$. Remember to change both signs of the second numerator.", m`\frac{x - 3}{x^2 - 1}`],
      ],
      m`$\dfrac{x - 3}{x^2 - 1}$`,
    ),
  ],
  quickCheck: [
    mc("ra-qc-2-1", L, "qc", "e", m`What is the LCD of $\dfrac{1}{3x}$ and $\dfrac{1}{4x^2}$?`,
      ["$12x^2$", ["$12x$", "Use the larger power of $x$, which is $x^2$."], ["$7x^2$", "Multiply the numbers: $3 \\cdot 4 = 12$, not $3 + 4$."], ["$12x^3$", "Do not multiply the variable parts; use the largest power, $x^2$."]],
      0, ["Find the LCM of 3 and 4.", "Take the largest power of $x$.", "12 and $x^2$."],
      "The LCM of 3 and 4 is 12, and the largest power of $x$ is $x^2$.", ["Numbers: 12.", "Variable: $x^2$.", "LCD: $12x^2$."]),
    num("ra-qc-2-2", L, "qc", "m", m`$\dfrac{3}{x} + \dfrac{2}{x^2}$ equals $\dfrac{3x + 2}{x^2}$. What is its value when $x = 2$?`, 2,
      ["Substitute $x = 2$ into $\\frac{3x + 2}{x^2}$.", "$\\frac{3(2) + 2}{4}$.", "$\\frac{8}{4}$."],
      m`$\frac{3(2) + 2}{2^2} = \frac{8}{4} = 2$. Check: $\frac{3}{2} + \frac{2}{4} = 1.5 + 0.5 = 2$.`, ["Substitute.", "$\\frac{8}{4} = 2$."]),
    mc("ra-qc-2-3", L, "qc", "m", m`Add: $\dfrac{1}{x} + \dfrac{1}{2x}$.`,
      [[m`$\dfrac{2}{3x}$`, "Do not add denominators. Use the LCD $2x$."], m`$\dfrac{3}{2x}$`, [m`$\dfrac{2}{2x}$`, "Rewrite $\\frac{1}{x}$ as $\\frac{2}{2x}$ first; then $2 + 1 = 3$."], [m`$\dfrac{3}{2x^2}$`, "The LCD is $2x$, not $2x^2$."]],
      1, ["The LCD is $2x$.", "$\\frac{1}{x} = \\frac{2}{2x}$.", "Add the numerators."],
      m`$\frac{2}{2x} + \frac{1}{2x} = \frac{3}{2x}$.`, ["Rewrite over $2x$.", "Add: $\\frac{3}{2x}$."]),
  ],
});
