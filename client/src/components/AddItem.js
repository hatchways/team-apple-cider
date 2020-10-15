import React from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dashboardAddItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  addItemInput: {
    display: "flex",
    flexDirection: "row",
  },
}));

const AddItem = () => {
  const classes = useStyles();
  return (
    <div className={classes.dashboardAddItem}>
      <Typography variant="h4">Add new item:</Typography>
      <div className={classes.addItemInput}>
        <TextField label="Please enter your link here" />
        <Select>
          <MenuItem value={"clothes"}>Clothes</MenuItem>
          <MenuItem value={"furniture"}>Furniture</MenuItem>
          <MenuItem value={"luxury"}>Luxury</MenuItem>
        </Select>
        <Button className={classes.addButton} variant="contained">
          Default
        </Button>
      </div>
    </div>
  );
};

export default AddItem;
