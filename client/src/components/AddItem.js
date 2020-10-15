import React from "react";
import {
  Container,
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
    padding: "2rem",
  },
  addItemInput: {
    display: "flex",
    margin: "2rem",
    flexDirection: "row",
    justifyContent: "center",
  },
  addButton: {
    borderRadius: "10rem",
    backgroundColor: "#DF1B1B",
    color: "white",
    width: "8rem",
  },
}));

const AddItem = () => {
  const classes = useStyles();
  return (
    <Container className={classes.dashboardAddItem}>
      <Typography variant="h4">Add new item:</Typography>
      <Container className={classes.addItemInput}>
        <TextField label="Please enter your link here" />
        <Select>
          <MenuItem value={"clothes"}>Clothes</MenuItem>
          <MenuItem value={"furniture"}>Furniture</MenuItem>
          <MenuItem value={"luxury"}>Luxury</MenuItem>
        </Select>
        <Button className={classes.addButton} variant="contained">
          ADD
        </Button>
      </Container>
    </Container>
  );
};

export default AddItem;
