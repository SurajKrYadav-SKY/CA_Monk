import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question, QuizState } from "@/types";

const initialState :  QuizState = {
  questions: [],
  totalQuestions: 0,
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
      state.totalQuestions = action.payload.length;
      state.userAnswers = Array(action.payload.length).fill([]);
    },
    setUserAnswer: (state, action: PayloadAction<{ index: number; answer: string }>) => {
      const { index, answer } = action.payload;
      state.userAnswers[state.currentQuestionIndex] = [
        ...state.userAnswers[state.currentQuestionIndex].slice(0, index),
        answer,
        ...state.userAnswers[state.currentQuestionIndex].slice(index + 1),
      ];
    },
    clearUserAnswer: (state, action: PayloadAction<number>) => {
      state.userAnswers[state.currentQuestionIndex][action.payload] = '';
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
        state.timeLeft = 30;
      } else {
        state.isQuizComplete = true;
      }
    },
    updateTimer: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
      if (state.timeLeft <= 0) {
        quizSlice.caseReducers.nextQuestion(state);
      }
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.userAnswers = Array(state.questions.length).fill([]);
      state.timeLeft = 30;
      state.isQuizComplete = false;
    },
  }
})

export const {setQuestions,nextQuestion, updateTimer, setUserAnswer,clearUserAnswer,resetQuiz} = quizSlice.actions;
export default quizSlice.reducer;