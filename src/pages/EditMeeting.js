import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import {
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

import Api from "../data/api";

import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { FormControl, InputLabel, FormHelperText } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import avatar from "../assets/avatar.png";
import Context from "../store/context";

import { makeStyles } from "@material-ui/core/styles";

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
const EditMeeting = () => {
  const [supervisionType, setSupervisionType] = useState([]);
  const [units, setUnits] = useState([]);
  const [attendees, setAttendees] = useState([]); // List of all users
  const [attendeeId, setAttendeeId] = useState([]); // List of IDs all users who attended a meeting
  const [numberOfAttendees, setNumberOfAttendees] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [unitId, setUnitId] = useState("");
  const [supervisionTypeId, setSupervisionTypeId] = useState("");
  const [meetingSuccess, setMeetingSuccess] = useState(false);

  const [defaultContent, setDefaultContent] = useState("");
  const [defaultAttendees, setDefaultAttendees] = useState("");

  const classes = useStyles();

  const { globalState, globalDispatch } = useContext(Context);

  const fetchMeetingToEdit = async (event) => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    const meetingToEdit = await Api.mySupervisions(id);


    setDate(meetingToEdit.data.date);
    setDefaultContent(meetingToEdit.data.content);
    setSupervisionTypeId(meetingToEdit.data.supervisionType._id);
    setUnitId(meetingToEdit.data.units._id);

    setAllDefaultAttendees(meetingToEdit.data.attendees)
  };

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
    fetchMeetingToEdit();
    fetchSupervisionUnitData();
    fetchUser();
  }, []);

  const setAllDefaultAttendees = (listOfAttendees) => {
                            // attendeeId - Array of ids of the attendees of a meeting, default value for select
                          // attendees - array containing data of all users

    setNumberOfAttendees(listOfAttendees.length);
    const attendeesIDs = listOfAttendees.map(att => att._id )
    setAttendeeId(attendeesIDs)
  }

  const setAttendeesOnChange = (e) => {
    const selectedValues = e.target.value;
    const attendeeNumber = selectedValues.length;
    setNumberOfAttendees(attendeeNumber);
    setAttendeeId(selectedValues);
  };

  const handleSubmit = async (event) => {
    // const url = window.location.pathname;
    // const id = url.substring(url.lastIndexOf("/") + 1);
    //hard coding Id
    event.preventDefault();
    const editMeetingResponse = await Api.editMeetingData({
      numberOfAttendees,
      date,
      content,
      attendees: attendeeId,
      units: unitId,
      supervisionType: supervisionTypeId,
      creator: globalState.userId,
    });
    setMeetingSuccess(true);
    console.log(editMeetingResponse)
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
              <Typography variant="span">Edit Meeting</Typography>
            </Box>
            <form>
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  defaultValue="top"
                  value={supervisionTypeId}
                >
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
              </FormControl>
            </form>

            <form>
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  defaultValue="top"
                  value={unitId}
                >
                  {units.map((supervisionUnit) => {
                    return (
                      <FormControlLabel
                        key={supervisionUnit._id}
                        value={supervisionUnit._id}
                        control={<Radio color="primary" />}
                        label={supervisionUnit.unit}
                        labelPlacement="start"
                        name="supervisionUnit"
                        onChange={(e) => {
                          setUnitId(e.target.value);
                        }}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </form>

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
                          const selectedAttendee = attendees.find((person) => {
                            return person._id === id;
                          });
  
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
                value={moment.unix(date).format("YYYY-MM-DDThh:mm")}
                onChange={(e) => {
                  const a = moment(e.target.value, 'YYYY-MM-DDThh:mm').unix()
                  console.log(a)
                  setDate(a)
                }}
              />
            </form>
            <br></br>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={10}
              variant="outlined"
              defaultValue={defaultContent}
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
                Edit
              </Button>
            </FormControl>
            {/* </form> */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default EditMeeting;
