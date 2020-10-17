import React from "react";
import { Box, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import clothes from "img/clothes.png";
import furniture from "img/furniture.png";
import luxury from "img/luxury.png";

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
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "2rem",
    backgroundColor: "white",
    borderRadius: "1rem",
    overflow: "hidden",
  },
  listImage: {
    objectFit: "cover",
    height: "18rem",
    width: "18rem",
  },
  listTextContainer: {
    margin: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  listTextTitle: {
    fontWeight: "bold",
  },
  listTextItems: {
    color: "grey",
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
  { title: "Clothes", itemCount: 34, img: clothes },
  { title: "Furniture", itemCount: 12, img: furniture },
  { title: "Luxury", itemCount: 8, img: luxury },
];

const ListsDisplay = () => {
  const classes = useStyles();

  return (
    <Box className={classes.shoppingContainer}>
      <Typography variant="h5" className={classes.listsTitle}>
        My Shopping Lists:
      </Typography>
      <Box className={classes.myShoppingLists}>
        {demoListsArray.map((list, i) => (
          <Box className={classes.listContainer} key={i}>
            <img
              src={list.img}
              alt={list.title}
              className={classes.listImage}
            />
            <Box className={classes.listTextContainer}>
              <Typography className={classes.listTextTitle}>
                {list.title}
              </Typography>
              <Typography
                className={classes.listTextItems}
              >{`${list.itemCount} items`}</Typography>
            </Box>
          </Box>
        ))}
        <Box className={classes.addNewList}>
          <IconButton>
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
