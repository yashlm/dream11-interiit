import ListsOfMatches from "../matchlist/ListsOfMatches";
import Calendar from "../matchlist/Calendar";
import Header from "../header/Header";
import styles from "../css/home.module.css";

import { useState } from "react";

const Home = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.main_home}>
      <Header />
      <div style={{ display: "flex", width: "100vw" }}>
        <ListsOfMatches date={date} />
        <div style={{ flex: "0 0 30%", padding: "20px" }}>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Home;
