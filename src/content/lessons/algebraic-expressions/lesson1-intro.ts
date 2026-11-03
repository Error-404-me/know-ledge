import type { Lesson } from "@/types/content";
import { mcq, numeric } from "../../questions/builders";

const m = String.raw;
const L = "intro-algebraic-expressions";

export const introAlgebraicExpressions: Lesson = {
  id: L,
  topicId: "algebraic-expressions",
  order: 1,
  title: "Introduction to Algebraic Expressions",
  summary: "See why we use letters for numbers, and turn everyday phrases into math expressions.",
  minutes: 15,
  objectives: [
    "Explain what a variable and an algebraic expression are",
    "Tell an expression apart from an equation",
    "Translate word phrases into algebraic expressions",
  ],
  introduction: {
    title: "One rule for every customer",
    blocks: [
      {
        type: "p",
        text: "Suppose you help at a sari-sari store that sells ballpens at ₱8 each. A customer buys 3 pens, so you charge 3 × 8 = ₱24. Another buys 5 pens: 5 × 8 = ₱40. Another buys 10: ₱80.",
      },
      {
        type: "p",
        text: "Notice you are doing the **same thing** every time: multiply the number of pens by 8. Algebra lets us write that rule **once**, using a letter for the number that keeps changing.",
      },
      { type: "math", tex: "8n", caption: "n = the number of pens bought" },
      {
        type: "callout",
        variant: "real-life",
        title: "Why it helps",
        text: "The expression $8n$ works for 3 pens, 50 pens, or any number. A single rule replaces a long list of separate calculations.",
      },
    ],
  },
  concept: [
    {
      id: "variables-and-expressions",
      title: "Variables and expressions",
      blocks: [
        {
          type: "callout",
          variant: "definition",
          title: "Variable",
          text: "A **variable** is a letter (such as $n$, $x$, or $a$) that stands for a number that can change or is not known yet.",
        },
        {
          type: "callout",
          variant: "definition",
          title: "Algebraic expression",
          text: "An **algebraic expression** combines numbers, variables, and operation signs ($+$, $-$, $\\times$, $\\div$). It is a math *phrase* – it has **no** equal sign.",
        },
        {
          type: "table",
          headers: ["Written form", "What is it?"],
          rows: [
            ["$4n - 7$", "Algebraic expression"],
            ["$12 + 2k$", "Algebraic expression"],
            ["$3x + 2 = 11$", "Equation (has $=$), not an expression"],
            ["$x > 3$", "Inequality (has $>$), not an expression"],
          ],
        },
      ],
    },
    {
      id: "translating-phrases",
      title: "Words into symbols",
      blocks: [
        {
          type: "p",
          text: "Certain key words tell you which operation to use. Let $n$ stand for “a number”.",
        },
        {
          type: "table",
          headers: ["In words", "Expression"],
          rows: [
            ["the sum of a number and 5; a number increased by 5", "$n + 5$"],
            ["7 less than a number; 7 subtracted from a number", "$n - 7$"],
            ["twice a number; the product of 2 and a number", "$2n$"],
            [m`the quotient of a number and 4`, m`$\frac{n}{4}$`],
            ["3 more than twice a number", "$2n + 3$"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Write products without ×",
          text: "In algebra, $2 \\times n$ is written $2n$. The number goes first, then the letter.",
        },
      ],
    },
    {
      id: "watch-the-order",
      title: "Watch the order!",
      blocks: [
        {
          type: "callout",
          variant: "warning",
          title: "“Less than” flips the order",
          text: "“7 less than a number” means start with the number and take away 7, so it is $n - 7$ — **not** $7 - n$.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Break long phrases into small pieces",
          text: "For “3 more than twice a number”: first write “twice a number” → $2n$. Then apply “3 more than” → $2n + 3$.",
        },
      ],
    },
  ],
  examples: [
    {
      id: "ex-translate",
      title: "Translate a phrase",
      problem: "Write an algebraic expression for: **five less than three times a number**.",
      steps: [
        {
          action: "Choose a variable for the unknown number.",
          why: "A letter lets us write the rule without knowing the number.",
          math: m`n = \text{the number}`,
        },
        {
          action: "Translate “three times a number”.",
          why: "“Times” means multiplication, and we write the number before the letter.",
          math: "3n",
        },
        {
          action: "Apply “five less than” to that quantity.",
          why: "“Less than” means we take 5 away from the quantity we just wrote, so $3n$ comes first.",
          math: "3n - 5",
        },
      ],
      answer: "$3n - 5$",
      mistake: {
        wrong: "$5 - 3n$",
        whyWrong: "This reads as “$3n$ less than 5”, which reverses the meaning.",
        fix: "Ask yourself: *what is being made smaller?* It is $3n$, so it is written first.",
      },
    },
    {
      id: "ex-cost",
      title: "Write a cost expression",
      problem:
        "Ana buys 3 notebooks that cost ₱$x$ each and one pen that costs ₱15. Write an expression for her total cost.",
      steps: [
        {
          action: "Find the cost of the notebooks.",
          why: "3 notebooks at ₱$x$ each means we multiply 3 by $x$.",
          math: "3x",
        },
        {
          action: "Note the cost of the pen.",
          why: "The pen costs a fixed ₱15, so it does not involve $x$.",
          math: "15",
        },
        {
          action: "Add the two costs.",
          why: "Total cost is everything she pays put together.",
          math: "3x + 15",
        },
      ],
      answer: "$3x + 15$",
      mistake: {
        wrong: "$18x$",
        whyWrong: "This multiplies the pen’s ₱15 by $x$ as well, but the pen’s price does not change with $x$.",
        fix: "Only the notebooks depend on $x$. Keep the pen’s 15 as a separate term.",
      },
    },
  ],
  quickCheck: [
    mcq({
      id: "ae-qc-1-1",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "Which of these is an algebraic expression?",
      choices: [
        ["$3x + 2 = 11$", "This has an equal sign, so it is an equation (a complete statement)."],
        "$4n - 7$",
        ["$5 + 9 = 14$", "This is a number sentence with an equal sign, and it has no variable."],
        ["$x > 3$", "The $>$ sign makes this an inequality, not an expression."],
      ],
      correct: 1,
      hints: [
        "An expression is a *phrase*. Look for a symbol that turns it into a full statement.",
        "Symbols such as $=$, $>$ and $<$ make statements. Expressions never contain them.",
        "Cross out every option containing $=$ or $>$. What is left?",
      ],
      explanation: "$4n - 7$ is the only option with variables and operations but no $=$, $<$ or $>$.",
      steps: [
        "Check each option for $=$, $>$, or $<$.",
        "Options A, C and D contain one of those signs, so they are not expressions.",
        "$4n - 7$ is a phrase made from a variable, numbers and operations: an expression.",
      ],
    }),
    mcq({
      id: "ae-qc-1-2",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "Translate: **the sum of twice a number $n$ and 9**.",
      choices: [
        ["$2(n + 9)$", "“Twice” applies only to the number, not to the sum. Here the 9 would also be doubled."],
        ["$2n - 9$", "“Sum” means addition, not subtraction."],
        "$2n + 9$",
        ["$2 + n + 9$", "“Twice a number” means 2 multiplied by $n$, which is $2n$, not $2 + n$."],
      ],
      correct: 2,
      hints: [
        "Split it into two parts: “twice a number” and “9”.",
        "“Twice” means multiply by 2; “sum” means add.",
        "Write $2n$ first, then add 9.",
      ],
      explanation: "“Twice a number” is $2n$, and “the sum of … and 9” adds 9 to it: $2n + 9$.",
      steps: ["Twice a number $n$ → $2n$.", "The sum of $2n$ and 9 → $2n + 9$."],
    }),
    numeric({
      id: "ae-qc-1-3",
      lessonId: L,
      pool: "quickcheck",
      difficulty: "easy",
      prompt: "A pen costs ₱8. Using the expression $8n$, how much will **7 pens** cost?",
      answer: 56,
      unit: "pesos",
      commonErrors: [[15, "You added 8 + 7. The expression $8n$ means 8 **times** $n$."]],
      hints: [
        "In $8n$, $n$ is the number of pens. What is $n$ here?",
        "$8n$ means $8 \\times n$.",
        "Compute $8 \\times 7$.",
      ],
      explanation: "Replace $n$ by 7: $8n = 8 \\times 7 = 56$.",
      steps: ["$n = 7$.", "$8n = 8 \\times 7 = 56$ pesos."],
    }),
  ],
};
