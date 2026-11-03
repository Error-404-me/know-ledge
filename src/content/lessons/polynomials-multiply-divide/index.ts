import type { Question } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p, table } from "../../questions/bank";

const T = "polynomials-multiply-divide";
const E = "exponent-laws";
const D = "multiply-divide-polynomials";
const { mc, num } = bank(T);

export const lessons = [
  lesson(T, 1, {
    id: E,
    title: "Laws of Exponents",
    summary: "Use the product, quotient and power laws to simplify expressions with exponents.",
    minutes: 18,
    objectives: [
      "Multiply and divide powers with the same base",
      "Raise a power or a product to a power",
      "Simplify expressions that combine several laws",
    ],
    introTitle: "Counting repeated factors",
    intro: [
      p(m`$2^3 \times 2^2 = (2 \cdot 2 \cdot 2)(2 \cdot 2) = 2^5$. Count the 2s: three plus two make five.`),
      mth(m`x^3 \cdot x^4 = x^{3+4} = x^7`),
      co("tip", "Shortcuts for counting", "The laws of exponents are shortcuts for counting how many times a factor is repeated."),
    ],
    concept: [
      [
        "Product and quotient laws",
        [
          table(
            ["Law", "Rule", "Example"],
            [
              ["Product", m`$x^a \cdot x^b = x^{a+b}$`, m`$x^3 \cdot x^4 = x^7$`],
              ["Quotient", m`$\dfrac{x^a}{x^b} = x^{a-b}$`, m`$\dfrac{x^8}{x^3} = x^5$`],
            ],
          ),
          co("warning", "Same base only", m`The bases must match. $x^2 \cdot y^3$ cannot be combined. Coefficients multiply: $3x^2 \cdot 4x^5 = 12x^7$.`),
        ],
      ],
      [
        "Power laws and the zero exponent",
        [
          table(
            ["Law", "Rule", "Example"],
            [
              ["Power of a power", m`$(x^a)^b = x^{ab}$`, m`$(x^2)^5 = x^{10}$`],
              ["Power of a product", m`$(xy)^n = x^n y^n$`, m`$(2x^3)^2 = 4x^6$`],
            ],
          ),
          co("remember", "Zero exponent", "Any nonzero base to the power 0 equals 1: $x^0 = 1$ and $5^0 = 1$. (Because $\\frac{x^3}{x^3} = x^0 = 1$.)"),
        ],
      ],
    ],
    examples: [
      ex(
        "ex-exp",
        "Combine several laws",
        m`Simplify $\dfrac{(2x^3)^2 \cdot 3x^4}{6x^5}$.`,
        [
          ["Apply the power of a product law.", m`$(2x^3)^2 = 2^2 \cdot x^6 = 4x^6$.`, m`\frac{4x^6 \cdot 3x^4}{6x^5}`],
          ["Multiply the numerator.", "Coefficients: $4 \\cdot 3 = 12$. Exponents add: $6 + 4 = 10$.", m`\frac{12x^{10}}{6x^5}`],
          ["Divide.", "$12 \\div 6 = 2$ and the exponents subtract: $10 - 5 = 5$.", "2x^5"],
        ],
        "$2x^5$",
        ["$(2x^3)^2 = 2x^6$", "The 2 inside the parentheses must be squared too: $2^2 = 4$.", "Raise every factor inside the parentheses to the power."],
      ),
    ],
    quickCheck: [
      mc("pmd-qc-1-1", E, "qc", "e", "Simplify $x^3 \\cdot x^5$.",
        [["$x^{15}$", "When you multiply powers, the exponents add."], "$x^8$", ["$2x^8$", "There is no extra coefficient; the exponents just add."], ["$x^2$", "That would be division. Here you multiply, so add the exponents."]],
        1, ["Both factors have the base $x$.", "Multiplying powers with the same base: add exponents.", "$3 + 5 = ?$"],
        "$x^3 \\cdot x^5 = x^{3+5} = x^8$.", ["Same base, so add exponents.", "$x^8$."]),
      num("pmd-qc-1-2", E, "qc", "e", "$(x^2)^4 = x^n$. What is $n$?", 8,
        ["This is a power of a power.", "Multiply the exponents.", "$2 \\times 4 = ?$"],
        "$(x^2)^4 = x^{2 \\cdot 4} = x^8$.", ["Power of a power: multiply exponents.", "$2 \\times 4 = 8$."],
        [[6, "A power of a power multiplies the exponents: $2 \\times 4$, not $2 + 4$."]]),
    ],
  }),
  lesson(T, 2, {
    id: D,
    title: "Multiplying and Dividing Polynomials",
    summary: "Multiply a monomial or binomial by a polynomial, and divide a polynomial by a monomial.",
    minutes: 20,
    objectives: [
      "Multiply a monomial by a polynomial",
      "Multiply two binomials",
      "Divide a polynomial by a monomial",
    ],
    introTitle: "Area of a garden",
    intro: [
      p("A garden is 3 m wide and $(x + 4)$ m long. Its area is the width times the length:"),
      mth("3(x + 4) = 3x + 12"),
      co("real-life", "Distribute", "The 3 multiplies **every** term inside the parentheses. Multiplying polynomials is repeated use of the distributive property."),
    ],
    concept: [
      [
        "Monomial times polynomial",
        [
          p("Multiply the monomial by each term. Coefficients multiply and exponents of the same base add."),
          mth("2x(3x^2 - 5x + 4) = 6x^3 - 10x^2 + 8x"),
        ],
      ],
      [
        "Binomial times binomial",
        [
          p("Each term of the first binomial multiplies each term of the second. That makes four products. Then combine like terms."),
          mth("(x + 3)(x + 5) = x^2 + 5x + 3x + 15 = x^2 + 8x + 15"),
          co("tip", "Four products", "Check that you wrote four products before combining. Missing one is the most common slip."),
        ],
      ],
      [
        "Dividing by a monomial",
        [
          p("Divide **each** term of the polynomial by the monomial."),
          mth(m`\frac{12x^3 - 8x^2 + 4x}{4x} = 3x^2 - 2x + 1`),
          co("warning", "Every term", m`$\frac{6x + 9}{3} = 2x + 3$, not $2x + 9$. The 3 divides both terms.`),
        ],
      ],
    ],
    examples: [
      ex(
        "ex-mult",
        "Multiply two binomials",
        "Multiply $(2x - 3)(x + 4)$.",
        [
          ["Multiply each term of the first binomial by each term of the second.", "$2x \\cdot x$, $2x \\cdot 4$, $-3 \\cdot x$ and $-3 \\cdot 4$.", "2x^2 + 8x - 3x - 12"],
          ["Combine like terms.", "$8x - 3x = 5x$.", "2x^2 + 5x - 12"],
        ],
        "$2x^2 + 5x - 12$",
      ),
      ex(
        "ex-div",
        "Divide by a monomial",
        m`Divide $15x^4 - 10x^3 + 5x^2$ by $5x^2$.`,
        [
          ["Write it as a fraction and divide each term.", "Coefficients divide and exponents subtract.", m`\frac{15x^4}{5x^2} - \frac{10x^3}{5x^2} + \frac{5x^2}{5x^2}`],
          ["Simplify each part.", "The last term is $1$ because anything divided by itself is 1.", "3x^2 - 2x + 1"],
        ],
        "$3x^2 - 2x + 1$",
      ),
    ],
    quickCheck: [
      mc("pmd-qc-2-1", D, "qc", "e", "Multiply: $3x(x - 4)$.",
        [["$3x^2 - 4$", "Multiply $3x$ by **both** terms."], "$3x^2 - 12x$", ["$4x^2 - 12x$", "$3 \\times 1 = 3$, so $3x \\cdot x = 3x^2$."], ["$3x - 12x$", "$3x \\cdot x = 3x^2$, because exponents add."]],
        1, ["Distribute $3x$ to each term.", "$3x \\cdot x$ and $3x \\cdot (-4)$.", "Combine the results."],
        "$3x \\cdot x = 3x^2$ and $3x \\cdot (-4) = -12x$.", ["First term: $3x^2$.", "Second term: $-12x$."]),
      num("pmd-qc-2-2", D, "qc", "m", "$(x + 2)(x + 5) = x^2 + bx + c$. What is $b + c$?", 17,
        ["Multiply every term by every term.", "$x^2 + 5x + 2x + 10$.", "Combine $5x + 2x$."],
        "$(x + 2)(x + 5) = x^2 + 7x + 10$, so $b + c = 7 + 10 = 17$.", ["Expand: $x^2 + 5x + 2x + 10$.", "$b = 7$, $c = 10$.", "$7 + 10 = 17$."]),
    ],
  }),
];

export const questions: Question[] = [
  mc("pmd-p-1-1", E, "p", "e", m`Simplify $\dfrac{x^9}{x^4}$.`,
    [["$x^{13}$", "Dividing subtracts exponents: $9 - 4$."], ["$x^{36}$", "Dividing subtracts exponents; it never multiplies them."], "$x^5$", ["$5x$", "The base stays $x$; only the exponent changes."]],
    2, ["Same base, so use the quotient law.", "Subtract the exponents.", "$9 - 4 = ?$"],
    "$x^{9-4} = x^5$.", ["Quotient law: subtract exponents.", "$x^5$."]),
  num("pmd-p-1-2", E, "p", "m", "$3x^2 \\cdot 4x^3 = ax^b$. What is $a + b$?", 17,
    ["Multiply the coefficients and add the exponents.", "$a = 3 \\cdot 4$, $b = 2 + 3$.", "Add $a$ and $b$."],
    "$3x^2 \\cdot 4x^3 = 12x^5$, so $a + b = 12 + 5 = 17$.", ["$a = 12$.", "$b = 5$.", "$12 + 5 = 17$."],
    [[12, "Coefficients **multiply** ($3 \\cdot 4 = 12$) and exponents add ($2 + 3 = 5$). Then add $a + b$."]]),
  mc("pmd-p-2-1", D, "p", "e", m`Divide: $\dfrac{8x^3 + 4x^2}{4x}$.`,
    ["$2x^2 + x$", ["$2x^2 + 4x$", "$4x^2 \\div 4x = x$, not $4x$."], ["$2x^3 + x^2$", "Divide the exponents by subtracting: $3 - 1 = 2$."], ["$2x^2 + 1$", "$4x^2 \\div 4x = x$, not 1."]],
    0, ["Divide each term by $4x$.", "$8x^3 \\div 4x$ and $4x^2 \\div 4x$.", "Coefficients divide, exponents subtract."],
    "$\\frac{8x^3}{4x} = 2x^2$ and $\\frac{4x^2}{4x} = x$.", ["First term: $2x^2$.", "Second term: $x$."]),
  num("pmd-p-2-2", D, "p", "c", "$(x - 3)(2x + 5) = ax^2 + bx + c$. What is $a + b + c$?", -14,
    ["Write all four products.", "$2x^2 + 5x - 6x - 15$.", "Combine $5x - 6x$ first."],
    "$(x - 3)(2x + 5) = 2x^2 - x - 15$, so $a + b + c = 2 - 1 - 15 = -14$.", ["Four products: $2x^2 + 5x - 6x - 15$.", "Combine: $2x^2 - x - 15$.", "$2 - 1 - 15 = -14$."]),
  mc("pmd-a-1-1", E, "a", "m", "Simplify $(2x^3)^3$.",
    [["$6x^9$", "Cube the 2 as well: $2^3 = 8$."], ["$8x^6$", "Multiply the exponents: $3 \\times 3 = 9$."], ["$2x^9$", "The coefficient 2 is also cubed."], "$8x^9$"],
    3, ["Use the power of a product law.", "Cube both the 2 and the $x^3$.", "$2^3$ and $(x^3)^3$."],
    "$(2x^3)^3 = 2^3 \\cdot x^9 = 8x^9$.", ["Cube 2: 8.", "$(x^3)^3 = x^9$."]),
  num("pmd-a-1-2", E, "a", "c", m`$\dfrac{(x^4)^3}{x^5 \cdot x^2} = x^n$. What is $n$?`, 5,
    ["Simplify the top and bottom separately.", "Top: $(x^4)^3 = x^{12}$. Bottom: $x^5 \\cdot x^2 = x^7$.", "Then divide: subtract exponents."],
    "$\\frac{x^{12}}{x^7} = x^{12-7} = x^5$.", ["Top: $x^{12}$.", "Bottom: $x^7$.", "Quotient: $x^5$."]),
  mc("pmd-a-2-1", D, "a", "m", "Multiply: $(x + 6)(x - 2)$.",
    [["$x^2 - 12$", "Do not forget the middle terms $6x$ and $-2x$."], ["$x^2 + 8x - 12$", "$6x - 2x = 4x$."], "$x^2 + 4x - 12$", ["$x^2 + 4x + 12$", "$6 \\times (-2) = -12$, which is negative."]],
    2, ["Write all four products.", "$x^2 - 2x + 6x - 12$.", "Combine the middle terms."],
    "$x^2 - 2x + 6x - 12 = x^2 + 4x - 12$.", ["Four products.", "Combine: $x^2 + 4x - 12$."]),
  num("pmd-a-2-2", D, "a", "m", "Divide $18x^5 - 12x^3 + 6x^2$ by $6x^2$, then evaluate the quotient when $x = 2$.", 21,
    ["Divide each term by $6x^2$.", "The quotient is $3x^3 - 2x + 1$.", "Substitute $x = 2$."],
    "The quotient is $3x^3 - 2x + 1$. With $x = 2$: $3(8) - 4 + 1 = 21$.", ["Divide: $3x^3 - 2x + 1$.", "Substitute: $24 - 4 + 1 = 21$."]),
];
