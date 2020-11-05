import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import ItemDisplay from "components/ItemDisplay";
import ListContext from "../contexts/ListContext";

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
  const { item, popupOpen, closePopup, listId } = props;
  const classes = useStyles();
  const listToggle = useContext(ListContext).listToggle;

  const addProductToList = async () => {
    
    const res = await fetch(`/list-to-products/${listId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: item.product_id }),
    });
    const json = await res.json();
    
    return json;
  };

  const addButtonClick = () => {
    addProductToList();
    closePopup();
    listToggle();
  };

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
          <>
            <ItemDisplay item={item} className={classes.itemDisplay} />,
            <Button onClick={addButtonClick} className={classes.addButton}>
              ADD NEW ITEM
            </Button>
          </>
        ) : (
          <CircularProgress className={classes.spinner} />
        )}
      </Box>
    </Modal>
  );
};

export default AddItemPopup;
