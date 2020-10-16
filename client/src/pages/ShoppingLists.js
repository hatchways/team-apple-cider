import React from "react";
import { Box } from "@material-ui/core";

import AddItem from "components/AddItem";
import ListsDisplay from "components/ListsDisplay";

const ShoppingLists = (props) => {
  return (
    <Box>
      <AddItem />
      <ListsDisplay />
    </Box>
  );
};

export default ShoppingLists;
