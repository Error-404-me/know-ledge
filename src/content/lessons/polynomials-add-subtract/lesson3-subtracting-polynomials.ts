import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p } from "../../questions/bank";

const T = "polynomials-add-subtract";
const L = "subtracting-polynomials";
const { mc, num } = bank(T);

export const subtractingPolynomials: Lesson = lesson(T, 3, {
  id: L,
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
    [
      "Subtracting a trinomial",
      [
        p("Take the signs one at a time. Every sign inside the second parentheses flips, including the sign of the constant."),
        mth(m`(4x^2 - x + 3) - (x^2 - 5x - 2) = 4x^2 - x + 3 - x^2 + 5x + 2 = 3x^2 + 4x + 5`),
        co("tip", "Write the flips", "Write the new signs above the old ones before combining: $-x^2$, $+5x$, $+2$."),
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
    ex(
      "ex-sub-b-a",
      "Subtract A from B",
      "Subtract $(2x^2 + 5x - 1)$ from $(6x^2 + x + 4)$.",
      [
        ["Write it as the second taken from the first.", "“Subtract A from B” means $B - A$.", m`(6x^2 + x + 4) - (2x^2 + 5x - 1)`],
        ["Change every sign of the second polynomial and combine.", "$6 - 2 = 4$, $1 - 5 = -4$ and $4 + 1 = 5$.", "4x^2 - 4x + 5"],
      ],
      "$4x^2 - 4x + 5$",
      ["$4x^2 - 4x + 3$", "The $-1$ was not flipped to $+1$, so $4 - 1$ was computed.", "Flip every sign, including the constant."],
    ),
  ],
  quickCheck: [
    mc("pas-qc-2-1", L, "qc", "e", "Subtract: $(8x + 3) - (3x + 5)$.",
      [["$5x + 8$", "The $+5$ must change to $-5$, so $3 - 5 = -2$."], "$5x - 2$", ["$11x + 8$", "This adds instead of subtracting."], ["$5x + 2$", "$3 - 5 = -2$, not $+2$."]],
      1,
      ["Change the signs of the second polynomial first.", "$8x + 3 - 3x - 5$.", "Combine the $x$ terms and the constants."],
      "$(8x - 3x) + (3 - 5) = 5x - 2$.",
      ["Change signs: $8x + 3 - 3x - 5$.", "Combine: $5x - 2$."]),
    num("pas-qc-2-2", L, "qc", "m", "What is the constant term of $(9y - 4) - (3y - 10)$ after simplifying?", 6,
      ["Remove the parentheses, changing every sign in the second one.", "$9y - 4 - 3y + 10$.", "Combine $-4 + 10$."],
      "$9y - 4 - 3y + 10 = 6y + 6$, so the constant term is 6.",
      ["Change signs: $9y - 4 - 3y + 10$.", "Combine: $6y + 6$."],
      [[-14, "The $-10$ must change sign: $-4 + 10$."]]),
    num("pas-qc-2-3", L, "qc", "m", "$(5x^2 + 3x) - (2x^2 - x + 4) = ax^2 + bx + c$. What is $c$?", -4,
      ["Subtract the constant terms. The first polynomial has no constant.", "$0 - 4$.", "The $+4$ in the second polynomial becomes $-4$."],
      "The constant terms are 0 and 4, so $c = 0 - 4 = -4$. The full result is $3x^2 + 4x - 4$.", ["Change signs: $-2x^2 + x - 4$.", "Constant: $-4$."],
      [[4, "The constant $+4$ is being subtracted, so it becomes $-4$."]]),
  ],
});
