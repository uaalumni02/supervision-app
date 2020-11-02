import React, { useEffect, useState, useContext } from "react";
import { Grid, Box, Link } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import Avatar from "@material-ui/core/Avatar";

import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import avatar from "../assets/avatar.png";

import { Redirect, useHistory } from "react-router-dom";

import UserApi from "../helpers/user";
import LocalStorage from "../utils/localstorage";
import Context from "../store/context";

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
      marginTop: "15px",
    },
    title: {
      fontWeight: 300,
      color: "red",
    },
  },
}));
const Supervision = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const { globalState, globalDispatch } = useContext(Context);

  let history = useHistory();

  useEffect(() => {
    if (!globalState.isLoggedIn) {
      history.push("/");
    } else {
      fetchMeetingData();
    }
  }, []);
  
  const fetchMeetingData = async (event) => {
    const loginResponse = await UserApi.supervision(globalState.userId);
    console.log(loginResponse);
  };

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
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={2}
              fontWeight={300}
              fontSize="h5.fontSize"
            >
              <h1>{globalState.userId}</h1>
              <Typography variant="span">Session Information</Typography>
            </Box>
          </CardContent>
          <form>
            <FormControl fullWidth margin="dense">
              <TextareaAutosize
                className={classes.root}
                rowsMax={4}
                aria-label="maximum height"
                placeholder="Enter Session Information"
              />
            </FormControl>
            <FormControl margin="normal">
              <Button variant="contained" size="large" color="primary">
                Submit
              </Button>
            </FormControl>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};
export default Supervision;
