import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "factoring-monomial-grouping";
const L = "greatest-common-factor";
const { mc, num } = bank(T);

export const greatestCommonFactor: Lesson = lesson(T, 2, {
  id: L,
  title: "Greatest Common Monomial Factor",
  summary: "Undo the distributive property by factoring out the greatest common factor.",
  minutes: 18,
  objectives: [
    "Find the greatest common factor (GCF) of the terms of a polynomial",
    "Factor out the GCF",
    "Check a factorization by multiplying",
  ],
  introTitle: "Undoing the distributing",
  intro: [
    p("Distributing gives $3(2x + 5) = 6x + 15$. **Factoring** goes the other way: from $6x + 15$ back to $3(2x + 5)$."),
    mth(m`6x + 15 = 3 \cdot 2x + 3 \cdot 5 = 3(2x + 5)`),
    co("real-life", "Pull out what they share", "Both $6x$ and $15$ are multiples of 3. Factoring pulls out the part the terms share."),
  ],
  concept: [
    [
      "Find the GCF",
      [
        p("The GCF of the numbers, times each variable that appears in **every** term raised to its **smallest** power."),
        table(
          ["Terms", "GCF", "Why"],
          [
            ["$12x^3$ and $18x^2$", "$6x^2$", "GCF of 12 and 18 is 6; smallest power of $x$ is $x^2$"],
            ["$8a^3b$ and $20a^2$", "$4a^2$", "GCF of 8 and 20 is 4; $b$ is not in both terms"],
            ["$5x$ and $9$", "$1$", "No common factor"],
          ],
        ),
      ],
    ],
    [
      "Factor it out",
      [
        p("Divide each term by the GCF and write the quotients inside parentheses."),
        mth("12x^3 - 18x^2 = 6x^2(2x - 3)"),
        co("warning", "Do not lose the 1", "$5x^2 + 5x = 5x(x + 1)$. When a whole term equals the GCF, a 1 is left behind. Multiply back to check."),
      ],
    ],
    [
      "A negative GCF",
      [
        p("When the first term is negative, it is often neater to factor out a **negative** GCF, so the first term inside the parentheses is positive."),
        mth("-6x^2 + 9x = -3x(2x - 3)"),
        co("tip", "Check the signs", "Multiply back: $-3x \\cdot 2x = -6x^2$ and $-3x \\cdot (-3) = +9x$."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-gcf",
      "Factor a three-term polynomial",
      "Factor $8a^3b - 12a^2b^2 + 4ab$.",
      [
        ["Find the GCF.", "The GCF of 8, 12 and 4 is 4. Both $a$ and $b$ appear in every term; the smallest powers are $a^1$ and $b^1$.", "4ab"],
        ["Divide each term by $4ab$.", "$8a^3b \\div 4ab = 2a^2$, $-12a^2b^2 \\div 4ab = -3ab$, and $4ab \\div 4ab = 1$.", m`2a^2, \ -3ab, \ 1`],
        ["Write the factored form.", "Check: $4ab \\cdot 2a^2 = 8a^3b$, $4ab \\cdot (-3ab) = -12a^2b^2$, $4ab \\cdot 1 = 4ab$.", "4ab(2a^2 - 3ab + 1)"],
      ],
      "$4ab(2a^2 - 3ab + 1)$",
      ["$4ab(2a^2 - 3ab)$", "The last term $4ab \\div 4ab$ is 1, not nothing.", "Multiply back to see whether you get every original term."],
    ),
    ex(
      "ex-neg-gcf",
      "Factor with a negative GCF",
      "Factor $-10x^3 + 15x^2$.",
      [
        ["Find the GCF and choose its sign.", "The GCF of 10 and 15 is 5, and the smallest power of $x$ is $x^2$. Use $-5x^2$ so the first term inside is positive.", "-5x^2"],
        ["Divide each term by $-5x^2$.", "$-10x^3 \\div (-5x^2) = 2x$ and $15x^2 \\div (-5x^2) = -3$.", "-5x^2(2x - 3)"],
      ],
      "$-5x^2(2x - 3)$",
      ["$-5x^2(2x + 3)$", "$15x^2 \\div (-5x^2) = -3$, not $+3$. Check by multiplying back.", "Divide each term by the GCF and keep track of every sign."],
    ),
  ],
  quickCheck: [
    mc("fg-qc-1-1", L, "qc", "e", "What is the GCF of $12x^3$ and $18x^2$?",
      [["$6x^3$", "Use the smallest power of $x$, which is $x^2$."], "$6x^2$", ["$36x^3$", "That is a common multiple, not a common factor."], ["$12x^2$", "12 does not divide 18 evenly."]],
      1, ["Find the GCF of 12 and 18 first.", "Then take the smallest power of $x$.", "6 and $x^2$."],
      "The GCF of 12 and 18 is 6; the smallest power of $x$ is $x^2$. So the GCF is $6x^2$.", ["Numbers: 6.", "Variable: $x^2$.", "$6x^2$."]),
    num("fg-qc-1-2", L, "qc", "e", "Factor $6x + 15 = 3(ax + b)$. What is $a + b$?", 7,
      ["The GCF of 6 and 15 is 3.", "Divide each term by 3.", "$6x \\div 3$ and $15 \\div 3$."],
      "$6x + 15 = 3(2x + 5)$, so $a + b = 2 + 5 = 7$.", ["GCF is 3.", "$3(2x + 5)$.", "$2 + 5 = 7$."]),
    mc("fg-qc-1-3", L, "qc", "m", "Factor completely: $12x^2 + 18x$.",
      [["$6(2x^2 + 3x)$", "Not completely factored: $x$ is also common to both terms."], "$6x(2x + 3)$", ["$2x(6x + 9)$", "Not completely factored: 3 is also common."], ["$3x(4x + 6)$", "Not completely factored: 2 is also common."]],
      1, ["Find the GCF of 12 and 18, and the common variable part.", "The GCF is $6x$.", "Divide each term by $6x$."],
      "$12x^2 \\div 6x = 2x$ and $18x \\div 6x = 3$, so the result is $6x(2x + 3)$.", ["GCF: $6x$.", "Quotients: $2x$ and $3$."]),
  ],
});
