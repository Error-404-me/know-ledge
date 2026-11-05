import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "polynomials-multiply-divide";
const L = "exponent-laws";
const { mc, num } = bank(T);

export const exponentLaws: Lesson = lesson(T, 2, {
  id: L,
  title: "Laws of Exponents",
  summary: "Use the product, quotient and power laws to simplify expressions with exponents.",
  minutes: 18,
  objectives: [
    "Multiply and divide powers with the same base",
    "Raise a power or a product to a power",
    "Simplify expressions that combine several laws",
  ],
  introTitle: "Counting repeated factors",
  intro: [
    p(m`$2^3 \times 2^2 = (2 \cdot 2 \cdot 2)(2 \cdot 2) = 2^5$. Count the 2s: three plus two make five.`),
    mth(m`x^3 \cdot x^4 = x^{3+4} = x^7`),
    co("tip", "Shortcuts for counting", "The laws of exponents are shortcuts for counting how many times a factor is repeated."),
  ],
  concept: [
    [
      "Product and quotient laws",
      [
        table(
          ["Law", "Rule", "Example"],
          [
            ["Product", m`$x^a \cdot x^b = x^{a+b}$`, m`$x^3 \cdot x^4 = x^7$`],
            ["Quotient", m`$\dfrac{x^a}{x^b} = x^{a-b}$`, m`$\dfrac{x^8}{x^3} = x^5$`],
          ],
        ),
        co("warning", "Same base only", m`The bases must match. $x^2 \cdot y^3$ cannot be combined. Coefficients multiply: $3x^2 \cdot 4x^5 = 12x^7$.`),
      ],
    ],
    [
      "Power laws and the zero exponent",
      [
        table(
          ["Law", "Rule", "Example"],
          [
            ["Power of a power", m`$(x^a)^b = x^{ab}$`, m`$(x^2)^5 = x^{10}$`],
            ["Power of a product", m`$(xy)^n = x^n y^n$`, m`$(2x^3)^2 = 4x^6$`],
          ],
        ),
        co("remember", "Zero exponent", "Any nonzero base to the power 0 equals 1: $x^0 = 1$ and $5^0 = 1$. (Because $\\frac{x^3}{x^3} = x^0 = 1$.)"),
      ],
    ],
    [
      "Putting the laws together",
      [
        p("When several laws appear, simplify powers of powers first, then multiply, then divide."),
        mth(m`\frac{(x^2)^3 \cdot x}{x^4} = \frac{x^6 \cdot x}{x^4} = \frac{x^7}{x^4} = x^3`),
        co("tip", "A hidden exponent", "A lone $x$ is $x^1$. Remember it when you add exponents."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-exp",
      "Combine several laws",
      m`Simplify $\dfrac{(2x^3)^2 \cdot 3x^4}{6x^5}$.`,
      [
        ["Apply the power of a product law.", m`$(2x^3)^2 = 2^2 \cdot x^6 = 4x^6$.`, m`\frac{4x^6 \cdot 3x^4}{6x^5}`],
        ["Multiply the numerator.", "Coefficients: $4 \\cdot 3 = 12$. Exponents add: $6 + 4 = 10$.", m`\frac{12x^{10}}{6x^5}`],
        ["Divide.", "$12 \\div 6 = 2$ and the exponents subtract: $10 - 5 = 5$.", "2x^5"],
      ],
      "$2x^5$",
      ["$(2x^3)^2 = 2x^6$", "The 2 inside the parentheses must be squared too: $2^2 = 4$.", "Raise every factor inside the parentheses to the power."],
    ),
    ex(
      "ex-zero-exp",
      "A zero exponent appears",
      m`Simplify $\dfrac{5x^3 \cdot 4x^2}{10x^5}$.`,
      [
        ["Multiply the numerator.", "Coefficients: $5 \\cdot 4 = 20$. Exponents add: $3 + 2 = 5$.", m`\frac{20x^5}{10x^5}`],
        ["Divide.", "$20 \\div 10 = 2$ and $x^5 \\div x^5 = x^0 = 1$.", "2"],
      ],
      "$2$",
      ["$2x^5$", "Subtracting the exponents gives $5 - 5 = 0$, and $x^0 = 1$, so no $x$ is left.", "Any nonzero base to the power 0 equals 1."],
    ),
  ],
  quickCheck: [
    mc("pmd-qc-1-1", L, "qc", "e", "Simplify $x^3 \\cdot x^5$.",
      [["$x^{15}$", "When you multiply powers, the exponents add."], "$x^8$", ["$2x^8$", "There is no extra coefficient; the exponents just add."], ["$x^2$", "That would be division. Here you multiply, so add the exponents."]],
      1, ["Both factors have the base $x$.", "Multiplying powers with the same base: add exponents.", "$3 + 5 = ?$"],
      "$x^3 \\cdot x^5 = x^{3+5} = x^8$.", ["Same base, so add exponents.", "$x^8$."]),
    num("pmd-qc-1-2", L, "qc", "e", "$(x^2)^4 = x^n$. What is $n$?", 8,
      ["This is a power of a power.", "Multiply the exponents.", "$2 \\times 4 = ?$"],
      "$(x^2)^4 = x^{2 \\cdot 4} = x^8$.", ["Power of a power: multiply exponents.", "$2 \\times 4 = 8$."],
      [[6, "A power of a power multiplies the exponents: $2 \\times 4$, not $2 + 4$."]]),
    mc("pmd-qc-1-3", L, "qc", "m", "Simplify $(3x^2y)^2$.",
      ["$9x^4y^2$", ["$6x^4y^2$", "Square the 3 as well: $3^2 = 9$."], ["$9x^2y^2$", "Multiply the exponent of $x$ by 2: $x^4$."], ["$3x^4y^2$", "The coefficient 3 is also squared."]],
      0, ["Raise every factor inside the parentheses to the power 2.", "$3^2$, $(x^2)^2$ and $y^2$.", "Multiply the exponents of $x$: $2 \\cdot 2$."],
      "$(3x^2y)^2 = 3^2 \\cdot x^4 \\cdot y^2 = 9x^4y^2$.", ["$3^2 = 9$.", "$(x^2)^2 = x^4$.", "$y^2$."]),
  ],
});
