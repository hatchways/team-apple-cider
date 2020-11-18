import React, { useContext } from "react";
import { Box, Typography } from "@material-ui/core";
import UserContext from "contexts/UserContext";
import ListContext from "contexts/ListContext";
import { makeStyles } from "@material-ui/core/styles";
import tech from "img/default/tech.jpg";
import home from "img/default/home.jpg";
import travel from "img/default/travel.jpg";

const defaultLists = [
  {
    name: "Home",
    img: home,
  },
  {
    name: "Technology",
    img: tech,
  },
  {
    name: "Travel",
    img: travel,
  },
];
const useStyles = makeStyles(() => ({
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "1rem",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      opacity: "0.95",
      cursor: "pointer",
    },
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
    fontWeight: "bold",
  },
}));

const DemoShoppingLists = (props) => {
  const classes = useStyles();
  const userId = useContext(UserContext).userId;
  const updateLists = useContext(ListContext).listsToggle;

  const createListFromDefault = async (item) => {
    const response = await fetch(`/lists?user_id=${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: item.name, img_url: item.img }),
    });
    updateLists();
  };

  return (
    <>
      {defaultLists.map((item, i) => (
        <Box
          key={i}
          className={classes.listContainer}
          onClick={() => createListFromDefault(item)}
        >
          <img src={item.img} alt={item.name} className={classes.listImage} />
          <Typography className={classes.listTextContainer}>
            {item.name}
          </Typography>
        </Box>
      ))}
    </>
  );
};

export default DemoShoppingLists;
