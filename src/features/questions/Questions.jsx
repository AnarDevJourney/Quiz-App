import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { routes } from "../../Routes/routes";

// MUI components
import {
  Box,
  Button,
  Container,
  Typography,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";

// Importing function for fetching quiz questions
import { fetchQuizQuestions } from "../../services/apiQuestions";

// Importing loader component to show when data is loading
import Loader from "../../ui/Loader";

//Importing error component to show errors
import FetchingErrors from "../../ui/FetchingErrors";

import {
  setQuestions, // action for setting questions in Redux store
  setUserAnswers, // action for storing user answers
  calculateTotalPoints, // action for calculating total points
} from "./quizSlice";

// Importing helper function for decoding html entities
import { decodeHtmlEntities } from "../../utils/helpers";

const Questions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Getting settings from settings page
  const { category, difficulty, type, amount } = location.state || {};

  // Getting quiz questions with shuffled answers from Redux Store
  const { questions } = useSelector((state) => state.quiz);

  // Fetching quiz questions using react-query
  const {
    data: dataQuizQuestions,
    error: errorQuizQuestions,
    isLoading: isLoadingQuizQuestions,
    refetch: refetchQuizQuestions,
  } = useQuery({
    queryKey: [`quiz questions`, category, difficulty, type, amount], // Cache key
    queryFn: () => fetchQuizQuestions(category, difficulty, type, amount), // function to fetch quiz questions
    enabled: !!category && !!difficulty && !!type && !!amount, // Only fetch if all parameters are defined
    refetchOnWindowFocus: false, // Do not refetch on window focus
    staleTime: Infinity,
  });

  // Setting fetched quiz questions in Redux Store
  useEffect(() => {
    if (dataQuizQuestions) {
      dispatch(setQuestions(dataQuizQuestions));
    }
  }, [dataQuizQuestions, dispatch]);

  // Rendering loader component if data is still loading
  if (isLoadingQuizQuestions) {
    return <Loader />;
  }

  // Rendering error component if there is some error
  if (errorQuizQuestions) {
    return (
      <FetchingErrors
        message={errorQuizQuestions.message}
        retry={refetchQuizQuestions}
      />
    );
  }

  // Handling user's answer selection
  function handleAnswerClick(questionId, answer) {
    dispatch(setUserAnswers({ questionId, answer }));
  }

  // Handling the "Check Results" button click
  function handleCheckResults() {
    dispatch(calculateTotalPoints());
    navigate(routes.finalScore);
  }

  // Function for going back to settings page
  function handleGoBackSettings() {
    window.location.href = routes.settings;
  }

  // Rendering a message and button if there are no questions available
  if (!questions || questions.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100svh",
          textAlign: "center",
          p: 3,
        }}
      >
        <Typography variant="body1" color="textSecondary" paragraph>
          No questions available. Please check the network or change the
          settings.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBackSettings}
        >
          &larr; Go back to settings
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        {questions.map((question, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography variant="h6">
              {/* Question */}
              {index + 1}. {decodeHtmlEntities(question.question)}
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                name={`question-${index}`}
                onChange={(e) =>
                  handleAnswerClick(question.question, e.target.value)
                }
              >
                {/* Checking question type if it is multiple choice render all the shuffled answers */}
                {question.type === "multiple"
                  ? question.shuffledAnswers.map((answer, i) => (
                      <FormControlLabel
                        key={i}
                        value={answer}
                        control={<Radio />}
                        label={decodeHtmlEntities(answer)}
                      />
                    ))
                  : /* If it is boolean type question render just true and false */
                    ["True", "False"].map((answer, i) => (
                      <FormControlLabel
                        key={i}
                        value={answer}
                        control={<Radio />}
                        label={answer}
                      />
                    ))}
              </RadioGroup>
            </FormControl>
          </Box>
        ))}
        {/* button for submit quiz and check results */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckResults}
          >
            Check Results
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Questions;
