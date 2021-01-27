import React, { useEffect, useState, useContext } from "react";
import { Grid, Box, Link } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";

import { makeStyles } from "@material-ui/core/styles";
import avatar from "../assets/avatar.png";

import { Redirect, useHistory } from "react-router-dom";

import Api from "../data/api";

import Context from "../store/context";
import * as moment from "moment";

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
const MySupervision = () => {
  const classes = useStyles();
  const [meetingDate, setMeetingDate] = useState("");
  const [supervisionType, setSupervisionType] = useState("");
  const [units, setUnits] = useState("");
  const [content, setContent] = useState("");

  const { globalState, globalDispatch } = useContext(Context);

  const fetchMeetingData = async (event) => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    const meetingResponse = await Api.mySupervisions(id);
    setMeetingDate(meetingResponse.data.date);
    setSupervisionType(meetingResponse.data.supervisionType.supervisionType);
    setUnits(meetingResponse.data.units.unit);
    setContent(meetingResponse.data.content)
  };

  useEffect(() => {
    fetchMeetingData();
  }, []);

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
              <Typography variant="span">My Supervisions</Typography>
            </Box>
            <p> Date: {moment.unix(meetingDate).format("MM-DD-YYYY")}</p>
            <p> Meeting Type: {supervisionType}</p>
            <p>Mintues: {units}</p>
            <p>Content: {content}</p>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default MySupervision;
