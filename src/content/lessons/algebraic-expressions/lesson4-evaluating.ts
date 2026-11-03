import type { Lesson } from "@/types/content";
import { mcq, numeric } from "../../questions/builders";

const L = "evaluating-expressions";

export const evaluatingExpressions: Lesson = {
  id: L,
  topicId: "algebraic-expressions",
  order: 4,
  title: "Evaluating Algebraic Expressions",
  summary: "Replace letters with numbers and compute the value, even when the numbers are negative.",
  minutes: 18,
  objectives: [
    "Substitute values for variables",
    "Apply the order of operations correctly",
    "Handle negative values and exponents with parentheses",
  ],
  introduction: {
    title: "How much is the jeepney fare?",
    blocks: [
      {
        type: "p",
        text: "Imagine a ride costs ₱12 for the first stretch, plus ₱2 for every extra kilometer. For $k$ extra kilometers, the fare is:",
      },
      { type: "math", tex: "12 + 2k" },
      {
        type: "p",
        text: "If you travel 3 extra km, you put 3 in place of $k$: $12 + 2(3) = 12 + 6 = 18$ pesos. That is **evaluating** an expression.",
      },
      {
        type: "callout",
        variant: "real-life",
        title: "Evaluate = substitute, then compute",
        text: "To evaluate an expression, replace each variable by its given value, then calculate using the order of operations.",
      },
    ],
  },
  concept: [
    {
      id: "substitution",
      title: "Substitution",
      blocks: [
        {
          type: "p",
          text: "**Always put the replacement value inside parentheses.** This keeps multiplication and signs clear.",
        },
        { type: "math", tex: "3x + 4 \\quad \\text{when } x = 5", caption: "Replace x with (5)" },
        { type: "math", tex: "3(5) + 4 = 15 + 4 = 19" },
      ],
    },
    {
      id: "order-of-operations",
      title: "Order of operations (GEMDAS)",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**G**rouping symbols: parentheses first",
            "**E**xponents",
            "**M**ultiplication and **D**ivision, from left to right",
            "**A**ddition and **S**ubtraction, from left to right",
          ],
        },
        {
          type: "callout",
          variant: "remember",
          title: "Why order matters",
          text: "$3 + 4 \\times 2$ is $3 + 8 = 11$, not $7 \\times 2 = 14$. Multiplication comes before addition.",
        },
      ],
    },
    {
      id: "negatives",
      title: "Negative values need parentheses",
      blocks: [
        {
          type: "p",
          text: "When $x = -3$, the expression $x^2$ becomes $(-3)^2$. The parentheses mean the **whole** $-3$ is squared.",
        },
        { type: "math", tex: "(-3)^2 = (-3)(-3) = 9" },
        {
          type: "callout",
          variant: "warning",
          title: "Do not drop the parentheses",
          text: "$-3^2$ (without parentheses) means $-(3 \\cdot 3) = -9$. That is a different value from $(-3)^2 = 9$. Substituting a negative number without parentheses causes this error.",
        },
      ],
    },
  ],
  examples: [
    {
      id: "ex-quadratic",
      title: "Evaluate with a negative value",
      problem: "Evaluate $3x^2 - 2x + 1$ when $x = -2$.",
      steps: [
        {
          action: "Substitute $-2$ for every $x$, using parentheses.",
          why: "Parentheses protect the negative sign.",
          math: "3(-2)^2 - 2(-2) + 1",
        },
        {
          action: "Evaluate the exponent first.",
          why: "Exponents come before multiplication. $(-2)^2 = 4$.",
          math: "3(4) - 2(-2) + 1",
        },
        {
          action: "Multiply.",
          why: "$3 \\times 4 = 12$ and $-2 \\times -2 = +4$ (a negative times a negative is positive).",
          math: "12 + 4 + 1",
        },
        {
          action: "Add from left to right.",
          why: "Only addition remains.",
          math: "17",
        },
      ],
      answer: "$17$",
      mistake: {
        wrong: "Treating $(-2)^2$ as $-4$, giving $3(-4) + 4 + 1 = -7$.",
        whyWrong: "The square applies to the whole $-2$, so the result is positive 4.",
        fix: "Write $(-2)(-2)$ explicitly. A negative times a negative is positive.",
      },
    },
    {
      id: "ex-two-variables",
      title: "Two variables",
      problem: "Evaluate $2a + 3b$ when $a = 4$ and $b = -1$.",
      steps: [
        {
          action: "Substitute both values in parentheses.",
          why: "Each letter is replaced by its own value.",
          math: "2(4) + 3(-1)",
        },
        {
          action: "Multiply each product.",
          why: "Multiplication comes before addition. $3(-1) = -3$.",
          math: "8 + (-3)",
        },
        {
          action: "Add.",
          why: "Adding $-3$ is the same as subtracting 3.",
          math: "5",
        },
      ],
      answer: "$5$",
      mistake: {
        wrong: "Computing $2(4) + 3(1) = 11$.",
        whyWrong: "The sign of $b$ was ignored. $b$ is $-1$, not $1$.",
        fix: "Keep the negative sign inside the parentheses when you substitute.",
      },
    },
  ],
  quickCheck: [
    numeric({
      id: "ae-qc-4-1",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "Evaluate $5n + 3$ when $n = 4$.",
      answer: 23,
      commonErrors: [[32, "It looks like you computed $(5 + 3) \\times 4$. Multiplication comes first: $5 \\times 4$, then add 3."]],
      hints: [
        "Replace $n$ with 4.",
        "$5n$ means $5 \\times n$. Write it as $5(4)$.",
        "Multiply first, then add 3.",
      ],
      explanation: "$5(4) + 3 = 20 + 3 = 23$.",
      steps: ["Substitute: $5(4) + 3$.", "Multiply: $20 + 3$.", "Add: $23$."],
    }),
    numeric({
      id: "ae-qc-4-2",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "Evaluate $2x - 7$ when $x = -3$.",
      answer: -13,
      commonErrors: [[-1, "It seems the negative sign of $x$ was dropped: $2(3) - 7 = -1$. Use $x = -3$."]],
      hints: [
        "Replace $x$ with $-3$ inside parentheses.",
        "Write $2(-3) - 7$. What is $2 \\times (-3)$?",
        "$-6 - 7$ means going 7 further below zero.",
      ],
      explanation: "$2(-3) - 7 = -6 - 7 = -13$.",
      steps: ["Substitute: $2(-3) - 7$.", "Multiply: $-6 - 7$.", "Subtract: $-13$."],
    }),
    mcq({
      id: "ae-qc-4-3",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "What is the value of $x^2$ when $x = -4$?",
      choices: [
        "$16$",
        ["$-16$", "The whole $-4$ is squared: $(-4)(-4)$, and a negative times a negative is positive."],
        ["$-8$", "Squaring means multiplying the number by itself, not by 2."],
        ["$8$", "Squaring is not doubling. $x^2 = x \\times x$."],
      ],
      correct: 0,
      hints: [
        "$x^2$ means $x$ multiplied by itself.",
        "Substitute with parentheses: $(-4)^2$.",
        "Compute $(-4) \\times (-4)$. What is the sign of the answer?",
      ],
      explanation: "$(-4)^2 = (-4)(-4) = 16$.",
      steps: ["Substitute: $(-4)^2$.", "Expand: $(-4)(-4)$.", "Negative × negative = positive, so the answer is $16$."],
    }),
  ],
};
