import React, { useState } from "react";
import { Grid, Paper, Box, Link } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Avatar from "@material-ui/core/Avatar";

import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import avatar from "../assets/avatar.png";

import { Redirect } from "react-router-dom";
import settings from "../config/configData";
import { relativeTimeRounding } from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    marginTop: "10%",
  },
  avatar: {
    wrapper: {
      position: "relative",
    },
    root: {
      display: "flex",
      position: "absolute",
      right: "50%",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: theme.palette.success.light,
  },
  form: {
    loginButton: {
      backgroundColor: "#3f51b5",
      color: "#fff",
    },
  },
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [InvalidLogin, setInvalidLogin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${settings.apiBaseUrl}/api/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (
          response.success === false ||
          response.data.user.role === "standard"
        ) {
          setInvalidLogin("Invalid username, password or pending approval");
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user._id);
          setLoggedIn(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Grid
      container
      className={classes.grid}
      spacing={0}
      direction="column"
      alignItems="center"
    >
      <Grid item xs={12} md={12}>
        <Card className={classes.root} xs={12} md={6}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="center">
              <div className={classes.avatar.wrapper}>
                <div className={classes.avatar.root}>
                  <Avatar alt="login-avatar" src={avatar} size={50} />
                </div>
              </div>
            </Box>
            <form>
              <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" aria-aria-describedby="email-helper-text" />
                <FormHelperText id="email-helper-text">
                  Enter your email address
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  aria-aria-describedby="password-helper-text"
                />
                <FormHelperText id="password-helper-text">
                  Enter your password
                </FormHelperText>
              </FormControl>
              <FormControl margin="normal">
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.form.loginButton}
                >
                  Login
                </Button>
              </FormControl>
            </form>
          </CardContent>
          <CardActions>
            <Typography>
              <Link href="/register" color="inherit">
                No Account? Sign up
              </Link>
            </Typography>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
export default Login;
