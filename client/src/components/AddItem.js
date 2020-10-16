import React, { useState } from "react";
import {
  Box,
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
    margin: "2rem",
  },
  addItemInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    margin: "2rem",
    padding: "1rem",
    borderRadius: "10rem",
  },
  addButton: {
    borderRadius: "10rem",
    backgroundColor: "#DF1B1B",
    color: "white",
    width: "8rem",
  },
  linkForm: {
    width: "20rem",
  },
  dropdownList: {
    width: "10rem",
  },
}));

const AddItem = () => {
  const [selectedItem, setSelectedItem] = useState("none");
  const classes = useStyles();
  return (
    <Box className={classes.dashboardAddItem}>
      <Typography variant="h4">Add new item:</Typography>
      <Box className={classes.addItemInput}>
        <TextField className={classes.linkForm} label="Paste your link here" />
        <Select
          className={classes.dropdownList}
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <MenuItem value="none" disabled>
            Select List
          </MenuItem>
          <MenuItem value={"clothes"}>Clothes</MenuItem>
          <MenuItem value={"furniture"}>Furniture</MenuItem>
          <MenuItem value={"luxury"}>Luxury</MenuItem>
        </Select>
        <Button className={classes.addButton} variant="contained">
          ADD
        </Button>
      </Box>
    </Box>
  );
};

export default AddItem;
