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
  },
  paperTitle: {
    textAlign: "center",
  },
  paperText: {
    textAlign: "center",
  },
  paperImage: {
    height: "5rem",
    width: "5rem",
  },
  paperTextContainer: {},
}));

const AddItemModal = (props) => {
  const { modalOpen, setModalOpen } = props;
  const classes = useStyles();
  const handleClose = () => {
    setModalOpen(false);
  };

  const demoItem = {
    amazonURL: "https://www.amazon.com/dp/B08L5PTDTK",
    title: "iPhone",
    oldPrice: "$1299",
    price: "$999",
    imgURL:
      "https://www.three.co.uk/static/images/device_pages/MobileVersion/Apple/iPhone_SE_2020/Black/carousel/2.jpg",
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
