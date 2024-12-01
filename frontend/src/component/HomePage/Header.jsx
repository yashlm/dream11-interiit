import { Component } from "react";
import Animate from "react-smooth";
import Button from "@mui/material/Button";
import image1 from "../../assets/HomePage/header4.png";
import image2 from "../../assets/HomePage/header2.png";
import image3 from "../../assets/HomePage/header3.png";
import image4 from "../../assets/HomePage/header1.png";
// import image5 from "../../assets/HomePage/header5.png";


class Header extends Component {
  constructor(props) {
    super(props);
    this.showcaseImages = 4;
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
    const backgroundImages = [image1, image2, image3, image4];

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
        <Animate to="1" from="0.2" attributeName="opacity">
          <div style={{
            background: "rgba(0,0,0,1)",
            height: "6vh",
            position: "relative",
          }}></div>
          <div
            style={{
              backgroundImage: `url(${backgroundImages[i]})`,
              backgroundColor: "black",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "69vh",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "70%",
                left: "5%",
                transform: "translateY(-50%)", // Vertically center
                textAlign: "left",
                color: "white",
                padding: "20px",
                borderRadius: "12px",
                maxWidth: "400px",
                zIndex: "3",
                background: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
                backdropFilter: "blur(10px)", // Glassmorphism blur effect
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
                // border: "1px solid rgba(255, 255, 255, 0.2)", 
              }}
            >
              <h1
                style={{
                  fontSize: "3rem",
                  marginBottom: "10px",
                  textShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)", // Subtle text shadow for better contrast
                }}
              >
                Start Playing
              </h1>
              <p
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "20px",
                  lineHeight: "1.6",
                  color: "white",
                  textShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)", 
                }}
              >
                Build your dream team, challenge your friends, and showcase your skills. Are you ready to win big?
              </p>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "var(--red)",
                  color: "var(--bg)",
                  fontWeight: "bold",
                  padding: "12px 25px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  transition: "transform 0.2s ease, background-color 0.2s ease",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", // Subtle shadow
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
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
