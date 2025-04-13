import { RootState } from "@/reduxStore/store";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { QUIZ_CONFIG } from "@/utils/config";
import {
  calculateScore,
  getFeedbackText,
  getScoreColor,
} from "@/utils/quizUtils";
import ScoreCircle from "./ScoreCircle";
import QuestionFeedback from "./QuestionFeedback";

const FeedbackScreen = () => {
  const navigate = useNavigate();
  const { questions, userAnswers, isQuizComplete, totalQuestions } =
    useSelector((state: RootState) => state.quiz);

  const [isExpanded, setIsExpanded] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  const score = useMemo(
    () => calculateScore(userAnswers, questions),
    [userAnswers, questions]
  );

  useEffect(() => {
    const end = score;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(
        elapsed / QUIZ_CONFIG.scoreAnimationDuration,
        1
      );
      setDisplayScore(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  if (!isQuizComplete || !questions.length || !userAnswers.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">No quiz data available.</p>
      </div>
    );
  }

  const scoreColor = getScoreColor(displayScore);
  const feedbackText = getFeedbackText(score);
  return (
    <div className="p-4 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6">Feedback</h2>
      <div className="text-center max-w-lg">
        <ScoreCircle score={displayScore} scoreColor={scoreColor} />
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
            className="w-full max-w-2xl mt-6 space-y-15"
          >
            {questions.map((question, idx) => (
              <QuestionFeedback
                key={question.questionId}
                question={question}
                userAnswer={userAnswers[idx] || []}
                idx={idx}
                totalQuestions={totalQuestions}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackScreen;
