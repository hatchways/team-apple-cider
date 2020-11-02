import React, { useState } from "react";
import { Box } from "@material-ui/core";
import AddItem from "components/AddItem";
import ListsDisplay from "components/ListsDisplay";
import AddList from "components/AddList";

const ShoppingLists = () => {
  const [addListOpen, setAddListOpen] = useState(false);

  const changeAddListOpen = () => {
    setAddListOpen((previous) => !previous);
  };

  return (
    <Box>
      <AddItem />
      <ListsDisplay {...{ addListOpen, changeAddListOpen }} />
      <AddList {...{ addListOpen, changeAddListOpen }} />
    </Box>
  );
};

export default ShoppingLists;
