import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Modal, IconButton, Typography, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import levis_501 from "img/levis_501.png";
import tommy_jeans from "img/tommy_jeans.png";
import ck_jacket from "img/ck_jacket.png";
import ProductCard from "components/ProductCard";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.2rem",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(10,10,10,0.1)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(1,1,1)",
      outline: "1px solid slategrey",
    },
  },
  popup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(1, 1, 3),
    backgroundColor: "white",
    outline: "none",
    minWidth: "40rem",
    maxHeight: "42rem",
    overflow: "hidden",
    height: "100%",
    display: "block",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 0, 3),
  },
  closeButtonContainer: {
    textAlign: "right",
  },
  popupTitleProductType: {
    fontSize: "1.3rem",
    fontWeight: "500",
    letterSpacing: "1px",
  },

  itemText: {
    fontSize: "0.8rem",
    fontWeight: "500",
    color: "gray",
    letterSpacing: "0.5px",
  },
  productCard: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "30rem",
  },

  addButton: {
    borderRadius: "10rem",
    backgroundColor: "#DF1B1B",
    color: "white",
    width: "11rem",
    height: "3.5rem",
    fontSize: "0.8rem",
  },

  addButtonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2, 0, 2),
  },
  bodyContainer: {
    minWidth: "30rem",
    maxHeight: "29rem",
    overflow: "hidden",
  },

  bodyContent: {
    minWidth: "30rem",
    maxHeight: "30rem",
    overflow: "scroll",
    overflowX: "hidden",
  },
}));

const demoProductsArray = [
  {
    name: "Levi's 501 crop jean in lightwash",
    currency: "$",
    old_price: 9000,
    price: 5600,
    url:
      "https://www.amazon.ca/Levis-Womens-Skinny-Jeans-Matter/dp/B077WTLTM5/ref=sr_1_7?dchild=1&keywords=levis+501+crop+jeans&qid=1603251804&sr=8-7",
    img_url: levis_501,
  },
  {
    name: "Tommy Jeans '90s Constrast Cropped Hoodie Sweatshirt'",
    currency: "$",
    old_price: 12000,
    price: 9800,
    url:
      "https://www.amazon.ca/Tommy-Hilfiger-Hooded-Performance-Jacket/dp/B07BFVPK7K/ref=sr_1_15?dchild=1&keywords=tommy+jeans+hoodie&qid=1603252642&sr=8-15",
    img_url: tommy_jeans,
  },
  {
    name: "Calvin Klein Performance Women Jacket",
    currency: "$",
    old_price: 11000,
    price: 5600,
    url:
      "https://www.amazon.ca/Tommy-Hilfiger-Hooded-Performance-Jacket/dp/B07BFVPK7K/ref=sr_1_15?dchild=1&keywords=tommy+jeans+hoodie&qid=1603252642&sr=8-15",
    img_url: ck_jacket,
  },
  {
    name: "Levi's 501 crop jean in lightwash",
    currency: "$",
    old_price: 9000,
    price: 5600,
    url:
      "https://www.amazon.ca/Levis-Womens-Skinny-Jeans-Matter/dp/B077WTLTM5/ref=sr_1_7?dchild=1&keywords=levis+501+crop+jeans&qid=1603251804&sr=8-7",
    img_url: levis_501,
  },
];

const ListPopup = ({ listTitle, itemCount, listOpen, changeListOpen }) => {
  const classes = useStyles();
  const handleClose = () => changeListOpen();

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
            {listTitle}
          </Typography>

          <Typography
            className={classes.itemText}
          >{`${itemCount} items`}</Typography>
        </Box>
        <Box className={classes.bodyContainer}>
          <Box className={classes.bodyContent}>
            {demoProductsArray.map((item, i) => (
              <ProductCard key={i} item={item} />
            ))}
          </Box>
        </Box>
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
