// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Button from "@mui/material/Button";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import FormControl from "@mui/material/FormControl";
// import logo from "./logo.png";

// const Navbar = () => {
//   const [language, setLanguage] = useState("en");
//   const [navColor, setNavColor] = useState("var(--bg)"); 
//   const [navSize, setNavSize] = useState("4.5rem");
//   const location = useLocation();

//   const handleLanguageChange = (event) => setLanguage(event.target.value);

//   const listenScrollEvent = () => {
//     if (location.pathname.startsWith("/product")) {
//       setNavColor("#2D3142");
//       setNavSize("5rem");
//     } else {
//       // Change dynamically on scroll for other pages
//       if (window.scrollY >1) {
//         setNavColor("red");
//         setNavSize("3rem");
//       } else {
//         setNavColor("var(--bg");
//         setNavSize("5rem");
//       }
//     }
//   };

//   useEffect(() => {
//     // Add scroll event listener
//     window.addEventListener("scroll", listenScrollEvent);
//     return () => {
//       // Cleanup listener
//       window.removeEventListener("scroll", listenScrollEvent);
//     };
//   }, [location.pathname]);

//   return (
//     <nav
//       style={{
//         display: "flex",
//         width:"100vw",
//         position:"fixed",
//         zIndex:"3000",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "10px 20px",
//         backgroundColor: navColor,
//         height: navSize,
//         transition: "all 0.5s ease-in-out",
//       }}
//     >
//       <div>
//         <Link to="/">
//           <img alt="logo" src={logo} style={{ width: "160px", height: "40px" }} />
//         </Link>
//       </div>

//       <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//         <FormControl size="small">
//           <Select
//             value={language}
//             onChange={handleLanguageChange}
//             style={{ minWidth: "120px" }}
//           >
//             <MenuItem value="en">English</MenuItem>
//             <MenuItem value="hi">हिन्दी</MenuItem>
//             <MenuItem value="fr">Français</MenuItem>
//             <MenuItem value="es">Español</MenuItem>
//           </Select>
//         </FormControl>

//         <Link to="/login" style={{ textDecoration: "none" }}>
//           <Button
//             variant="contained"
//             style={{
//               backgroundColor: "var(--red)",
//               color: "var(--bg)",
//               textTransform: "none",
//             }}
//           >
//             Login
//           </Button>
//         </Link>
//         <Link to="/signup" style={{ textDecoration: "none" }}>
//           <Button
//             variant="contained"
//             style={{
//               backgroundColor: "var(--red)",
//               color: "var(--bg)",
//               textTransform: "none",
//             }}
//           >
//             Signup
//           </Button>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import logo from "./logo.png";

const Navbar = () => {
  const [language, setLanguage] = useState("en");
  const [navColor, setNavColor] = useState("transparent"); // Initially transparent
  const [navSize, setNavSize] = useState("4.5rem"); // Constant size
  const location = useLocation();

  const handleLanguageChange = (event) => setLanguage(event.target.value);

  useEffect(() => {
    // Set navbar color based on the current path
    if (location.pathname === "/") {
      setNavColor("transparent"); // Transparent on root path
    } else {
      setNavColor("var(--bg)"); // Set to var(--bg) on all other pages
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
        backgroundColor: navColor,
        height: navSize,
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <div>
        <Link to="/">
          <img alt="logo" src={logo} style={{ width: "160px", height: "40px" }} />
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
