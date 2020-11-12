import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Input,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddItemPopup from "components/AddItemPopup";
import UserContext from "contexts/UserContext";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddItem = () => {
  const userId = useContext(UserContext).userId;
  const [inputLink, setInputLink] = useState("");
  const [item, setItem] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedListIndex, setSelectedListIndex] = useState("");
  const [listId, setListId] = useState("");
  const [userLists, setUserLists] = useState(["Luxury", "Electronics"]);

  const classes = useStyles();
  const openPopup = () => setPopupOpen(true);

  const getItem = async (input) => {
    const response = await fetch("/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: input }),
    });
    return response.json();
  };

  // Step 1: Fetch list from Database
  const getLists = async () => {
    const res = await fetch(`/lists?user_id=${userId}`);
    const json = await res.json();
    setUserLists(json);
  };

  useEffect(() => {
    getLists();
  }, []);

  const addButtonClick = async (e) => {
    // TODO: regex check inputLink here is a valid URL to scrape
    if (inputLink.length > 0) {
      openPopup();
      const newItem = await getItem(inputLink);
      setItem(newItem);
      setInputLink("");
    }
  };

  const closePopup = () => {
    setPopupOpen(false);
    setItem({});
  };

  const onChangeList = (e) => {
    const newIndex = parseInt(e.target.value);
    setSelectedListIndex(newIndex);
    setListId(userLists[newIndex].id);
  };

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
          value={inputLink}
          onChange={(e) => setInputLink(e.target.value)}
        />

        {/* Dropdown menu to select list */}
        <FormControl className={classes.formControl}>
          <Select
            className={classes.dropdownList}
            value={selectedListIndex}
            onChange={onChangeList}
            displayEmpty
            disableUnderline
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>
              Select List
            </MenuItem>
            {userLists.map((listName, i) => (
              <MenuItem key={i} value={i}>
                {listName.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          className={classes.addButton}
          variant="contained"
          onClick={addButtonClick}
        >
          ADD
        </Button>

        <AddItemPopup {...{ item, popupOpen, closePopup, listId }} />
      </Box>
    </Box>
  );
};

export default AddItem;
