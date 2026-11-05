import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "factoring-monomial-grouping";
const L = "intro-factoring";
const { mc, num } = bank(T);

export const introFactoring: Lesson = lesson(T, 1, {
  id: L,
  title: "Introduction to Factoring",
  summary: "Review factors, prime factorization and the GCF, and see how factoring undoes multiplying.",
  minutes: 15,
  objectives: [
    "Find the factors and the prime factorization of a number",
    "Find the greatest common factor of two numbers",
    "Explain how factoring reverses multiplying",
  ],
  introTitle: "Arranging chairs",
  intro: [
    p("A teacher arranges 12 chairs in equal rows. She can make 1 row of 12, 2 rows of 6, or 3 rows of 4. The numbers 1, 2, 3, 4, 6 and 12 are the **factors** of 12."),
    mth(m`12 = 1 \times 12 = 2 \times 6 = 3 \times 4`),
    co("real-life", "Breaking numbers apart", "Factoring writes a number, and later an algebraic expression, as a product of smaller pieces."),
  ],
  concept: [
    [
      "Factors and prime factorization",
      [
        co("definition", "Factor and prime", "A **factor** of a number divides it exactly. A **prime number** has exactly two factors: 1 and itself."),
        p("Every whole number greater than 1 is a product of primes. This is its **prime factorization**."),
        mth(m`60 = 2 \cdot 2 \cdot 3 \cdot 5 = 2^2 \cdot 3 \cdot 5`),
      ],
    ],
    [
      "Greatest common factor",
      [
        p("The **greatest common factor (GCF)** of two numbers is the largest number that divides both. Multiply the shared primes, using the smallest power of each."),
        mth(m`24 = 2^3 \cdot 3, \quad 36 = 2^2 \cdot 3^2 \ \Rightarrow \ \text{GCF} = 2^2 \cdot 3 = 12`),
      ],
    ],
    [
      "Factoring reverses multiplying",
      [
        p("Multiplying turns a product into a sum. **Factoring** turns the sum back into a product."),
        table(
          ["Multiplying", "Factoring"],
          [["$3(x + 4) = 3x + 12$", "$3x + 12 = 3(x + 4)$"]],
        ),
        co("tip", "Always check", "To check a factorization, multiply the factors back out. You should get the original expression."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-prime",
      "Prime factorization",
      "Write 84 as a product of primes.",
      [
        ["Divide by the smallest prime that works.", "$84 \\div 2 = 42$ and $42 \\div 2 = 21$.", m`84 = 2 \cdot 2 \cdot 21`],
        ["Keep dividing until only primes remain.", "$21 = 3 \\cdot 7$.", m`84 = 2^2 \cdot 3 \cdot 7`],
      ],
      "$2^2 \\cdot 3 \\cdot 7$",
      ["$84 = 4 \\cdot 21$", "4 and 21 are not prime. 4 is $2 \\cdot 2$ and 21 is $3 \\cdot 7$.", "Keep factoring until every factor is prime."],
    ),
    ex(
      "ex-gcf-num",
      "GCF of two numbers",
      "Find the GCF of 42 and 63.",
      [
        ["Write each number as a product of primes.", "$42 = 2 \\cdot 3 \\cdot 7$ and $63 = 3^2 \\cdot 7$.", m`42 = 2 \cdot 3 \cdot 7, \ 63 = 3^2 \cdot 7`],
        ["Multiply the shared primes, with the smallest powers.", "Both contain 3 and 7. The smallest power of 3 is $3^1$.", m`3 \cdot 7 = 21`],
      ],
      "$21$",
    ),
  ],
  quickCheck: [
    num("fg-qc-0-1", L, "qc", "e", "What is the GCF of 18 and 30?", 6,
      ["List the factors of each number.", "Factors of 18: 1, 2, 3, 6, 9, 18. Factors of 30: 1, 2, 3, 5, 6, 10, 15, 30.", "The largest shared factor."],
      "The common factors are 1, 2, 3 and 6. The greatest is 6.", ["Factors of 18 and 30.", "Largest common: 6."],
      [[3, "3 is a common factor, but 6 divides both and is larger."]]),
    mc("fg-qc-0-2", L, "qc", "e", "What is the prime factorization of 36?",
      [["$2 \\cdot 18$", "18 is not prime. Keep factoring."], ["$4 \\cdot 9$", "4 and 9 are not prime."], "$2^2 \\cdot 3^2$", ["$2^3 \\cdot 3$", "That equals 24, not 36."]],
      2, ["Divide by 2 while you can.", "$36 = 2 \\cdot 18 = 2 \\cdot 2 \\cdot 9$.", "Then $9 = 3 \\cdot 3$."],
      "$36 = 2 \\cdot 2 \\cdot 3 \\cdot 3 = 2^2 \\cdot 3^2$.", ["$36 = 4 \\cdot 9$.", "Break 4 and 9 into primes: $2^2 \\cdot 3^2$."]),
    mc("fg-qc-0-3", L, "qc", "e", "Which shows $5x + 10$ in factored form?",
      ["$5(x + 2)$", ["$5(x + 10)$", "Multiplying back gives $5x + 50$."], ["$x(5 + 10)$", "That equals $15x$, not $5x + 10$."], ["$10(x + 5)$", "Multiplying back gives $10x + 50$."]],
      0, ["Find a number that divides both $5x$ and 10.", "That number is 5.", "Multiply back to check."],
      "$5(x + 2) = 5x + 10$.", ["GCF: 5.", "$5x \\div 5 = x$ and $10 \\div 5 = 2$."]),
  ],
});
