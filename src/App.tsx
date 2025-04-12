import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "./reduxStore/slices/quizSlice";
import { apiClient } from "./utils/apiClient";
import { DATA_ROUTE } from "./utils/constants";
import QuestionCard from "./components/QuestionCards/QuestionCard";
import { RootState } from "./reduxStore/store";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentQuestionIndex = useSelector(
    (state: RootState) => state.quiz.currentQuestionIndex
  );

  useEffect(() => {
    apiClient
      .get(DATA_ROUTE)
      .then((response) => {
        // console.log("Fetched data:", response.data);
        dispatch(setQuestions(response.data.questions));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sentence Construction</h1>
      <div className="progress-bar bg-gray-200 h-2 mb-4">
        <div
          className="bg-blue-500 h-2"
          style={{ width: `${((currentQuestionIndex + 1) / 10) * 100}%` }}
        ></div>
      </div>
      <QuestionCard />
    </div>
  );
}

export default App;
