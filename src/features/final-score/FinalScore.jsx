import { useSelector, useDispatch } from "react-redux";
import { routes } from "../../Routes/routes";

// MUI components
import {
  Box,
  Button,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

// Importing function for decoding HTML entities
import { decodeHtmlEntities } from "../../utils/helpers";

// Importing action for resetting quiz
import { resetQuiz } from "../questions/quizSlice";

const FinalScore = () => {
  const dispatch = useDispatch();

  // Function to handle the "Go back to settings" button click
  function handleClickGoBackSettings() {
    // Force a full page reload to the settings page
    window.location.href = routes.settings;
    // Dispatching the resetQuiz action to reset the quiz state in the Redux store
    // Adding little bit delay because otherwise it will show total score 0 message for very short time (because we are going back to initial state where total score is 0)
    setTimeout(() => {
      dispatch(resetQuiz());
    }, 500);
  }

  // Getting the total points and incorrect answers from the Redux store
  const { totalPoints, incorrectAnswers } = useSelector((state) => state.quiz);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100svh",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          p: 4,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Total points */}
        <Typography variant="h4" gutterBottom>
          Your total points: {totalPoints}
        </Typography>
        {/* Checking if there is incorrect answers */}
        {incorrectAnswers.length > 0 ? (
          /* if there are incorrect answers render question itselft user's answers and correct answers */
          <Box>
            <Typography variant="h6" gutterBottom>
              Incorrect answers:
            </Typography>
            <List>
              {incorrectAnswers.map((item, index) => (
                <ListItem key={index} alignItems="flex-start">
                  {/* Question */}
                  <ListItemText
                    primary={`${index + 1}. Question: ${decodeHtmlEntities(
                      item.question
                    )}`}
                    secondary={
                      <>
                        {/* User's answer */}
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Your answer:{" "}
                          {item.userAnswer
                            ? decodeHtmlEntities(item.userAnswer)
                            : "You did not answer this question"}
                        </Typography>
                        <br />
                        {/* Correct answer */}
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          Correct answer:{" "}
                          {decodeHtmlEntities(item.correctAnswer)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          /* If there are no incorrect answers, render a success message */
          <Typography variant="h6">All answers are correct!</Typography>
        )}
        {/* Button for going back to settings page */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickGoBackSettings}
          sx={{ mt: 3 }}
        >
          Go back to settings
        </Button>
      </Box>
    </Container>
  );
};

export default FinalScore;
