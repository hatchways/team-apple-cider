import React, { useState } from "react";
import Dropzone from 'react-dropzone'
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
  // const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [image, setimage] = useState("");

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles)
    acceptedFiles.forEach(file =>
      setimage(file)
      )
  }

  const addList=(title, file)=>{
    
  }

  const handleClose = () => {
    changeAddListOpen();
  };
 

  // const validations = () => {
  //   const errorsCopy = { ...errors };
  //   errorsCopy.title = title ? "" : "This field is required.";
  //   setErrors({ ...errorsCopy });

  //   return Object.values(errorsCopy).every((field) => field === "");
  // };

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   if (validations()) {
  //     fetch("route", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title: title,
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then(function (response) {
  //         if (response.status === "success") {
  //           console.log("Success:");
  //         } else {
  //           window.alert(response.message); // Replace with snackbar.
  //           console.log(response.message);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   }
  // };

  return (
    <Modal
      className={classes.popup}
      open={addListOpen}
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
              // error={Boolean(errors.title)}
              // helperText={errors.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
        </Box>
        <Box className={classes.bodyContainer}>
          <Typography className={classes.itemText}>Add a cover</Typography>
          <Box className={classes.imageFieldContainer}>
            {/* <Typography>Drop an image here or </Typography> */}
            <Typography>
              <Dropzone
                  onDrop={onDrop}
                  accept="image/*"
                >
                  {({getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles}) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!isDragActive && 'Click here or drop a file to upload!'}
                      {isDragActive && !isDragReject && "Drop a image here"}
                      {isDragReject && "File type not accepted, sorry!"}
                      <div>
                        {acceptedFiles.length!==0 
                        && 
                        acceptedFiles.map(file =>
                         file.name)}
                      </div>
                    </div>
                  )}
            </Dropzone>
            </Typography>
          </Box>
        </Box>
        <Box className={classes.addButtonContainer}>
          <Button className={classes.addButton} variant="contained"  onClick={addList}>
            CREATE LIST
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddList;
