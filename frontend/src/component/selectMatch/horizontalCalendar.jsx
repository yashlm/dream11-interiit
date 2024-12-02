import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import ReactDOM from "react-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./HorizontalCalendar.module.css"; // Import the CSS module

const HorizontalCalendar = ({ initialDate, onDateChange, setMatchDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Helper function to get a formatted date string
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
  };

  // Generate a range of dates based on the selected date
  const generateDateRange = () => {
    const dates = [];
    const realDate = new Date(selectedDate ? selectedDate : initialDate);
    for (let i = -1; i <= 2; i++) {
      const date = new Date();
      date.setDate(realDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleDateChange = (date) => {
    setMatchDate(date);
    setSelectedDate(date);
    setShowPopup(false);
    if (onDateChange) onDateChange(date); // Callback for parent
  };

  const togglePopup = () => setShowPopup(!showPopup);

  const dateRange = generateDateRange();

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.horizontalCalendar}>
        {dateRange.map((date, index) => (
          <button
            key={index}
            className={`${styles.dateButton} ${
              selectedDate && selectedDate.getDate() === date.getDate()
                ? styles.dateButtonSelected
                : ""
            }`}
            onClick={() => {
              if (selectedDate && selectedDate.getDate() === date.getDate()) {
                console.log("Deselect");
                handleDateChange(null); // Deselect
              } else {
                console.log(date);
                handleDateChange(date); // Select
              }
            }}
          >
            {formatDate(date)}
          </button>
        ))}
      </div>

      <div className={styles.iconWrapper}>
        <button className={styles.iconButton} onClick={togglePopup}>
          <FaRegCalendarAlt size={40} color="black" />
        </button>
        {showPopup &&
          ReactDOM.createPortal(
            <div className={styles.popupOverlay} onClick={togglePopup}>
              <div
                className={styles.popup}
                onClick={(e) => e.stopPropagation()} // Prevent popup from closing when clicking inside
              >
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateChange}
                />
              </div>
            </div>,
            document.body // Ensures the popup is outside the component tree
          )}
      </div>
    </div>
  );
};

export default HorizontalCalendar;
