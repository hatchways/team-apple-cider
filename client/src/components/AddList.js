import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Modal,
  IconButton,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../styles/AddListStyles";

const AddList = (props) => {
  const { addListOpen, changeAddListOpen } = props;
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");

  const handleClose = () => {
    changeAddListOpen();
  };

  const validations = () => {
    const errorsCopy = { ...errors };
    errorsCopy.title = title ? "" : "This field is required.";
    setErrors({ ...errorsCopy });

    return Object.values(errorsCopy).every((field) => field === "");
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (validations()) {
      fetch("route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          //'cover': cover
        }),
      })
        .then((response) => response.json())
        .then(function (response) {
          if (response.status === "success") {
            console.log("Success:");
          } else {
            window.alert(response.message); // Replace with snackbar.
            console.log(response.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <Modal
      className={classes.popup}
      open={addListOpen}
      onClose={handleClose}
      aria-labelledby="add-list"
      aria-describedby="confirms-adding-a-new-list"
    >
      <Box className={classes.paper}>
        <Box className={classes.closeButtonContainer}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box className={classes.titleContainer}>
          <Typography className={classes.titleText}>Create new list</Typography>
        </Box>
        <Box className={classes.bodyContainer}>
          <Typography className={classes.itemText}>Add a title</Typography>
          <Box className={classes.textFieldContainer}>
            <TextField
              className={classes.textField}
              variant="outlined"
              placeholder="Enter name" // Placeholder needs to be centered.
              fullWidth
              type="text"
              error={!!errors.title}
              helperText={errors.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
        </Box>
        <Box className={classes.bodyContainer}>
          <Typography className={classes.itemText}>Add a cover</Typography>
          <Box className={classes.imageFieldContainer}>
            <Typography>Drop an image here or </Typography>
            <Typography>
              <input
                accept="image/*"
                className={classes.input}
                id="file-input"
                multiple
                type="file"
              />
              <label htmlFor="file-input" className={classes.imageFieldText}>
                select a file
              </label>
            </Typography>
          </Box>
        </Box>
        <Box className={classes.addButtonContainer}>
          <Button className={classes.addButton} variant="contained">
            CREATE LIST
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddList;
