import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setUserAnswer, clearUserAnswer } from "@/reduxStore/slices/quizSlice";
import { Question } from "@/types";

export const useQuizLogic = (
  question: Question | undefined,
  currentQuestionIndex: number,
  userAnswers: string[][]
) => {
  const dispatch = useDispatch();
  const [availableOptions, setAvailableOptions] = useState<string[]>([]);

  // here we are memoize blanks calculation
  const blanks = useMemo(
    () => (question ? question.question.split("_____________").length - 1 : 0),
    [question?.question]
  );

  // checking if Next button should be enabled
  const isNextEnabled = userAnswers[currentQuestionIndex].filter(Boolean).length === blanks;

  useEffect(() => {
    if (!question) return;

    // Initialize answers
    if (
      userAnswers[currentQuestionIndex].length !== blanks ||
      userAnswers[currentQuestionIndex].some((ans) => ans === undefined)
    ) {
      const initialAnswers = Array(blanks).fill("");
      initialAnswers.forEach((_, index) => {
        dispatch(setUserAnswer({ index, answer: "" }));
      });
    }

    // Update available options
    const usedOptions = userAnswers[currentQuestionIndex].filter(Boolean);
    const remainingOptions = question.options.filter(
      (option) => !usedOptions.includes(option)
    );
    setAvailableOptions(remainingOptions);
  }, [question, userAnswers, currentQuestionIndex, blanks, dispatch]);

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

  return {
    availableOptions,
    blanks,
    isNextEnabled,
    handleDrop,
    handleClear,
  };
};