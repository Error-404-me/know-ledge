import type { Question } from "@/types/content";
import { bank } from "./bank";

const T = "special-products";
const B = "square-of-binomial";
const C = "sum-and-difference";
const { mc, num } = bank(T);

/** Practice and assessment questions. Quick-check questions live inside each lesson file. */
export const questions: Question[] = [
  mc("sp-p-0-1", "intro-special-products", "p", "e", "Multiply: $(x + 5)(x + 2)$.",
    ["$x^2 + 7x + 10$", ["$x^2 + 10$", "The middle terms $2x$ and $5x$ are missing."], ["$x^2 + 7x + 7$", "Multiply the constants: $5 \\cdot 2 = 10$."], ["$x^2 + 10x + 7$", "Add the $x$ terms: $2x + 5x = 7x$."]],
    0, ["Write all four products.", "$x^2 + 2x + 5x + 10$.", "Combine the middle terms."],
    "$x^2 + 2x + 5x + 10 = x^2 + 7x + 10$.", ["Four products.", "Combine: $x^2 + 7x + 10$."]),
  num("sp-p-0-2", "intro-special-products", "p", "m", "$(x - 3)(x + 4) = x^2 + bx + c$. What is $b + c$?", -11,
    ["Write all four products.", "$x^2 + 4x - 3x - 12$.", "Combine $4x - 3x$ to find $b$."],
    "$(x - 3)(x + 4) = x^2 + x - 12$, so $b + c = 1 + (-12) = -11$.", ["Expand: $x^2 + 4x - 3x - 12$.", "$b = 1$, $c = -12$.", "$1 - 12 = -11$."]),
  mc("sp-a-0-1", "intro-special-products", "a", "m", "Multiply: $(x - 1)(x - 6)$.",
    [["$x^2 - 7x - 6$", "$(-1)(-6) = +6$, so the constant is positive."], ["$x^2 + 7x + 6$", "The middle terms are $-6x$ and $-x$, so the middle term is negative."], "$x^2 - 7x + 6$", ["$x^2 - 6$", "The middle terms $-6x$ and $-x$ are missing."]],
    2, ["Write all four products.", "$x^2 - 6x - x + 6$.", "A negative times a negative is positive."],
    "$x^2 - 6x - x + 6 = x^2 - 7x + 6$.", ["Four products.", "Combine: $x^2 - 7x + 6$."]),
  mc("sp-p-1-1", B, "p", "e", "Expand $(y + 2)^2$.",
    [["$y^2 + 4$", "The middle term, twice the product of $y$ and 2, is $4y$."], "$y^2 + 4y + 4$", ["$y^2 + 2y + 4$", "Twice the product of $y$ and 2 is $4y$, not $2y$."], ["$y^2 + 4y + 2$", "The last term is $2^2 = 4$."]],
    1, ["Square the first term, double the product, square the last.", "$y^2$, then $2(y)(2)$, then $2^2$.", "Put them together."],
    "$y^2 + 2(y)(2) + 4 = y^2 + 4y + 4$.", ["$y^2$.", "$4y$.", "$4$."]),
  num("sp-p-1-2", B, "p", "c", "$(2x - 5)^2 = ax^2 + bx + c$. What is $a + b + c$?", 9,
    ["Use $(a - b)^2 = a^2 - 2ab + b^2$ with $a = 2x$ and $b = 5$.", "$a^2 = 4x^2$, middle $= -2(2x)(5)$, $b^2 = 25$.", "Add the three coefficients."],
    "$(2x - 5)^2 = 4x^2 - 20x + 25$, so $a + b + c = 4 - 20 + 25 = 9$.", ["$4x^2$.", "$-20x$.", "$25$.", "$4 - 20 + 25 = 9$."]),
  mc("sp-p-2-1", C, "p", "e", "Multiply: $(x + 9)(x - 9)$.",
    [["$x^2 - 18x - 81$", "The middle terms cancel."], "$x^2 - 81$", ["$x^2 + 81$", "A product of conjugates is a difference."], ["$x^2 - 18$", "Square the 9: $9^2 = 81$."]],
    1, ["Conjugate binomials.", "First squared minus last squared.", "$x^2 - 9^2$."],
    "$(x + 9)(x - 9) = x^2 - 81$.", ["Pattern $a^2 - b^2$.", "$x^2 - 81$."]),
  num("sp-p-2-2", C, "p", "c", "$(5x + 3)(5x - 3) = ax^2 + b$. What is $a + b$?", 16,
    ["Use the conjugate pattern.", "$(5x)^2 - 3^2$.", "$25x^2 - 9$."],
    "$(5x + 3)(5x - 3) = 25x^2 - 9$, so $a + b = 25 - 9 = 16$.", ["$a = 25$.", "$b = -9$.", "$25 - 9 = 16$."]),
  mc("sp-a-1-1", B, "a", "m", "Expand $(3a + 2)^2$.",
    [["$9a^2 + 4$", "The middle term $2(3a)(2) = 12a$ is missing."], ["$3a^2 + 12a + 4$", "Square the whole $3a$: $(3a)^2 = 9a^2$."], ["$9a^2 + 6a + 4$", "The middle term is twice the product: $2(3a)(2) = 12a$."], "$9a^2 + 12a + 4$"],
    3, ["Use the square of a sum pattern.", "$a = 3a$ and $b = 2$.", "$(3a)^2$, $2(3a)(2)$, $2^2$."],
    "$(3a)^2 + 2(3a)(2) + 2^2 = 9a^2 + 12a + 4$.", ["$9a^2$.", "$12a$.", "$4$."]),
  num("sp-a-1-2", B, "a", "m", "Compute $51^2$ by writing it as $(50 + 1)^2$.", 2601,
    ["Use $(a + b)^2 = a^2 + 2ab + b^2$.", "$50^2 + 2(50)(1) + 1^2$.", "$2500 + 100 + 1$."],
    "$50^2 + 2(50)(1) + 1 = 2500 + 100 + 1 = 2601$.", ["Write $(50 + 1)^2$.", "$2500 + 100 + 1 = 2601$."]),
  mc("sp-a-2-1", C, "a", "m", "Multiply: $(4y - 7)(4y + 7)$.",
    [["$16y^2 + 49$", "A product of conjugates is a difference."], ["$16y^2 - 56y - 49$", "The middle terms cancel."], "$16y^2 - 49$", ["$4y^2 - 49$", "Square the whole $4y$: $(4y)^2 = 16y^2$."]],
    2, ["These are conjugates.", "Square the first term, square the last term, subtract.", "$(4y)^2$ and $7^2$."],
    "$(4y)^2 - 7^2 = 16y^2 - 49$.", ["$(4y)^2 = 16y^2$.", "$7^2 = 49$.", "$16y^2 - 49$."]),
  num("sp-a-2-2", C, "a", "m", "Use $(100 - 2)(100 + 2)$ to compute $98 \\times 102$.", 9996,
    ["Conjugate pattern with $a = 100$ and $b = 2$.", "$100^2 - 2^2$.", "$10000 - 4$."],
    "$100^2 - 2^2 = 10000 - 4 = 9996$.", ["Write $(100 - 2)(100 + 2)$.", "$10000 - 4 = 9996$."]),
];
