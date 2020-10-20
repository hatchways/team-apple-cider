import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Box } from "@material-ui/core";
import ItemDisplay from "components/ItemDisplay";

const useStyles = makeStyles((theme) => ({
  modal: {
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
}));

const AddItemModal = (props) => {
  const { modalOpen, setModalOpen } = props;
  const classes = useStyles();
  const handleClose = () => {
    setModalOpen(false);
  };

  const demoItem = {
    shopURL:
      "https://www.amazon.com/Apple-iPhone-Graphite-Carrier-Subscription/dp/B08L5PTDTK/ref=sr_1_3?dchild=1&keywords=New+Apple+iPhone+12+Pro&qid=1603196512&sr=8-3",
    title:
      "New Apple iPhone 12 Pro (128GB, Graphite) [Locked] + Carrier Subscription",
    oldPrice: "$1299",
    price: "$999",
    imgURL: "https://m.media-amazon.com/images/I/71YlH-4MUQL.jpg",
  };

  return (
    <Modal
      className={classes.modal}
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.paper}>
        <h2 className={classes.paperTitle}>Add new item:</h2>
        <ItemDisplay item={demoItem} />
      </Box>
    </Modal>
  );
};

export default AddItemModal;
