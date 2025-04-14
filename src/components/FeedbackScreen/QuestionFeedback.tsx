import { motion } from "framer-motion";
import { Question } from "@/types";
import { isCorrectAnswer } from "../../utils/quizUtils";

interface QuestionFeedbackProps {
  question: Question;
  userAnswer: string[];
  idx: number;
  totalQuestions: number;
}

const QuestionFeedback = ({
  question,
  userAnswer,
  idx,
  totalQuestions,
}: QuestionFeedbackProps) => {
  const isCorrect = isCorrectAnswer(userAnswer, question.correctAnswer);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
    >
      <div className="text-sm text-gray-500 mb-2 flex flex-row justify-between items-center p-2">
        <span className="bg-gray-200 px-1 rounded">Prompt</span>
        <div>
          <strong>{idx + 1}</strong>/{totalQuestions}
        </div>
      </div>
      <p className="text-gray-800 mb-2 p-4">
        {question.question.split("_____________").map((part, i) => (
          <span key={i}>
            {part}
            {i < question.correctAnswer.length && (
              <span className="text-green-500 font-medium">
                {question.correctAnswer[i]}
              </span>
            )}
          </span>
        ))}
      </p>
      <p className="text-lg font-medium mb-0 bg-gray-100 p-4">
        <span className="text-gray-500">Your response:</span>{" "}
        <span
          className={
            isCorrect
              ? "text-green-500 bg-green-100 px-1 py-0 rounded"
              : "text-red-500 bg-red-100 px-1 py-0 rounded"
          }
        >
          {isCorrect ? "Correct" : "Incorrect"}
        </span>
      </p>
      <p className="text-gray-700 bg-gray-100 p-4">
        {question.question.split("_____________").map((part, i) => (
          <span key={i}>
            {part}
            {i < question.correctAnswer.length && (
              <span
                className={
                  userAnswer[i] === question.correctAnswer[i]
                    ? "text-green-500 font-medium"
                    : "text-red-500 font-medium"
                }
              >
                {userAnswer[i] || "_____________"}
              </span>
            )}
          </span>
        ))}
      </p>
    </motion.div>
  );
};

export default QuestionFeedback;
