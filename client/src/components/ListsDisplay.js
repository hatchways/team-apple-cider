import React, { useState, useContext, useEffect } from "react";
import { Box, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ListCard from "components/ListCard";
import { useHorizontalScroll } from "components/HorrizontalScroll";
import SuccessSnackbar from "components/SuccessSnackbar";
import ListContext from "contexts/ListContext";
import ListsDisplayTitle from "components/ListsDisplayTitle";
import fashion from "img/default/fashion.png";
import home from "img/default/home.png";
import travel from "img/default/travel.png";

const useStyles = makeStyles((theme) => ({
  shoppingContainer: {
    display: "flex",
    flexDirection: "column",
  },
  myShoppingLists: {
    display: "flex",
    maxWidth: "75vw",
    overflowX: "auto",
    "& > *": {
      marginRight: theme.spacing(4),
    },
    "& > *:last-child": {
      marginRight: 0,
    },
  },

  addNewList: {
    padding: theme.spacing(12),
    backgroundColor: "white",
    borderRadius: "1rem",
    textAlign: "center",
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

const defaultLists = [
  {
    name: "Home",
    id: 2,
    user_id: 6,
    img_url: home,
  },
  {
    name: "Fashion",
    id: 2,
    user_id: 6,
    img_url: fashion,
  },
  {
    name: "Travel",
    id: 2,
    user_id: 6,
    img_url: travel,
  },
];

const ListsDisplay = (props) => {
  const userLists = useContext(ListContext).lists;
  const scrollRef = useHorizontalScroll();
  const { profile, changeAddListOpen } = props;
  const classes = useStyles();
  const [lists, setLists] = useState(userLists);
  const [snackText, setSnackText] = useState("");
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);

  const getLists = async (id) => {
    const res = await fetch(`/lists?user_id=${id}`);
    const json = await res.json();
    return json;
  };

  const refreshLists = async () => {
    if (profile) {
      const profileLists = await getLists(profile.id);
      setLists(profileLists);
    } else if (userLists.length === 0) setLists(defaultLists);
    else setLists(userLists);
  };

  useEffect(() => {
    refreshLists();
  }, [profile, userLists]);

  const changeOpenSuccessSnack = (message) => {
    setSnackText(message);
    setOpenSuccessSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSuccessSnack(false);
  };

  return (
    <Box className={`${classes.shoppingContainer} ${props.className}`}>
      <ListsDisplayTitle {...{ profile, lists }} />
      <Box className={classes.myShoppingLists} ref={scrollRef}>
        {lists.length !== 0 &&
          lists.map((list, i) => (
            <ListCard
              key={i}
              list={list}
              lists={lists}
              changeOpenSuccessSnack={changeOpenSuccessSnack}
            />
          ))}
        {!profile && (
          <Box className={classes.addNewList}>
            <IconButton
              className={classes.addNewListButton}
              onClick={() => changeAddListOpen()}
            >
              <AddIcon className={classes.addIcon} />
            </IconButton>
            <Typography className={classes.addNewListText}>
              ADD NEW LIST
            </Typography>
          </Box>
        )}
      </Box>
      <SuccessSnackbar
        openSnack={openSuccessSnack}
        handleCloseSnack={handleCloseSnack}
        snackText={snackText}
      />
    </Box>
  );
};

export default ListsDisplay;
