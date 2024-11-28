import List from "./List";

const movies = {
  upcoming: {
    apiCall: "upcoming",
    header: "Upcoming"
  },
  // romance: {
  //   apiCall:20,
  //   header: "Thriller"
  // },
  featured: {
    apiCall: "top_rated",
    header: "Top Rated"
  },
  // action: {
  //   apiCall: 28,
  //   header: "Action"
  // },
  // adventure: {
  //   apiCall: 12,
  //   header: "Adventure"
  // },
  // animation: {
  //   apiCall: 16,
  //   header: "Animation"
  // },
  // comedy: {
  //   apiCall: 35,
  //   header: "Comedy"
  // },
  // crime: {
  //   apiCall: 80,
  //   header: "Crime"
  // },
  // mystery: {
  //   apiCall: 878,
  //   header: "Science Fiction"
  // },
  // horror: {
  //   apiCall: 27,
  //   header: "Horror"
  // },
  // documentary: {
  //   apiCall: 99,
  //   header: "Documentary"
  // }
  
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