import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p } from "../../questions/bank";

const T = "factoring-special-forms";
const L = "perfect-square-trinomials";
const { mc, num } = bank(T);

export const perfectSquareTrinomials: Lesson = lesson(T, 3, {
  id: L,
  title: "Perfect Square Trinomials",
  summary: "Recognize and factor trinomials that come from squaring a binomial.",
  minutes: 18,
  objectives: [
    "Test whether a trinomial is a perfect square",
    "Factor trinomials that are the square of a sum or of a difference",
    "Spot trinomials that only look like perfect squares",
  ],
  introTitle: "Squaring, in reverse",
  intro: [
    p("You know $(x + 3)^2 = x^2 + 6x + 9$. Now go backwards: if you see $x^2 + 6x + 9$, can you recognize that it is a square?"),
    mth("x^2 + 6x + 9 = (x + 3)^2"),
    co("real-life", "Three clues", "The first and last terms are perfect squares, and the middle term is twice the product of their square roots."),
  ],
  concept: [
    [
      "Spot the pattern",
      [
        mth(m`a^2 + 2ab + b^2 = (a + b)^2 \qquad a^2 - 2ab + b^2 = (a - b)^2`),
        p("Test $x^2 + 10x + 25$: $x^2$ is a square, $25 = 5^2$, and $2 \\cdot x \\cdot 5 = 10x$ matches the middle term. It is a perfect square."),
      ],
    ],
    [
      "Factor it",
      [
        p("The sign of the middle term becomes the sign inside the parentheses."),
        mth("4x^2 - 12x + 9 = (2x - 3)^2"),
        co("warning", "Check the middle term", "$x^2 + 10x + 16$ looks similar, but $2 \\cdot x \\cdot 4 = 8x$, not $10x$. It is **not** a perfect square."),
      ],
    ],
    [
      "Perfect squares with a GCF",
      [
        p("Always look for a GCF first. What is left inside may be a perfect square trinomial."),
        mth("2x^2 + 12x + 18 = 2(x^2 + 6x + 9) = 2(x + 3)^2"),
        co("tip", "Keep the GCF", "The 2 stays in front of the answer. $2(x + 3)^2$ is not the same as $(2x + 6)^2$."),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-pst",
      "Factor a perfect square trinomial",
      "Factor $9x^2 + 30x + 25$.",
      [
        ["Check the first and last terms.", "$9x^2 = (3x)^2$ and $25 = 5^2$.", "(3x)^2 \\ \\text{and} \\ 5^2"],
        ["Check the middle term.", "$2(3x)(5) = 30x$, which matches.", "2(3x)(5) = 30x"],
        ["Write the square of a binomial.", "The middle term is positive, so use a plus sign.", "(3x + 5)^2"],
      ],
      "$(3x + 5)^2$",
    ),
    ex(
      "ex-pst-neg",
      "A negative middle term",
      "Factor $x^2 - 14x + 49$.",
      [
        ["Check the first and last terms.", "$x^2 = x^2$ and $49 = 7^2$.", m`x^2 \ \text{and} \ 7^2`],
        ["Check the middle term.", "$2(x)(7) = 14x$, and the middle term is negative.", "-14x"],
        ["Write the square of a difference.", "A negative middle term gives a minus sign inside.", "(x - 7)^2"],
      ],
      "$(x - 7)^2$",
      ["$(x + 7)^2$", "That expands to $x^2 + 14x + 49$. The middle term here is negative.", "The sign of the middle term decides the sign inside the parentheses."],
    ),
  ],
  quickCheck: [
    mc("fs-qc-2-1", L, "qc", "e", "Which trinomial is a perfect square?",
      ["$x^2 + 6x + 9$", ["$x^2 + 5x + 9$", "The middle term should be $2 \\cdot x \\cdot 3 = 6x$."], ["$x^2 - 6x + 8$", "The last term $8$ is not a perfect square."], ["$x^2 + 9$", "There is no middle term, so it is not a perfect square trinomial."]],
      0, ["Check that the first and last terms are perfect squares.", "Then check that the middle is twice the product of the roots.", "For $x^2 + ? + 9$, the roots are $x$ and 3."],
      "$x^2 + 6x + 9 = (x + 3)^2$ and $2 \\cdot x \\cdot 3 = 6x$.", ["Roots: $x$ and 3.", "Middle: $2(x)(3) = 6x$ ✓."]),
    num("fs-qc-2-2", L, "qc", "m", "$x^2 - 18x + 81 = (x - a)^2$. What is $a$?", 9,
      ["The last term $81$ is the square of $a$.", "$9^2 = 81$.", "Check the middle: $2 \\cdot 9 = 18$."],
      "$x^2 - 18x + 81 = (x - 9)^2$, so $a = 9$.", ["$\\sqrt{81} = 9$.", "Middle term $2(x)(9) = 18x$ ✓."]),
    mc("fs-qc-2-3", L, "qc", "m", "Which trinomial is **not** a perfect square?",
      [["$x^2 + 8x + 16$", "This is $(x + 4)^2$."], ["$x^2 - 10x + 25$", "This is $(x - 5)^2$."], "$x^2 + 6x + 10$", ["$4x^2 + 12x + 9$", "This is $(2x + 3)^2$."]],
      2, ["Test each one: are the first and last terms squares?", "Is the middle term twice the product of the roots?", "For $x^2 + 6x + 10$, 10 is not a perfect square."],
      "$x^2 + 6x + 10$ fails the test: 10 is not a perfect square. The others are squares of binomials.", ["Check each option.", "Only $x^2 + 6x + 10$ fails."]),
  ],
});
