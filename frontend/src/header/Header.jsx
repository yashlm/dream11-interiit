//code to fetch images using api
// import { Component } from "react";
// import Animate from "react-smooth"; // For smooth transitions
// import Navbar from "./Navbar";
// import Button from "@mui/material/Button";

// class Header extends Component {
//   constructor(props) {
//     super(props);
//     this.showcaseImages = 4; 
//     this.timeoutTime = 5000;
//     this.mounted = false;
//   }

//   state = {
//     images: [], 
//     currentIndex: 0 
//   };

//   componentDidMount() {
//     this.mounted = true;
//     fetch(
//       `https://api.themoviedb.org/3/trending/movie/day?api_key=17117ab9c18276d48d8634390c025df4&language=en-US`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         // Extract 4 images from the API response
//         const images = data.results.slice(0, this.showcaseImages).map((movie) => {
//           return `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
//         });
//         if (this.mounted) this.setState({ images });
//       })
//       .catch((err) => console.log(err));

//     this.startTimeout();
//   }

//   startTimeout = () => {
//     this.timeout = setTimeout(() => {
//       const { currentIndex, images } = this.state;

//       const nextIndex = (currentIndex + 1) % images.length;
//       this.setState({ currentIndex: nextIndex });
//       this.startTimeout(); 
//     }, this.timeoutTime);
//   };

//   componentWillUnmount() {
//     this.mounted = false;
//     clearTimeout(this.timeout); 
//   }

//   render() {
//     const { images, currentIndex } = this.state;

//     const backgroundStyle =
//       images.length > 0
//         ? {
//             backgroundImage: `url(${images[currentIndex]})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             height: "100vh",
//             position: "relative",
//             transition: "background-image 1s ease-in-out" // Sliding effect
//           }
//         : {};

//     return (
//       <header>
//         <Navbar />
//         <div style={backgroundStyle}>
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               textAlign: "center",
//               color: "white",
//               textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)"
//             }}
//           >
//             <h1>Start Playing</h1>
//             <Button
//               variant="contained"
//               color="var(--red)"
//               style={{
//                 backgroundColor: "var(--red)",
//                 color: "var(--bg)",
//                 padding: "10px 20px",
//                 fontSize: "16px"
//               }}
//             >
//               Create Team
//             </Button>
//           </div>
//         </div>
//       </header>
//     );
//   }
// }

// export default Header;
import React, { Component } from "react";
import Animate from "react-smooth";
import Button from "@mui/material/Button";
import image1 from "../assets/bg1.jpg";
import image2 from "../assets/bg2.jpg";
import image3 from "../assets/bg3.jpg";
import Navbar from "./Navbar";
const backgroundImages = [image1, image2, image3];

class Header extends Component {
  constructor(props) {
    super(props);
    this.showcaseImages = 3;
    this.timeoutTime = 5000;
  }

  state = {
    i: 0,
  };

  componentDidMount() {
    this.startTimeout();
  }

  startTimeout = () => {
    this.timeout = setTimeout(() => {
      this.setState(
        (prevState) => ({ i: (prevState.i + 1) % this.showcaseImages }),
        this.startTimeout
      );
    }, this.timeoutTime);
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { i } = this.state;
    const backgroundImages = [image1, image2, image3];

    const divs = backgroundImages.map((_, index) => (
      <div
        key={index}
        style={{
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          backgroundColor: i === index ? "white" : "gray",
          cursor: "pointer",
        }}
        onClick={() =>
          this.setState({ i: index }, () => {
            clearTimeout(this.timeout);
            this.startTimeout();
          })
        }
      />
    ));

    return (
      <header>
       <Navbar/>
        <Animate to="1" from="0.2" attributeName="opacity">
          <div
            style={{
              backgroundImage: `url(${backgroundImages[i]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
             
              height: "90vh",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "white",
               
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
                Start Playing
              </h1>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "var(--red)",
                  color: "var(--bg)",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  fontSize: "1rem",
                }}
              >
                Create Team
              </Button>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "10px",
              }}
            >
              {divs}
            </div>
          </div>
        </Animate>
      </header>
    );
  }
}

export default Header;
