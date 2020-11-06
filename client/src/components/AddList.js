import React, { useState, useContext } from "react";
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
import UserContext from "contexts/UserContext";

const AddList = (props) => {
  const { addListOpen, changeAddListOpen } = props;
  const userId = useContext(UserContext).userId;
  const classes = useStyles();
  // const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [imageUrl, setimageUrl] = useState("");

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file =>{
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        // convert image file to base64 string
        let src = reader.result;
        setimageUrl(src)
      }, false);
      if (file) {
        reader.readAsDataURL(file);
      }
    })
  }

  const addList= async (imageUrl, title)=>{
    const response = await fetch(`/lists?user_id=${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: title, img_url:imageUrl})
    });
    console.log(response)
    handleClose()
  };

  const handleClose = () => {
    changeAddListOpen();
  };
 
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
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
        </Box>
        <Box className={classes.bodyContainer}>
          <Typography className={classes.itemText}>Add a cover</Typography>
          <Box className={classes.imageFieldContainer}>
              <Dropzone
                  onDrop={onDrop}
                  accept="image/*"
                >
                  {({getRootProps, getInputProps, isDragReject, acceptedFiles}) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {acceptedFiles.length==0 
                        ?
                        "click here to upload or drop an image here"
                        :
                        acceptedFiles.map(file =>
                        <p>{file.name}</p>)
                      }
                      {isDragReject && "the file type is not accepted"}
                    </div>
                  )}
            </Dropzone>
          </Box>
        </Box>
        <Box className={classes.addButtonContainer}>
          <Button className={classes.addButton} variant="contained"  onClick={()=> addList(imageUrl, title)}>
            CREATE LIST
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddList;
