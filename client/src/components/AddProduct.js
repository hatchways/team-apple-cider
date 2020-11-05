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
import useStyles from "../styles/AddProductStyles";

const AddProduct = (props) => {
  const {
    listTitle,
    listOpen,
    changeListOpen,
    addProductOpen,
    changeAddProductOpen,
    lists,
  } = props;
  const classes = useStyles();
  const [url, setUrl] = useState("");
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
    errorsCopy.url = url ? "" : "This field is required.";
    setErrors({ ...errorsCopy });

    return Object.values(errorsCopy).every((field) => field === "");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (validations()) {
      fetch("/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
        }),
      })
        .then((response) => response.json())
        .then(function (response) {
          if (response.status === "success") {
            console.log("Success on scraping!");
          } else {
            console.log(response.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      fetch(`/list-to-products/${list.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: item.product_id,
        }),
      })
        .then((response) => response.json())
        .then(function (response) {
          if (response.status === "success") {
            console.log("Success:");
          } else {
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
            error={Boolean(errors.url)}
            helperText={errors.url}
            onChange={(e) => setUrl(e.target.value)}
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
              {lists.map((list, i) => (
                <MenuItem key={i} value={list.name}>
                  {list.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.addButtonContainer}>
          <Button
            className={classes.addButton}
            variant="contained"
            onClick={handleClick}
          >
            ADD ITEM
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddProduct;
