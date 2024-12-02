import { useState, useEffect } from "react";
import dayjs from "dayjs"; // Import Day.js
import FeaturedMatches from "../component/HomePage/FeaturedMatches";
import AllMatches from "../component/HomePage/AllMatches";
import HowToPlay from "../component/HomePage/HowToPlay";
import Calendar from "../component/HomePage/Calendar";
import Header from "../component/HomePage/Header";
import Navbar from "../component/Navbar";
import MatchDataFetch from "../component/helper/fetchMatch";
import { BASE_URL } from "../constants";
import styles from "../css/HomePage/HomePage.module.css";

const HomePage = () => {
  const [allMatchData, setAllMatchData] = useState([]);
  const [featuredMatchData, setFeaturedMatchData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 6, 6)); // Default to July 6, 2024

  useEffect(() => {
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD"); // Format date using Day.js
    const urlFeature = `${BASE_URL}/match/date/featured?date=${formattedDate}`;
    const urlAll = `${BASE_URL}/match/date/all?date=${formattedDate}`;

    MatchDataFetch(urlFeature, setFeaturedMatchData);
    MatchDataFetch(urlAll, setAllMatchData);
  }, [selectedDate]); // Trigger effect on date change

  return (
    <div className={styles.container}>
      <Navbar />
      <Header />
      <div className={styles.nonheader}>
        <div className={styles.matchlist}>
          <FeaturedMatches matches={featuredMatchData} />
          <AllMatches matches={allMatchData} />
        </div>
        <div className={styles.sidebar}>
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            minDate={new Date(2024, 6, 1)} // Restrict selection before July 1, 2024
          />
          <HowToPlay />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
