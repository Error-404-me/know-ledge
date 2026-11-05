import type { Question } from "@/types/content";
import { bank } from "./bank";

const T = "measures-of-central-tendency";
const A = "mean";
const B = "median-and-mode";
const { mc, num } = bank(T);

/** Practice and assessment questions. Quick-check questions live inside each lesson file. */
export const questions: Question[] = [
  num("ct-p-0-1", "intro-central-tendency", "p", "e", "What is the range of $4, 9, 15, 2$?", 13,
    ["The range is the largest value minus the smallest.", "Largest: 15. Smallest: 2.", "$15 - 2$."],
    "$15 - 2 = 13$.", ["Largest 15, smallest 2.", "$15 - 2 = 13$."]),
  num("ct-p-0-2", "intro-central-tendency", "p", "m", "How many times does 2 appear in $2, 6, 2, 9, 2, 2, 4, 2$?", 5,
    ["Go through the list one value at a time.", "Mark each 2.", "Count the marks."],
    "The value 2 appears in positions 1, 3, 5, 6 and 8, which is 5 times.", ["Count the 2s.", "5."]),
  num("ct-a-0-1", "intro-central-tendency", "a", "m", "What is the range of $23, 8, 15, 31, 12$?", 23,
    ["Find the largest and the smallest values.", "Largest: 31. Smallest: 8.", "$31 - 8$."],
    "$31 - 8 = 23$.", ["Largest 31, smallest 8.", "$31 - 8 = 23$."]),
  num("ct-p-1-1", A, "p", "e", "What is the mean of $12, 15, 18$?", 15,
    ["Add the values.", "$12 + 15 + 18 = 45$.", "Divide by 3."],
    "$45 \\div 3 = 15$.", ["Sum: 45.", "Mean: 15."]),
  num("ct-p-1-2", A, "p", "c", "The mean of 6 numbers is 7. A seventh number is added and the mean becomes 8. What is the seventh number?", 14,
    ["Find the total of the first 6 numbers.", "The old total is $6 \\times 7 = 42$. The new total is $7 \\times 8 = 56$.", "Subtract."],
    "The total increased from $6 \\times 7 = 42$ to $7 \\times 8 = 56$, so the new number is $56 - 42 = 14$.", ["Old total: 42.", "New total: 56.", "$56 - 42 = 14$."]),
  num("ct-p-2-1", B, "p", "e", "What is the median of $2, 8, 4, 6$?", 5,
    ["Order the data first.", "$2, 4, 6, 8$.", "There are two middle values. Find their mean."],
    "Ordered: $2, 4, 6, 8$. The median is $\\frac{4 + 6}{2} = 5$.", ["Order.", "Average the middle two: 5."]),
  mc("ct-p-2-2", B, "p", "c", "Monthly salaries (in thousands of pesos) are $15, 16, 16, 17, 18, 95$. Which measure best describes a typical salary?",
    [["The mean, because it uses every value", "The mean is 29.5, pulled up by the single value 95."], "The median, because 95 would pull the mean up", ["The mode only, because 16 appears twice", "The mode here ignores most of the data."], ["The largest value", "The largest value is not typical."]],
    1, ["Compute the mean: $177 \\div 6 = 29.5$.", "Compute the median: $(16 + 17) \\div 2 = 16.5$.", "Which one is close to most salaries?"],
    "The mean is 29.5, higher than five of the six salaries because of the outlier 95. The median is 16.5, which better describes a typical salary.", ["Mean: 29.5.", "Median: 16.5.", "Median is more typical."]),
  num("ct-a-1-1", A, "a", "m", "What is the mean of $14, 18, 20, 22, 26$?", 20,
    ["Add the five values.", "$14 + 18 + 20 + 22 + 26 = 100$.", "Divide by 5."],
    "$100 \\div 5 = 20$.", ["Sum: 100.", "Mean: 20."]),
  num("ct-a-1-2", A, "a", "m", "The mean of 4 numbers is 15. Three of them are 10, 20 and 12. What is the fourth?", 18,
    ["Total = mean × number of values.", "$4 \\times 15 = 60$.", "Subtract $10 + 20 + 12$."],
    "The total is 60. The fourth number is $60 - 42 = 18$.", ["Total: 60.", "Known sum: 42.", "$60 - 42 = 18$."]),
  num("ct-a-2-1", B, "a", "m", "What is the median of $15, 11, 19, 13, 17, 21$?", 16,
    ["Order the data.", "$11, 13, 15, 17, 19, 21$.", "Average the two middle values."],
    "Ordered: $11, 13, 15, 17, 19, 21$. The median is $\\frac{15 + 17}{2} = 16$.", ["Order.", "Middle two: 15 and 17.", "Average: 16."]),
  mc("ct-a-2-2", B, "a", "m", "Data: $3, 5, 5, 7, 8, 8, 9$. Which statement is true?",
    [["The mode is 7.", "The mode is the most frequent value. 7 appears only once."], ["The median is 8.", "The median is the 4th of 7 ordered values, which is 7."], ["There is no mode.", "5 and 8 each appear twice, so there are modes."], "The data are bimodal, with modes 5 and 8."],
    3, ["Count how often each value appears.", "5 appears twice and 8 appears twice.", "Two values tie for the most."],
    "Both 5 and 8 appear twice, which is more than any other value, so there are two modes. The median is 7.", ["Counts: 5 → 2, 8 → 2, others → 1.", "Two modes: 5 and 8."]),
];
