import React, { useState } from "react";
import { Grid, Box } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

const RequestToken = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [responseSuccess, setResponseSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resetResponse = await Api.resetToken(email);
    if (!resetResponse.success) {
      setError(resetResponse.message);
      return false;
    } else {
      setResponseSuccess(resetResponse.message);
      return true;
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
              <Typography variant="span">Reset Password</Typography>
            </Box>
            <form>
              <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  aria-aria-describedby="email-helper-text"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormHelperText id="email-helper-text">
                  Enter your email
                </FormHelperText>
              </FormControl>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="body2" color="error">
                  {error}
                  {responseSuccess}
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
                  Reset
                </Button>
              </FormControl>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default RequestToken;
