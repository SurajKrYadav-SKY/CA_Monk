import { RootState } from "@/reduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import Timer from "../Timer/Timer";
import { nextQuestion } from "@/reduxStore/slices/quizSlice";

const QuestionCard = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, userAnswers } = useSelector(
    (state: RootState) => state.quiz
  );

  console.log("Questions:", questions);
  console.log("Current Question Index:", currentQuestionIndex);
  const question = questions[currentQuestionIndex];

  if (!question) return <div>Loading...</div>;

  console.log("Current Question:", question);
  console.log("Options:", question.options);

  const blanks = question.question.split("_____________").length - 1;
  const isNextEnabled =
    userAnswers[currentQuestionIndex].filter(Boolean).length === blanks;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">
        Question {currentQuestionIndex + 1}/10
      </h2>
      <p className="mt-2">
        {question.question.split("_____________").map((part, i) => (
          <span key={i}>
            {part}
            {i < blanks && (
              <span className="border border-gray-300 p-1 mx-1">
                {userAnswers[currentQuestionIndex][i] || "_____________"}
              </span>
            )}
          </span>
        ))}
      </p>
      <div className="mt-4">
        {question.options.map((option, i) => (
          <button
            key={i}
            className="mr-2 mb-2 bg-lightgray-500 text-black p-2 border-2 rounded cursor-pointer"
          >
            {option}
          </button>
        ))}
      </div>
      <Timer />
      <Button
        onClick={() => dispatch(nextQuestion())}
        disabled={!isNextEnabled}
        className="mt-4"
      >
        Next
      </Button>
    </div>
  );
};

export default QuestionCard;
