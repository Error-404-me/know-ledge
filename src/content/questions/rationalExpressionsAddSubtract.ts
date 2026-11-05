import type { Question } from "@/types/content";
import { bank, m } from "./bank";

const T = "rational-expressions-add-subtract";
const L = "like-denominators";
const U = "unlike-denominators";
const { mc, num } = bank(T);

/** Practice and assessment questions. Quick-check questions live inside each lesson file. */
export const questions: Question[] = [
  num("ra-p-0-1", "intro-adding-rational-expressions", "p", "e", "What is the LCM of 12 and 18?", 36,
    ["List multiples of 18: 18, 36, 54, ...", "Which is the first one divisible by 12?", "Check 18, then 36."],
    "$36 \\div 12 = 3$, and 18 is not divisible by 12. The LCM is 36.", ["Multiples of 18: 18, 36.", "36 is divisible by 12."]),
  num("ra-p-0-2", "intro-adding-rational-expressions", "p", "m", m`Compute $\dfrac{1}{2} + \dfrac{1}{3} + \dfrac{1}{6}$.`, 1,
    ["The LCD is 6.", "$\\frac{3}{6} + \\frac{2}{6} + \\frac{1}{6}$.", "Add the numerators."],
    m`$\frac{3 + 2 + 1}{6} = \frac{6}{6} = 1$.`, ["Rewrite over 6.", "Add numerators: 6.", "$\\frac{6}{6} = 1$."]),
  num("ra-a-0-1", "intro-adding-rational-expressions", "a", "m", m`Compute $\dfrac{3}{4} + \dfrac{1}{2}$ as a decimal.`, 1.25,
    ["The LCD is 4.", "$\\frac{1}{2} = \\frac{2}{4}$.", "$\\frac{3}{4} + \\frac{2}{4}$."],
    m`$\frac{3}{4} + \frac{2}{4} = \frac{5}{4} = 1.25$.`, ["Rewrite $\\frac{1}{2}$ as $\\frac{2}{4}$.", "Add: $\\frac{5}{4} = 1.25$."]),
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
