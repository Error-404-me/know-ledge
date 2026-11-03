import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "factoring-monomial-grouping";
const L = "greatest-common-factor";
const { mc, num } = bank(T);

export const greatestCommonFactor: Lesson = lesson(T, 1, {
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
  ],
  quickCheck: [
    mc("fg-qc-1-1", L, "qc", "e", "What is the GCF of $12x^3$ and $18x^2$?",
      [["$6x^3$", "Use the smallest power of $x$, which is $x^2$."], "$6x^2$", ["$36x^3$", "That is a common multiple, not a common factor."], ["$12x^2$", "12 does not divide 18 evenly."]],
      1, ["Find the GCF of 12 and 18 first.", "Then take the smallest power of $x$.", "6 and $x^2$."],
      "The GCF of 12 and 18 is 6; the smallest power of $x$ is $x^2$. So the GCF is $6x^2$.", ["Numbers: 6.", "Variable: $x^2$.", "$6x^2$."]),
    num("fg-qc-1-2", L, "qc", "e", "Factor $6x + 15 = 3(ax + b)$. What is $a + b$?", 7,
      ["The GCF of 6 and 15 is 3.", "Divide each term by 3.", "$6x \\div 3$ and $15 \\div 3$."],
      "$6x + 15 = 3(2x + 5)$, so $a + b = 2 + 5 = 7$.", ["GCF is 3.", "$3(2x + 5)$.", "$2 + 5 = 7$."]),
  ],
});
