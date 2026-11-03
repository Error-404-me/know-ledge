import type { Question } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "rational-expressions-add-subtract";
const L = "like-denominators";
const U = "unlike-denominators";
const { mc, num } = bank(T);

export const lessons = [
  lesson(T, 1, {
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
    ],
    quickCheck: [
      mc("ra-qc-1-1", L, "qc", "e", m`Add: $\dfrac{3x + 2}{7} + \dfrac{2x - 1}{7}$.`,
        [[m`$\dfrac{5x + 3}{7}$`, "The second constant is $-1$, so $2 + (-1) = 1$."], [m`$\dfrac{5x + 1}{14}$`, "Keep the denominator; do not add denominators."], m`$\dfrac{5x + 1}{7}$`, [m`$\dfrac{6x^2 - 2}{7}$`, "Add the numerators; do not multiply them."]],
        2, ["The denominators match, so add the numerators.", "$(3x + 2) + (2x - 1)$.", "Keep the denominator 7."],
        m`$\frac{(3x + 2) + (2x - 1)}{7} = \frac{5x + 1}{7}$.`, ["Add numerators: $5x + 1$.", "Keep 7."]),
      num("ra-qc-1-2", L, "qc", "m", m`$\dfrac{5x - 1}{x + 2} - \dfrac{3x - 5}{x + 2}$ simplifies to a whole number. What is it?`, 2,
        ["Subtract the numerators, flipping every sign of the second.", "$5x - 1 - 3x + 5 = 2x + 4$.", "Factor: $2x + 4 = 2(x + 2)$."],
        m`$\frac{2x + 4}{x + 2} = \frac{2(x + 2)}{x + 2} = 2$.`, ["Numerator: $2x + 4$.", "Factor and cancel: 2."]),
    ],
  }),
  lesson(T, 2, {
    id: U,
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
      mc("ra-qc-2-1", U, "qc", "e", m`What is the LCD of $\dfrac{1}{3x}$ and $\dfrac{1}{4x^2}$?`,
        ["$12x^2$", ["$12x$", "Use the larger power of $x$, which is $x^2$."], ["$7x^2$", "Multiply the numbers: $3 \\cdot 4 = 12$, not $3 + 4$."], ["$12x^3$", "Do not multiply the variable parts; use the largest power, $x^2$."]],
        0, ["Find the LCM of 3 and 4.", "Take the largest power of $x$.", "12 and $x^2$."],
        "The LCM of 3 and 4 is 12, and the largest power of $x$ is $x^2$.", ["Numbers: 12.", "Variable: $x^2$.", "LCD: $12x^2$."]),
      num("ra-qc-2-2", U, "qc", "m", m`$\dfrac{3}{x} + \dfrac{2}{x^2}$ equals $\dfrac{3x + 2}{x^2}$. What is its value when $x = 2$?`, 2,
        ["Substitute $x = 2$ into $\\frac{3x + 2}{x^2}$.", "$\\frac{3(2) + 2}{4}$.", "$\\frac{8}{4}$."],
        m`$\frac{3(2) + 2}{2^2} = \frac{8}{4} = 2$. Check: $\frac{3}{2} + \frac{2}{4} = 1.5 + 0.5 = 2$.`, ["Substitute.", "$\\frac{8}{4} = 2$."]),
    ],
  }),
];

export const questions: Question[] = [
  mc("ra-p-1-1", L, "p", "e", m`Subtract: $\dfrac{2a + 5}{9} - \dfrac{a + 1}{9}$.`,
    [[m`$\dfrac{a + 6}{9}$`, "The $+1$ becomes $-1$, so $5 - 1 = 4$."], m`$\dfrac{a + 4}{9}$`, [m`$\dfrac{3a + 6}{9}$`, "Subtract, do not add, the second numerator."], [m`$\dfrac{a + 4}{18}$`, "Keep the denominator 9; do not add the denominators."]],
    1, ["Put the second numerator in parentheses.", "$(2a + 5) - (a + 1)$.", "Change both signs of the second."],
    m`$\frac{2a + 5 - a - 1}{9} = \frac{a + 4}{9}$.`, ["Subtract numerators.", "Keep the denominator."]),
  mc("ra-p-1-2", L, "p", "c", m`Simplify completely: $\dfrac{x^2}{x - 3} - \dfrac{9}{x - 3}$.`,
    ["$x + 3$", [m`$x - 3$`, "$x^2 - 9 = (x + 3)(x - 3)$, so $x + 3$ is left."], [m`$\dfrac{x^2 - 9}{x - 3}$`, "This is correct but not simplified. Factor the numerator and cancel."], [m`$x + 9$`, "Subtract the numerators first: $x^2 - 9$."]],
    0, ["Subtract the numerators over the common denominator.", "$x^2 - 9$ is a difference of squares.", "Factor and cancel $x - 3$."],
    m`$\frac{x^2 - 9}{x - 3} = \frac{(x + 3)(x - 3)}{x - 3} = x + 3$.`, ["Subtract numerators.", "Factor.", "Cancel."]),
  mc("ra-p-2-1", U, "p", "e", m`Add: $\dfrac{2}{x} + \dfrac{3}{2x}$.`,
    [[m`$\dfrac{5}{3x}$`, "Do not add denominators. Use the LCD, $2x$."], m`$\dfrac{7}{2x}$`, [m`$\dfrac{5}{2x}$`, "Rewrite $\\frac{2}{x}$ as $\\frac{4}{2x}$ first, then add: $4 + 3 = 7$."], [m`$\dfrac{6}{x}$`, "Do not multiply the fractions. Add them over the LCD."]],
    1, ["The LCD is $2x$.", "Rewrite $\\frac{2}{x}$ with denominator $2x$.", "$\\frac{4}{2x} + \\frac{3}{2x}$."],
    m`$\frac{2}{x} = \frac{4}{2x}$, so $\frac{4}{2x} + \frac{3}{2x} = \frac{7}{2x}$.`, ["LCD: $2x$.", "Rewrite.", "Add numerators: 7."]),
  mc("ra-p-2-2", U, "p", "c", m`Add: $\dfrac{1}{x - 2} + \dfrac{1}{x + 2}$.`,
    [[m`$\dfrac{2}{x^2 - 4}$`, "Rewrite each fraction over $(x - 2)(x + 2)$ first. The numerators become $x + 2$ and $x - 2$."], m`$\dfrac{2x}{x^2 - 4}$`, [m`$\dfrac{2}{2x}$`, "Do not add denominators. Use the LCD $(x - 2)(x + 2)$."], [m`$\dfrac{x}{x^2 - 4}$`, "$(x + 2) + (x - 2) = 2x$, not $x$."]],
    1, ["The LCD is $(x - 2)(x + 2)$.", "Numerators become $(x + 2)$ and $(x - 2)$.", "Add them."],
    m`$\frac{(x + 2) + (x - 2)}{(x - 2)(x + 2)} = \frac{2x}{x^2 - 4}$.`, ["LCD.", "Rewrite.", "Add numerators: $2x$."]),
  mc("ra-a-1-1", L, "a", "m", m`Subtract and simplify: $\dfrac{5x + 3}{2x} - \dfrac{x - 1}{2x}$.`,
    [[m`$\dfrac{4x + 4}{2x}$`, "Correct so far, but it can be simplified further by dividing top and bottom by 2."], [m`$\dfrac{4x + 2}{2x}$`, "$-(x - 1) = -x + 1$, so $3 + 1 = 4$."], [m`$\dfrac{6x + 2}{2x}$`, "Subtract the numerators: $5x - x = 4x$."], m`$\dfrac{2x + 2}{x}$`],
    3, ["Subtract the numerators, changing both signs of the second.", "$5x + 3 - x + 1 = 4x + 4$.", "Divide top and bottom by 2."],
    m`$\frac{4x + 4}{2x} = \frac{2(2x + 2)}{2x} = \frac{2x + 2}{x}$.`, ["Numerator: $4x + 4$.", "Cancel the common factor 2.", "$\\frac{2x + 2}{x}$."]),
  num("ra-a-1-2", L, "a", "m", m`$\dfrac{x^2}{x + 1} + \dfrac{2x + 1}{x + 1}$ simplifies to $x + 1$. What is its value when $x = 6$?`, 7,
    ["Add the numerators: $x^2 + 2x + 1$.", "That is $(x + 1)^2$.", "Cancel one $x + 1$, then substitute $x = 6$."],
    m`$\frac{(x + 1)^2}{x + 1} = x + 1$. With $x = 6$ the value is 7.`, ["Numerator: $(x + 1)^2$.", "Simplify: $x + 1$.", "$6 + 1 = 7$."]),
  mc("ra-a-2-1", U, "a", "m", m`Subtract: $\dfrac{5}{6x} - \dfrac{1}{3x}$.`,
    [[m`$\dfrac{4}{3x}$`, "Do not subtract denominators. Use the LCD $6x$."], [m`$\dfrac{4}{6x}$`, "Rewrite $\\frac{1}{3x}$ as $\\frac{2}{6x}$ first. The numerator is $5 - 2 = 3$, not 4."], m`$\dfrac{1}{2x}$`, [m`$\dfrac{3}{6x}$`, "This is correct but not simplified: divide top and bottom by 3."]],
    2, ["The LCD is $6x$.", "$\\frac{1}{3x} = \\frac{2}{6x}$.", "Subtract: $\\frac{5 - 2}{6x}$."],
    m`$\frac{5}{6x} - \frac{2}{6x} = \frac{3}{6x} = \frac{1}{2x}$.`, ["Rewrite over $6x$.", "Subtract: $\\frac{3}{6x}$.", "Simplify: $\\frac{1}{2x}$."]),
  num("ra-a-2-2", U, "a", "c", m`$\dfrac{1}{x + 1} + \dfrac{1}{x - 1} = \dfrac{2x}{x^2 - 1}$. What is its value when $x = 3$?`, 0.75,
    ["Substitute $x = 3$ into $\\frac{2x}{x^2 - 1}$.", "$\\frac{6}{9 - 1}$.", "Simplify $\\frac{6}{8}$. You may type 3/4 or 0.75."],
    m`$\frac{2(3)}{3^2 - 1} = \frac{6}{8} = \frac{3}{4}$. Check: $\frac{1}{4} + \frac{1}{2} = \frac{3}{4}$.`, ["Substitute.", "$\\frac{6}{8} = \\frac{3}{4} = 0.75$."]),
];
