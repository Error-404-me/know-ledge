import type { Question } from "@/types/content";
import { bank } from "./bank";

const T = "polynomials-add-subtract";
const A = "adding-polynomials";
const S = "subtracting-polynomials";
const { mc, num } = bank(T);

/** Practice and assessment questions. Quick-check questions live inside each lesson file. */
export const questions: Question[] = [
  num("pas-p-0-1", "intro-polynomials", "p", "e", "What is the degree of $4x^2y^3 - xy + 7$?", 5,
    ["Add the exponents of the variables in each term.", "$x^2y^3$ has degree $2 + 3$.", "Compare the degrees of all the terms."],
    "The term degrees are 5, 2 and 0, so the degree of the polynomial is 5.", ["$4x^2y^3$: $2 + 3 = 5$.", "$-xy$: 2. $7$: 0.", "Largest: 5."],
    [[3, "Add the exponents of **both** variables: $2 + 3 = 5$."]]),
  mc("pas-p-0-2", "intro-polynomials", "p", "m", "Write $3x - 5x^3 + 2 - x^2$ in standard form.",
    ["$-5x^3 - x^2 + 3x + 2$", ["$-5x^3 + x^2 + 3x + 2$", "The sign of $x^2$ is negative: the term is $-x^2$."], ["$3x - 5x^3 - x^2 + 2$", "Order the terms from the highest degree to the lowest."], ["$5x^3 - x^2 + 3x + 2$", "The term with $x^3$ is $-5x^3$, which is negative."]],
    0, ["Find the degree of each term.", "The degrees are 1, 3, 0 and 2.", "Write them from degree 3 down to degree 0, keeping signs."],
    "Order by degree: $-5x^3$, $-x^2$, $3x$, $2$.", ["Degrees: 3, 2, 1, 0.", "$-5x^3 - x^2 + 3x + 2$."]),
  mc("pas-a-0-1", "intro-polynomials", "a", "m", "Which statement is true about $2x^3 - 5x + 1$?",
    [["It is a binomial of degree 3.", "It has three terms, so it is a trinomial."], "It is a trinomial of degree 3.", ["It is a trinomial of degree 1.", "The degree is the highest exponent, which is 3."], ["It is not a polynomial.", "All its exponents are whole numbers, so it is a polynomial."]],
    1, ["Count the terms.", "Find the highest exponent.", "Three terms and highest exponent 3."],
    "There are three terms, so it is a trinomial, and the highest exponent is 3.", ["Terms: $2x^3$, $-5x$, $1$.", "Trinomial of degree 3."]),
  mc("pas-p-1-1", A, "p", "e", "Add: $(x + 4) + (2x + 6)$.",
    [["$3x^2 + 10$", "Adding like terms keeps the variable part, $x$."], ["$3x + 24$", "Add the constants: $4 + 6 = 10$."], "$3x + 10$", ["$2x + 10$", "$x + 2x = 3x$."]],
    2, ["Group the $x$ terms and the constants.", "$x + 2x$ and $4 + 6$.", "Add each pair."],
    "$(x + 2x) + (4 + 6) = 3x + 10$.", ["Group like terms.", "Combine: $3x + 10$."]),
  num("pas-p-1-2", A, "p", "c", "When $(4a^2 - 3a + 7) + (a^2 + 5a - 2)$ is simplified to $pa^2 + qa + r$, what is $p + q + r$?", 12,
    ["Add the $a^2$ terms, the $a$ terms and the constants separately.", "$p = 4 + 1$, $q = -3 + 5$, $r = 7 + (-2)$.", "Find $p$, $q$ and $r$, then add them."],
    "The sum is $5a^2 + 2a + 5$, so $p + q + r = 5 + 2 + 5 = 12$.",
    ["$p = 5$.", "$q = 2$.", "$r = 5$.", "$5 + 2 + 5 = 12$."]),
  mc("pas-p-2-1", S, "p", "e", "Subtract: $(6x + 9) - (2x + 4)$.",
    [["$4x + 13$", "The $+4$ becomes $-4$, so $9 - 4 = 5$."], "$4x + 5$", ["$8x + 13$", "This adds instead of subtracts."], ["$4x - 5$", "$9 - 4 = 5$, which is positive."]],
    1, ["Change the signs of the second polynomial.", "$6x + 9 - 2x - 4$.", "Combine like terms."],
    "$(6x - 2x) + (9 - 4) = 4x + 5$.", ["Change signs: $6x + 9 - 2x - 4$.", "Combine: $4x + 5$."]),
  num("pas-p-2-2", S, "p", "c", "Subtract $(2x^2 - 3x + 1)$ from $(5x^2 + x - 4)$. If the result is $ax^2 + bx + c$, what is $a + b + c$?", 2,
    ["“Subtract A from B” means $B - A$.", "Write $(5x^2 + x - 4) - (2x^2 - 3x + 1)$ and change the signs of the second polynomial.", "You should get $3x^2 + 4x - 5$."],
    "$5x^2 + x - 4 - 2x^2 + 3x - 1 = 3x^2 + 4x - 5$, so $a + b + c = 3 + 4 - 5 = 2$.",
    ["Write $B - A$ and change signs.", "Combine: $3x^2 + 4x - 5$.", "$3 + 4 - 5 = 2$."],
    [[-2, "The order is reversed. “Subtract A from B” means $B - A$, not $A - B$."]]),
  mc("pas-a-1-1", A, "a", "m", "Add: $(3m^2 - 5m + 2) + (-m^2 + 8m - 6)$.",
    [["$4m^2 + 3m - 4$", "$3m^2 + (-m^2) = 2m^2$."], ["$2m^2 - 13m - 4$", "$-5m + 8m = 3m$."], ["$2m^2 + 3m + 8$", "$2 + (-6) = -4$."], "$2m^2 + 3m - 4$"],
    3, ["Group $m^2$ terms, $m$ terms and constants.", "Watch the signs: $-m^2$ and $-6$.", "$3 - 1$, then $-5 + 8$, then $2 - 6$."],
    "$(3m^2 - m^2) + (-5m + 8m) + (2 - 6) = 2m^2 + 3m - 4$.", ["Group like terms.", "Combine: $2m^2 + 3m - 4$."]),
  num("pas-a-1-2", A, "a", "c", "After adding $(2x + 3y) + (5x - 7y) + (x + 4y)$, what is the coefficient of $y$?", 0,
    ["Collect only the $y$ terms.", "$3y$, $-7y$ and $4y$.", "Compute $3 - 7 + 4$."],
    "$3 - 7 + 4 = 0$, so the $y$ terms cancel and the sum is $8x$.",
    ["$y$ terms: $3y - 7y + 4y$.", "$3 - 7 + 4 = 0$."]),
  mc("pas-a-2-1", S, "a", "m", "Simplify $(7a - 2b) - (3a - 5b)$.",
    [["$4a - 7b$", "$-2b - (-5b) = -2b + 5b = +3b$."], ["$10a - 7b$", "Subtract, do not add, the second polynomial."], "$4a + 3b$", ["$4a - 3b$", "$-2b + 5b = +3b$."]],
    2, ["Change every sign in the second parentheses.", "$7a - 2b - 3a + 5b$.", "Combine the $a$ terms and the $b$ terms."],
    "$(7a - 3a) + (-2b + 5b) = 4a + 3b$.", ["Change signs: $7a - 2b - 3a + 5b$.", "Combine: $4a + 3b$."]),
  num("pas-a-2-2", S, "a", "m", "Half the perimeter of a rectangle is $(8x + 5)$ cm and its length is $(5x + 2)$ cm. How wide is the rectangle, in cm, when $x = 4$?", 15,
    ["Width = half the perimeter minus the length.", "$(8x + 5) - (5x + 2)$.", "Simplify, then substitute $x = 4$."],
    "Width $= (8x + 5) - (5x + 2) = 3x + 3$. With $x = 4$: $3(4) + 3 = 15$.",
    ["Subtract: $8x + 5 - 5x - 2 = 3x + 3$.", "Substitute $x = 4$: $12 + 3 = 15$."], undefined, "cm"),
];
