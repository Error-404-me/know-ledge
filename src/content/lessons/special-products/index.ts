import type { Question } from "@/types/content";
import { bank, co, ex, lesson, mth, p, table } from "../../questions/bank";

const T = "special-products";
const B = "square-of-binomial";
const C = "sum-and-difference";
const { mc, num } = bank(T);

export const lessons = [
  lesson(T, 1, {
    id: B,
    title: "Square of a Binomial",
    summary: "Expand the square of a sum or a difference with a pattern instead of long multiplication.",
    minutes: 18,
    objectives: [
      "Expand the square of a sum",
      "Expand the square of a difference",
      "Explain why the middle term is never missing",
    ],
    introTitle: "A square tile",
    intro: [
      p("A square tile has sides of length $(x + 3)$. Its area is $(x + 3)(x + 3)$, written $(x + 3)^2$. Multiplying it out:"),
      mth("(x + 3)(x + 3) = x^2 + 3x + 3x + 9 = x^2 + 6x + 9"),
      co("real-life", "Look at the shape", "The area splits into a big square $x^2$, two rectangles of area $3x$, and a small square of area 9. That is why a middle term appears."),
    ],
    concept: [
      [
        "Square of a sum",
        [
          mth("(a + b)^2 = a^2 + 2ab + b^2"),
          p("First term squared, plus **twice the product** of the two terms, plus last term squared."),
          mth("(x + 5)^2 = x^2 + 10x + 25"),
          co("warning", "Not just a² + b²", "$(x + 5)^2$ is **not** $x^2 + 25$. The middle term $10x$ is easy to forget."),
        ],
      ],
      [
        "Square of a difference",
        [
          mth("(a - b)^2 = a^2 - 2ab + b^2"),
          mth("(2x - 3)^2 = 4x^2 - 12x + 9"),
          co("tip", "Only the middle sign changes", "The first and last terms are always positive, because a square is never negative."),
        ],
      ],
    ],
    examples: [
      ex(
        "ex-square",
        "Expand a square of a sum",
        "Expand $(3x + 4)^2$.",
        [
          ["Identify the two terms.", "Here $a = 3x$ and $b = 4$.", "(3x + 4)^2"],
          ["Square each term and find the middle term.", "$a^2 = 9x^2$, $2ab = 2(3x)(4) = 24x$, $b^2 = 16$.", "9x^2 + 24x + 16"],
        ],
        "$9x^2 + 24x + 16$",
        ["$9x^2 + 16$", "The middle term $2ab = 24x$ was left out.", "Always write three terms for a squared binomial."],
      ),
    ],
    quickCheck: [
      mc("sp-qc-1-1", B, "qc", "e", "Expand $(x + 7)^2$.",
        [["$x^2 + 49$", "The middle term $2 \\cdot x \\cdot 7 = 14x$ is missing."], ["$x^2 + 7x + 49$", "The middle term is twice the product: $2 \\cdot 7 \\cdot x = 14x$."], "$x^2 + 14x + 49$", ["$x^2 + 14x + 7$", "The last term is $7^2 = 49$."]],
        2, ["Use first squared, plus twice the product, plus last squared.", "First: $x^2$. Last: $7^2$.", "Twice the product of $x$ and 7."],
        "$x^2 + 2(x)(7) + 49 = x^2 + 14x + 49$.", ["$x^2$.", "$14x$.", "$49$."]),
      num("sp-qc-1-2", B, "qc", "m", "$(x - 6)^2 = x^2 + bx + c$. What is $b$?", -12,
        ["Use $(a - b)^2 = a^2 - 2ab + b^2$.", "The middle term is $-2 \\cdot x \\cdot 6$.", "Compute $-2 \\cdot 6$."],
        "$(x - 6)^2 = x^2 - 12x + 36$, so $b = -12$.", ["Middle term: $-2(x)(6) = -12x$.", "$b = -12$."],
        [[12, "For a difference, the middle term is negative: $-12x$."], [0, "The middle term is never missing: $-2(x)(6) = -12x$."]]),
    ],
  }),
  lesson(T, 2, {
    id: C,
    title: "Sum and Difference of Two Terms",
    summary: "Multiply a sum by a difference in one step and use the pattern for mental math.",
    minutes: 15,
    objectives: [
      "Multiply conjugate binomials by pattern",
      "Tell the three special products apart",
      "Use the pattern for quick mental calculation",
    ],
    introTitle: "A mental-math trick",
    intro: [
      p("How can you compute $21 \\times 19$ quickly? Write it as $(20 + 1)(20 - 1)$:"),
      mth("(20 + 1)(20 - 1) = 20^2 - 1^2 = 400 - 1 = 399"),
      co("real-life", "Why it works", "The middle terms cancel, so only a difference of two squares is left."),
    ],
    concept: [
      [
        "Sum times difference",
        [
          mth("(a + b)(a - b) = a^2 - b^2"),
          p("The two middle terms, $-ab$ and $+ab$, cancel."),
          mth("(x + 4)(x - 4) = x^2 - 4x + 4x - 16 = x^2 - 16"),
        ],
      ],
      [
        "Choose the right pattern",
        [
          table(
            ["Product", "Result", "Middle term?"],
            [
              ["$(x + 3)^2$", "$x^2 + 6x + 9$", "Yes, $6x$"],
              ["$(x - 3)^2$", "$x^2 - 6x + 9$", "Yes, $-6x$"],
              ["$(x + 3)(x - 3)$", "$x^2 - 9$", "No, it cancels"],
            ],
          ),
          co("tip", "Spot the conjugates", "Two binomials with the same terms but opposite signs in the middle, like $(x + 3)$ and $(x - 3)$, are conjugates. Their product has no middle term."),
        ],
      ],
    ],
    examples: [
      ex(
        "ex-conj",
        "Multiply conjugates",
        "Multiply $(3x + 2)(3x - 2)$.",
        [
          ["Recognize the pattern.", "The binomials have the same terms with opposite signs, so $a = 3x$ and $b = 2$.", "(a + b)(a - b)"],
          ["Square each term and subtract.", "$a^2 = 9x^2$ and $b^2 = 4$.", "9x^2 - 4"],
        ],
        "$9x^2 - 4$",
      ),
      ex(
        "ex-mental",
        "Mental math",
        "Compute $31 \\times 29$ using a special product.",
        [
          ["Write the numbers around 30.", "$31 = 30 + 1$ and $29 = 30 - 1$.", "(30 + 1)(30 - 1)"],
          ["Apply the pattern.", "$30^2 - 1^2 = 900 - 1$.", "899"],
        ],
        "$899$",
      ),
    ],
    quickCheck: [
      mc("sp-qc-2-1", C, "qc", "e", "Multiply: $(m + 8)(m - 8)$.",
        [["$m^2 + 64$", "The product of conjugates is a **difference**: $m^2 - 64$."], ["$m^2 - 16m - 64$", "The middle terms cancel, so there is no $m$ term."], "$m^2 - 64$", ["$m^2 - 16$", "Square the 8: $8^2 = 64$."]],
        2, ["These are conjugates.", "The result is the first squared minus the last squared.", "$m^2$ and $8^2$."],
        "$(m + 8)(m - 8) = m^2 - 8^2 = m^2 - 64$.", ["Pattern: $a^2 - b^2$.", "$m^2 - 64$."]),
      num("sp-qc-2-2", C, "qc", "m", "Use $(40 + 1)(40 - 1)$ to compute $41 \\times 39$.", 1599,
        ["$41 = 40 + 1$ and $39 = 40 - 1$.", "Apply $(a + b)(a - b) = a^2 - b^2$.", "$40^2 - 1^2$."],
        "$40^2 - 1^2 = 1600 - 1 = 1599$.", ["Write $(40 + 1)(40 - 1)$.", "$1600 - 1 = 1599$."]),
    ],
  }),
];

export const questions: Question[] = [
  mc("sp-p-1-1", B, "p", "e", "Expand $(y + 2)^2$.",
    [["$y^2 + 4$", "The middle term, twice the product of $y$ and 2, is $4y$."], "$y^2 + 4y + 4$", ["$y^2 + 2y + 4$", "Twice the product of $y$ and 2 is $4y$, not $2y$."], ["$y^2 + 4y + 2$", "The last term is $2^2 = 4$."]],
    1, ["Square the first term, double the product, square the last.", "$y^2$, then $2(y)(2)$, then $2^2$.", "Put them together."],
    "$y^2 + 2(y)(2) + 4 = y^2 + 4y + 4$.", ["$y^2$.", "$4y$.", "$4$."]),
  num("sp-p-1-2", B, "p", "c", "$(2x - 5)^2 = ax^2 + bx + c$. What is $a + b + c$?", 9,
    ["Use $(a - b)^2 = a^2 - 2ab + b^2$ with $a = 2x$ and $b = 5$.", "$a^2 = 4x^2$, middle $= -2(2x)(5)$, $b^2 = 25$.", "Add the three coefficients."],
    "$(2x - 5)^2 = 4x^2 - 20x + 25$, so $a + b + c = 4 - 20 + 25 = 9$.", ["$4x^2$.", "$-20x$.", "$25$.", "$4 - 20 + 25 = 9$."]),
  mc("sp-p-2-1", C, "p", "e", "Multiply: $(x + 9)(x - 9)$.",
    [["$x^2 - 18x - 81$", "The middle terms cancel."], "$x^2 - 81$", ["$x^2 + 81$", "A product of conjugates is a difference."], ["$x^2 - 18$", "Square the 9: $9^2 = 81$."]],
    1, ["Conjugate binomials.", "First squared minus last squared.", "$x^2 - 9^2$."],
    "$(x + 9)(x - 9) = x^2 - 81$.", ["Pattern $a^2 - b^2$.", "$x^2 - 81$."]),
  num("sp-p-2-2", C, "p", "c", "$(5x + 3)(5x - 3) = ax^2 + b$. What is $a + b$?", 16,
    ["Use the conjugate pattern.", "$(5x)^2 - 3^2$.", "$25x^2 - 9$."],
    "$(5x + 3)(5x - 3) = 25x^2 - 9$, so $a + b = 25 - 9 = 16$.", ["$a = 25$.", "$b = -9$.", "$25 - 9 = 16$."]),
  mc("sp-a-1-1", B, "a", "m", "Expand $(3a + 2)^2$.",
    [["$9a^2 + 4$", "The middle term $2(3a)(2) = 12a$ is missing."], ["$3a^2 + 12a + 4$", "Square the whole $3a$: $(3a)^2 = 9a^2$."], ["$9a^2 + 6a + 4$", "The middle term is twice the product: $2(3a)(2) = 12a$."], "$9a^2 + 12a + 4$"],
    3, ["Use the square of a sum pattern.", "$a = 3a$ and $b = 2$.", "$(3a)^2$, $2(3a)(2)$, $2^2$."],
    "$(3a)^2 + 2(3a)(2) + 2^2 = 9a^2 + 12a + 4$.", ["$9a^2$.", "$12a$.", "$4$."]),
  num("sp-a-1-2", B, "a", "m", "Compute $51^2$ by writing it as $(50 + 1)^2$.", 2601,
    ["Use $(a + b)^2 = a^2 + 2ab + b^2$.", "$50^2 + 2(50)(1) + 1^2$.", "$2500 + 100 + 1$."],
    "$50^2 + 2(50)(1) + 1 = 2500 + 100 + 1 = 2601$.", ["Write $(50 + 1)^2$.", "$2500 + 100 + 1 = 2601$."]),
  mc("sp-a-2-1", C, "a", "m", "Multiply: $(4y - 7)(4y + 7)$.",
    [["$16y^2 + 49$", "A product of conjugates is a difference."], ["$16y^2 - 56y - 49$", "The middle terms cancel."], "$16y^2 - 49$", ["$4y^2 - 49$", "Square the whole $4y$: $(4y)^2 = 16y^2$."]],
    2, ["These are conjugates.", "Square the first term, square the last term, subtract.", "$(4y)^2$ and $7^2$."],
    "$(4y)^2 - 7^2 = 16y^2 - 49$.", ["$(4y)^2 = 16y^2$.", "$7^2 = 49$.", "$16y^2 - 49$."]),
  num("sp-a-2-2", C, "a", "m", "Use $(100 - 2)(100 + 2)$ to compute $98 \\times 102$.", 9996,
    ["Conjugate pattern with $a = 100$ and $b = 2$.", "$100^2 - 2^2$.", "$10000 - 4$."],
    "$100^2 - 2^2 = 10000 - 4 = 9996$.", ["Write $(100 - 2)(100 + 2)$.", "$10000 - 4 = 9996$."]),
];
