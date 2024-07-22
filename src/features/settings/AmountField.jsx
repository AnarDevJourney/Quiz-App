import { TextField } from "@mui/material";

const AmountField = ({ value, onChange }) => {
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Check if the input value is empty or within the valid range (1-100)
    if (value === "" || (Number(value) >= 1 && Number(value) <= 100)) {
      onChange(value);
    }
  };

  return (
    <TextField
      label="Amount"
      type="number"
      value={value}
      onChange={handleAmountChange}
      fullWidth
      margin="normal"
      inputProps={{ min: 1, max: 100 }}
    />
  );
};

export default AmountField;
