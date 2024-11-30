import { Component } from "react";
import Animate from "react-smooth";
import Button from "@mui/material/Button";
import image1 from "../../assets/bg1.jpg";
import image2 from "../../assets/bg2.jpg";
import image3 from "../../assets/bg3.jpg";

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
        <Animate to="1" from="0.2" attributeName="opacity">
          <div
            style={{
              backgroundImage: `url(${backgroundImages[i]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "75vh",
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
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust transparency and color
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "10%", // Align to the left
                transform: "translateY(-50%)", // Vertically center
                textAlign: "left", // Align text to the left
                color: "white",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "400px",
                zIndex: "3"
              }}
            >
              <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
                Start Playing
              </h1>
              <p style={{ fontSize: "1.2rem", marginBottom: "20px", lineHeight: "1.5" }}>
                Build your dream team, challenge your friends, and showcase your skills. Are you ready to win big?
              </p>
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
