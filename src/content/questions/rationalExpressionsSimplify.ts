import type { Question } from "@/types/content";
import { bank, m } from "./bank";

const T = "rational-expressions-simplify";
const S = "simplifying-rational-expressions";
const M = "multiplying-dividing-rational";
const { mc, num } = bank(T);

/** Practice and assessment questions. Quick-check questions live inside each lesson file. */
export const questions: Question[] = [
  num("rs-p-0-1", "intro-rational-expressions", "p", "e", m`Evaluate $\dfrac{x + 3}{x - 1}$ when $x = 5$.`, 2,
    ["Substitute $x = 5$.", "$\\frac{5 + 3}{5 - 1}$.", "$\\frac{8}{4}$."],
    m`$\frac{5 + 3}{5 - 1} = \frac{8}{4} = 2$.`, ["Substitute.", "$\\frac{8}{4} = 2$."]),
  num("rs-p-0-2", "intro-rational-expressions", "p", "m", m`For what value of $x$ is $\dfrac{3}{2x - 10}$ undefined?`, 5,
    ["The expression is undefined when the denominator is 0.", "Solve $2x - 10 = 0$.", "Add 10, then divide by 2."],
    "$2x - 10 = 0$ gives $2x = 10$, so $x = 5$.", ["Set the denominator to 0.", "$2x = 10$.", "$x = 5$."]),
  num("rs-a-0-1", "intro-rational-expressions", "a", "m", m`Evaluate $\dfrac{x^2 - 1}{x + 1}$ when $x = 4$.`, 3,
    ["Substitute $x = 4$.", "$\\frac{16 - 1}{4 + 1}$.", "$\\frac{15}{5}$."],
    m`$\frac{4^2 - 1}{4 + 1} = \frac{15}{5} = 3$.`, ["Numerator: $16 - 1 = 15$.", "Denominator: 5.", "$15 \\div 5 = 3$."]),
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
