import React from "react";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import "../AddItem.css";

const addItemStyle = (theme) => ({
  //
});

const AddItem = () => {
  return (
    <div className="dashboard-add-item">
      <Typography variant="h4">Add new item:</Typography>
    </div>
  );
};

export default withStyles(addItemStyle)(AddItem);
