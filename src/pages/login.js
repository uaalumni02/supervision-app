import React, { useState, useContext, useEffect } from "react";
import { Grid, Box, Link } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Avatar from "@material-ui/core/Avatar";

import UserApi from "../helpers/user";
import LocalStorage from "../utils/localstorage";
import Context from "../store/context"

import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import avatar from "../assets/avatar.png";

import { Redirect, useHistory } from "react-router-dom";
import settings from "../config/configData";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 370,
    marginTop: "40%",
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
    error: {
      color: "red",
    },

    titleHolder: {
      marginTop: '15px',
    },
    title: {
      fontWeight: 300,
      color: 'red',
    }
  },
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  useEffect(() => {
    if (globalState.isLoggedIn) {
      const userId = LocalStorage.get("user");
      globalDispatch({ type: 'SET_LOGGEDIN_USER', payload: userId})
      history.push('/supervision')
    }
  }, [])

  const { globalState, globalDispatch} = useContext(Context)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginResponse = await UserApi.login(username, password);

    if (!loginResponse.success) {
      setError(loginResponse.message);
      return false;
    }
    const { token, userId } = loginResponse.userdata;

    LocalStorage.save("token", token);
    LocalStorage.save("user", userId);
    globalDispatch({ type: 'SET_LOGGEDIN_USER', payload: userId})
    history.push('/supervision')

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
            <Box display="flex" alignItems="center" justifyContent="center" mt={2} fontWeight={300} fontSize="h5.fontSize">
              <Typography variant="span" >User Login</Typography>
            </Box>
            <form>
              <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  aria-aria-describedby="email-helper-text"
                  onChange={(e) =>
                    setUsername(e.target.value.toLowerCase().trim())
                  }
                />
                <FormHelperText id="email-helper-text">
                  Enter your username
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  type="password"
                  id="password"
                  aria-aria-describedby="password-helper-text"
                  onChange={(e) => setPassword(e.target.value.trim())}
                />
                <FormHelperText id="password-helper-text">
                  Enter your password
                </FormHelperText>
              </FormControl>

              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </Box>

              <FormControl margin="normal">
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.form.loginButton}
                  onClick={handleSubmit}
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
