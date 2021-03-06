import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Select,
  ListItemText,
  Checkbox,
  Chip,
} from "@material-ui/core";

import { Redirect } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import MenuItem from "@material-ui/core/MenuItem";

import Avatar from "@material-ui/core/Avatar";

import Api from "../data/api";

import { FormControl, InputLabel, FormHelperText } from "@material-ui/core";

import Context from "../store/context";

import { makeStyles } from "@material-ui/core/styles";
import avatar from "../assets/avatar.png";

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

const Meeting = () => {
  const [supervisionType, setSupervisionType] = useState([]);
  const [units, setUnits] = useState([]);
  const [numberOfAttendees, setNumberOfAttendees] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [attendees, setAttendees] = useState([]);

  const [supervisionTypeId, setSupervisionTypeId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [attendeeId, setAttendeeId] = useState([]);

  const [meetingSuccess, setMeetingSuccess] = useState(false);
  const [error, setError] = useState("");
  const { globalState, globalDispatch } = useContext(Context);

  const fetchSupervisionUnitData = async (event) => {
    const supervisionUnitResponse = await Api.supervisionUnits();
    setSupervisionType(supervisionUnitResponse.supervision);
    setUnits(supervisionUnitResponse.units);
  };

  const fetchUser = async () => {
    const userResponse = await Api.userData();
    setAttendees(userResponse.data);
  };

  useEffect(() => {
    fetchSupervisionUnitData();
    fetchUser();
  }, []);

  const setAttendeesOnChange = (e) => {
    const selectedValues = e.target.value;
    const attendeeNumber = selectedValues.length;
    setNumberOfAttendees(attendeeNumber);
    setAttendeeId(selectedValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const meetingResponse = await Api.submitMeetingData({
      numberOfAttendees,
      date,
      content,
      attendees: attendeeId,
      units: unitId,
      supervisionType: supervisionTypeId,
      creator: globalState.userId,
    });
    if (meetingResponse.success) {
      setMeetingSuccess(true);
    } else {
      setError(meetingResponse.message);
    }
  };

  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.grid}
      spacing={0}
      direction="column"
      alignItems="center"
    >
      {meetingSuccess ? <Redirect to="/supervision/" /> : ""}
      <Grid item xs={12} md={12}>
      <h3>{error}</h3>
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
              <Typography variant="span">Meeting Information</Typography>
            </Box>
            <form>
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <RadioGroup row aria-label="position" defaultValue="top">
                  {supervisionType.map((supervision) => {
                    return (
                      <FormControlLabel
                        key={supervision._id}
                        value={supervision._id}
                        control={<Radio color="primary" />}
                        label={supervision.supervisionType}
                        labelPlacement="start"
                        name="supervision"
                        onChange={(e) => {
                          setSupervisionTypeId(e.target.value);
                        }}
                      />
                    );
                  })}
                </RadioGroup>
                <FormHelperText>Select supervision type</FormHelperText>
              </FormControl>
            </form>

            <form>
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                >
                  {units.map((supervisionUnit) => {
                    return (
                      <FormControlLabel
                        key={supervisionType._id}
                        value={supervisionUnit._id}
                        control={<Radio color="primary" />}
                        label={supervisionUnit.unit}
                        labelPlacement="start"
                        onChange={(e) => {
                          setUnitId(e.target.value);
                        }}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <form>
                <FormControl>
                  <InputLabel>Attendees</InputLabel>
                  <Select
                    value={attendeeId}
                    multiple
                    displayEmpty
                    onChange={setAttendeesOnChange}
                    renderValue={(selected) => {
                      return (
                        <div>
                          {selected.map((id) => {
                            const selectedAttendee = attendees.find(
                              (person) => {
                                return person._id === id;
                              }
                            );

                            return (
                              <Chip
                                key={selectedAttendee._id}
                                label={`${selectedAttendee.firstName} ${selectedAttendee.lastName}`}
                              ></Chip>
                            );
                          })}
                        </div>
                      );
                    }}
                  >
                    {attendees.map((person) => {
                      return (
                        <MenuItem key={person._id} value={person._id}>
                          <Checkbox checked={attendeeId.includes(person._id)} />
                          <ListItemText primary={person.firstName} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>Select the session attendees</FormHelperText>
                </FormControl>
              </form>
              <br></br>

              <form className={classes.container} noValidate>
                <TextField
                  id="datetime-local"
                  label="Date & Time"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setDate(e.target.value)}
                />
              </form>
              <br></br>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={10}
                variant="outlined"
                onChange={(e) => setContent(e.target.value)}
              />

              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="body2" color="error"></Typography>
              </Box>

              <FormControl margin="normal">
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.form.loginButton}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </FormControl>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default Meeting;
