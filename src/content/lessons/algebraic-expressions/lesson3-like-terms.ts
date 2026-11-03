import type { Lesson } from "@/types/content";
import { mcq, numeric } from "../../questions/builders";

const L = "like-unlike-terms";

export const likeUnlikeTerms: Lesson = {
  id: L,
  topicId: "algebraic-expressions",
  order: 3,
  title: "Like and Unlike Terms",
  summary: "Learn which terms can be combined and which must stay separate.",
  minutes: 15,
  objectives: [
    "Define like terms and unlike terms",
    "Decide whether two terms are like terms using variables and exponents",
    "Group like terms in an expression",
  ],
  introduction: {
    title: "Mangoes and bananas",
    blocks: [
      {
        type: "p",
        text: "3 mangoes + 5 mangoes = 8 mangoes. Easy! But 3 mangoes + 2 bananas? You cannot call that 5 mangoes or 5 bananas. It stays “3 mangoes and 2 bananas”.",
      },
      {
        type: "callout",
        variant: "real-life",
        title: "Same idea in algebra",
        text: "$3x + 5x = 8x$ works because both terms count the *same kind of thing*. But $3x + 2y$ cannot be combined into a single term, because $x$ and $y$ are different kinds of things.",
      },
    ],
  },
  concept: [
    {
      id: "like-terms",
      title: "What are like terms?",
      blocks: [
        {
          type: "callout",
          variant: "definition",
          title: "Like terms",
          text: "**Like terms** have exactly the same variable part – the same variables raised to the same exponents. Only their coefficients may differ. Constants are like terms with each other.",
        },
        {
          type: "table",
          headers: ["Pair", "Like terms?", "Why"],
          rows: [
            ["$3x$ and $-7x$", "Yes", "Both have $x$ to the power 1"],
            ["$2xy$ and $9yx$", "Yes", "Same letters; the order does not matter"],
            ["$5$ and $-12$", "Yes", "Both are constants"],
            ["$4y$ and $4y^2$", "No", "Exponents of $y$ differ"],
            ["$3x$ and $3y$", "No", "Different variables"],
          ],
        },
      ],
    },
    {
      id: "test-for-like",
      title: "A quick test",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**Cover the coefficients.** Ignore the numbers in front.",
            "**Compare the letters.** Are the same variables present?",
            "**Compare the exponents** of each letter. Are they equal?",
          ],
        },
        {
          type: "p",
          text: "If all three checks pass, the terms are like terms.",
        },
      ],
    },
    {
      id: "common-trap",
      title: "A common trap",
      blocks: [
        {
          type: "callout",
          variant: "warning",
          title: "$x$ and $x^2$ are NOT like terms",
          text: "Think of $x$ as a length (cm) and $x^2$ as an area (cm²). You cannot add centimeters to square centimeters. In the same way, $x$ and $x^2$ stay separate.",
        },
      ],
    },
  ],
  examples: [
    {
      id: "ex-group",
      title: "Group the like terms",
      problem: "Group the like terms: $4x,\\ 3y,\\ -2x,\\ 5,\\ 7y,\\ -9,\\ x^2$.",
      steps: [
        {
          action: "Collect the terms that contain $x$ to the first power.",
          why: "They have the same variable part, $x$.",
          math: "4x, \\ -2x",
        },
        {
          action: "Collect the $y$ terms.",
          why: "Both have the variable part $y$.",
          math: "3y, \\ 7y",
        },
        {
          action: "Collect the constants.",
          why: "Constants are like terms with each other.",
          math: "5, \\ -9",
        },
        {
          action: "Leave $x^2$ on its own.",
          why: "Its exponent is 2, so it does not match $x$.",
          math: "x^2",
        },
      ],
      answer: "Four groups: $\\{4x, -2x\\}$, $\\{3y, 7y\\}$, $\\{5, -9\\}$, and $\\{x^2\\}$.",
      mistake: {
        wrong: "Putting $x^2$ in the same group as $4x$ and $-2x$.",
        whyWrong: "The exponents are different (2 versus 1).",
        fix: "Always compare exponents, not just letters.",
      },
    },
    {
      id: "ex-test",
      title: "Apply the test",
      problem: "Are $6ab^2$ and $2b^2a$ like terms? Are $5x^2y$ and $5xy^2$ like terms?",
      steps: [
        {
          action: "For the first pair, cover the coefficients and compare.",
          why: "We are left with $ab^2$ and $b^2a$. Both have $a^1$ and $b^2$, so the order of writing does not matter.",
          math: "ab^2 \\ \\text{and} \\ b^2a",
        },
        {
          action: "For the second pair, cover the coefficients and compare.",
          why: "We get $x^2y$ and $xy^2$. Both use $x$ and $y$, but the exponents are swapped: ($x^2, y^1$) versus ($x^1, y^2$).",
          math: "x^2y \\ \\text{and} \\ xy^2",
        },
      ],
      answer: "$6ab^2$ and $2b^2a$ are like terms. $5x^2y$ and $5xy^2$ are **not** like terms.",
      mistake: {
        wrong: "“They use the same letters, so they are like terms.”",
        whyWrong: "Same letters is not enough. Each letter must also have the same exponent.",
        fix: "Check the exponent of every letter, one at a time.",
      },
    },
  ],
  quickCheck: [
    mcq({
      id: "ae-qc-3-1",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "Which pair are like terms?",
      choices: [
        ["$4a$ and $4a^2$", "The exponents of $a$ are different (1 and 2), so these are unlike."],
        ["$5m$ and $5n$", "Different variables, so unlike."],
        "$3xy$ and $-8xy$",
        ["$2x$ and $2$", "One has a variable and the other is a constant, so unlike."],
      ],
      correct: 2,
      hints: [
        "Cover the coefficients and compare what is left.",
        "Like terms need the same letters with the same exponents.",
        "Which pair leaves identical letters after you cover the numbers?",
      ],
      explanation: "$3xy$ and $-8xy$ both have variable part $xy$. Only the coefficients differ.",
      steps: ["Cover coefficients: $xy$ and $xy$.", "They match, so they are like terms."],
    }),
    numeric({
      id: "ae-qc-3-2",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "How many of the terms $4a,\\ -7a,\\ 3b,\\ 10a$ are like $4a$? (Count $4a$ itself.)",
      answer: 3,
      commonErrors: [[2, "You may have left out $4a$ itself. The question counts it as well."]],
      hints: [
        "Like terms of $4a$ have variable part $a$ (to the first power).",
        "Go through the four terms one at a time.",
        "$3b$ has a different variable, so skip it. Count the rest.",
      ],
      explanation: "$4a$, $-7a$ and $10a$ all have variable part $a$. $3b$ does not.",
      steps: ["$4a$ ✓, $-7a$ ✓, $3b$ ✗, $10a$ ✓.", "That is 3 terms."],
    }),
    mcq({
      id: "ae-qc-3-3",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "Which term is a like term of $5x^2y$?",
      choices: [
        ["$5xy^2$", "The exponents are swapped: $x^2y$ is not the same as $xy^2$."],
        "$-2yx^2$",
        ["$5x^2$", "This is missing the letter $y$."],
        ["$5x^2y^2$", "$y$ has exponent 2 here, but only exponent 1 in $5x^2y$."],
      ],
      correct: 1,
      hints: [
        "The variable part of $5x^2y$ is $x^2y$.",
        "Order of letters does not matter, but exponents must match.",
        "Rewrite each option’s variable part in the order $x$, then $y$.",
      ],
      explanation: "$-2yx^2$ has the same variable part as $5x^2y$, just written in a different order.",
      steps: ["Variable part of $5x^2y$ is $x^2y$.", "$-2yx^2$ rearranged is $-2x^2y$ – same variable part."],
    }),
  ],
};
