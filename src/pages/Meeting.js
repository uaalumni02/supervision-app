import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Box,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  TextareaAutosize,
  Select,
  ListItemText,
  Checkbox,
  Chip
} from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import MenuItem from "@material-ui/core/MenuItem";

import Avatar from "@material-ui/core/Avatar";

import Api from "../data/api";

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

  const { globalState, globalDispatch } = useContext(Context);

  const fetchSupervisionUnitData = async (event) => {
    const supervisionUnitResponse = await Api.supervisionUnits();
    setSupervisionType(supervisionUnitResponse.supervision);
    setUnits(supervisionUnitResponse.units);
  };

  const fetchUser = async () => {
    const userResponse = await Api.userData();
    console.log(userResponse.data)
    console.log('user res', userResponse)
    setAttendees(userResponse.data);

  };

  useEffect(() => {
    fetchSupervisionUnitData();
    fetchUser();
  }, []);


  const setAttendeesOnChange = (e) => {
    const selectedValues = e.target.value;

    console.log('list of attend selected', selectedValues)
    setAttendeeId(selectedValues)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const meetingResponse = await Api.submitMeetingData({
      numberOfAttendees,
      date,
      content,
      attendees: globalState.userId,
      units: unitId,
      supervisionType: supervisionTypeId,
    });
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
              </FormControl>
            </form>

         
              <FormControl>
                <InputLabel>
                  Attendees
                </InputLabel>
                <Select
                  value={attendeeId}
                  multiple
                  displayEmpty
                  onChange={setAttendeesOnChange}
                  renderValue={(selected) => {
                    console.log('curr', selected)
                    return (
                      <div>
                       {selected.map(id => {
                         const selectedAttendee = attendees.find(person => {
                           return person._id === id
                         })

                         return (<Chip key={selectedAttendee._id} label={`${selectedAttendee.firstName} ${selectedAttendee.lastName}`}></Chip>)
                       })}
                      </div>
                    )
                  }}
                >
                  {attendees.map((person) => {
                    console.log('current to populate', person)
                    return (
                      <MenuItem key={person._id} value={person._id}>
                
                         {/* <Checkbox checked={personName.indexOf(name) > -1} /> */}
                         <Checkbox checked={attendeeId.includes(person._id)} />
                        <ListItemText primary={person.firstName} /> 
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Select the session attendees</FormHelperText>
              </FormControl>
        

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

              <form noValidate autoComplete="off">
                <TextField
                  id="standard-basic"
                  label="Number of Attendees"
                  onChange={(e) => setNumberOfAttendees(e.target.value)}
                />
              </form>
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
              <TextareaAutosize
                rowsMax={4}
                aria-label="maximum height"
                placeholder="Maximum 4 rows"
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
