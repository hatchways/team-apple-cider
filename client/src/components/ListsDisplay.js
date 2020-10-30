import React, { useEffect, useState } from "react";
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
    margin: "1rem 18rem",
  },
  listsTitle: {
    fontWeight: "bold",
    margin: "2rem 0",
  },
  myShoppingLists: {
    display: "flex",
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
];

const ListsDisplay = () => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch("/lists")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setLists(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } 

 
  return (
    <Box className={classes.shoppingContainer}>
      <Typography variant="h5" className={classes.listsTitle}>
        My Shopping Lists:
      </Typography>
      <Box className={classes.myShoppingLists}>
        {lists.map((list, i) => (
          <ListCard key={i} list={list} />
        ))}
        <Box className={classes.addNewList}>
          <IconButton className={classes.addNewListButton}>
            <AddIcon className={classes.addIcon} />
          </IconButton>
          <Typography className={classes.addNewListText}>
            ADD NEW LIST
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ListsDisplay;
