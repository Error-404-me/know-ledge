import type { Lesson } from "@/types/content";
import { bank, co, ex, lesson, m, mth, p } from "../../questions/bank";

const T = "factoring-monomial-grouping";
const L = "factoring-by-grouping";
const { mc, num } = bank(T);

export const factoringByGrouping: Lesson = lesson(T, 3, {
  id: L,
  title: "Factoring by Grouping",
  summary: "Factor four-term polynomials by grouping terms in pairs.",
  minutes: 18,
  objectives: [
    "Group four terms into two pairs",
    "Factor a common binomial out of the groups",
    "Handle pairs that begin with a minus sign",
  ],
  introTitle: "Four terms, no common factor",
  intro: [
    p("Look at $xy + 2x + 3y + 6$. No single factor divides all four terms. But the terms **pair up**: the first two share $x$ and the last two share 3."),
    mth("xy + 2x + 3y + 6 = x(y + 2) + 3(y + 2) = (x + 3)(y + 2)"),
    co("tip", "The key", "After factoring each pair, the same binomial, here $(y + 2)$, appears in both. That binomial becomes a common factor."),
  ],
  concept: [
    [
      "Group, factor, factor again",
      [
        p("1) Group the terms in pairs. 2) Factor the GCF out of each pair. 3) Factor out the common binomial."),
        mth("ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)"),
      ],
    ],
    [
      "When a pair starts with a minus sign",
      [
        p("If the second pair begins with a negative term, factor out a **negative** GCF so that the binomials match."),
        mth("ax - ay - bx + by = a(x - y) - b(x - y) = (a - b)(x - y)"),
        co("warning", "Check by expanding", "If the two binomials in parentheses do not match, change the sign of the GCF you factored out, or regroup the terms."),
      ],
    ],
    [
      "Rearranging first",
      [
        p("If the pairs do not share a binomial, rearrange the terms so each pair has a common factor, then try again."),
        mth(m`xy + 6 + 3y + 2x \ \to \ xy + 3y + 2x + 6`),
        mth("xy + 3y + 2x + 6 = y(x + 3) + 2(x + 3) = (y + 2)(x + 3)"),
      ],
    ],
  ],
  examples: [
    ex(
      "ex-group",
      "A pair with a negative sign",
      "Factor $x^3 - 4x^2 + 3x - 12$.",
      [
        ["Group the terms in pairs.", "Keep each sign with its term.", "(x^3 - 4x^2) + (3x - 12)"],
        ["Factor the GCF out of each pair.", "$x^2$ from the first pair and 3 from the second.", "x^2(x - 4) + 3(x - 4)"],
        ["Factor out the common binomial.", "Both groups contain $(x - 4)$.", "(x^2 + 3)(x - 4)"],
      ],
      "$(x^2 + 3)(x - 4)$",
    ),
    ex(
      "ex-group-numbers",
      "Grouping with coefficients",
      "Factor $6x^2 + 9x + 4x + 6$.",
      [
        ["Group the terms in pairs.", "Keep each sign with its term.", "(6x^2 + 9x) + (4x + 6)"],
        ["Factor the GCF out of each pair.", "$3x$ from the first pair and 2 from the second.", "3x(2x + 3) + 2(2x + 3)"],
        ["Factor out the common binomial.", "Both groups contain $(2x + 3)$.", "(3x + 2)(2x + 3)"],
      ],
      "$(3x + 2)(2x + 3)$",
      ["$5x(2x + 3)$", "The leftovers $3x$ and $2$ are not like terms, so they cannot be added into $5x$.", "Put the leftovers together inside new parentheses: $(3x + 2)$."],
    ),
  ],
  quickCheck: [
    mc("fg-qc-2-1", L, "qc", "e", "Factor $xy + 2x + 3y + 6$.",
      ["$(x + 3)(y + 2)$", ["$(x + 2)(y + 3)$", "Expanding gives $xy + 3x + 2y + 6$, which has the wrong middle terms."], ["$(x + y)(2 + 3)$", "Expanding gives $5x + 5y$, which is not the original."], ["$(x + 6)(y + 1)$", "Expanding gives $xy + x + 6y + 6$."]],
      0, ["Group the first two terms and the last two terms.", "$x(y + 2) + 3(y + 2)$.", "Factor out $(y + 2)$."],
      "$x(y + 2) + 3(y + 2) = (x + 3)(y + 2)$.", ["Group: $(xy + 2x) + (3y + 6)$.", "Factor: $x(y + 2) + 3(y + 2)$.", "Common binomial: $(x + 3)(y + 2)$."]),
    num("fg-qc-2-2", L, "qc", "m", "$x^2 + 5x + 3x + 15 = (x + 5)(x + a)$. What is $a$?", 3,
      ["Group the first two terms and the last two terms.", "$x(x + 5) + 3(x + 5)$.", "The leftover factor is $x + 3$."],
      "$x(x + 5) + 3(x + 5) = (x + 3)(x + 5)$, so $a = 3$.", ["Group and factor each pair.", "Common binomial $(x + 5)$.", "Other factor: $x + 3$."]),
    mc("fg-qc-2-3", L, "qc", "m", "Factor $x^3 + 3x^2 + 2x + 6$.",
      [["$(x^2 + 3)(x + 2)$", "Expanding gives $x^3 + 2x^2 + 3x + 6$."], "$(x^2 + 2)(x + 3)$", ["$(x + 2)(x + 3)$", "Expanding gives $x^2 + 5x + 6$. The first pair factors as $x^2$, not $x$."], ["$(x^2 + 2)(x - 3)$", "All the signs are positive, so both groups contain $(x + 3)$."]],
      1, ["Group: $(x^3 + 3x^2) + (2x + 6)$.", "$x^2(x + 3) + 2(x + 3)$.", "Factor out $(x + 3)$."],
      "$x^2(x + 3) + 2(x + 3) = (x^2 + 2)(x + 3)$.", ["Group in pairs.", "Factor each pair.", "Common binomial: $(x + 3)$."]),
  ],
});
