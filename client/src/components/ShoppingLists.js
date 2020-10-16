import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import clothes from "img/clothes.png";
import furniture from "img/furniture.png";
import luxury from "img/luxury.png";

const useStyles = makeStyles((theme) => ({
  shoppingContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "5rem 18rem",
  },
  listsTitle: {
    margin: "2rem 0",
  },
  myShoppingLists: {
    display: "flex",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "2rem",
    backgroundColor: "white",
  },
  listImage: {
    objectFit: "cover",
    height: "18rem",
    width: "18rem",
  },
}));

const demoList = [
  { title: "Clothes", itemCount: 34, img: clothes },
  { title: "Furniture", itemCount: 12, img: furniture },
  { title: "Luxury", itemCount: 8, img: luxury },
];

const ShoppingLists = () => {
  const classes = useStyles();
  return (
    <Box className={classes.shoppingContainer}>
      <Typography variant="h5" className={classes.listsTitle}>
        My Shopping Lists:
      </Typography>
      <Box className={classes.myShoppingLists}>
        {demoList.map((el) => (
          <Box className={classes.listContainer}>
            <img src={el.img} alt={el.title} className={classes.listImage} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ShoppingLists;
