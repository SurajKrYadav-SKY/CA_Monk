import { Button } from "@/components/ui/button";
import { RootState } from "@/reduxStore/store";
import { QUIZ_CONFIG } from "@/utils/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { totalQuestions } = useSelector((state: RootState) => state.quiz);

  const handleStart = () => {
    navigate("/quiz");
  };
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center mb-8">
        <div className="text-4xl mb-4">📝</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Sentence Construction
        </h2>
        <p className="text-gray-500 text-sm max-w-md text-center">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>
      </div>
      <div className="flex justify-between w-full max-w-md text-center text-sm text-gray-600 mb-8">
        <div>
          <p className="font-medium">Time Per Question</p>
          <p>{QUIZ_CONFIG.timePerQuestion} sec</p>
        </div>
        <div>
          <p className="font-medium">Total Questions</p>
          <p>{totalQuestions || QUIZ_CONFIG.totalQuestions}</p>
        </div>
        <div>
          <p className="font-medium">Coins</p>
          <p className="flex items-center justify-center">
            {QUIZ_CONFIG.initialCoins}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" className="cursor-pointer">
          Back
        </Button>
        <Button className="cursor-pointer" onClick={handleStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default Home;
