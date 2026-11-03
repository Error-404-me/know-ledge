import type { Question } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "polynomials-add-subtract";
const A = "adding-polynomials";
const S = "subtracting-polynomials";
const { mc, num } = bank(T);

export const lessons = [
  lesson(T, 1, {
    id: A,
    title: "Adding Polynomials",
    summary: "Add polynomials by combining like terms, horizontally or in columns.",
    minutes: 15,
    objectives: [
      "Add polynomials with the horizontal method",
      "Add polynomials with the vertical method",
      "Write the answer with the highest power first",
    ],
    introTitle: "Two baskets of fruit",
    intro: [
      p("Basket 1 has 3 mangoes and 2 bananas. Basket 2 has 4 mangoes and 5 bananas. Together there are 7 mangoes and 7 bananas. You combined only the **like** fruits."),
      mth(m`(3x + 2y) + (4x + 5y) = 7x + 7y`),
      co("real-life", "Same idea", "Adding polynomials means adding like terms. Unlike terms stay separate, just like mangoes and bananas."),
    ],
    concept: [
      [
        "Horizontal method",
        [
          p("Remove the parentheses, group like terms, then combine. A plus sign before parentheses changes nothing inside."),
          mth(m`(5x^2 + 3x) + (2x^2 - 7x) = (5x^2 + 2x^2) + (3x - 7x) = 7x^2 - 4x`),
          co("tip", "Recipe", "1) Remove parentheses. 2) Group like terms. 3) Combine the coefficients. 4) Write the highest power first."),
        ],
      ],
      [
        "Vertical method",
        [
          p("Line up like terms in columns and add each column. Write 0 for a missing term."),
          table(
            ["Row", "x²", "x", "Constant"],
            [
              ["First", "$4$", "$-2$", "$5$"],
              ["Second", "$3$", "$0$", "$-8$"],
              ["Sum", "$7$", "$-2$", "$-3$"],
            ],
          ),
          p("So $(4x^2 - 2x + 5) + (3x^2 - 8) = 7x^2 - 2x - 3$."),
        ],
      ],
    ],
    examples: [
      ex(
        "ex-add",
        "Add three-term polynomials",
        "Add $(5x^2 - 3x + 4)$ and $(2x^2 + 7x - 9)$.",
        [
          ["Write the sum and remove the parentheses.", "The plus sign leaves every sign unchanged.", m`5x^2 - 3x + 4 + 2x^2 + 7x - 9`],
          ["Group like terms.", "Match $x^2$ with $x^2$, $x$ with $x$, and constants with constants.", m`(5x^2 + 2x^2) + (-3x + 7x) + (4 - 9)`],
          ["Combine each group.", "$5 + 2 = 7$, $-3 + 7 = 4$ and $4 - 9 = -5$.", m`7x^2 + 4x - 5`],
        ],
        "$7x^2 + 4x - 5$",
        ["$7x^2 + 4x + 13$", "The constants were added as $4 + 9$, but the 9 is negative.", "Keep each sign with its term while grouping."],
      ),
    ],
    quickCheck: [
      mc("pas-qc-1-1", A, "qc", "e", "Add: $(2x + 5) + (3x - 1)$.",
        ["$5x + 4$", ["$5x + 6$", "The second constant is $-1$, so $5 + (-1) = 4$."], ["$5x^2 + 4$", "Adding like terms never changes the variable part."], ["$6x + 4$", "Add the coefficients: $2 + 3 = 5$."]],
        0,
        ["Group the $x$ terms and the constants.", "$2x + 3x$ and $5 + (-1)$.", "Add each pair."],
        "$2x + 3x = 5x$ and $5 - 1 = 4$.",
        ["Group: $(2x + 3x) + (5 - 1)$.", "Combine: $5x + 4$."]),
      num("pas-qc-1-2", A, "qc", "e", "After adding $(4x^2 + 3x - 2) + (x^2 - 8x + 6)$, what is the coefficient of $x$?", -5,
        ["Find the $x$ terms in both polynomials.", "They are $3x$ and $-8x$.", "Compute $3 + (-8)$."],
        "$3x + (-8x) = -5x$.",
        ["$x$ terms: $3x$ and $-8x$.", "$3 + (-8) = -5$."],
        [[11, "The second $x$ term is $-8x$, so add $3 + (-8)$."]]),
    ],
  }),
  lesson(T, 2, {
    id: S,
    title: "Subtracting Polynomials",
    summary: "Subtract by changing every sign in the second polynomial, then combine like terms.",
    minutes: 18,
    objectives: [
      "Find the opposite of a polynomial",
      "Subtract polynomials by changing every sign",
      "Use polynomials to find a missing side of a figure",
    ],
    introTitle: "Money left over",
    intro: [
      p("You have ₱$(5x + 8)$ and spend ₱$(2x + 3)$. What is left? Take away each part: $5x - 2x = 3x$ and $8 - 3 = 5$."),
      mth(m`(5x + 8) - (2x + 3) = 3x + 5`),
      co("real-life", "Subtract every part", "Subtracting a polynomial means subtracting every one of its terms, not just the first."),
    ],
    concept: [
      [
        "Change every sign",
        [
          p("A minus sign before parentheses means “multiply by $-1$”, so **every** term inside changes sign."),
          mth(m`(6x - 4) - (2x - 9) = 6x - 4 - 2x + 9 = 4x + 5`),
          co("warning", "Flip all of them", "Changing only the first sign is the most common error. $-(2x - 9)$ is $-2x + 9$, not $-2x - 9$."),
        ],
      ],
      [
        "Finding a missing side",
        [
          p("A triangle has sides $(3x + 2)$ and $(2x + 5)$, and its perimeter is $(8x + 10)$. The third side is the perimeter minus the two known sides."),
          mth(m`(8x + 10) - (3x + 2) - (2x + 5) = 8x + 10 - 3x - 2 - 2x - 5 = 3x + 3`),
        ],
      ],
    ],
    examples: [
      ex(
        "ex-sub",
        "Subtract polynomials",
        "Subtract $(3x^2 + 4x - 8)$ from $(7x^2 - 2x + 5)$.",
        [
          ["Write it as second taken from first.", "“Subtract A from B” means $B - A$.", m`(7x^2 - 2x + 5) - (3x^2 + 4x - 8)`],
          ["Change the sign of every term in the second polynomial.", "$-(3x^2 + 4x - 8) = -3x^2 - 4x + 8$.", m`7x^2 - 2x + 5 - 3x^2 - 4x + 8`],
          ["Combine like terms.", "$7 - 3 = 4$, $-2 - 4 = -6$ and $5 + 8 = 13$.", m`4x^2 - 6x + 13`],
        ],
        "$4x^2 - 6x + 13$",
        ["$4x^2 - 6x - 3$", "The $-8$ was not changed to $+8$, so $5 - 8$ was computed.", "Change every sign inside the parentheses."],
      ),
    ],
    quickCheck: [
      mc("pas-qc-2-1", S, "qc", "e", "Subtract: $(8x + 3) - (3x + 5)$.",
        [["$5x + 8$", "The $+5$ must change to $-5$, so $3 - 5 = -2$."], "$5x - 2$", ["$11x + 8$", "This adds instead of subtracting."], ["$5x + 2$", "$3 - 5 = -2$, not $+2$."]],
        1,
        ["Change the signs of the second polynomial first.", "$8x + 3 - 3x - 5$.", "Combine the $x$ terms and the constants."],
        "$(8x - 3x) + (3 - 5) = 5x - 2$.",
        ["Change signs: $8x + 3 - 3x - 5$.", "Combine: $5x - 2$."]),
      num("pas-qc-2-2", S, "qc", "m", "What is the constant term of $(9y - 4) - (3y - 10)$ after simplifying?", 6,
        ["Remove the parentheses, changing every sign in the second one.", "$9y - 4 - 3y + 10$.", "Combine $-4 + 10$."],
        "$9y - 4 - 3y + 10 = 6y + 6$, so the constant term is 6.",
        ["Change signs: $9y - 4 - 3y + 10$.", "Combine: $6y + 6$."],
        [[-14, "The $-10$ must change sign: $-4 + 10$."]]),
    ],
  }),
];

export const questions: Question[] = [
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
