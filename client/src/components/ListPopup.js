import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Modal, IconButton, Typography,Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ItemDisplay from "components/ItemDisplay";
import levis_501 from "img/levis_501.png";
import tommy_jeans from "img/tommy_jeans.png";
import ck_jacket from "img/ck_jacket.png";

const useStyles = makeStyles((theme) => ({
  popup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(1, 1, 3),
    backgroundColor: "white",
    outline: "none",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  closeButtonContainer: {
    textAlign: "right",
  },
  popupTitleProductType: {
    fontSize: "1.3rem",
    fontWeight: "500",
  },
  productCard: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "30rem"
  },
  removeButtonContainer:{
    display: "flex",
    alignItems:"center",
    justifyContent:"center",
  },
  removeButton:{
    display: "flex",
    alignItems:"center",
    justifyContent:"center",
    borderRadius: "10rem",
    height:"3rem",
  },
  addButton: {  
    borderRadius: "10rem",
    backgroundColor: "#DF1B1B",
    color: "white",
    width: "10rem",
    height: "3rem",
  },

  addButtonContainer:{
    display: "flex",
    justifyContent:"center",
  }
}));

const demoProductsArray = [
  {
    shopURL:
      "https://www.amazon.ca/Levis-Womens-Skinny-Jeans-Matter/dp/B077WTLTM5/ref=sr_1_7?dchild=1&keywords=levis+501+crop+jeans&qid=1603251804&sr=8-7",
    oldPrice: "$90",
    price: "$56",
    title: "Levi's 501 crop jean in lightwash",
    imgURL: levis_501,
  },
  {
    shopURL:
      "https://www.amazon.ca/Tommy-Hilfiger-Hooded-Performance-Jacket/dp/B07BFVPK7K/ref=sr_1_15?dchild=1&keywords=tommy+jeans+hoodie&qid=1603252642&sr=8-15",
    oldPrice: "$120",
    price: "$98",
    title: "Tommy Jeans '90s Constrast Cropped Hoodie Sweatshirt'",
    imgURL: tommy_jeans,
  },
  {
    shopURL:
    "https://www.amazon.ca/Tommy-Hilfiger-Hooded-Performance-Jacket/dp/B07BFVPK7K/ref=sr_1_15?dchild=1&keywords=tommy+jeans+hoodie&qid=1603252642&sr=8-15",
    oldPrice: "$110",
    price: "$56",
    title: "Calvin Klein Performance Women Jacket",
    imgURL: ck_jacket,
  },
];

const ListPopup = (props) => {
  const classes = useStyles();
  const { list_title,item_count,listOpen, setListOpen } = props;
  const handleClose = () => setListOpen(false);

  return (
    <Modal open={listOpen} onClose={handleClose} className={classes.popup}>
      <Box className={classes.paper}>
        <Box className={classes.closeButtonContainer}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box className={classes.titleContainer}>
          <Typography className={classes.popupTitleProductType}>
            {list_title}
          </Typography>
          <Typography>{item_count}</Typography>
        </Box>

        {demoProductsArray.map((list) => (
          <Box className={classes.productCard}>
            <ItemDisplay item={list}></ItemDisplay>
            <Box className={classes.removeButtonContainer}>
            <Button className={classes.removeButton} >Remove</Button>
            </Box>
          </Box>
        ))}
          <Box className={classes.addButtonContainer}>
        <Button className={classes.addButton} variant="contained">
          ADD NEW ITEM
        </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ListPopup;
