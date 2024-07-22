import { Box, Button, Typography } from "@mui/material";

const FetchingErrors = ({ message, retry }) => {
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
        {message}
      </Typography>
      <Button variant="contained" color="primary" onClick={retry}>
        Retry
      </Button>
    </Box>
  );
};

export default FetchingErrors;
