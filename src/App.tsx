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
import Loading from "./components/LoadingComponent/Loading";
import FailedLoading from "./components/LoadingComponent/FailedLoading";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(DATA_ROUTE);
        if (response.status === 200) {
          dispatch(setQuestions(response.data.questions));
        } else {
          throw new Error("API returned unsuccessful status");
        }
      } catch (error) {
        console.log("Unable to fetch the data", error);
        setError("Failed to load the data...");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading)
    return (
      <>
        <Loading />
      </>
    );
  if (error)
    return (
      <>
        <FailedLoading error={error} />
      </>
    );

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
