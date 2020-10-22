import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Link, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    maxWidth: "30rem",
    display: "grid",
    gridTemplateColumns: "7.5rem 1fr",
    alignItems: "center",
    margin: theme.spacing(1),
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "7.5rem",
    width: "7.5rem",
    marginRight: theme.spacing(4),
  },
  itemImage: {
    maxHeight: "7.5rem",
    maxWidth: "7.5rem",
  },
  itemTextContainer: {
    marginLeft: theme.spacing(4),
    overflow: "hidden",
  },
  itemTitle: {
    padding: theme.spacing(0.25),
    fontWeight: "bold",
    lineHeight: "1.2",
  },
  shopURL: {
    display: "block",
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
    display: "inline",
    textDecoration: "line-through",
  },
  itemPrice: {
    display: "inline",
    color: "red",
    fontWeight: "bold",
  },
}));

const ItemDisplay = (props) => {
  const { item } = props;
  const classes = useStyles();
  const title = item.title ? item.title : "";
  const imgURL = item.imgURL ? item.imgURL : "";
  const shopURL = item.shopURL ? item.shopURL : "";
  const oldPrice = item.oldPrice ? item.oldPrice : "";
  const price = item.price ? item.price : "";

  return (
    <Box className={`${classes.itemContainer} ${props.className}`}>
      <Box className={classes.imageContainer}>
        <img className={classes.itemImage} src={imgURL} alt={title} />
      </Box>
      <Box className={classes.itemTextContainer}>
        <Typography className={classes.itemTitle}>{title}</Typography>
        <Link href={shopURL} className={classes.shopURL}>
          {shopURL}
        </Link>
        <Box className={classes.priceTextContainer}>
          <Typography className={classes.itemOldPrice}>{oldPrice}</Typography>{" "}
          <Typography className={classes.itemPrice}>{price}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDisplay;
