import type { Question } from "@/types/content";
import { bank } from "./bank";

const T = "factoring-monomial-grouping";
const G = "greatest-common-factor";
const R = "factoring-by-grouping";
const { mc, num } = bank(T);

/** Practice and assessment questions. Quick-check questions live inside each lesson file. */
export const questions: Question[] = [
  num("fg-p-0-1", "intro-factoring", "p", "e", "What is the GCF of 16 and 24?", 8,
    ["List the factors of each number.", "Factors of 16: 1, 2, 4, 8, 16. Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24.", "Largest shared factor."],
    "The common factors are 1, 2, 4 and 8. The greatest is 8.", ["Factors of 16 and 24.", "Largest common: 8."]),
  num("fg-p-0-2", "intro-factoring", "p", "m", "What is the GCF of 48 and 72?", 24,
    ["Write each number as a product of primes.", "$48 = 2^4 \\cdot 3$ and $72 = 2^3 \\cdot 3^2$.", "Use the smallest power of each shared prime."],
    "$\\text{GCF} = 2^3 \\cdot 3 = 24$.", ["Primes: $48 = 2^4 \\cdot 3$, $72 = 2^3 \\cdot 3^2$.", "$2^3 \\cdot 3 = 24$."],
    [[12, "12 divides both, but 24 is larger: $48 = 2 \\cdot 24$ and $72 = 3 \\cdot 24$."]]),
  num("fg-a-0-1", "intro-factoring", "a", "m", "What is the GCF of 28 and 70?", 14,
    ["Prime factorizations: $28 = 2^2 \\cdot 7$ and $70 = 2 \\cdot 5 \\cdot 7$.", "Shared primes: 2 and 7.", "Use the smallest powers."],
    "$\\text{GCF} = 2 \\cdot 7 = 14$.", ["Shared primes: 2 and 7.", "$2 \\cdot 7 = 14$."]),
  mc("fg-p-1-1", G, "p", "e", "Factor $10x + 25$.",
    ["$5(2x + 5)$", ["$5(2x + 25)$", "$25 \\div 5 = 5$, not 25."], ["$10(x + 25)$", "10 does not divide 25 evenly."], ["$5(x + 5)$", "$10x \\div 5 = 2x$, not $x$."]],
    0, ["Find the GCF of 10 and 25.", "It is 5.", "Divide each term by 5."],
    "$10x + 25 = 5(2x + 5)$.", ["GCF = 5.", "$10x \\div 5 = 2x$ and $25 \\div 5 = 5$."]),
  num("fg-p-1-2", G, "p", "c", "$9x^3 - 6x^2 + 3x = 3x(ax^2 + bx + c)$. What is $a + b + c$?", 2,
    ["The GCF is $3x$.", "Divide each term by $3x$.", "$9x^3 \\div 3x$, $-6x^2 \\div 3x$ and $3x \\div 3x$."],
    "$9x^3 - 6x^2 + 3x = 3x(3x^2 - 2x + 1)$, so $a + b + c = 3 - 2 + 1 = 2$.", ["Quotients: $3x^2$, $-2x$, $1$.", "$3 - 2 + 1 = 2$."]),
  mc("fg-p-2-1", R, "p", "e", "Factor $ax + ay + 2x + 2y$.",
    [["$(a + x)(y + 2)$", "Expanding gives $ay + 2a + xy + 2x$, which is not the original."], ["$a(x + y)$", "Only half is factored: $2x + 2y$ must be included too."], "$(a + 2)(x + y)$", ["$(a + 2)(x - y)$", "Both groups contain $(x + y)$, not $(x - y)$."]],
    2, ["Group the first two and last two terms.", "$a(x + y) + 2(x + y)$.", "Factor out $(x + y)$."],
    "$a(x + y) + 2(x + y) = (a + 2)(x + y)$.", ["Group: $(ax + ay) + (2x + 2y)$.", "Factor: $a(x + y) + 2(x + y)$.", "$(a + 2)(x + y)$."]),
  mc("fg-p-2-2", R, "p", "c", "Factor $x^3 - 5x^2 + 2x - 10$.",
    [["$(x^2 - 2)(x + 5)$", "Expanding gives $x^3 + 5x^2 - 2x - 10$."], ["$(x^2 + 2)(x + 5)$", "Expanding gives $x^3 + 5x^2 + 2x + 10$."], ["$(x^2 + 5)(x - 2)$", "Expanding gives $x^3 - 2x^2 + 5x - 10$."], "$(x^2 + 2)(x - 5)$"],
    3, ["Group in pairs: $(x^3 - 5x^2) + (2x - 10)$.", "Factor $x^2$ from the first pair and 2 from the second.", "Both groups contain $(x - 5)$."],
    "$x^2(x - 5) + 2(x - 5) = (x^2 + 2)(x - 5)$.", ["Group in pairs.", "Factor each pair.", "Factor out $(x - 5)$."]),
  mc("fg-a-1-1", G, "a", "m", "Factor completely: $14a^2b - 21ab^2$.",
    [["$7(2a^2b - 3ab^2)$", "Not completely factored: $ab$ is also common to both terms."], ["$7ab(2a - 3b^2)$", "$21ab^2 \\div 7ab = 3b$, not $3b^2$."], ["$14ab(a - b)$", "14 does not divide 21 evenly."], "$7ab(2a - 3b)$"],
    3, ["Find the GCF of 14 and 21 and the common variables.", "The GCF is $7ab$.", "Divide each term by $7ab$."],
    "$14a^2b \\div 7ab = 2a$ and $21ab^2 \\div 7ab = 3b$, so the result is $7ab(2a - 3b)$.", ["GCF: $7ab$.", "Quotients: $2a$ and $3b$.", "$7ab(2a - 3b)$."]),
  num("fg-a-1-2", G, "a", "c", "$5x^2 + 5x = 5x(x + c)$. What is $c$?", 1,
    ["The GCF is $5x$.", "Divide each term by $5x$.", "What is $5x \\div 5x$?"],
    "$5x^2 \\div 5x = x$ and $5x \\div 5x = 1$, so $c = 1$.", ["$5x^2 \\div 5x = x$.", "$5x \\div 5x = 1$."]),
  mc("fg-a-2-1", R, "a", "m", "Factor $mn + 4m + 5n + 20$.",
    [["$(m + 4)(n + 5)$", "Expanding gives $mn + 5m + 4n + 20$."], "$(m + 5)(n + 4)$", ["$(m + 20)(n + 1)$", "Expanding gives $mn + m + 20n + 20$."], ["$(m + 4)(n - 5)$", "The last two terms are positive, so both signs match."]],
    1, ["Group: $(mn + 4m) + (5n + 20)$.", "$m(n + 4) + 5(n + 4)$.", "Factor out $(n + 4)$."],
    "$m(n + 4) + 5(n + 4) = (m + 5)(n + 4)$.", ["Group in pairs.", "Factor each pair.", "$(m + 5)(n + 4)$."]),
  mc("fg-a-2-2", R, "a", "c", "Factor $2x^2 - 6x + x - 3$.",
    [["$(2x - 1)(x + 3)$", "Expanding gives $2x^2 + 5x - 3$."], ["$(2x + 1)(x + 3)$", "Expanding gives $2x^2 + 7x + 3$."], "$(2x + 1)(x - 3)$", ["$(2x - 3)(x + 1)$", "Expanding gives $2x^2 - x - 3$."]],
    2, ["Group: $(2x^2 - 6x) + (x - 3)$.", "Factor $2x$ from the first pair and $1$ from the second.", "Both groups contain $(x - 3)$."],
    "$2x(x - 3) + 1(x - 3) = (2x + 1)(x - 3)$.", ["Group in pairs.", "$2x(x - 3) + 1(x - 3)$.", "$(2x + 1)(x - 3)$."]),
];
