import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import clothes from "img/clothes.png";
import furniture from "img/furniture.png";
import luxury from "img/luxury.png";
import ListCard from "components/ListCard";

const useStyles = makeStyles((theme) => ({
  shoppingContainer: {
    display: "flex",
    flexDirection: "column",
  },
  listsTitle: {
    fontWeight: "bold",
    margin: "2rem 0",
  },
  myShoppingLists: {
    display: "flex",
    maxWidth: "75vw",
    overflowX: "auto",
  },

  addNewList: {
    width: "18rem",
    backgroundColor: "white",
    borderRadius: "1rem",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  addNewListButton: {
    height: "5rem",
    width: "5rem",
    margin: "0.5rem",
  },
  addIcon: {
    color: "red",
    height: "3rem",
    width: "3rem",
    margin: "0.5rem",
  },
  addNewListText: {
    fontWeight: "bold",
  },
}));

const demoListsArray = [
  { listTitle: "Clothes", itemCount: 34, img: clothes },
  { listTitle: "Furniture", itemCount: 12, img: furniture },
  { listTitle: "Luxury", itemCount: 8, img: luxury },
  { listTitle: "Clothes", itemCount: 34, img: clothes },
  { listTitle: "Furniture", itemCount: 12, img: furniture },
  { listTitle: "Luxury", itemCount: 8, img: luxury },
  { listTitle: "Clothes", itemCount: 34, img: clothes },
  { listTitle: "Furniture", itemCount: 12, img: furniture },
  { listTitle: "Luxury", itemCount: 8, img: luxury },
];

const ListsDisplay = (props) => {
  const { user } = props;
  const classes = useStyles();

  const getListsUserText = (user) => {
    if (!user) return "My";
    else if (user.name[user.name.length - 1] === "s") return `${user.name}'`;
    else return `${user.name}'s`;
  };

  return (
    <Box className={`${classes.shoppingContainer} ${props.className}`}>
      <Typography variant="h5" className={classes.listsTitle}>
        {getListsUserText(user)} Shopping Lists:
      </Typography>
      <Box className={classes.myShoppingLists}>
        {demoListsArray.map((list, i) => (
          <ListCard key={i} list={list} />
        ))}
        {!user && (
          <Box className={classes.addNewList}>
            <IconButton className={classes.addNewListButton}>
              <AddIcon className={classes.addIcon} />
            </IconButton>
            <Typography className={classes.addNewListText}>
              ADD NEW LIST
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ListsDisplay;
