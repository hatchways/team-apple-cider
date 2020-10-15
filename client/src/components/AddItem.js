import React from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import "css/AddItem.css";

const useStyles = makeStyles((theme) => ({
  //
}));

const AddItem = () => {
  const classes = useStyles();
  return (
    <div className="dashboard-add-item">
      <Typography variant="h4">Add new item:</Typography>
      <div className="add-item-input">
        <TextField label="Please enter your link here" />
        <Select>
          <MenuItem value={"clothes"}>Clothes</MenuItem>
          <MenuItem value={"furniture"}>Furniture</MenuItem>
          <MenuItem value={"luxury"}>Luxury</MenuItem>
        </Select>
        <Button variant="contained">Default</Button>
      </div>
    </div>
  );
};

export default AddItem;
