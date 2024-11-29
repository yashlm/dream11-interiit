import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import logo from "../assets/landing_page/dream11logo.svg";
import dayjs from "dayjs";

const Navbar = () => {
  const [language, setLanguage] = useState("en");
  const [navColor, setNavColor] = useState("rgba(255, 255, 255, 0.1)");

  const handleLanguageChange = (event) => setLanguage(event.target.value);
  const todayDate = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    if (location.pathname === "/") {
      setNavColor("rgba(255, 255, 255, 0.1)");
    } else {
      setNavColor("rgba(255, 255, 255, 0.1)");
    }
  }, [location.pathname]);

  return (
    <nav
      style={{
        display: "flex",
        width: "100vw",
        position: "fixed",
        zIndex: "3000",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: navColor,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(11px)",
        WebkitBackdropFilter: "blur(11px)",
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <div>
        <Link to="/">
          <img
            alt="logo"
            src={logo}
            style={{ width: "160px", height: "40px" }}
          />
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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

        <Link to="/teamSelect" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "var(--red)",
              color: "var(--bg)",
              textTransform: "none",
            }}
          >
            Select Team
          </Button>
        </Link>
        <Link
          to={`/custommatch/${todayDate}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: "var(--red)",
              color: "var(--bg)",
              textTransform: "none",
            }}
          >
            Custom Match
          </Button>
        </Link>
        <Link to="/dreamTeam" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "var(--red)",
              color: "var(--bg)",
              textTransform: "none",
            }}
          >
            Dream Team
          </Button>
        </Link>
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
