import dayjs from "dayjs"; // Import Day.js
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, Typography } from "@mui/material";
import calendar from "../../assets/HomePage/date.svg";
import styles from "../../css/HomePage/Calendar.module.css";

const theme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&:hover": {
            outline: "2px solid var(--calendar)", // calendar outline on hover
            backgroundColor: "rgba(255, 0, 0, 0.1)", // Light calendar background on hover
            cursor: "pointer", 
          },
          "&.Mui-selected": {
            backgroundColor: "var(--calendar)",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "var(--calendar)",
            },
          },
          "&.Mui-selected:focus": {
            backgroundColor: "var(--calendar)",
            outline: "none",
          },
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Subtle shadow for a sleek look
          borderRadius: "10px", // Rounded corners for a sleek feel
          padding: "8px",
          transition: "box-shadow 0.3s ease-in-out", // Smooth transition on hover
          "&:hover": {
            boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)", // Stronger shadow on hover
          },
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        switchViewButton: {
          color: "var(--calendar)",
          outline: "none",
        },
        label: {
          color: "var(--calendar)",
        },
      },
    },
    MuiPickersYear: {
      styleOverrides: {
        yearButton: {
          "&.Mui-selected": {
            backgroundColor: "var(--calendar)",
            fontWeight: "bold",
            outline: "none",
          },
          "&.Mui-selected:focus": {
            backgroundColor: "var(--calendar)",
            outline: "none",
          },
        },
      },
    },
  },
});

export default function Calendar({ selectedDate, setSelectedDate, minDate }) {
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate ? newDate.toDate() : null); // Ensure compatibility with Date object
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className={styles.container}>
          <Box className={styles.heading}>
            <img src={calendar} alt="Calendar Icon" className={styles.icon} />
            <Typography variant="h5" className={styles.title}>
              Select Date
            </Typography>
          </Box>
          <DateCalendar
            value={dayjs(selectedDate)} // Convert selectedDate to Day.js object
            onChange={handleDateChange}
            minDate={dayjs(minDate)} // Convert minDate to Day.js object
          />
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
