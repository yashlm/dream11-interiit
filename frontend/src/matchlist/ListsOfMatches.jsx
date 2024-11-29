import List from "./List";
import styles from '../css/home.module.css'

const movies = {
  featured: {
    apiCall: "featured",
    header: "Featured Matches"
  },
  all: {
    apiCall: "all",
    header: "All Matches"
  },
};

const ListsOfMatches= () => {
  return (
    <div>
      {Object.keys(movies).map((item, i) => (
        <div key={i}>
          <List heading={movies[item].header} apiCall={movies[item].apiCall} />
        </div>
      ))}
    </div>
  );
};

export default ListsOfMatches;