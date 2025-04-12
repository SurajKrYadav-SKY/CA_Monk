import { RootState } from "@/reduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import Timer from "../Timer/Timer";
import {
  clearUserAnswer,
  nextQuestion,
  setUserAnswer,
} from "@/reduxStore/slices/quizSlice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";

const QuestionCard = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, userAnswers } = useSelector(
    (state: RootState) => state.quiz
  );

  // console.log("Questions:", questions);
  // console.log("Current Question Index:", currentQuestionIndex);
  const question = questions[currentQuestionIndex];

  if (!question) return <div>Loading...</div>;

  // console.log("Current Question:", question);
  // console.log("Options:", question.options);

  const blanks = question.question.split("_____________").length - 1; // _____________
  const isNextEnabled =
    userAnswers[currentQuestionIndex].filter(Boolean).length === blanks;

  const [availableOptions, setAvailableOptions] = useState<string[]>(
    question.options
  );

  useEffect(() => {
    if (
      userAnswers[currentQuestionIndex].length !== blanks ||
      userAnswers[currentQuestionIndex].some((ans) => ans === undefined)
    ) {
      const initialAnswers = Array(blanks).fill("");
      initialAnswers.forEach((_, index) => {
        dispatch(setUserAnswer({ index, answer: "" }));
      });
    }

    const usedOptions = userAnswers[currentQuestionIndex].filter(Boolean);
    const remainingOptions = question.options.filter(
      (option) => !usedOptions.includes(option)
    );
    setAvailableOptions(remainingOptions);
  }, [userAnswers, currentQuestionIndex, question.options, blanks, dispatch]);

  const handleDrop = (index: number, word: string) => {
    dispatch(setUserAnswer({ index, answer: word }));
    setAvailableOptions(availableOptions.filter((opt) => opt !== word));
  };

  const handleClear = (index: number) => {
    const clearedWord = userAnswers[currentQuestionIndex][index];
    dispatch(clearUserAnswer(index));
    if (clearedWord) {
      setAvailableOptions([...availableOptions, clearedWord]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold sm:text-xl">
              Question {currentQuestionIndex + 1}/10
            </CardTitle>
            <span className="text-sm text-gray-500 sm:text-base">
              <Timer />
            </span>
            <Button className="border border-gray-300 bg-transparent text-black-500 hover:bg-gray-200 cursor-pointer">
              Quit
            </Button>
          </div>
          <div className="w-full bg-gray-200 h-1 mt-2">
            <div
              className="bg-yellow-500 h-1"
              style={{ width: `${((currentQuestionIndex + 1) / 10) * 100}%` }}
            ></div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-gray-600 mb-4 sm:text-base">
            Select the missing words in the correct order
          </p>
          <p className="text-base sm:text-lg font-normal">
            {question.question.split("_____________").map((part, i) => (
              <span key={i} className="inline-block relative my-1">
                {part}
                {i < blanks && (
                  <span className="inline-block relative mx-2">
                    {userAnswers[currentQuestionIndex][i] && (
                      <span
                        onClick={() => handleClear(i)}
                        className="absolute top-0 bg-transparent border border-gray-300 hover:bg-gray-100 rounded px-3 py-1 cursor-pointer"
                      >
                        {userAnswers[currentQuestionIndex][i]}
                      </span>
                    )}
                    <span className="border-b border-gray-300 w-24 sm:w-32 h-6 block mt-4"></span>
                  </span>
                )}
              </span>
            ))}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {availableOptions.map((option, i) => (
              <Button
                key={i}
                onClick={() => {
                  const emptyIndex =
                    userAnswers[currentQuestionIndex].indexOf("");
                  if (emptyIndex !== -1) {
                    handleDrop(emptyIndex, option);
                  }
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                disabled={
                  userAnswers[currentQuestionIndex].filter(Boolean).length >=
                  blanks
                }
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end mt-4 sm:flex-row flex-col sm:items-center">
          <Button
            onClick={() => dispatch(nextQuestion())}
            disabled={!isNextEnabled}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuestionCard;
