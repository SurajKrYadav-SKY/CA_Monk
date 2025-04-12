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
  }
})

export const {setQuestions,nextQuestion, updateTimer, setUserAnswer,clearUserAnswer} = quizSlice.actions;
export default quizSlice.reducer;