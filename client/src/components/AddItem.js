import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Input,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddItemPopup from "pages/AddItemPopup";

const useStyles = makeStyles((theme) => ({
  dashboardAddItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5rem",
  },
  addNewItemTitle: {
    fontWeight: "bold",
  },
  addItemInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    margin: "3rem",
    overflow: "hidden",
    height: "4rem",
    padding: "0 0.5rem",
    borderRadius: "10rem",
    boxShadow: "0 0 0.5rem 1px #eee",
  },
  addButton: {
    borderRadius: "10rem",
    backgroundColor: "#DF1B1B",
    color: "white",
    width: "15rem",
    height: "3rem",
  },
  linkForm: {
    width: "100%",
    height: "100%",
    margin: "0 1.5rem",
    paddingRight: "1rem",
    borderRight: "1px solid #eee",
  },
  dropdownList: {
    width: "7rem",
    marginRight: "5rem",
  },
}));

const demoListsArray = ["Clothes", "Furniture", "Luxury"];
const emptyItem = {
  shopURL: null,
  title: null,
  oldPrice: null,
  price: null,
  imgURL: null,
};

const AddItem = () => {
  const [inputLink, setInputLink] = useState("");
  const [item, setItem] = useState(emptyItem);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedList, setSelectedList] = useState("none");
  const classes = useStyles();
  const openPopup = () => setPopupOpen(true);

  const getItem = async (input) => {
    const response = await fetch("/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ URL: input }),
    });
    return response.json();
  };

  const addButtonClick = async () => {
    // TODO: regex check inputLink here is a valid URL to scrape
    if (inputLink.length > 0) {
      openPopup();
      const newItem = await getItem(inputLink);
      setItem(newItem);
    }
  };

  useEffect(() => setItem(emptyItem), [inputLink]);

  return (
    <Box className={classes.dashboardAddItem}>
      <Typography variant="h5" className={classes.addNewItemTitle}>
        Add new item:
      </Typography>
      <Box className={classes.addItemInput}>
        <Input
          placeholder="Paste your link here"
          disableUnderline
          className={classes.linkForm}
          onChange={(e) => setInputLink(e.target.value)}
        />
        <Select
          className={classes.dropdownList}
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
          disableUnderline
        >
          <MenuItem value="none" disabled>
            Select List
          </MenuItem>
          {demoListsArray.map((listName, i) => (
            <MenuItem key={i} value={listName}>
              {listName}
            </MenuItem>
          ))}
        </Select>
        <Button
          className={classes.addButton}
          variant="contained"
          onClick={addButtonClick}
        >
          ADD
        </Button>
        <AddItemPopup {...{ item, popupOpen, setPopupOpen }} />
      </Box>
    </Box>
  );
};

export default AddItem;
