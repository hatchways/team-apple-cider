import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Modal,
  IconButton,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.2rem",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(10,10,10,0.1)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(1,1,1)",
      outline: "1px solid slategrey",
    },
  },
  popup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "0.3rem",
    overflow: "hidden",
    outline: "none",
    minWidth: "30rem",
    maxHeight: "41rem",
    height: "75%",
  },
  addButton: {
    borderRadius: "10rem",
    padding: theme.spacing(2, 6),
    backgroundColor: "#DF1B1B",
    color: "white",
    margin: theme.spacing(2),
    width: "11rem",
    height: "3.5rem",
    fontSize: "0.8rem",
  },
  titleContainer: {
    display: "flex",
    maxHeight: "3rem",
  },
  closeButtonContainer: {
    textAlign: "right",
    width: "100%",
  },
  titleText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  itemText: {
    fontSize: "0.8rem",
    fontWeight: "400",
    letterSpacing: "0.5px",
  },
  productCard: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "30rem",
  },
  removeButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  removeButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10rem",
    height: "3rem",
  },
  addButtonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(3, 0, 2),
  },
  bodyContainer: {
    minWidth: "30rem",
    maxHeight: "29rem",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
  },
  bodyContent: {
    minWidth: "30rem",
    maxHeight: "30rem",
    overflow: "scroll",
    overflowX: "hidden",
  },
  textFieldContainer: {
    display: "flex",
    justifyContent: "center",
    width: "80%",
    backgroundColor: "white",
  },
  centerText: {
    textAlign: "center",
  },
  imageFieldContainer: {
    display: "flex",
    backgroundColor: "white",
    width: "35%",
    height: "0",
    paddingBottom: "35%",
  },
  selectListInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    margin: "3rem",
    overflow: "hidden",
    height: "4rem",
    padding: "0 0.5rem",
    boxShadow: "0 0 0.5rem 1px #eee",
    width: "80%",
  },
}));

const AddList = (props) => {
  const {
    listTitle,
    listOpen,
    changeListOpen,
    addProductOpen,
    changeAddProductOpen,
    demoListsArray,
  } = props;
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [list, setList] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setList(event.target.value);
  };

  const handleClose = () => {
    changeAddProductOpen();
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
      open={addProductOpen}
      onClose={handleClose}
      aria-labelledby="add-product"
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
          <Typography className={classes.titleText}>Add new item:</Typography>
        </Box>
        <Box className={classes.bodyContainer}>
          <Typography className={classes.itemText}>
            Paste link to item:
          </Typography>
        </Box>
        <Box className={classes.textFieldContainer}>
          <TextField
            className={classes.textField}
            variant="outlined"
            placeholder="Paste your link here" // Placeholder needs to be centered.
            fullWidth
            type="text"
            error={!!errors.title}
            helperText={errors.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box className={classes.bodyContainer}>
          <Typography className={classes.itemText}>Select list</Typography>
        </Box>
        <Box className={classes.selectListInput}>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.formControl}
          >
            <InputLabel id="select-list-label">Select</InputLabel>
            <Select
              id="select-list"
              value={list}
              onChange={handleChange}
              label="List"
            >
              {demoListsArray.map((list, i) => (
                <MenuItem key={i} value={list.listTitle}>
                  {list.listTitle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.addButtonContainer}>
          <Button className={classes.addButton} variant="contained">
            ADD ITEM
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddList;
