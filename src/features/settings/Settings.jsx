import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../Routes/routes";

// Importing function for fetching quiz categories
import { fetchQuizCategories } from "../../services/apiCategories";

// Importing loader to show data is loading
import Loader from "../../ui/Loader";

// Importing error component to show errors
import FetchingErrors from "../../ui/FetchingErrors";

// Importing reusable component to make settings fields
import SelectField from "./SelectField";

// component to take amount of questions
import AmountField from "./AmountField";

// MUI components
import { Box, Button, Container, Typography } from "@mui/material";

const Settings = () => {
  // State variables for category, difficulty, type, and amount settings
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("10");

  const navigate = useNavigate();

  // Fetching quiz categories using React Query
  const {
    data: dataQuizCategories,
    error: errorQuizCategories,
    isLoading: isLoadingQuizCategories,
    refetch: refetchQuizCategories,
  } = useQuery({
    queryKey: ["quiz categories"], // Cache key
    queryFn: fetchQuizCategories, // Function to fetch the quiz categories
    refetchOnWindowFocus: false, // Do not refetch on window focus
    staleTime: Infinity,
  });

  // Predefined options for difficulty and type
  const difficultyOptions = [
    { id: 1, name: "easy" },
    { id: 2, name: "medium" },
    { id: 3, name: "hard" },
  ];

  const typeOptions = [
    { id: 1, name: "multiple" },
    { id: 2, name: "boolean" },
  ];

  // Setting default values for category, difficulty, and type when data is loaded
  useEffect(() => {
    if (dataQuizCategories && dataQuizCategories.length > 0) {
      setCategory(dataQuizCategories[0].id);
    }
    setDifficulty(difficultyOptions[0].name);
    setType(typeOptions[0].name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataQuizCategories]);

  // Rendering loader component if data is still loading
  if (isLoadingQuizCategories) {
    return <Loader />;
  }

  // Rendering error component if there is some error
  if (errorQuizCategories) {
    return (
      <FetchingErrors
        message={errorQuizCategories.message}
        retry={refetchQuizCategories}
      />
    );
  }

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all required settings have been provided by the user
    if (category && difficulty && type && amount) {
      // Navigate to the questions page, passing the selected settings as state
      navigate(routes.questions, {
        state: { category, difficulty, type, amount },
      });
    } else {
      // Alert the user to fill in all the settings if any are missing
      alert("Please fill in all settings");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100svh",
      }}
    >
      <Typography variant="h3" gutterBottom>
        QUIZ APP
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        {/* Categories */}
        {dataQuizCategories && (
          <SelectField
            data={dataQuizCategories}
            onChange={(value) => setCategory(value)}
            defaultValue={String(dataQuizCategories[0].id)}
            valueField="id"
            displayField="name"
            label="Category"
          />
        )}
        {/* Difficulty */}
        <SelectField
          data={difficultyOptions}
          onChange={(value) => setDifficulty(value)}
          defaultValue={difficultyOptions[0].name}
          valueField="name"
          displayField="name"
          label="Difficulty"
        />
        {/* Type */}
        <SelectField
          data={typeOptions}
          onChange={(value) => setType(value)}
          defaultValue={typeOptions[0].name}
          valueField="name"
          displayField="name"
          label="Type"
        />
        {/* Amount of questions */}
        <AmountField value={amount} onChange={(value) => setAmount(value)} />
        {/* Button for submit the form */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 3 }}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
