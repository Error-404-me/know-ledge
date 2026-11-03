import type { Question } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "factoring-special-forms";
const D = "difference-of-two-squares";
const P = "perfect-square-trinomials";
const Q = "quadratic-trinomials";
const { mc, num } = bank(T);

export const lessons = [
  lesson(T, 1, {
    id: D,
    title: "Difference of Two Squares",
    summary: "Factor a difference of two squares into conjugate binomials by recognizing perfect squares.",
    minutes: 15,
    objectives: [
      "Recognize perfect squares",
      "Factor a difference of two squares",
      "Factor out a GCF before using the pattern",
    ],
    introTitle: "Running the pattern backwards",
    intro: [
      p("You learned that $(x + 5)(x - 5) = x^2 - 25$. Factoring reverses this:"),
      mth("x^2 - 25 = (x + 5)(x - 5)"),
      co("remember", "Pattern", "$a^2 - b^2 = (a + b)(a - b)$. Two perfect squares with a **minus** between them factor into conjugates."),
    ],
    concept: [
      [
        "Recognize perfect squares",
        [
          table(
            ["Number or term", "It is the square of"],
            [
              ["$1, 4, 9, 16, 25$", "$1, 2, 3, 4, 5$"],
              ["$36, 49, 64, 81, 100$", "$6, 7, 8, 9, 10$"],
              ["$x^2, x^4, x^6$", "$x, x^2, x^3$"],
              ["$9x^2$", "$3x$"],
            ],
          ),
        ],
      ],
      [
        "Factor it",
        [
          p("Take the square root of each term, then write the sum times the difference."),
          mth("9x^2 - 49 = (3x)^2 - 7^2 = (3x + 7)(3x - 7)"),
          co("warning", "Sum of squares", "$x^2 + 25$ **cannot** be factored this way. The pattern needs a minus sign. Also factor out a GCF first: $2x^2 - 50 = 2(x^2 - 25) = 2(x + 5)(x - 5)$."),
        ],
      ],
    ],
    examples: [
      ex(
        "ex-dos",
        "Factor with a GCF first",
        "Factor $3x^2 - 75$.",
        [
          ["Factor out the GCF.", "Both terms are multiples of 3.", "3(x^2 - 25)"],
          ["Recognize the difference of squares.", "$x^2 = (x)^2$ and $25 = 5^2$.", "3(x^2 - 5^2)"],
          ["Factor the difference of squares.", "Sum times difference.", "3(x + 5)(x - 5)"],
        ],
        "$3(x + 5)(x - 5)$",
        ["$(3x + 15)(3x - 15)$", "75 is not a perfect square, so the pattern does not apply until the GCF is out.", "Factor out the common factor first."],
      ),
    ],
    quickCheck: [
      mc("fs-qc-1-1", D, "qc", "e", "Factor $x^2 - 64$.",
        [["$(x - 8)^2$", "That expands to $x^2 - 16x + 64$, not $x^2 - 64$."], ["$(x + 8)^2$", "That expands to $x^2 + 16x + 64$."], "$(x + 8)(x - 8)$", ["$(x + 4)(x - 16)$", "Expanding gives $x^2 - 12x - 64$."]],
        2, ["Is $64$ a perfect square?", "$64 = 8^2$.", "Write the sum times the difference."],
        "$x^2 - 8^2 = (x + 8)(x - 8)$.", ["$x^2$ and $8^2$.", "$(x + 8)(x - 8)$."]),
      num("fs-qc-1-2", D, "qc", "e", "$49x^2 - 25 = (7x + a)(7x - a)$. What is $a$?", 5,
        ["$49x^2 = (7x)^2$.", "$25$ is the square of what?", "$5^2 = 25$."],
        "$49x^2 - 25 = (7x)^2 - 5^2 = (7x + 5)(7x - 5)$, so $a = 5$.", ["Square roots: $7x$ and $5$.", "$a = 5$."]),
    ],
  }),
  lesson(T, 2, {
    id: P,
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
    ],
    quickCheck: [
      mc("fs-qc-2-1", P, "qc", "e", "Which trinomial is a perfect square?",
        ["$x^2 + 6x + 9$", ["$x^2 + 5x + 9$", "The middle term should be $2 \\cdot x \\cdot 3 = 6x$."], ["$x^2 - 6x + 8$", "The last term $8$ is not a perfect square."], ["$x^2 + 9$", "There is no middle term, so it is not a perfect square trinomial."]],
        0, ["Check that the first and last terms are perfect squares.", "Then check that the middle is twice the product of the roots.", "For $x^2 + ? + 9$, the roots are $x$ and 3."],
        "$x^2 + 6x + 9 = (x + 3)^2$ and $2 \\cdot x \\cdot 3 = 6x$.", ["Roots: $x$ and 3.", "Middle: $2(x)(3) = 6x$ ✓."]),
      num("fs-qc-2-2", P, "qc", "m", "$x^2 - 18x + 81 = (x - a)^2$. What is $a$?", 9,
        ["The last term $81$ is the square of $a$.", "$9^2 = 81$.", "Check the middle: $2 \\cdot 9 = 18$."],
        "$x^2 - 18x + 81 = (x - 9)^2$, so $a = 9$.", ["$\\sqrt{81} = 9$.", "Middle term $2(x)(9) = 18x$ ✓."]),
    ],
  }),
  lesson(T, 3, {
    id: Q,
    title: "Quadratic Trinomials",
    summary: "Factor quadratic trinomials, including ones where the first coefficient is not 1.",
    minutes: 22,
    objectives: [
      "Factor trinomials with first coefficient 1 by finding two numbers",
      "Choose the signs of the two numbers correctly",
      "Factor trinomials with any first coefficient by splitting the middle term",
    ],
    introTitle: "Looking for two numbers",
    intro: [
      p("Multiply $(x + 2)(x + 3)$ and you get $x^2 + 5x + 6$. Notice that $2 \\times 3 = 6$ and $2 + 3 = 5$."),
      mth("(x + 2)(x + 3) = x^2 + 5x + 6"),
      co("tip", "The rule", "To factor $x^2 + bx + c$, find two numbers whose **product is $c$** and whose **sum is $b$**."),
    ],
    concept: [
      [
        "When the last term is positive",
        [
          p("Both numbers have the same sign as the middle term."),
          mth("x^2 + 7x + 12 = (x + 3)(x + 4)"),
          mth("x^2 - 9x + 20 = (x - 4)(x - 5)"),
        ],
      ],
      [
        "When the last term is negative",
        [
          p("The numbers have opposite signs. The one with the larger size takes the sign of the middle term."),
          mth("x^2 + 2x - 15 = (x + 5)(x - 3)"),
          mth("x^2 - x - 12 = (x - 4)(x + 3)"),
        ],
      ],
      [
        "When the first coefficient is not 1",
        [
          p("Multiply $a \\cdot c$. Find two numbers with that product that add to $b$. Use them to split the middle term, then factor by grouping."),
          mth("2x^2 + 7x + 3: \\ ac = 6, \\ 6 + 1 = 7"),
          mth("2x^2 + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3)"),
          co("tip", "Always check", "Multiply the two binomials back out and compare with the original trinomial."),
        ],
      ],
    ],
    examples: [
      ex(
        "ex-qt1",
        "A negative last term",
        "Factor $x^2 + x - 12$.",
        [
          ["Find two numbers with product $-12$ and sum $1$.", "Opposite signs, and the larger one is positive. Try $4$ and $-3$.", "4 \\times (-3) = -12, \\quad 4 + (-3) = 1"],
          ["Write the factors.", "Use the two numbers in the binomials.", "(x + 4)(x - 3)"],
        ],
        "$(x + 4)(x - 3)$",
      ),
      ex(
        "ex-qt2",
        "Split the middle term",
        "Factor $3x^2 + 10x + 8$.",
        [
          ["Find $ac$ and two numbers.", "$ac = 3 \\cdot 8 = 24$. Two numbers with product 24 and sum 10 are 6 and 4.", "24 = 6 \\times 4, \\quad 6 + 4 = 10"],
          ["Split the middle term.", "Replace $10x$ with $6x + 4x$.", "3x^2 + 6x + 4x + 8"],
          ["Factor by grouping.", "$3x(x + 2) + 4(x + 2)$.", "(3x + 4)(x + 2)"],
        ],
        "$(3x + 4)(x + 2)$",
      ),
    ],
    quickCheck: [
      mc("fs-qc-3-1", Q, "qc", "e", "Factor $x^2 + 9x + 20$.",
        [["$(x + 2)(x + 10)$", "These multiply to 20, but add to 12, not 9."], ["$(x - 4)(x - 5)$", "The middle term is positive, so both numbers are positive."], "$(x + 4)(x + 5)$", ["$(x + 1)(x + 20)$", "These multiply to 20, but add to 21, not 9."]],
        2, ["Find two numbers with product 20 and sum 9.", "Try the factor pairs of 20.", "4 and 5."],
        "$4 \\times 5 = 20$ and $4 + 5 = 9$, so $x^2 + 9x + 20 = (x + 4)(x + 5)$.", ["Pairs of 20: 1·20, 2·10, 4·5.", "Only 4 + 5 = 9.", "$(x + 4)(x + 5)$."]),
      num("fs-qc-3-2", Q, "qc", "m", "$x^2 - 5x - 14 = (x - 7)(x + a)$. What is $a$?", 2,
        ["The two numbers multiply to $-14$.", "One of them is $-7$.", "$-7 \\times ? = -14$."],
        "$-7 \\times 2 = -14$ and $-7 + 2 = -5$, so $a = 2$.", ["Product: $-14$, so the other number is 2.", "Sum: $-7 + 2 = -5$ ✓."]),
    ],
  }),
];

export const questions: Question[] = [
  mc("fs-p-1-1", D, "p", "e", "Factor $y^2 - 36$.",
    ["$(y + 6)(y - 6)$", ["$(y - 6)^2$", "That expands to $y^2 - 12y + 36$."], ["$(y - 18)(y + 2)$", "Expanding gives $y^2 - 16y - 36$."], ["$(y + 6)^2$", "That expands to $y^2 + 12y + 36$."]],
    0, ["Is $36$ a perfect square?", "$36 = 6^2$.", "Sum times difference."],
    "$y^2 - 6^2 = (y + 6)(y - 6)$.", ["Roots: $y$ and 6.", "$(y + 6)(y - 6)$."]),
  mc("fs-p-1-2", D, "p", "c", "Factor completely: $2x^2 - 18$.",
    [["$(2x + 3)(2x - 3)$", "Expanding gives $4x^2 - 9$, not $2x^2 - 18$."], ["$2(x - 3)^2$", "That expands to $2x^2 - 12x + 18$."], "$2(x + 3)(x - 3)$", ["$(x + 3)(x - 3)$", "The common factor 2 must stay in the answer."]],
    2, ["Look for a GCF first.", "$2x^2 - 18 = 2(x^2 - 9)$.", "Now factor the difference of squares."],
    "$2x^2 - 18 = 2(x^2 - 9) = 2(x + 3)(x - 3)$.", ["GCF: $2(x^2 - 9)$.", "$x^2 - 9 = (x + 3)(x - 3)$."]),
  mc("fs-p-2-1", P, "p", "e", "Factor $y^2 + 8y + 16$.",
    [["$(y + 8)^2$", "That expands to $y^2 + 16y + 64$."], ["$(y + 4)(y - 4)$", "That is $y^2 - 16$."], "$(y + 4)^2$", ["$(y + 16)(y + 1)$", "These add to 17, not 8."]],
    2, ["Is $16$ a perfect square?", "$16 = 4^2$ and $2 \\cdot y \\cdot 4 = 8y$.", "The middle sign is $+$."],
    "$y^2 + 2(y)(4) + 4^2 = (y + 4)^2$.", ["Roots: $y$ and 4.", "Middle: $2(y)(4) = 8y$ ✓.", "$(y + 4)^2$."]),
  num("fs-p-2-2", P, "p", "c", "For what positive value of $k$ is $x^2 + kx + 25$ a perfect square trinomial?", 10,
    ["The last term is $5^2$.", "The middle term must be twice the product of $x$ and 5.", "$2 \\cdot 5 = ?$"],
    "$x^2 + 10x + 25 = (x + 5)^2$, so $k = 10$.", ["Roots: $x$ and 5.", "Middle term $= 2(x)(5) = 10x$.", "$k = 10$."]),
  mc("fs-p-3-1", Q, "p", "e", "Factor $x^2 + 7x + 10$.",
    ["$(x + 2)(x + 5)$", ["$(x + 1)(x + 10)$", "These add to 11, not 7."], ["$(x - 2)(x - 5)$", "The middle term is positive, so both numbers are positive."], ["$(x + 3)(x + 4)$", "These multiply to 12, not 10."]],
    0, ["Find two numbers with product 10 and sum 7.", "Factor pairs of 10: 1·10 and 2·5.", "Which pair adds to 7?"],
    "$2 \\times 5 = 10$ and $2 + 5 = 7$.", ["Pairs: 1·10, 2·5.", "2 + 5 = 7.", "$(x + 2)(x + 5)$."]),
  mc("fs-p-3-2", Q, "p", "c", "Factor $2x^2 + 5x + 2$.",
    [["$(2x + 2)(x + 1)$", "Expanding gives $2x^2 + 4x + 2$."], ["$(x + 2)(x + 1)$", "Expanding gives $x^2 + 3x + 2$."], "$(2x + 1)(x + 2)$", ["$(2x + 4)(x + 1)$", "Expanding gives $2x^2 + 6x + 4$."]],
    2, ["$ac = 2 \\cdot 2 = 4$.", "Two numbers with product 4 and sum 5: 4 and 1.", "Split: $2x^2 + 4x + x + 2$."],
    "$2x^2 + 4x + x + 2 = 2x(x + 2) + 1(x + 2) = (2x + 1)(x + 2)$.", ["Split the middle term.", "Group.", "$(2x + 1)(x + 2)$."]),
  mc("fs-a-1-1", D, "a", "m", "Factor $25a^2 - 4b^2$.",
    [["$(5a - 2b)^2$", "That expands to $25a^2 - 20ab + 4b^2$."], "$(5a + 2b)(5a - 2b)$", ["$(25a + 4b)(a - b)$", "Expanding does not give the original."], ["$(5a + 4b)(5a - 4b)$", "$4b^2 = (2b)^2$, so the second term is $2b$."]],
    1, ["Find the square roots of each term.", "$25a^2 = (5a)^2$ and $4b^2 = (2b)^2$.", "Sum times difference."],
    "$(5a)^2 - (2b)^2 = (5a + 2b)(5a - 2b)$.", ["Roots: $5a$ and $2b$.", "$(5a + 2b)(5a - 2b)$."]),
  num("fs-a-1-2", D, "a", "m", "$x^2 - 144 = (x + a)(x - a)$. What is $a$?", 12,
    ["$144$ is a perfect square.", "$12 \\times 12 = 144$.", "So $a$ is 12."],
    "$x^2 - 12^2 = (x + 12)(x - 12)$, so $a = 12$.", ["$\\sqrt{144} = 12$.", "$a = 12$."]),
  mc("fs-a-2-1", P, "a", "m", "Factor $4a^2 + 12a + 9$.",
    [["$(4a + 3)^2$", "$4a^2 = (2a)^2$, so the first term is $2a$, not $4a$."], ["$(2a + 9)(2a + 1)$", "Expanding gives $4a^2 + 20a + 9$."], "$(2a + 3)^2$", ["$(2a - 3)^2$", "The middle term is positive, so the sign is $+$."]],
    2, ["$4a^2 = (2a)^2$ and $9 = 3^2$.", "Check: $2(2a)(3) = 12a$.", "The middle sign is $+$."],
    "$(2a)^2 + 2(2a)(3) + 3^2 = (2a + 3)^2$.", ["Roots: $2a$ and 3.", "Middle: $12a$ ✓.", "$(2a + 3)^2$."]),
  mc("fs-a-2-2", P, "a", "c", "Factor $9x^2 - 24x + 16$.",
    [["$(3x - 8)^2$", "$16 = 4^2$, so the last root is 4, not 8."], ["$(3x + 4)^2$", "The middle term is negative, so the sign is $-$."], "$(3x - 4)^2$", ["$(9x - 4)^2$", "$9x^2 = (3x)^2$, so the first root is $3x$."]],
    2, ["$9x^2 = (3x)^2$ and $16 = 4^2$.", "Check the middle: $2(3x)(4) = 24x$.", "The middle sign is $-$."],
    "$(3x)^2 - 2(3x)(4) + 4^2 = (3x - 4)^2$.", ["Roots: $3x$ and 4.", "Middle: $-24x$ ✓.", "$(3x - 4)^2$."]),
  mc("fs-a-3-1", Q, "a", "m", "Factor $x^2 - 2x - 24$.",
    ["$(x - 6)(x + 4)$", ["$(x + 6)(x - 4)$", "These add to $+2$, not $-2$."], ["$(x - 8)(x + 3)$", "These add to $-5$, not $-2$."], ["$(x - 12)(x + 2)$", "These add to $-10$, not $-2$."]],
    0, ["Find two numbers with product $-24$ and sum $-2$.", "One is positive, one is negative; the larger size is negative.", "Try $-6$ and $4$."],
    "$-6 \\times 4 = -24$ and $-6 + 4 = -2$.", ["Product $-24$.", "Sum $-2$.", "$(x - 6)(x + 4)$."]),
  mc("fs-a-3-2", Q, "a", "c", "Factor $3x^2 + 8x + 4$.",
    [["$(3x + 4)(x + 1)$", "Expanding gives $3x^2 + 7x + 4$."], ["$(3x + 1)(x + 4)$", "Expanding gives $3x^2 + 13x + 4$."], ["$(x + 2)(3x + 1)$", "Expanding gives $3x^2 + 7x + 2$."], "$(3x + 2)(x + 2)$"],
    3, ["$ac = 3 \\cdot 4 = 12$.", "Two numbers with product 12 and sum 8: 6 and 2.", "Split: $3x^2 + 6x + 2x + 4$."],
    "$3x^2 + 6x + 2x + 4 = 3x(x + 2) + 2(x + 2) = (3x + 2)(x + 2)$.", ["Split the middle term.", "Group.", "$(3x + 2)(x + 2)$."]),
];
