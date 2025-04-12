import { createSlice } from "@reduxjs/toolkit";
import { QuizState } from "@/types";

const initialState :  QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  timeLeft: 30,
  isQuizComplete: false,
}


const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers:{}
})


export default quizSlice.reducer;