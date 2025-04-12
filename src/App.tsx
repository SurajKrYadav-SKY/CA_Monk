import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setQuestions } from "./reduxStore/slices/quizSlice";
import { apiClient } from "./utils/apiClient";
import { DATA_ROUTE } from "./utils/constants";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get(DATA_ROUTE)
      .then((response) => {
        console.log("Fetched data:", response.data);
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

  return <div className="container mx-auto p-4"></div>;
}

export default App;
