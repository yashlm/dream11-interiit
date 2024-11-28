import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, Typography } from "@mui/material";
import calendar from "../assets/calendar.png";

const theme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "var(--red)", // Background color of selected dates
            color: "#ffffff", // Text color of selected dates
            "&:hover": {
              backgroundColor: "var(--red)", // Hover state for selected date
            },
          },
          "&.Mui-selected:focus": {
            backgroundColor: "var(--red)", // Focused selected state
            outline: "none", 
          },
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--bg)", // Overall background of the calendar
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px" ,
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        switchViewButton: {
          color: "var(--red)", // Color of the year/month switch button
          outline: "none",
        },
        label: {
          color: "var(--red)", // Color of the current month label
        },
      },
    },
    MuiPickersYear: {
      styleOverrides: {
        yearButton: {
          "&.Mui-selected": {
            backgroundColor: "var(--red)", // Active year in the year selector
            fontWeight: "bold", 
            outline: "none",
          },
          "&.Mui-selected:focus": {
            backgroundColor: "var(--red)", // Focused selected state
            outline: "none", 
          },
        },
      },
    },
  },
});

export default function Calendar() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          sx={{ padding: "10px" }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <img
              src={calendar}
              alt="Calendar Icon"
              style={{ width: "30px", height: "30px" }}
            />
            <Typography variant="h5" sx={{ color: "var(--text)" }}>
              Select Date
            </Typography>
          </Box>
          <DateCalendar />
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
