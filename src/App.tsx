import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setQuestions } from "./reduxStore/slices/quizSlice";
import { apiClient } from "./utils/apiClient";
import { DATA_ROUTE } from "./utils/constants";
import QuestionCard from "./components/QuestionCards/QuestionCard";
import FeedbackScreen from "./components/FeedbackScreen/FeedbackScreen";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <Router>
      <div className="container mx-auto m-0 p-0">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="/quiz" element={<QuestionCard />} />
          <Route path="/feedback" element={<FeedbackScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
