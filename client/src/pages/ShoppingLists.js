import React, { useState } from "react";
import { Box } from "@material-ui/core";
import AddItem from "components/AddItem";
import ListsDisplay from "components/ListsDisplay";
import AddList from "components/AddList"

const ShoppingLists = () => {
    const [addListOpen, setAddListOpen] = useState(false)
  return (
    <Box>
      <AddItem />
      <ListsDisplay addListOpen = {addListOpen} setAddListOpen = {setAddListOpen} />
      <AddList addListOpen = {addListOpen} setAddListOpen = {setAddListOpen}/>
    </Box>
  );
};

export default ShoppingLists;
