import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  itemContainer: {},
  itemTitle: {
    textAlign: "center",
  },
  itemText: {
    textAlign: "center",
  },
  itemImage: {
    height: "5rem",
    width: "5rem",
  },
  itemTextContainer: {},
}));

const ItemDisplay = (props) => {
  const { item } = props;
  const classes = useStyles();

  return (
    <Box className={classes.itemContainer}>
      <img className={classes.itemImage} src={item.imgURL} alt={item.title} />
      <Box className={classes.itemTextContainer}>
        <p className={classes.itemText}>{item.title}</p>
        <p className={classes.itemText}>
          <strike>{item.oldPrice}</strike>
        </p>
        <p className={classes.itemText}>{item.price}</p>
      </Box>
    </Box>
  );
};

export default ItemDisplay;
