import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
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

const ListsDisplay = () => {
  const classes = useStyles();
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [lists, setLists] = useState([]);

  const getLists = async () =>{
    const res = await fetch("/lists")
    const json = await res.json()
    setLists(json);
  }
  useEffect(() => {
    getLists();
    return () => console.log('unmounting');
  }, []);
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
