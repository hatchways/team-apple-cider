import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Modal, IconButton, Typography, Button, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.2rem'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(10,10,10,0.1)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(1,1,1)',
      outline: '1px solid slategrey'
    }
  },
  popup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    display: "flex",
    //display:'block',
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    //backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    //padding: theme.spacing(1, 1, 3),
    borderRadius: "0.3rem",
    overflow: "hidden",
    outline: "none",
    minWidth:"30rem",
    maxHeight: "41rem",
    height:'75%',
  },
  addButton: {
    borderRadius: "10rem",
    padding: theme.spacing(2, 6),
    backgroundColor: "#DF1B1B",
    color: "white",
    margin: theme.spacing(2),
    width: "11rem",
    height: "3.5rem",
    fontSize: "0.8rem"
  },
  titleContainer: {
    display: "flex",
    //padding: theme.spacing(0, 0, 3),
    maxHeight:"3rem"
  },
  closeButtonContainer: {
    textAlign: "right",
    width: "100%"
  },
  titleText: {
    fontSize: "1.3rem",
    fontWeight: "500",
    letterSpacing:"1px"
  },
  itemText:{
    fontSize: "0.8rem",
    fontWeight: "400",
    letterSpacing:"0.5px"
  },
  productCard: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "30rem"
  },
  removeButtonContainer:{
    display: "flex",
    alignItems:"center",
    justifyContent:"center",
  },
  removeButton:{
    display: "flex",
    alignItems:"center",
    justifyContent:"center",
    borderRadius: "10rem",
    height:"3rem",
  },
  addButtonContainer:{
    display: "flex",
    justifyContent:"center",
    margin:theme.spacing(3,0,2)
  },
  bodyContainer:{
    minWidth:"30rem",
    maxHeight: "29rem",
    overflow:"hidden",
    display:"flex",
    justifyContent:"center"
  },
  bodyContent:{
    minWidth:"30rem",
    maxHeight: "30rem",
    overflow:"scroll",
    overflowX:"hidden",
  },
  textFieldContainer:{
    display:"flex",
    justifyContent:"center",
    width:"80%"
  },
  centerText:{
    textAlign:"center"
  },
  imageFieldContainer:{
    display:"flex",
  },
  input: {
    display:'none'
  },
}));

const AddList = (props) => {
    const {addListOpen, setAddListOpen} = props;
    const classes = useStyles()
    const [errors, setErrors]=useState({});
    const [title, setTitle]=useState('');

    const handleClose = () => {
        setAddListOpen(false);
    }

    const validations = () => {
        const errorsCopy = {...errors};
        errorsCopy.title = title ? "" : "This field is required.";
        setErrors({ ...errorsCopy });

        return Object.values(errorsCopy).every(field => field === "");
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (validations()) {
            fetch("route", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'title': title,
                    //'cover': cover
                })})
                .then(response => response.json())
                .then(function(response) {
                    if (response.status === 'success') {
                        console.log('Success:');
                    }
                    else {
                        window.alert(response.message); // Replace with snackbar.
                        console.log(response.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
            }
    }

    return (
        <Modal
        className={classes.popup}
        open={addListOpen}
        onClose={handleClose}
        aria-labelledby="add-list"
        aria-describedby="confirms-adding-item-of-url-to-selected-list"
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
            <Typography><h2 className={classes.titleText}>Create new list</h2></Typography>
          </Box>
          <Box className={classes.bodyContainer}>
            <Typography><h4 className={classes.itemText}>Add a title</h4></Typography>
          </Box>
          <Box className={classes.textFieldContainer}>
            <TextField
              className={classes.textField}
              variant="outlined"
              placeholder="Enter name" // Placeholder needs to be centered.
              fullWidth
              type="text"
              error={!!errors.title}
              helperText={errors.title}
              onChange={(e)=>setTitle(e.target.value)}/>
          </Box>
          <Box className={classes.bodyContainer}>
            <Typography><h4 className={classes.itemText}>Add a cover</h4></Typography>
          </Box>
          <Box className={classes.imageFieldContainer}>
            <Typography>Drop an image here or <strong><u><input
              accept="image/*"
              className={classes.input}
              id="file-input"
              multiple
              type="file"
              />
            <label htmlFor="file-input">
              select a file
            </label></u></strong></Typography>
          </Box>
          <Box className={classes.addButtonContainer}>
            <Button className={classes.addButton} variant="contained">CREATE LIST</Button>
          </Box>
        </Box>
        </Modal>
    );
};

export default AddList;
