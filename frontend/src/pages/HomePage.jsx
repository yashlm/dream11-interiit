import { useState, useEffect } from "react";
import Joyride from "react-joyride";
import dayjs from "dayjs";
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
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 6, 6));
  const [run, setRun] = useState(false);

  const handleStartTour = () => {
    setTimeout(() => setRun(true), 500); // Delay by 500ms to ensure all components are rendered
  };

  useEffect(() => {
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    const urlFeature = `${BASE_URL}/match/date/featured?date=${formattedDate}`;
    const urlAll = `${BASE_URL}/match/date/all?date=${formattedDate}`;

    MatchDataFetch(urlFeature, setFeaturedMatchData);
    MatchDataFetch(urlAll, setAllMatchData);
  }, [selectedDate]);

  return (
    <div className={styles.container}>
      <Joyride
        steps={[
          {
            target: '[data-tour-id="navbar"]',
            content: "This is the navigation bar. You can switch between pages here.",
          },
          {
            target: '[data-tour-id="header"]',
            content: "This is the header showcasing the latest updates and banners.",
          },
          {
            target: '[data-tour-id="featured-matches"]',
            content: "Here are the featured matches of the day.",
          },
          {
            target: '[data-tour-id="all-matches"]',
            content: "Browse through all the available matches here.",
          },
          {
            target: '[data-tour-id="calendar"]',
            content: "Use the calendar to pick a date and view matches accordingly.",
          },
        ]}
        run={run}
        continuous
        showSkipButton
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <Navbar className="navbar" data-tour-id="navbar" />
      <Header className="header" data-tour-id="header" />
      <div className={styles.nonheader}>
        <div className={`${styles.matchlist} featured-matches`} data-tour-id="featured-matches">
          <FeaturedMatches matches={featuredMatchData} />
          <AllMatches matches={allMatchData} className="all-matches" data-tour-id="all-matches" />
        </div>
        <div className={`${styles.sidebar}`}>
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            minDate={new Date(2024, 6, 1)}
            className="calendar"
            data-tour-id="calendar"
          />
          <HowToPlay startTour={handleStartTour} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
