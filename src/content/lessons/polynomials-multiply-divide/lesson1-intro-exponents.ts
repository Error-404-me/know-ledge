import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "polynomials-multiply-divide";
const L = "intro-exponents";
const { mc, num } = bank(T);

export const introExponents: Lesson = lesson(T, 1, {
  id: L,
  title: "Introduction to Exponents",
  summary: "Review exponent notation and see where multiplying and dividing polynomials is headed.",
  minutes: 15,
  objectives: [
    "Read exponent notation: base and exponent",
    "Evaluate powers, including powers of negative numbers",
    "Preview the tools used to multiply and divide polynomials",
  ],
  introTitle: "Squares and cubes",
  intro: [
    p("A square tile has sides of $x$ cm. Its area is $x \\times x = x^2$ square centimeters. A cube-shaped box with sides of $x$ cm has volume $x \\times x \\times x = x^3$ cubic centimeters."),
    mth(m`x \cdot x = x^2 \qquad x \cdot x \cdot x = x^3`),
    co("real-life", "Repeated multiplication", "An exponent is a shortcut for repeated multiplication. To multiply and divide polynomials, we first need to be sure how exponents work."),
  ],
  concept: [
    [
      "Exponent notation",
      [
        co("definition", "Base and exponent", "In $x^n$, the **base** $x$ is used as a factor $n$ times. The number $n$ is the **exponent**. Also $x^1 = x$."),
        mth(m`2^5 = 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 = 32`),
      ],
    ],
    [
      "Powers of negative numbers",
      [
        mth(m`(-3)^2 = 9 \qquad -3^2 = -9`),
        p("The parentheses decide what is raised to the power. $(-3)^2$ squares the whole $-3$. Without parentheses, $-3^2$ squares only the 3 and then makes the result negative."),
        mth(m`(-2)^3 = -8 \qquad (-2)^4 = 16`),
        co("remember", "Even or odd", "A negative base with an **even** exponent gives a positive result. With an **odd** exponent it gives a negative result."),
      ],
    ],
    [
      "What comes next",
      [
        p("In this topic you will learn the laws of exponents, then combine them with the distributive property to multiply polynomials and to divide a polynomial by a monomial."),
        table(
          ["Skill", "Example"],
          [
            ["Multiply powers", m`$x^3 \cdot x^2 = x^5$`],
            ["Distribute", "$2x(x + 3) = 2x^2 + 6x$"],
            ["Divide by a monomial", m`$\dfrac{6x^2 + 3x}{3x} = 2x + 1$`],
          ],
        ),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-powers",
      "Evaluate powers",
      "Evaluate $3^2 \\cdot 2^3$.",
      [
        ["Evaluate each power.", "$3^2 = 9$ and $2^3 = 8$.", m`9 \cdot 8`],
        ["Multiply.", "$9 \\times 8 = 72$.", "72"],
      ],
      "$72$",
    ),
    ex(
      "ex-negative-base",
      "Negative bases",
      "Evaluate $(-2)^4$ and $-2^4$.",
      [
        ["Evaluate $(-2)^4$.", "There are four factors of $-2$. Pairs of negatives multiply to positives.", m`(-2)(-2)(-2)(-2) = 16`],
        ["Evaluate $-2^4$.", "Only the 2 is raised to the power. The negative sign is applied afterwards.", m`-(2 \cdot 2 \cdot 2 \cdot 2) = -16`],
      ],
      "$16$ and $-16$",
      ["$(-2)^4 = -16$", "The parentheses make the whole $-2$ the base, and an even number of negative factors gives a positive result.", "Count the negative factors: an even count gives a positive."],
    ),
  ],
  quickCheck: [
    num("pmd-qc-0-1", L, "qc", "e", "What is the value of $2^5$?", 32,
      ["$2^5$ means five factors of 2.", "$2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2$.", "Multiply step by step: 4, 8, 16, ..."],
      "$2^5 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 32$.", ["Five factors of 2.", "Product: 32."],
      [[10, "The exponent counts factors; it does not multiply: $2^5 \\ne 2 \\times 5$."]]),
    mc("pmd-qc-0-2", L, "qc", "e", "Which expression equals $x \\cdot x \\cdot x \\cdot x$?",
      [["$4x$", "That is $x + x + x + x$. An exponent counts repeated **multiplication**."], "$x^4$", ["$x^3$", "Count the factors of $x$: there are four."], ["$4^x$", "The base is $x$ and the exponent is 4."]],
      1, ["Count how many times $x$ is a factor.", "Four times.", "Write the base with the exponent 4."],
      "Four factors of $x$ is written $x^4$.", ["Count: 4 factors.", "$x^4$."]),
    num("pmd-qc-0-3", L, "qc", "m", "Evaluate $(-2)^3$.", -8,
      ["Write three factors of $-2$.", "$(-2)(-2)(-2)$.", "The first two give $+4$. Then multiply by $-2$."],
      "$(-2)(-2) = 4$ and $4 \\cdot (-2) = -8$.", ["Two negatives: $+4$.", "$4 \\times (-2) = -8$."],
      [[8, "An odd number of negative factors gives a negative result."]]),
  ],
});
