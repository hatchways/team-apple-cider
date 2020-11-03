import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Box,
  Button,
  CircularProgress,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import ItemDisplay from "components/ItemDisplay";

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    borderRadius: "0.3rem",
    overflow: "hidden",
  },
  paperTitle: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    margin: theme.spacing(2),
  },
  errorMessage: {
    margin: theme.spacing(4),
  },
  itemDisplay: {
    margin: theme.spacing(4),
  },
  spinner: {
    margin: theme.spacing(8),
  },
  addButton: {
    borderRadius: "10rem",
    padding: theme.spacing(2, 6),
    backgroundColor: "#DF1B1B",
    color: "white",
    margin: theme.spacing(2),
  },
}));

const AddItemPopup = (props) => {
  const { item, popupOpen, closePopup } = props;
  const classes = useStyles();

  return (
    <Modal
      className={classes.popup}
      open={popupOpen}
      onClose={closePopup}
      aria-labelledby="add-item-popup"
      aria-describedby="confirms-adding-item-of-url-to-selected-list"
    >
      <Box className={classes.paper}>
        <Typography className={classes.paperTitle}>Add new item:</Typography>
        {item.error ? (
          <Box className={classes.errorMessage}>{item.response}</Box>
        ) : item.name ? (
          <ItemDisplay item={item} className={classes.itemDisplay} />
        ) : (
          <CircularProgress className={classes.spinner} />
        )}
        <FormControlLabel
          control={<Checkbox name="addToPrivateList" />}
          label="Add To Private list"
        />
        <Button className={classes.addButton}>ADD NEW ITEM</Button>
      </Box>
    </Modal>
  );
};

export default AddItemPopup;