import type { Lesson } from "@/types/content";
import { mcq, numeric } from "../../questions/builders";

const L = "parts-of-expression";

export const partsOfExpression: Lesson = {
  id: L,
  topicId: "algebraic-expressions",
  order: 2,
  title: "Variables, Constants, Coefficients, and Terms",
  summary: "Name each building block of an expression so you can talk about it – and work with it – clearly.",
  minutes: 15,
  objectives: [
    "Identify the terms of an expression",
    "Name the coefficient, variable, and constant in an expression",
    "Classify expressions as monomials, binomials, or trinomials",
  ],
  introduction: {
    title: "Some parts change, some don’t",
    blocks: [
      {
        type: "p",
        text: "A mobile data plan costs ₱50 per month, plus ₱10 for every extra GB you use. If $g$ is the number of extra GB, the monthly bill is:",
      },
      { type: "math", tex: "50 + 10g" },
      {
        type: "callout",
        variant: "real-life",
        title: "Two kinds of parts",
        text: "The ₱50 **never changes**, no matter how much data you use. The $10g$ part **changes** with $g$. Algebra gives each part a name so we can discuss it precisely.",
      },
    ],
  },
  concept: [
    {
      id: "terms",
      title: "Terms",
      blocks: [
        {
          type: "callout",
          variant: "definition",
          title: "Term",
          text: "A **term** is a number, a variable, or numbers and variables multiplied together. Terms are separated by $+$ and $-$ signs.",
        },
        {
          type: "p",
          text: "The sign in front of a term **belongs to that term**. So $5a^2 - a + 9$ has three terms:",
        },
        { type: "math", tex: "5a^2, \\quad -a, \\quad 9" },
      ],
    },
    {
      id: "parts-of-a-term",
      title: "Parts of a term",
      blocks: [
        {
          type: "termBreakdown",
          title: "Breaking down 4x² − 3x + 7",
          terms: [
            { display: "4x^2", coefficient: "4", variable: "x²", label: "variable term" },
            { display: "-3x", coefficient: "-3", variable: "x", label: "variable term" },
            { display: "7", coefficient: "—", variable: "none", label: "constant term" },
          ],
        },
        {
          type: "callout",
          variant: "definition",
          title: "Coefficient, variable, constant",
          text: "The **coefficient** is the number multiplied by the variable(s). A **constant term** has no variable – its value never changes.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Hidden coefficients",
          text: "If no number is written, the coefficient is 1. So $x = 1x$ and $-y = -1y$. The minus sign is part of the coefficient.",
        },
      ],
    },
    {
      id: "naming-by-terms",
      title: "Naming expressions by number of terms",
      blocks: [
        {
          type: "table",
          headers: ["Terms", "Name", "Example"],
          rows: [
            ["1", "Monomial", "$7x$"],
            ["2", "Binomial", "$x + 5$"],
            ["3", "Trinomial", "$x^2 + 2x + 1$"],
            ["4 or more", "Polynomial", "$a + b + c + d$"],
          ],
        },
        {
          type: "p",
          text: "“Polynomial” is the general name. Monomial, binomial, and trinomial are special names for polynomials with one, two, and three terms.",
        },
      ],
    },
  ],
  examples: [
    {
      id: "ex-identify",
      title: "Identify the parts",
      problem: "Identify the terms, coefficients and constant term of $5a^2 - a + 9$. Then name the expression.",
      steps: [
        {
          action: "Split at each $+$ or $-$ sign, keeping the sign with the term after it.",
          why: "The sign belongs to the term that follows it.",
          math: "5a^2, \\quad -a, \\quad 9",
        },
        {
          action: "Find each coefficient.",
          why: "The coefficient is the number multiplying the variable. In $-a$, a hidden 1 is there, so the coefficient is $-1$.",
          math: "5, \\quad -1",
        },
        {
          action: "Find the constant term.",
          why: "The constant term is the one without a variable.",
          math: "9",
        },
        {
          action: "Count the terms to name it.",
          why: "Three terms means a trinomial.",
        },
      ],
      answer: "Terms: $5a^2$, $-a$, $9$. Coefficients: $5$ and $-1$. Constant term: $9$. It is a trinomial.",
      mistake: {
        wrong: "“The coefficient of $-a$ is 1.”",
        whyWrong: "The minus sign belongs to the term, so it belongs to the coefficient.",
        fix: "Write $-a$ as $-1a$ if you are unsure. The coefficient is $-1$.",
      },
    },
    {
      id: "ex-classify",
      title: "Classify and find a coefficient",
      problem: "In $3x^2y - 2xy$, what kind of polynomial is it, and what is the coefficient of $x^2y$?",
      steps: [
        {
          action: "Count the terms.",
          why: "There are two terms, $3x^2y$ and $-2xy$.",
          math: "3x^2y, \\quad -2xy",
        },
        {
          action: "Name it by its number of terms.",
          why: "Two terms makes it a binomial.",
        },
        {
          action: "Look at the term $3x^2y$ and ignore its letters.",
          why: "The number left over is the coefficient. The exponent 2 is part of the variable part, not the coefficient.",
          math: "3",
        },
      ],
      answer: "It is a binomial, and the coefficient of $x^2y$ is $3$.",
      mistake: {
        wrong: "“The coefficient is $3x^2$.”",
        whyWrong: "At this level the coefficient is the numerical factor only. Letters and exponents stay in the variable part.",
        fix: "Cover up the letters in the term. What number is left?",
      },
    },
  ],
  quickCheck: [
    numeric({
      id: "ae-qc-2-1",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "How many terms are in $7x^2 - 4x + 1 - 5y$?",
      answer: 4,
      commonErrors: [[3, "Check again – every part separated by a $+$ or $-$ is a term, including the constant 1 and the $y$ term."]],
      hints: [
        "A term is one part of the expression separated by $+$ or $-$.",
        "The signs $+$ and $-$ act as dividers between terms.",
        "List them: $7x^2$, $-4x$, … continue until the end.",
      ],
      explanation: "The terms are $7x^2$, $-4x$, $1$ and $-5y$, which makes 4 terms.",
      steps: ["Split at each sign: $7x^2$ | $-4x$ | $+1$ | $-5y$.", "Count the pieces: 4."],
    }),
    mcq({
      id: "ae-qc-2-2",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "What is the coefficient of $-x$?",
      choices: [
        ["$1$", "The minus sign belongs to the term. $-x$ is $-1$ times $x$, so the coefficient is negative."],
        "$-1$",
        ["$0$", "There is a number multiplying $x$ – it is just not written. Zero would make the term disappear."],
        ["$x$", "$x$ is the variable. The coefficient is the *number* that multiplies it."],
      ],
      correct: 1,
      hints: [
        "The coefficient is the number multiplying the variable.",
        "If no number is written, it is a hidden 1. What about the minus sign?",
        "Write $-x$ as $-1 \\cdot x$.",
      ],
      explanation: "$-x = -1 \\cdot x$, so its coefficient is $-1$.",
      steps: ["Rewrite $-x$ as $-1x$.", "The number multiplying $x$ is $-1$."],
    }),
    mcq({
      id: "ae-qc-2-3",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "Which is the constant term of $6m - 2m^2 + 8$?",
      choices: [
        ["$6$", "6 is the coefficient of $m$. It multiplies a variable, so it is not a constant term."],
        ["$-2$", "$-2$ is the coefficient of $m^2$."],
        "$8$",
        ["$m$", "$m$ is a variable, not a constant."],
      ],
      correct: 2,
      hints: [
        "A constant term is the one whose value never changes.",
        "Look for the term with no variable.",
        "Which term has no letter attached to it?",
      ],
      explanation: "8 is the only term without a variable, so it is the constant term.",
      steps: ["Terms: $6m$, $-2m^2$, $8$.", "Only $8$ has no variable."],
    }),
  ],
};
