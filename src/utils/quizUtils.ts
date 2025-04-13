import { Question } from "@/types"; 
import { QUIZ_CONFIG } from "./config";

export const calculateScore = (
  userAnswers: string[][],
  questions: Question[]
): number =>
  userAnswers.reduce(
    (acc, ans, idx) =>
      acc +
      (isCorrectAnswer(ans, questions[idx]?.correctAnswer)
        ? QUIZ_CONFIG.pointsPerQuestion
        : 0),
    0
  );

export const isCorrectAnswer = (
  userAnswer: string[],
  correctAnswer: string[]
): boolean =>
  userAnswer.length === correctAnswer.length &&
  userAnswer.every((ans, i) => ans === correctAnswer[i]);

export const getScoreColor = (score: number) => {
  if (score <= 10) return { stroke: "#ef4444", text: "#ef4444" }; // Red
  if (score <= 70) return { stroke: "#f59e0b", text: "#f59e0b" }; // Orange-yellowish
  return { stroke: "#10b981", text: "#10b981" }; // Green
};

export const getFeedbackText = (score: number): string => {
  if (score >= QUIZ_CONFIG.feedbackThresholds.excellent) {
    return "Great job! You performed exceptionally well.";
  }
  if (score >= QUIZ_CONFIG.feedbackThresholds.veryGood) {
    return "While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to structure and word placement to ensure clarty and correctness. Review your responses below for more details.";
  }
  if (score >= QUIZ_CONFIG.feedbackThresholds.good) {
    return "Well done! There are a few areas where improvement is needed. Keep practicing! Review your responses below for more details.";
  }
  return "Keep practicing! Review your responses below for more details.";
};