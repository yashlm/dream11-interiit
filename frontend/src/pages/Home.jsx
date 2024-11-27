import Header from "../header/Header";
 import ListsOfMovies from "../movieslist/ListsOfMovies";
import Calendar from "../movieslist/Calendar";
// import { Grid } from "../howtoplay/grid";

const Home = () => {
  return (

    <div>
      <Header />
      <div style={{ display: "flex", width: "100vw" }} className="bg-green-700">
        <div>
          <ListsOfMovies /> 
        </div>
        <div >
          <Calendar/>
          {/* <Grid/> */}
        </div>

     </div>
      
    </div>
  );
};

export default Home;
