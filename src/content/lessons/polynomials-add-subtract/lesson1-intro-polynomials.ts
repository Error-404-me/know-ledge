import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "polynomials-add-subtract";
const L = "intro-polynomials";
const { mc, num } = bank(T);

export const introPolynomials: Lesson = lesson(T, 1, {
  id: L,
  title: "Introduction to Polynomials",
  summary: "Learn what a polynomial is, how to find its degree, and how to write it in standard form.",
  minutes: 15,
  objectives: [
    "Tell polynomials from expressions that are not polynomials",
    "Find the degree of a term and of a polynomial",
    "Write a polynomial in standard form",
  ],
  introTitle: "Fencing a garden",
  intro: [
    p("A farmer fences a rectangular garden that is $(3x + 2)$ meters long and $(x + 5)$ meters wide. To find the fence needed, we add expressions like these. Expressions of this kind have a name: **polynomials**."),
    mth("2(3x + 2) + 2(x + 5) = 8x + 14"),
    co("real-life", "Why we need them", "Polynomials describe lengths, areas and costs that depend on an unknown number. Before we add, subtract, multiply or factor them, we need to know exactly what they are."),
  ],
  concept: [
    [
      "What is a polynomial?",
      [
        co("definition", "Polynomial", "A **polynomial** is a sum of terms. In each term, any variable has a **whole-number** exponent ($0, 1, 2, 3, \\ldots$)."),
        table(
          ["Expression", "Polynomial?"],
          [
            ["$3x^2 - 5x + 1$", "Yes"],
            ["$7$", "Yes (a constant)"],
            [m`$\frac{4}{x} + 2$`, "No. The variable is in a denominator."],
            [m`$\sqrt{x} + 3$`, "No. The variable is under a root."],
            ["$x^{-2} + 1$", "No. The exponent is negative."],
          ],
        ),
      ],
    ],
    [
      "Degree and standard form",
      [
        p("The **degree of a term** is the sum of the exponents of its variables. The **degree of a polynomial** is the largest degree among its terms."),
        mth(m`5x^3 - 2x^2 + x - 7 \quad \text{has degree } 3`),
        p("**Standard form** writes the terms from the highest degree to the lowest."),
        mth(m`4x - x^3 + 2 \ \longrightarrow \ -x^3 + 4x + 2`),
        co("tip", "Constants", "A constant such as 7 has degree 0, because $7 = 7x^0$."),
      ],
    ],
    [
      "Naming polynomials",
      [
        p("A **monomial** has one term, a **binomial** has two and a **trinomial** has three."),
        table(
          ["Polynomial", "Terms", "Name", "Degree"],
          [
            ["$6x^2$", "1", "Monomial", "2"],
            ["$x^3 - 4$", "2", "Binomial", "3"],
            ["$2x^2 - 3x + 1$", "3", "Trinomial", "2"],
          ],
        ),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-degree",
      "Find the degree",
      "Find the degree of $2x^2y - 3xy + 5$.",
      [
        ["Find the degree of each term.", "Add the exponents of all the variables in a term. $x^2y$ has $2 + 1 = 3$, $xy$ has $1 + 1 = 2$ and $5$ has 0.", m`3, \ 2, \ 0`],
        ["Take the largest.", "The degree of a polynomial is the highest degree of its terms.", "3"],
      ],
      "$3$",
      ["$2$", "Only the exponent of $x$ was counted. The degree of a term adds the exponents of **all** its variables.", "Add the exponents of every variable in each term."],
    ),
    ex(
      "ex-standard",
      "Write in standard form",
      "Write $7 - 3x + x^2$ in standard form.",
      [
        ["Find the degree of each term.", "$x^2$ has degree 2, $-3x$ has degree 1 and $7$ has degree 0."],
        ["Write the terms from highest degree to lowest.", "Keep each sign with its term.", "x^2 - 3x + 7"],
      ],
      "$x^2 - 3x + 7$",
    ),
  ],
  quickCheck: [
    mc("pas-qc-0-1", L, "qc", "e", "Which of these is a polynomial?",
      ["$x^2 - 3x + 4$", [m`$\dfrac{2}{x} + 1$`, "A variable in the denominator is not allowed."], [m`$\sqrt{x} + 2$`, "A variable under a root is not allowed."], ["$x^{-1} + 5$", "A negative exponent is not allowed."]],
      0, ["Check the exponents of the variables.", "They must be whole numbers: 0, 1, 2, ...", "Look for a variable in a denominator or under a root."],
      "$x^2 - 3x + 4$ has only whole-number exponents and no variables in denominators or roots.", ["Check each option.", "Only the first has whole-number exponents everywhere."]),
    num("pas-qc-0-2", L, "qc", "e", "What is the degree of $6x^4 - x^2 + 3$?", 4,
      ["The degree is the highest exponent.", "The exponents are 4, 2 and 0.", "Pick the largest."],
      "The highest power of $x$ is 4, so the degree is 4.", ["Exponents: 4, 2, 0.", "Largest: 4."]),
    mc("pas-qc-0-3", L, "qc", "e", "Write $5 + 2x^2 - x$ in standard form.",
      [["$5 - x + 2x^2$", "That lists the terms from the lowest degree to the highest."], "$2x^2 - x + 5$", ["$2x^2 + x + 5$", "The sign belongs to the term: it is $-x$."], ["$-x + 2x^2 + 5$", "Standard form goes from the highest degree to the lowest."]],
      1, ["Find the degree of each term.", "The degrees are 0, 2 and 1.", "Write from the highest degree to the lowest."],
      "Order by degree: $2x^2$, then $-x$, then $5$.", ["Degrees: 5 → 0, $2x^2$ → 2, $-x$ → 1.", "Highest first: $2x^2 - x + 5$."]),
  ],
});
