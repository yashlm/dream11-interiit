import Header from "./Header";
 import ListsOfMovies from "../movieslist/ListsOfMovies";
import Calendar from "../movieslist/Calendar";
// import { Grid } from "../howtoplay/grid";

const Home = () => {
  return (

    <div>
      <Header />
      <div style={{ display: "flex", width: "100vw" }}>
      <ListsOfMovies /> 
       <div style={{ flex: "0 0 30%", padding: "20px" }}>
       <Calendar/>
       {/* <Grid/> */}
     </div>
     </div>
    </div>
  );
};

export default Home;
