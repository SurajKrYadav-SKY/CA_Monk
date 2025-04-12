import { updateTimer } from "@/reduxStore/slices/quizSlice";
import { RootState } from "@/reduxStore/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Timer = () => {
  const dispatch = useDispatch();
  const timeLeft = useSelector((state: RootState) => state.quiz.timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(updateTimer(timeLeft - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch, timeLeft]);

  return <div>Time Left: {timeLeft}s</div>;
};

export default Timer;
