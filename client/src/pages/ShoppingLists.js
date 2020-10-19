import React, { useState } from "react";
import { Box } from "@material-ui/core";
import AddItem from "components/AddItem";
import ListsDisplay from "components/ListsDisplay";
import AddList from "components/AddList"

const ShoppingLists = () => {
    const [state, setState] = useState(false)
  return (
    <Box>
      <AddItem />
      <ListsDisplay state = {state} setState = {setState} />
      <AddList state = {state} setState = {setState}/>
    </Box>
  );
};

export default ShoppingLists;
