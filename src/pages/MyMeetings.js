import React, { useEffect, useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Grid, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import { makeStyles } from "@material-ui/core/styles";
import avatar from "../assets/avatar.png";

import Api from "../data/api";

import Context from "../store/context";
import * as moment from "moment";

import "../static/myMeeting.css";

import Modal from "../components/common/Header/Modal";

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
    signButton: {
      backgroundColor: "#3f51b5",
      color: "#fff",
    },
    deleteButton: {
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
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    textTransform: "none",
  },
}));
const MySupervision = () => {
  const classes = useStyles();
  const [meetingDate, setMeetingDate] = useState("");
  const [supervisionType, setSupervisionType] = useState("");
  const [units, setUnits] = useState("");
  const [content, setContent] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [userAttended, setUserAttended] = useState(false);
  const [userId, setUserId] = useState("");
  const [noteSigned, setNoteSigned] = useState(false);
  const { globalState, globalDispatch } = useContext(Context);

  const [noteSignedFirstName, setNoteSignedFirstName] = useState([]);
  const [noteSignedLastName, setNoteSignedLastName] = useState("");
  const [signedUsers, setSignedUsers] = useState([]);

  const [error, setError] = useState("");

  const [creator, setCreator] = useState(false);

  const history = useHistory();

  const fetchMeetingData = async (event) => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    const meetingResponse = await Api.mySupervisions(id);
    if (!meetingResponse.success) {
      setError(meetingResponse.message);
      return false;
    }
    setAttendees(meetingResponse.data.attendees);
    setMeetingDate(meetingResponse.data.date);
    setSupervisionType(meetingResponse.data.supervisionType.supervisionType);
    setUnits(meetingResponse.data.units.unit);
    setContent(meetingResponse.data.content);
    setUserId(globalState.userId);
    for (let i = 0; i < meetingResponse.data.attendees.length; i++) {
      if (meetingResponse.data.attendees[i]._id === globalState.userId) {
        setUserAttended(true);
      }
    }
    if (meetingResponse.data.creator._id === globalState.userId) {
      setCreator(true);
    }
  };

  useEffect(() => {
    signedNoteData();
    fetchMeetingData();
  }, []);

  const signNote = async () => {
    const url = window.location.pathname;
    const meetingId = url.substring(url.lastIndexOf("/") + 1);
    const signatureResponse = await Api.submitSignatureData(meetingId, userId);
    if (signatureResponse) {
      window.location.href = window.location.href;
    }
  };

  const signedNoteData = async (event) => {
    const url = window.location.pathname;
    const meetingId = url.substring(url.lastIndexOf("/") + 1);
    const signedNoteResponse = await Api.getSignedNoteData();

    const signUsers = [];
    for (let i = 0; i < signedNoteResponse.data.length; i++) {
      const firstAndLastName = `${signedNoteResponse.data[i].userId.firstName} ${signedNoteResponse.data[i].userId.lastName}`;

      if (
        globalState.userId === signedNoteResponse.data[i].userId._id &&
        meetingId == signedNoteResponse.data[i].meetingId._id
      ) {
        setNoteSigned(true);
      }

      signUsers.push(firstAndLastName);
    }

    setSignedUsers(signUsers);
  };

  const editMeeting = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    history.push("/edit/" + id);
  };

  return (
    <Grid
      container
      className={classes.grid}
      spacing={0}
      direction="column"
      alignItems="center"
    >
      <h1>{error}</h1>
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
            <br></br>
            <p> Date: {moment.unix(meetingDate).format("MM-DD-YYYY")}</p>
            <p> Meeting Type: {supervisionType}</p>
            <p>Mintues: {units}</p>
            <p>Content: {content}</p>

            <p> Attendee(s): </p>
            {attendees.map((names) => (
              <p>
                {names.firstName} {names.lastName},
              </p>
            ))}

            <p> Signed: </p>
            {signedUsers.map((sign) => (
              <p className="signature">{sign}</p>
            ))}
            <p>
              {/* Signed:{" "}
              <p className="signature">
                {" "}
                {signedUsers.join(', ')}
              </p> */}
            </p>
            <div>
              {!noteSigned ? (
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.form.signButton}
                  onClick={signNote}
                >
                  Sign
                </Button>
              ) : null}
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              {creator ? (
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.form.signButton}
                  onClick={editMeeting}
                >
                  Edit
                </Button>
              ) : null}
            </div>
            {creator ? <Modal /> : null}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default MySupervision;
