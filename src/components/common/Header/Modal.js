import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Api from "../../../data/api";
import { Redirect } from "react-router-dom";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  deleteButton: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    left: 210,
    bottom: 37,
  },
}));

const SimpleModal = () => {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteMeeting = async () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    const deleteResponse = await Api.deleteSupervisions(id);
    if (deleteResponse.success) {
      setDeleteSuccess(true);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-title">Confirm Delete</p>
      <Button
        style={{ maxWidth: "130px", minHeight: "40px" }}
        variant="contained"
        className={classes.deleteButton}
        onClick={deleteMeeting}
      >
        Delete
      </Button>
      <br></br>
      <a href={"/supervision/"}>return my supervions</a>
    </div>
  );

  return (
    <div>
      {deleteSuccess ? <Redirect to="/supervision/" /> : ""}
      <Button
        style={{ maxWidth: "130px", minHeight: "40px" }}
        variant="contained"
        className={classes.deleteButton}
        onClick={handleOpen}
      >
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
export default SimpleModal;
