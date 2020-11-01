import React from "react";
import { Box } from "@material-ui/core";
import AddItem from "components/AddItem";
import ListsDisplay from "components/ListsDisplay";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listsDisplay: {
    margin: theme.spacing(0, 0, 12, 0),
  },
}));

const ShoppingLists = (props) => {
  const classes = useStyles();

  return (
    <Box>
      <AddItem />
      <ListsDisplay className={classes.listsDisplay} />
    </Box>
  );
};

export default ShoppingLists;
