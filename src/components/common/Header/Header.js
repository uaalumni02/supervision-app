import React, { useContext } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
      fontSize: 17,
      fontWeight: 400
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
      {!globalState.isLoggedIn && <a href="#"></a>}
      {globalState.isLoggedIn && (
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          href="/meeting"
        >
          Add Supervision
        </IconButton>
      )}

      {!globalState.isLoggedIn && <a href="#"></a>}
      {globalState.isLoggedIn && (
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          href="/supervision"
        >
          My Supervision
        </IconButton>
      )}
      <Box flexGrow={2} textAlign="right">
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Box>
      {!globalState.isLoggedIn && <a href="#"></a>}
      {globalState.isLoggedIn && (
        <a onClick={handleLogout} href="/">
          Log Out
        </a>
      )}
    </Box>
  );
};

export default Header;
