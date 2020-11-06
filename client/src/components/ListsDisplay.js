import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ListCard from "components/ListCard";
import { useHorizontalScroll } from "components/HorrizontalScroll";
import UserContext from "contexts/UserContext";
import ListContext from "contexts/ListContext";

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
    "& > *": {
      marginRight: theme.spacing(4),
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

const ListsDisplay = (props) => {
  const scrollRef = useHorizontalScroll();
  const { profile, addListOpen, changeAddListOpen } = props;
  const classes = useStyles();
  const userId = useContext(UserContext).userId;
  const listDelete = useContext(ListContext).listDelete;
  const [lists, setLists] = useState([]);

  const getLists = async () => {
    const id = profile && profile.id ? profile.id : userId;
    const res = await fetch(`/lists?user_id=${id}`);
    const json = await res.json();
    if (Array.isArray(json)) {
      setLists(json);
    }
  };

  useEffect(() => {
    getLists();
  }, [listDelete, profile && profile.id]);

  const getListsUserText = (profile) => {
    if (!profile || profile.name === undefined) return "My Shopping Lists:";
    else if (profile.name[profile.name.length - 1] === "s")
      return `${profile.name}' Shopping Lists:`;
    else return `${profile.name}'s Shopping Lists:`;
  };

  const getEmptyListText = (profile) => {
    if (!profile || profile.name === undefined)
      return "Click the plus icon to make your first list";
    else if (profile.name[profile.name.length - 1] === "s")
      return `${profile.name}' does not have any public lists:`;
    else return `${profile.name}'s does not have any public lists`;
  };

  return (
    <Box className={`${classes.shoppingContainer} ${props.className}`}>
      <Typography variant="h5" className={classes.listsTitle}>
        {lists.length !== 0
          ? getListsUserText(profile)
          : getEmptyListText(profile)}
      </Typography>
      <Box className={classes.myShoppingLists} ref={scrollRef}>
        {lists.length !== 0 &&
          lists.map((list, i) => <ListCard key={i} list={list} />)}
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
    </Box>
  );
};

export default ListsDisplay;
