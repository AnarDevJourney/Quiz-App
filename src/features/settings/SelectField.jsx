import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const SelectField = ({
  data,
  onChange,
  defaultValue,
  valueField,
  displayField,
  label,
}) => {
  const [select, setSelect] = useState(defaultValue);

  const handleSelectChange = (e) => {
    setSelect(e.target.value);
    onChange(e.target.value);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select value={select} onChange={handleSelectChange} label={label}>
        {data.map((item) => (
          <MenuItem key={item.id} value={item[valueField]}>
            {item[displayField]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
