import React, { useState } from "react";
import { Grid, Paper } from '@material-ui/core'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar'

import { FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import avatar from '../assets/avatar.png'

import { Redirect } from "react-router-dom";
import settings from "../config/configData"
import { relativeTimeRounding } from "moment";

// import {
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBBtn,
//   MDBInput,
// } from "mdbreact";


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    marginTop: '10%'
  },
  avatar: {
    wrapper: {
      position: 'relative'
    },
    root: {
      display: 'flex',
      position: 'absolute',
      right: '50%',
      '& > *': {
        margin: theme.spacing(1)
      }
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7)
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: theme.palette.success.light
  }
}))

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
        console.log(response)
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

  const classes = useStyles()
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
        <div className={classes.avatar.wrapper}>
          <div className={classes.avatar.root}>
            <Avatar alt="login-avatar" src={avatar} className={classes.avatar.large} />
          </div>

        </div>
          <form>
            <FormControl>
              <InputLabel htmlFor="email">Email address</InputLabel>
              <Input id="email" aria-aria-describedby="email-helper-text" />
              <FormHelperText id="email-helper-text">Enter your email address</FormHelperText>
            </FormControl>
          </form>
      </CardContent>
      <CardActions>
        <Button size="small">No account? Signup</Button>
      </CardActions>
    </Card>
      
      </Grid>

    </Grid>
  
  );
};
export default Login;
