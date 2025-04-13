export interface Question {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
}

export interface QuizState {
  questions: Question[];
  totalQuestions: number,
  currentQuestionIndex: number;
  userAnswers: string[][];
  timeLeft: number;
  isQuizComplete: boolean;
}