import React from "react";
import ScrollableCalendar from "react-calender-horizontal/lib/ScrollableCalendar";
import "./Calender.css";

const Calendar = (setDate) => {
  return (
    <ScrollableCalendar
      onDateSelect={(date) => setDate(date)}
      prevButtonColor="#ff5733" // Custom previous button color
      nextButtonColor="#33c1ff" // Custom next button color
      daysInWeek={7} // Number of days to display in a week strip
      canSelectPastDates={false} // Disable selection of past dates
      maxWidth="550px" // Set max width of the calendar strip
    />
  );
};

export default Calendar;
