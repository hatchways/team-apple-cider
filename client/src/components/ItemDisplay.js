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
  itemName: {
    padding: theme.spacing(0.25),
    fontWeight: "bold",
    lineHeight: "1.2",
  },
  url: {
    display: "block",
    padding: theme.spacing(0.25),
    color: "grey",
    fontSize: "0.8rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    noWrap: "true",
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

const centsToDollarsDisplay = (inputCents) => {
  const dollars = String(Math.floor(inputCents / 100));
  const cents = String(inputCents % 100);
  return `$${dollars}.${cents.length > 1 ? cents : cents + "0"}`;
};

const ItemDisplay = (props) => {
  const { item } = props;
  const classes = useStyles();
  const name = item.name ? item.name : "";
  const img_url = item.img_url ? item.img_url : "";
  const url = item.url ? item.url : "";
  const old_price = item.old_price ? item.old_price : "";
  const price = item.price ? item.price : "";

  return (
    <Box className={`${classes.itemContainer} ${props.className}`}>
      <Box className={classes.imageContainer}>
        <img className={classes.itemImage} src={img_url} alt={name} />
      </Box>
      <Box className={classes.itemTextContainer}>
        <Typography className={classes.itemName}>{name}</Typography>
        <Link href={url} className={classes.url}>
          {url}
        </Link>
        <Box className={classes.priceTextContainer}>
          {old_price && (
            <Typography className={classes.itemOldPrice}>
              {centsToDollarsDisplay(old_price)}{" "}
            </Typography>
          )}
          <Typography className={classes.itemPrice}>
            {centsToDollarsDisplay(price)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDisplay;
