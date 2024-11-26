import Header from "./Header";
import ListsOfMovies from "../movieslist/ListsOfMovies";
import Calendar from "../calendar";

const Home = () => {
  return (

    <div>
      <Header />
      <div style={{ display: "flex", width: "100vw" }}>
      <ListsOfMovies />
       <div style={{ flex: "0 0 30%", padding: "20px" }}>
       <Calendar/>
     </div>
     </div>
    </div>
  );
};

export default Home;
