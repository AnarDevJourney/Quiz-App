import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./features/questions/quizSlice";

// Configuring the Redux store
const store = configureStore({
  // Adding the quiz slice reducer to the store
  reducer: {
    // The key 'quiz' will be used to access the state managed by quizReducer
    quiz: quizReducer,
  },
});

export default store;
