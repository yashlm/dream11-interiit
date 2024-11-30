import React from "react";
import { MDBCard, MDBCardBody, MDBIcon, MDBTypography } from "mdb-react-ui-kit";

export default function WeatherCard({
  time,
  place,
  temp,
  weatherType,
  humidity,
  windSpeed,
}) {
  return (
    <MDBCard
      style={{
        color: "#4B515D",
        borderRadius: "10px",
        backgroundColor: "transparent",
      }}
    >
      <MDBCardBody style={{ padding: "10px" }}>
        {/* Header Section */}
        <div className="d-flex justify-content-between">
          <MDBTypography tag="h6" className="flex-grow-1">
            {place}
          </MDBTypography>
          <MDBTypography tag="h6">{time}</MDBTypography>
        </div>

        {/* Temperature Section */}
        <div className="d-flex mt-1">
          <img
            className="pt-3"
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp"
            style={{
              height: "50px",
              width: "50px",
            }}
            alt="weather-icon"
          />

          <MDBTypography
            tag="h6"
            className="display-5 mb-0 font-weight-bold ml-4"
            style={{ color: "#1C2331" }}
          >
            {temp}°C
          </MDBTypography>
        </div>
        <div className="flex flex-row w-full justify-between">
          <span className="small" style={{ color: "#868B94" }}>
            {weatherType}
          </span>
          <span className="small">
            <MDBIcon fas icon="wind fa-fw" style={{ color: "#868B94" }} />
            {windSpeed}
          </span>
          <span className="small">
            <MDBIcon fas icon="tint fa-fw" style={{ color: "#868B94" }} />
            <span className="ms-2">{humidity}</span>
          </span>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}
