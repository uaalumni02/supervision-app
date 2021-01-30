import React, { useEffect, useContext } from "react";
import { Grid, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";

import { makeStyles } from "@material-ui/core/styles";
import avatar from "../assets/avatar.png";

import { useHistory } from "react-router-dom";

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
const Supervision = () => {
  const classes = useStyles();

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
    const meetingResponse = await Api.supervision(globalState.userId);
    const supervisions = meetingResponse;

    globalDispatch({
      type: "SET_SUPERVISION_DATA",
      payload: supervisions.data,
    });
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
              <Typography variant="span">My Supervisions</Typography>
            </Box>
            <div className={classes.root}>
              <ul component="nav">
                {globalState.supervisions &&
                  globalState.supervisions.map((meetingData) => (
                    <ul>
                      <a href={"/myMeetings/" + `${meetingData._id}`}>
                        {moment.unix(meetingData.date).format("MM-DD-YYYY") +
                          "--" +
                          meetingData.supervisionType.supervisionType}
                      </a>
                    </ul>
                  ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default Supervision;
