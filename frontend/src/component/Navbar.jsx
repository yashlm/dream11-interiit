import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import logo from "../assets/landing_page/dream11logo.svg";
import dayjs from "dayjs";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [language, setLanguage] = useState("en");
  const [navColor, setNavColor] = useState("rgba(255, 255, 255, 0.1)");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const todayDate = dayjs().format("YYYY-MM-DD");

  const handleLanguageChange = (event) => setLanguage(event.target.value);

  useEffect(() => {
    if (location.pathname === "/") {
      setNavColor("rgba(255, 255, 255, 0.1)");
    } else {
      setNavColor("rgba(31, 31, 31, 0.9)");
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const links = [
    { path: "/teamSelect", label: "Select Team" },
    { path: `/custommatch/${todayDate}`, label: "Custom Match" },
    { path: "/dreamTeam", label: "Dream Team" },
    { path: "/login", label: "Login" },
    { path: "/signup", label: "Signup" },
  ];

  return (
    <>
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

        {!isMobile ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FormControl size="small">
              <Select
                value={language}
                onChange={handleLanguageChange}
                style={{
                  minWidth: "120px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hi">हिन्दी</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="es">Español</MenuItem>
              </Select>
            </FormControl>

            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor:
                      location.pathname === link.path ? "var(--dark-red)" : "var(--red)",
                    color: "var(--bg)",
                    textTransform: "none",
                    fontWeight: location.pathname === link.path ? "bold" : "normal",
                    boxShadow:
                      location.pathname === link.path
                        ? "0px 4px 10px rgba(0,0,0,0.3)"
                        : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        ) : (
          <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
            <MenuIcon style={{ color: "white", fontSize: "32px" }} />
          </div>
        )}
      </nav>

      {isMobile && isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0, // Sidebar opens from the right
            width: "75%",
            height: "100%",
            background: "rgba(31, 31, 31, 0.95)",
            boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.5)", // Shadow on the left of the sidebar
            zIndex: 3000,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            transform: isSidebarOpen ? "translateX(0)" : "translateX(100%)", // Smooth transition
            transition: "transform 0.3s ease-in-out", // Smooth transition effect
          }}
        >
          <div
            onClick={toggleSidebar}
            style={{ cursor: "pointer", alignSelf: "flex-start" }}
          >
            <CloseIcon style={{ color: "white", fontSize: "32px" }} />
          </div>

          <FormControl size="small" style={{ marginBottom: "20px" }}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="hi">हिन्दी</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="es">Español</MenuItem>
            </Select>
          </FormControl>

          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={toggleSidebar}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
                fontWeight: location.pathname === link.path ? "bold" : "normal",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

    </>
  );
};

export default Navbar;
