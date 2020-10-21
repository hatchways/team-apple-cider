import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Box, Button } from "@material-ui/core";
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
    padding: theme.spacing(2, 4, 3),
    borderRadius: "0.3rem",
    overflow: "hidden",
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
  const { item, popupOpen, setPopupOpen } = props;
  const classes = useStyles();
  const handleClose = () => {
    setPopupOpen(false);
  };

  return (
    <Modal
      className={classes.popup}
      open={popupOpen}
      onClose={handleClose}
      aria-labelledby="add-item-popup"
      aria-describedby="confirms-adding-item-of-url-to-selected-list"
    >
      <Box className={classes.paper}>
        <h2 className={classes.paperTitle}>Add new item:</h2>
        {item.title ? <ItemDisplay item={item} /> : <div>Loading...</div>}
        <Button className={classes.addButton}>ADD NEW ITEM</Button>
      </Box>
    </Modal>
  );
};

export default AddItemPopup;
