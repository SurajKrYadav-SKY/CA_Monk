import { RootState } from "@/reduxStore/store";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FeedbackScreen = () => {
  const navigate = useNavigate();
  const { questions, userAnswers, isQuizComplete } = useSelector(
    (state: RootState) => state.quiz
  );
  // Here calculating the score with 10 points per correct answer (max 100)
  const score = userAnswers.reduce(
    (acc, ans, idx) =>
      acc +
      (JSON.stringify(ans) === JSON.stringify(questions[idx].correctAnswer)
        ? 10
        : 0),
    0
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end)) || 1;
    const timer = setInterval(() => {
      start += 1;
      if (start <= end) {
        setDisplayScore(start);
      } else {
        clearInterval(timer);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, []);

  // color of the score board based on score range (0-10: red, 20-70: orange-yellowish, >70: green)
  const getScoreColor = (score: number) => {
    if (score <= 10) return { stroke: "#ef4444", text: "#ef4444" }; // Red
    if (score <= 70) return { stroke: "#f59e0b", text: "#f59e0b" }; // Orange-yellowish
    return { stroke: "#10b981", text: "#10b981" }; // Green
  };

  const scoreColor = getScoreColor(displayScore);

  // Feedback text based on score out of 100
  const feedbackText =
    score >= 80
      ? "Great job! You performed exceptionally well."
      : score >= 50
      ? "Well done! There are a few areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness."
      : "Keep practicing! Review your responses below for more details.";

  if (!isQuizComplete) return null;
  return (
    <div className="p-4 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6">Feedback</h2>
      <div className="text-center">
        <svg className="w-32 h-32 mx-auto mb-4">
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke={scoreColor.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 352", rotate: -90 }}
            animate={{
              strokeDasharray: `${(displayScore / 100) * 352} 352`,
              rotate: -90,
            }}
            transition={{ duration: 2 }}
          />
          <text
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle"
            className="font-semibold text-3xl"
            style={{ fill: scoreColor.text }}
          >
            {displayScore}
          </text>
          <text
            x="50%"
            y="70%"
            dy=".3em"
            textAnchor="middle"
            className="text-gray-600 text-sm"
            style={{ fill: scoreColor.text }}
          >
            Overall Score
          </text>
        </svg>
        <p className="text-gray-600 mb-6 max-w-md">{feedbackText}</p>
        <Button
          onClick={() => navigate("/")}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg mb-6 cursor-pointer"
        >
          Go to Dashboard
        </Button>
        <motion.div
          className="cursor-pointer flex justify-center items-center"
          onClick={() => setIsExpanded(!isExpanded)}
          animate={{
            y: [0, -5, 0, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </motion.div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl mt-6 space-y-6"
          >
            {questions.map((q, idx) => {
              const isCorrect =
                JSON.stringify(userAnswers[idx]) ===
                JSON.stringify(q.correctAnswer);
              return (
                <motion.div
                  key={q.questionId}
                  className="bg-white p-4 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-sm text-gray-500 mb-2 flex flex-row justify-between items-center">
                    <span className="bg-gray-300 px-1 rounded">Prompt</span>
                    <div>
                      <strong>{idx + 1}</strong>/10
                    </div>
                  </div>
                  <p className="text-gray-800 mb-2">
                    {q.question.split("_____________").map((part, i) => (
                      <span key={i}>
                        {part}
                        {i < q.correctAnswer.length && (
                          <span className="text-green-500">
                            {q.correctAnswer[i]}
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                  <p className="text-lg font-medium mb-2">
                    <span className="text-gray-500">Your response:</span>{" "}
                    <span
                      className={
                        isCorrect
                          ? "text-green-500 bg-green-100 rounded px-1"
                          : "text-red-500 bg-red-100 rounded px-1"
                      }
                    >
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    {q.question.split("_____________").map((part, i) => (
                      <span key={i}>
                        {part}
                        {i < q.correctAnswer.length && (
                          <span
                            className={
                              userAnswers[idx][i] === q.correctAnswer[i]
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {userAnswers[idx][i] || "_____________"}
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackScreen;
