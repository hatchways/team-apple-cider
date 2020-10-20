import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
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
}));

const AddItemModal = (props) => {
  const { modalOpen, setModalOpen } = props;
  const classes = useStyles();
  const handleClose = () => {
    setModalOpen(false);
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
        <p className={classes.paperText}>iPhone</p>
        <p className={classes.paperText}>
          <strike>$1299</strike>
        </p>
        <p className={classes.paperText}>$999</p>
      </Box>
    </Modal>
  );
};

export default AddItemModal;
