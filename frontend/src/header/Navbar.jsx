import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import logo from "./logo.png";

const Navbar = () => {
  const [language, setLanguage] = React.useState("en"); // Default language

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f5f5f5", // Optional background color
      }}
    >
      {/* Logo */}
      <div>
        <Link to="/">
          <img
            alt="logo"
            src={logo}
            style={{ width: "160px", height: "40px" }}
          />
        </Link>
      </div>

      {/* Language Selector and Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Language Selection Dropdown */}
        <FormControl size="small">
          <Select
            value={language}
            onChange={handleLanguageChange}
            style={{ minWidth: "120px" }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">हिन्दी</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
            <MenuItem value="es">Español</MenuItem>
          </Select>
        </FormControl>

        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "var(--red)",
              color: "var(--bg)",
              textTransform: "none",
            }}
          >
            Login
          </Button>
        </Link>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "var(--red)",
              color: "var(--bg)",
              textTransform: "none",
            }}
          >
            Signup
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
