import { RootState } from "@/reduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import Timer from "../Timer/Timer";
import { nextQuestion, resetQuiz } from "@/reduxStore/slices/quizSlice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import QuestionDisplay from "./QuestionDisplay";
import OptionButton from "./OptionButton";
import QuitConfirmationModal from "./QuitConfirmationModal";

const QuestionCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    questions,
    totalQuestions,
    currentQuestionIndex,
    userAnswers,
    isQuizComplete,
    timeLeft,
  } = useSelector((state: RootState) => state.quiz);

  const question = questions[currentQuestionIndex];

  const { availableOptions, blanks, isNextEnabled, handleDrop, handleClear } =
    useQuizLogic(question, currentQuestionIndex, userAnswers);

  const progressWidth = useMemo(
    () => ((currentQuestionIndex + 1) / totalQuestions) * 100,
    [currentQuestionIndex, totalQuestions]
  );

  useEffect(() => {
    if (
      isQuizComplete ||
      (timeLeft <= 0 && currentQuestionIndex === totalQuestions - 1)
    ) {
      navigate("/feedback");
    }
  }, [
    isQuizComplete,
    timeLeft,
    currentQuestionIndex,
    totalQuestions,
    navigate,
  ]);

  const handleQuitConfirm = () => {
    dispatch(resetQuiz());
    navigate("/");
    setIsModalOpen(false);
  };

  if (!question) {
    return (
      <div className="text-red-500 text-center" role="alert">
        Error: Question not found
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold sm:text-xl">
              Question {currentQuestionIndex + 1}/{totalQuestions}
            </CardTitle>
            <span className="text-sm text-gray-500 sm:text-base">
              <Timer />
            </span>
            <Button
              className="border border-gray-300 bg-transparent text-black-500 hover:bg-gray-200 cursor-pointer"
              variant="outline"
              onClick={() => setIsModalOpen(true)}
            >
              Quit
            </Button>
          </div>
          <div className="w-full bg-gray-200 h-1 mt-2">
            <div
              className="bg-yellow-500 h-1"
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-gray-600 mb-4 sm:text-base">
            Select the missing words in the correct order
          </p>
          <QuestionDisplay
            question={question.question}
            userAnswers={userAnswers[currentQuestionIndex]}
            blanks={blanks}
            onClear={handleClear}
          />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 min-h-[120px] sm:min-h-[80px] md:min-h-[80px] justify-item-center md:justify-between">
            {availableOptions.map((option) => (
              <OptionButton
                key={option}
                option={option}
                onClick={() => {
                  const emptyIndex =
                    userAnswers[currentQuestionIndex].indexOf("");
                  if (emptyIndex !== -1) {
                    handleDrop(emptyIndex, option);
                  }
                }}
                disabled={
                  userAnswers[currentQuestionIndex].filter(Boolean).length >=
                  blanks
                }
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end mt-4 sm:flex-row flex-col sm:items-center">
          <Button
            onClick={() => dispatch(nextQuestion())}
            disabled={!isNextEnabled}
            className="bg-purple-500 hover:bg-purple-600 text-white cursor-pointer"
          >
            Next
          </Button>
        </CardFooter>
      </Card>
      <QuitConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleQuitConfirm}
      />
    </div>
  );
};

export default QuestionCard;
