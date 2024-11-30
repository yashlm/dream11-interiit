import List from "./List";
import { useState } from "react";

const movies = {
  featured: {
    apiCall: "featured",
    header: "Featured Matches",
  },
  all: {
    apiCall: "all",
    header: "All Matches",
  },
};

const ListsOfMatches = ({ date }) => {
  const [allMatchData, setAllMatchData] = useState(null);
  const [featuredMatchData, setAllFeatureMatchData] = useState(null);

  return (
    <div>
      {Object.keys(movies).map((item, i) => (
        <div key={i}>
          <List
            heading={movies[item].header}
            apiCall={movies[item].apiCall}
            date={date}
          />
        </div>
      ))}
    </div>
  );
};

export default ListsOfMatches;
