import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Modal, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ItemDisplay from "components/ItemDisplay";

const useStyles = makeStyles((theme) => ({
  popup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2, 4, 3),
    backgroundColor: "white",
  },
  titleContainer: {
    margin: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contentContainer: {
    //
  },
}));

const demoItem = {
  shopURL: "https://www.amazon.co.uk/dp/B08FC1R8C9",
  oldPrice: "$51.99",
  price: "$40",
  title: "Assassin's Creed Valhalla Amazon Limited Edition (PS5)",
  imgURL:
    "https://images-na.ssl-images-amazon.com/images/I/81chim8kYWL._AC_SL1500_.jpg",
};

const ListPopup = (props) => {
  const classes = useStyles();
  const { listOpen, setListOpen } = props;
  const handleClose = () => setListOpen(false);

  return (
    <Modal open={listOpen} onClose={handleClose} className={classes.popup}>
      <Box className={classes.paper}>
        <Box className={classes.titleContainer}>
          <Typography>Clothes</Typography>
          <Typography>34 Items</Typography>
        </Box>
        <Box className={classes.contentContainer}>
          <ItemDisplay item={demoItem}></ItemDisplay>
        </Box>
      </Box>
    </Modal>
  );
};

export default ListPopup;

{
  /* <IconButton
aria-label="close"
className={classes.closeButton}
onClick={handleClose}
>
<CloseIcon />
</IconButton> */
}
