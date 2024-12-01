// import React from "react";
import FeaturedMatches from "../component/HomePage/FeaturedMatches";
import AllMatches from "../component/HomePage/AllMatches";
import HowToPlay from "../component/HomePage/HowToPlay";
import styles from "../css/HomePage/HomePage.module.css";
import Calendar from "../component/HomePage/Calendar";
import Header from "../component/HomePage/Header";
import Navbar from "../component/Navbar";
import { useState, useEffect } from "react";
import MatchDataFetch from "../component/helper/fetchMatch";
import { BASE_URL } from "../constants";

const date = new Date(2024, 6, 1); // 6 represents July (0-indexed)
// date.setDate(date.getDate() - 42);

const HomePage = () => {
  const [allMatchData, setAllMatchData] = useState([]);
  const [featuredMatchData, setAllFeatureMatchData] = useState([]);
  //   const date = new Date();

  useEffect(() => {
    const formattedDate = date.toISOString().split("T")[0];
    const urlFeature = `${BASE_URL}/match/date/featured?date=${formattedDate}`;
    const urlAll = `${BASE_URL}/match/date/all?date=${formattedDate}`;
    MatchDataFetch(urlFeature, setAllFeatureMatchData);
    MatchDataFetch(urlAll, setAllMatchData);
  }, [date]);

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
          <Calendar />
          <HowToPlay />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
