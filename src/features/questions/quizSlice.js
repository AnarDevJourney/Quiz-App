import { createSlice } from "@reduxjs/toolkit";

// Importing helper function for shuffling answers
import { shuffleArray } from "../../utils/helpers";

// Initial state for quiz slice
const initialState = {
  questions: [],
  userAnswers: {},
  totalPoints: 0,
  incorrectAnswers: [],
};

// Creating a slice for quiz state management
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    // Action to set quiz questions
    setQuestions: (state, action) => {
      // Setting questions in the state with shuffled answers
      state.questions = action.payload.map((question) => ({
        ...question,
        shuffledAnswers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }));
    },

    // Action to set user answers
    setUserAnswers: (state, action) => {
      const { questionId, answer } = action.payload;
      // Setting user's answer for the specified question ID
      state.userAnswers[questionId] = answer;
    },

    // Action to calculate total points based on correct answers
    calculateTotalPoints: (state) => {
      state.totalPoints = 0;
      state.incorrectAnswers = [];

      state.questions.forEach((question) => {
        // Retrieve the user's answer for the current question
        const userAnswer = state.userAnswers[question.question];
        // Check if the user's answer matches the correct answer
        if (userAnswer === question.correct_answer) {
          // If the answer is correct, increment the total points by 1
          state.totalPoints += 1;
        } else {
          // If the answer is incorrect, add the question, user's answer,
          // and the correct answer to the incorrectAnswers array
          state.incorrectAnswers.push({
            question: question.question,
            userAnswer,
            correctAnswer: question.correct_answer,
          });
        }
      });
    },

    // Action for reset the quiz
    resetQuiz: (state) => {
      // Resetting all state values to initial state
      state.questions = [];
      state.userAnswers = {};
      state.totalPoints = 0;
      state.incorrectAnswers = [];
    },
  },
});

// Extracting action creators and reducer
export const { setQuestions, setUserAnswers, calculateTotalPoints, resetQuiz } =
  quizSlice.actions;

const quizReducer = quizSlice.reducer;
export default quizReducer;
