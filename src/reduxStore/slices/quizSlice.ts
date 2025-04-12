import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question, QuizState } from "@/types";

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
  reducers:{
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.userAnswers = Array(action.payload.length).fill([]);
    },
  }
})

export const {setQuestions} = quizSlice.actions;
export default quizSlice.reducer;