import type { CurriculumConfig, Topic } from "@/types/content";

/**
 * Curriculum configuration. Change the passing score, unlock rules, or topic
 * order here – no UI code needs to change.
 */
export const curriculumConfig: CurriculumConfig = {
  passingScore: 80,
  sequentialUnlock: false, // every topic is open from the start
  weakAreaThreshold: 70,
  practiceSessionLength: 8,
  attemptsBeforeSolution: 2,
};

const UNIT1 = "Unit 1 · Algebra";

/**
 * Ordered Grade 8 topic sequence (reference: Realistic Math 8, 2nd ed., Unit 1).
 * Only topics with `availability: "active"` and lessons are openable.
 */
export const topics: Topic[] = [
  {
    id: "algebraic-expressions",
    order: 1,
    unit: UNIT1,
    title: "Algebraic Expressions",
    description:
      "Learn the language of algebra: what letters mean, how expressions are built, and how to evaluate and simplify them.",
    objectives: [
      "Translate everyday phrases into algebraic expressions",
      "Identify variables, constants, coefficients and terms",
      "Tell like terms from unlike terms",
      "Evaluate expressions by substitution",
      "Simplify expressions by combining like terms and using the distributive property",
    ],
    lessonIds: ["intro-algebraic-expressions", "parts-of-expression", "like-unlike-terms", "evaluating-expressions", "simplifying-expressions"],
    availability: "active",
    hasPrerequisiteCheck: true,
  },
  {
    id: "polynomials-add-subtract",
    order: 2,
    unit: UNIT1,
    title: "Adding and Subtracting Simple Polynomials",
    description: "Combine polynomial expressions by adding and subtracting like terms.",
    objectives: ["Add polynomials", "Subtract polynomials", "Use polynomial sums and differences to find missing sides"],
    lessonIds: ["intro-polynomials", "adding-polynomials", "subtracting-polynomials"],
    availability: "active",
  },
  {
    id: "polynomials-multiply-divide",
    order: 3,
    unit: UNIT1,
    title: "Multiplying and Dividing Simple Polynomials",
    description: "Use the laws of exponents to multiply and divide monomials and polynomials.",
    objectives: ["Apply the laws of exponents", "Multiply monomials and polynomials", "Divide a polynomial by a monomial"],
    lessonIds: ["intro-exponents", "exponent-laws", "multiply-divide-polynomials"],
    availability: "active",
  },
  {
    id: "special-products",
    order: 4,
    unit: UNIT1,
    title: "Special Products",
    description: "Recognize patterns that let you multiply binomials quickly.",
    objectives: ["Square a binomial", "Multiply conjugates", "Use patterns for mental math"],
    lessonIds: ["intro-special-products", "square-of-binomial", "sum-and-difference"],
    availability: "active",
  },
  {
    id: "factoring-monomial-grouping",
    order: 5,
    unit: UNIT1,
    title: "Monomial Factoring and Factoring by Grouping",
    description: "Undo multiplication by factoring out common factors.",
    objectives: ["Factor out the greatest common monomial factor", "Factor four-term polynomials by grouping"],
    lessonIds: ["intro-factoring", "greatest-common-factor", "factoring-by-grouping"],
    availability: "active",
  },
  {
    id: "factoring-special-forms",
    order: 6,
    unit: UNIT1,
    title: "Factoring Special Forms and Quadratic Trinomials",
    description: "Factor difference of two squares, perfect square trinomials, and quadratic trinomials.",
    objectives: ["Factor the difference of two squares", "Factor perfect square trinomials", "Factor quadratic trinomials"],
    lessonIds: ["intro-special-forms", "difference-of-two-squares", "perfect-square-trinomials", "quadratic-trinomials"],
    availability: "active",
  },
  {
    id: "rational-expressions-simplify",
    order: 7,
    unit: UNIT1,
    title: "Simplifying, Multiplying, and Dividing Rational Algebraic Expressions",
    description: "Work with algebraic fractions the same way you work with numerical fractions.",
    objectives: ["Simplify rational expressions", "Multiply rational expressions", "Divide rational expressions"],
    lessonIds: ["intro-rational-expressions", "simplifying-rational-expressions", "multiplying-dividing-rational"],
    availability: "active",
  },
  {
    id: "rational-expressions-add-subtract",
    order: 8,
    unit: UNIT1,
    title: "Adding and Subtracting Rational Algebraic Expressions",
    description: "Find common denominators for algebraic fractions and combine them.",
    objectives: ["Add and subtract with like denominators", "Add and subtract with unlike denominators"],
    lessonIds: ["intro-adding-rational-expressions", "like-denominators", "unlike-denominators"],
    availability: "active",
  },
  {
    id: "sequences",
    order: 9,
    unit: UNIT1,
    title: "Sequences",
    description: "Discover patterns in lists of numbers and describe them with rules.",
    objectives: ["Describe number patterns", "Find the nth term of arithmetic sequences"],
    lessonIds: ["intro-sequences", "number-patterns", "arithmetic-sequences"],
    availability: "active",
  },
  {
    id: "measures-of-central-tendency",
    order: 10,
    unit: "Unit 1 · Statistics",
    title: "Measures of Central Tendency",
    description: "Summarize data using the mean, median and mode.",
    objectives: ["Compute mean, median and mode", "Choose a suitable measure for a data set"],
    lessonIds: ["intro-central-tendency", "mean", "median-and-mode"],
    availability: "active",
  },
  {
    id: "later-units",
    order: 11,
    unit: "Later units",
    title: "Later Grade 8 Topics",
    description:
      "Further Grade 8 topics (for example linear relations and geometry) will be added once your teacher's lesson sequence is confirmed.",
    objectives: ["To be announced"],
    lessonIds: [],
    availability: "coming-soon",
    outline: ["To be confirmed with the class schedule"],
  },
];
