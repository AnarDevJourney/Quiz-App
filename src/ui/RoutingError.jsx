import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useRouteError } from "react-router-dom";

const RoutingError = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Something went wrong 🥲
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        {error.message || error.data}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        &larr; Go back
      </Button>
    </Box>
  );
};

export default RoutingError;
