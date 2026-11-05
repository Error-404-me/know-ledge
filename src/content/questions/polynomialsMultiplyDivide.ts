import type { Question } from "@/types/content";
import { bank, m } from "./bank";

const T = "polynomials-multiply-divide";
const E = "exponent-laws";
const D = "multiply-divide-polynomials";
const { mc, num } = bank(T);

/** Practice and assessment questions. Quick-check questions live inside each lesson file. */
export const questions: Question[] = [
  num("pmd-p-0-1", "intro-exponents", "p", "e", "Evaluate $3^4$.", 81,
    ["$3^4$ means four factors of 3.", "$3 \\cdot 3 \\cdot 3 \\cdot 3$.", "$9 \\cdot 9$."],
    "$3^4 = 3 \\cdot 3 \\cdot 3 \\cdot 3 = 81$.", ["$3 \\cdot 3 = 9$.", "$9 \\cdot 9 = 81$."],
    [[12, "The exponent counts factors; it does not multiply: $3^4 \\ne 3 \\times 4$."]]),
  num("pmd-p-0-2", "intro-exponents", "p", "m", "Evaluate $(-2)^4 + 2^3$.", 24,
    ["Evaluate each power separately.", "$(-2)^4 = 16$ and $2^3 = 8$.", "Add the results."],
    "$(-2)^4 = 16$ and $2^3 = 8$, so the sum is 24.", ["$(-2)^4 = 16$.", "$2^3 = 8$.", "$16 + 8 = 24$."]),
  num("pmd-a-0-1", "intro-exponents", "a", "m", "Evaluate $5^2 - 2^3$.", 17,
    ["Evaluate each power first.", "$5^2 = 25$ and $2^3 = 8$.", "Subtract."],
    "$25 - 8 = 17$.", ["$5^2 = 25$.", "$2^3 = 8$.", "$25 - 8 = 17$."]),
  mc("pmd-p-1-1", E, "p", "e", m`Simplify $\dfrac{x^9}{x^4}$.`,
    [["$x^{13}$", "Dividing subtracts exponents: $9 - 4$."], ["$x^{36}$", "Dividing subtracts exponents; it never multiplies them."], "$x^5$", ["$5x$", "The base stays $x$; only the exponent changes."]],
    2, ["Same base, so use the quotient law.", "Subtract the exponents.", "$9 - 4 = ?$"],
    "$x^{9-4} = x^5$.", ["Quotient law: subtract exponents.", "$x^5$."]),
  num("pmd-p-1-2", E, "p", "m", "$3x^2 \\cdot 4x^3 = ax^b$. What is $a + b$?", 17,
    ["Multiply the coefficients and add the exponents.", "$a = 3 \\cdot 4$, $b = 2 + 3$.", "Add $a$ and $b$."],
    "$3x^2 \\cdot 4x^3 = 12x^5$, so $a + b = 12 + 5 = 17$.", ["$a = 12$.", "$b = 5$.", "$12 + 5 = 17$."],
    [[12, "Coefficients **multiply** ($3 \\cdot 4 = 12$) and exponents add ($2 + 3 = 5$). Then add $a + b$."]]),
  mc("pmd-p-2-1", D, "p", "e", m`Divide: $\dfrac{8x^3 + 4x^2}{4x}$.`,
    ["$2x^2 + x$", ["$2x^2 + 4x$", "$4x^2 \\div 4x = x$, not $4x$."], ["$2x^3 + x^2$", "Divide the exponents by subtracting: $3 - 1 = 2$."], ["$2x^2 + 1$", "$4x^2 \\div 4x = x$, not 1."]],
    0, ["Divide each term by $4x$.", "$8x^3 \\div 4x$ and $4x^2 \\div 4x$.", "Coefficients divide, exponents subtract."],
    "$\\frac{8x^3}{4x} = 2x^2$ and $\\frac{4x^2}{4x} = x$.", ["First term: $2x^2$.", "Second term: $x$."]),
  num("pmd-p-2-2", D, "p", "c", "$(x - 3)(2x + 5) = ax^2 + bx + c$. What is $a + b + c$?", -14,
    ["Write all four products.", "$2x^2 + 5x - 6x - 15$.", "Combine $5x - 6x$ first."],
    "$(x - 3)(2x + 5) = 2x^2 - x - 15$, so $a + b + c = 2 - 1 - 15 = -14$.", ["Four products: $2x^2 + 5x - 6x - 15$.", "Combine: $2x^2 - x - 15$.", "$2 - 1 - 15 = -14$."]),
  mc("pmd-a-1-1", E, "a", "m", "Simplify $(2x^3)^3$.",
    [["$6x^9$", "Cube the 2 as well: $2^3 = 8$."], ["$8x^6$", "Multiply the exponents: $3 \\times 3 = 9$."], ["$2x^9$", "The coefficient 2 is also cubed."], "$8x^9$"],
    3, ["Use the power of a product law.", "Cube both the 2 and the $x^3$.", "$2^3$ and $(x^3)^3$."],
    "$(2x^3)^3 = 2^3 \\cdot x^9 = 8x^9$.", ["Cube 2: 8.", "$(x^3)^3 = x^9$."]),
  num("pmd-a-1-2", E, "a", "c", m`$\dfrac{(x^4)^3}{x^5 \cdot x^2} = x^n$. What is $n$?`, 5,
    ["Simplify the top and bottom separately.", "Top: $(x^4)^3 = x^{12}$. Bottom: $x^5 \\cdot x^2 = x^7$.", "Then divide: subtract exponents."],
    "$\\frac{x^{12}}{x^7} = x^{12-7} = x^5$.", ["Top: $x^{12}$.", "Bottom: $x^7$.", "Quotient: $x^5$."]),
  mc("pmd-a-2-1", D, "a", "m", "Multiply: $(x + 6)(x - 2)$.",
    [["$x^2 - 12$", "Do not forget the middle terms $6x$ and $-2x$."], ["$x^2 + 8x - 12$", "$6x - 2x = 4x$."], "$x^2 + 4x - 12$", ["$x^2 + 4x + 12$", "$6 \\times (-2) = -12$, which is negative."]],
    2, ["Write all four products.", "$x^2 - 2x + 6x - 12$.", "Combine the middle terms."],
    "$x^2 - 2x + 6x - 12 = x^2 + 4x - 12$.", ["Four products.", "Combine: $x^2 + 4x - 12$."]),
  num("pmd-a-2-2", D, "a", "m", "Divide $18x^5 - 12x^3 + 6x^2$ by $6x^2$, then evaluate the quotient when $x = 2$.", 21,
    ["Divide each term by $6x^2$.", "The quotient is $3x^3 - 2x + 1$.", "Substitute $x = 2$."],
    "The quotient is $3x^3 - 2x + 1$. With $x = 2$: $3(8) - 4 + 1 = 21$.", ["Divide: $3x^3 - 2x + 1$.", "Substitute: $24 - 4 + 1 = 21$."]),
];
