import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Updated import for React Router v6+
import Search from "./Search";
// import Savedlist from "./Savedlist";
import Button from "@mui/material/Button"; // Updated Material-UI imports
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  // const navigate = useNavigate(); // Updated navigation for React Router v6+

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img
            alt="logo"
            // Uncomment and add the correct `src` for your logo:
            // style={{ width: "160px", height: "40px" }}
            // src="https://fontmeme.com/permalink/210112/8d0b909f7a074e3bc471a4075716c07e.png"
          />
        </Link>
      </div>
      <div className="search-bar">
        <Search />
        <span>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open alert dialog
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Saved Items
            </DialogTitle>
            <DialogContent>
              {/* <Savedlist closefunc={handleClose} /> */}
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClose}
                aria-label="close"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
