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
    noWrap:"true",
 
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

  return (
    <Box className={classes.itemContainer}>
      <img className={classes.itemImage} src={item.imgURL} alt={item.title} />
      <Box className={classes.itemTextContainer}>
        <Typography className={classes.itemTitle}>{item.title}</Typography>
        <Link href={item.shopURL} className={classes.shopURL}>
          {item.shopURL}
        </Link>
        <Box className={classes.priceTextContainer}>
          <Typography className={classes.itemOldPrice}>
            {item.oldPrice}
          </Typography>{" "}
          <Typography className={classes.itemPrice}>{item.price}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDisplay;
