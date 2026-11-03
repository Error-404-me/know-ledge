import type { Lesson } from "@/types/content";
import { mcq, numeric } from "../../questions/builders";

const L = "simplifying-expressions";

export const simplifyingExpressions: Lesson = {
  id: L,
  topicId: "algebraic-expressions",
  order: 5,
  title: "Simplifying Algebraic Expressions",
  summary: "Write expressions in their shortest form by combining like terms and using the distributive property.",
  minutes: 20,
  objectives: [
    "Combine like terms",
    "Use the distributive property to remove parentheses",
    "Handle a minus sign in front of parentheses",
  ],
  introduction: {
    title: "Two stores, one total",
    blocks: [
      {
        type: "p",
        text: "You buy 2 notebooks at ₱$x$ each in one store and 3 notebooks at ₱$x$ each in another store. Your total spending is:",
      },
      { type: "math", tex: "2x + 3x" },
      {
        type: "p",
        text: "That is 5 notebooks at ₱$x$ each, so the total is simply $5x$. **Simplifying** means rewriting an expression in a shorter, equivalent form.",
      },
    ],
  },
  concept: [
    {
      id: "combine-like-terms",
      title: "Combine like terms",
      blocks: [
        {
          type: "p",
          text: "To combine like terms, **add or subtract the coefficients** and keep the variable part **unchanged**.",
        },
        { type: "math", tex: "5x + 2x = (5 + 2)x = 7x" },
        {
          type: "callout",
          variant: "warning",
          title: "The variable part does not change",
          text: "$5x + 2x = 7x$, **not** $7x^2$. You are counting how many $x$’s you have, not multiplying $x$ by itself.",
        },
      ],
    },
    {
      id: "distributive-property",
      title: "The distributive property",
      blocks: [
        {
          type: "math",
          tex: "a(b + c) = ab + ac",
        },
        {
          type: "p",
          text: "The number outside the parentheses multiplies **every** term inside.",
        },
        { type: "math", tex: "3(2x + 4) = 3 \\cdot 2x + 3 \\cdot 4 = 6x + 12" },
      ],
    },
    {
      id: "minus-before-parentheses",
      title: "A minus sign before parentheses",
      blocks: [
        {
          type: "p",
          text: "A minus sign in front of parentheses means “multiply by $-1$”. That **changes the sign of every term** inside.",
        },
        { type: "math", tex: "-(2y - 5) = -2y + 5" },
        {
          type: "callout",
          variant: "tip",
          title: "Simplifying recipe",
          text: "1) Remove parentheses using the distributive property. 2) Group like terms together. 3) Combine each group.",
        },
      ],
    },
  ],
  examples: [
    {
      id: "ex-combine",
      title: "Combine like terms",
      problem: "Simplify $5x + 3 - 2x + 8$.",
      steps: [
        {
          action: "Group like terms together, keeping each sign.",
          why: "$5x$ and $-2x$ are like terms. $3$ and $8$ are constants.",
          math: "(5x - 2x) + (3 + 8)",
        },
        {
          action: "Combine each group.",
          why: "$5 - 2 = 3$ for the $x$ terms; $3 + 8 = 11$ for the constants.",
          math: "3x + 11",
        },
      ],
      answer: "$3x + 11$",
      mistake: {
        wrong: "$14x$",
        whyWrong: "This merges $x$ terms and constants, which are unlike terms.",
        fix: "Only combine terms with the same variable part.",
      },
    },
    {
      id: "ex-distribute",
      title: "Distribute, then combine",
      problem: "Simplify $3(2a - 4) + 5a - 1$.",
      steps: [
        {
          action: "Distribute 3 to both terms in the parentheses.",
          why: "The 3 multiplies every term inside: $3 \\cdot 2a = 6a$ and $3 \\cdot (-4) = -12$.",
          math: "6a - 12 + 5a - 1",
        },
        {
          action: "Group like terms.",
          why: "$6a$ and $5a$ are alike; $-12$ and $-1$ are constants.",
          math: "(6a + 5a) + (-12 - 1)",
        },
        {
          action: "Combine.",
          why: "$6 + 5 = 11$ and $-12 - 1 = -13$.",
          math: "11a - 13",
        },
      ],
      answer: "$11a - 13$",
      mistake: {
        wrong: "$6a - 4 + 5a - 1$",
        whyWrong: "The 3 was applied only to the first term and was forgotten for the $-4$.",
        fix: "Draw an arrow from the outside number to every term inside.",
      },
    },
    {
      id: "ex-minus",
      title: "Subtracting a group",
      problem: "Simplify $7y - (2y - 5)$.",
      steps: [
        {
          action: "Remove the parentheses by changing the sign of each term inside.",
          why: "$-(2y - 5)$ means $-1 \\cdot (2y - 5)$, so $2y$ becomes $-2y$ and $-5$ becomes $+5$.",
          math: "7y - 2y + 5",
        },
        {
          action: "Combine like terms.",
          why: "$7y - 2y = 5y$.",
          math: "5y + 5",
        },
      ],
      answer: "$5y + 5$",
      mistake: {
        wrong: "$5y - 5$",
        whyWrong: "Only the first sign inside the parentheses was changed. The $-5$ must also flip.",
        fix: "Say it aloud: “minus times minus is plus.”",
      },
    },
  ],
  quickCheck: [
    mcq({
      id: "ae-qc-5-1",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "Simplify $4a + 7a - 2a$.",
      choices: [
        ["$13a$", "The last term is $-2a$, so it must be subtracted: $4 + 7 - 2$."],
        "$9a$",
        ["$9$", "The variable $a$ stays in the answer. You are adding coefficients, not removing the letter."],
        ["$9a^2$", "The variable part does not change when combining like terms."],
      ],
      correct: 1,
      hints: [
        "Are all three terms like terms?",
        "Add and subtract the coefficients and keep $a$.",
        "Compute $4 + 7 - 2$.",
      ],
      explanation: "$4 + 7 - 2 = 9$, so the result is $9a$.",
      steps: ["All three terms have variable part $a$.", "Combine coefficients: $4 + 7 - 2 = 9$.", "Result: $9a$."],
    }),
    numeric({
      id: "ae-qc-5-2",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "After simplifying $6x + 9 - 2x - 4$, what is the **coefficient of $x$**?",
      answer: 4,
      commonErrors: [[8, "You added $6x$ and $2x$. The term is $-2x$, so subtract: $6 - 2$."]],
      hints: [
        "Find the terms that have $x$.",
        "They are $6x$ and $-2x$.",
        "Compute $6 - 2$.",
      ],
      explanation: "$6x - 2x = 4x$, and the constants give $9 - 4 = 5$. The simplified form is $4x + 5$, so the coefficient is 4.",
      steps: ["Group: $(6x - 2x) + (9 - 4)$.", "Combine: $4x + 5$.", "Coefficient of $x$ is 4."],
    }),
    mcq({
      id: "ae-qc-5-3",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "moderate",
      prompt: "Simplify $2(x + 5) - (x - 3)$.",
      choices: [
        ["$x + 7$", "The minus sign flips **both** signs in $(x - 3)$, so $-(-3) = +3$, not $-3$."],
        ["$3x + 7$", "$-(x)$ is $-x$, not $+x$. The minus before the parentheses changes every sign inside."],
        "$x + 13$",
        ["$x + 2$", "Slow down and go step by step: first expand $2(x + 5)$ to $2x + 10$, then rewrite $-(x - 3)$ as $-x + 3$, and only then combine."],
      ],
      correct: 2,
      hints: [
        "Deal with the parentheses first, one group at a time.",
        "$2(x + 5)$ distributes 2. $-(x - 3)$ changes both signs.",
        "You should get $2x + 10 - x + 3$. Now combine like terms.",
      ],
      explanation: "$2x + 10 - x + 3 = (2x - x) + (10 + 3) = x + 13$.",
      steps: [
        "Distribute 2: $2x + 10$.",
        "Remove the minus group: $-x + 3$.",
        "Combine: $2x + 10 - x + 3 = x + 13$.",
      ],
    }),
  ],
};
