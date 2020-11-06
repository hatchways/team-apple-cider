import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Modal, IconButton, Typography, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
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
    padding: theme.spacing(4),
    backgroundColor: "white",
    outline: "none",
    boxSizing: "border-box",
    width: "50rem",
    maxHeight: "42rem",
    overflow: "hidden",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  closeButtonContainer: {
    position: "absolute",
    top: "0",
    right: "0",
    margin: theme.spacing(3),
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
    padding: theme.spacing(4),
  },
  bodyContainer: {
    maxHeight: "29rem",
    overflow: "hidden",
  },

  bodyContent: {
    height: "22rem",
    overflow: "scroll",
    overflowX: "hidden",
    margin: theme.spacing(4),
  },
}));

const ListPopup = ({
  products,
  listId,
  getProductIds,
  listTitle,
  itemCount,
  listOpen,
  changeListOpen,
  addProductOpen,
  changeAddProductOpen,
}) => {
  const classes = useStyles();

  const handleAddClick = () => {
    changeAddProductOpen();
    changeListOpen();
  };

  return (
    <Modal open={listOpen} onClose={changeListOpen} className={classes.popup}>
      <Box className={classes.paper}>
        <Box className={classes.closeButtonContainer}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={changeListOpen}
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
            {products.map((item, i) => (
              <ProductCard
                key={i}
                item={item}
                listId={listId}
                getProductIds={getProductIds}
              />
            ))}
          </Box>
        </Box>
        <Box className={classes.addButtonContainer}>
          <Button
            className={classes.addButton}
            variant="contained"
            onClick={handleAddClick}
          >
            ADD NEW ITEM
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ListPopup;
