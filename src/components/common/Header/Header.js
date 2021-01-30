import React, { useContext } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import { Box, Typography, Button, IconButton, Link } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import Context from "../../../store/context";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  const { globalState, globalDispatch } = useContext(Context);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    globalDispatch({
      type: "LOGOUT",
    });
  };
  const classes = useStyles();
  return (
    <Box display="flex" bgcolor="info.main" p={2} alignItems="center">
      <Typography>CHRIS 180</Typography>
      <IconButton
        href="/meeting"
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
      >
        <Typography>Add Supervision</Typography>
      </IconButton>
      <IconButton
        href="/supervision"
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
      >
        <Typography>All Meetings</Typography>
      </IconButton>
      <Box flexGrow={2} textAlign="right">
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Box>
      {!globalState.isLoggedIn && <a href="#">Login</a>}
      {globalState.isLoggedIn && (
        <a onClick={handleLogout} href="/">
          Log Out
        </a>
      )}
    </Box>
  );
};

export default Header;
