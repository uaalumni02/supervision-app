import React, { useState } from "react";
import settings from "../config/configData";
import { Grid, Paper, Box, Link } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Avatar from "@material-ui/core/Avatar";

import UserApi from "../helpers/user";
import LocalStorage from "../utils/localstorage"

import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import avatar from "../assets/avatar.png";

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

const Register = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginResponse = await UserApi.register(username, firstName, lastName, password, email)
    const { token, userId } = loginResponse.userdata

    LocalStorage.save('token', token)
    LocalStorage.save('user', userId)
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
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  aria-aria-describedby="email-helper-text"
                  onChange={(e) => setUsername(e.target.value.trim())}
                />
                <FormHelperText id="email-helper-text">
                  Enter your username
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input
                  id="firstName"
                  aria-aria-describedby="email-helper-text"
                  onChange={(e) => setFirstName(e.target.value.trim())}
                />
                <FormHelperText id="email-helper-text">
                  Enter your First Name
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input
                  id="lastname"
                  aria-aria-describedby="email-helper-text"
                  onChange={(e) => setLastName(e.target.value.trim())}
                />
                <FormHelperText id="email-helper-text">
                  Enter your Last Name
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  aria-aria-describedby="email-helper-text"
                  onChange={(e) => setEmail(e.target.value.trim())}
                />
                <FormHelperText id="email-helper-text">
                  Enter your email
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
              <FormControl margin="normal">
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.form.loginButton}
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </FormControl>
            </form>
          </CardContent>
          <CardActions>
            <Typography>
              <Link href="#" color="inherit"></Link>
            </Typography>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
export default Register;
