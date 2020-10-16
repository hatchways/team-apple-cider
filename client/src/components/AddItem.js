import React, { useState } from "react";
import {
  Box,
  Typography,
  Input,
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
    margin: "4rem",
  },
  addNewItemTitle: {
    fontWeight: "500",
  },
  addItemInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    margin: "3rem",
    overflow: "hidden",
    padding: "0.5rem",
    borderRadius: "10rem",
    boxShadow: "0 0 0.5rem 1px #eee",
  },
  addButton: {
    borderRadius: "10rem",
    backgroundColor: "#DF1B1B",
    color: "white",
    width: "8rem",
    height: "3rem",
  },
  linkForm: {
    padding: "0.2rem 12rem 0.2rem 0",
    margin: "0 1.5rem",
    borderRight: "1px solid #eee",
  },
  dropdownList: {
    width: "7rem",
    marginRight: "5rem",
  },
}));

const demoListArray = ["clothes", "furniture", "luxury"];

const AddItem = () => {
  const [selectedItem, setSelectedItem] = useState("none");
  const classes = useStyles();
  return (
    <Box className={classes.dashboardAddItem}>
      <Typography variant="h5" className={classes.addNewItemTitle}>
        Add new item:
      </Typography>
      <Box className={classes.addItemInput}>
        <Input
          placeholder="Paste your link here"
          disableUnderline
          className={classes.linkForm}
        />
        <Select
          className={classes.dropdownList}
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          disableUnderline
        >
          <MenuItem value="none" disabled>
            Select List
          </MenuItem>
          {demoListArray.map((el) => (
            <MenuItem value={el}>{el}</MenuItem>
          ))}
        </Select>
        <Button className={classes.addButton} variant="contained">
          ADD
        </Button>
      </Box>
    </Box>
  );
};

export default AddItem;
