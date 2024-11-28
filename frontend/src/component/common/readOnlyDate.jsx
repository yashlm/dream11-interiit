import React from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ReadOnlyDate = ({ value }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TextField
        value={dayjs(value).format("YYYY-MM-DD")} // Format the date
        InputProps={{
          readOnly: true, // Make the input field non-editable
        }}
        fullWidth
        variant="outlined"
      />
    </LocalizationProvider>
  );
};

export default ReadOnlyDate;
