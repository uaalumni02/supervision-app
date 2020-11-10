import React, { useContext } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import  logOut from "../../../utils/logOut";

import Context from "../../../store/context";

// const logOut = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   }

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  const { globalState, globalDispatch } = useContext(Context);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Chris180
          </Typography>
          {!globalState.isLoggedIn && <a href="#">Login</a>}
          {globalState.isLoggedIn && (
            <button onClick={logOut} href="#">
              Log Out
            </button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
