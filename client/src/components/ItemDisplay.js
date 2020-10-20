import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    maxWidth: "30rem",
    display: "grid",
    gridTemplateColumns: "7.5rem 1fr",
    alignItems: "center",
    margin: theme.spacing(1),
  },
  itemImage: {
    marginRight: theme.spacing(2),
    height: "7.5rem",
    width: "7.5rem",
  },
  itemTextContainer: {
    marginLeft: theme.spacing(2),
    overflow: "hidden",
  },
  itemTitle: {
    padding: theme.spacing(0.25),
    fontWeight: "bold",
    lineHeight: "1.2",
  },
  shopURL: {
    padding: theme.spacing(0.25),
    color: "grey",
    fontSize: "0.8rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  priceTextContainer: {
    padding: theme.spacing(0.25),
  },
  itemOldPrice: {
    textDecoration: "line-through",
  },
  itemPrice: {
    color: "red",
    fontWeight: "bold",
  },
}));

const ItemDisplay = (props) => {
  const { item } = props;
  const classes = useStyles();

  return (
    <Box className={classes.itemContainer}>
      <img className={classes.itemImage} src={item.imgURL} alt={item.title} />
      <Box className={classes.itemTextContainer}>
        <Box component="div" className={classes.itemTitle}>
          {item.title}
        </Box>
        <Box component="div" className={classes.shopURL}>
          {item.shopURL}
        </Box>
        <Box className={classes.priceTextContainer}>
          <Box component="span" className={classes.itemOldPrice}>
            {item.oldPrice}
          </Box>{" "}
          <Box component="span" className={classes.itemPrice}>
            {item.price}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDisplay;
