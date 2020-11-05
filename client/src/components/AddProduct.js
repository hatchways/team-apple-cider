import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Modal,
  IconButton,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../styles/AddProductStyles";
import UserContext from "contexts/UserContext";
import ItemDisplay from "components/ItemDisplay";

const AddProduct = (props) => {
  const {
    listTitle,
    listOpen,
    changeListOpen,
    addProductOpen,
    changeAddProductOpen,
    lists,
  } = props;
  const classes = useStyles();
  const [inputLink, setInputLink] = useState("");
  const [list, setList] = useState("");
  const [errors, setErrors] = useState({});
  const userId = useContext(UserContext).userId;
  const [item, setItem] = useState({});
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [listId, setListId] = useState("");
  const [userLists, setUserLists] = useState([]);
  const [loading, setLoading] = useState(false);

  const getItem = async (input) => {
    const response = await fetch("/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: input }),
    });
    return response.json();
  };

  const getLists = async () => {
    const res = await fetch(`/lists?user_id=${userId}`);
    const json = await res.json();
    setUserLists(json);
  };

  useEffect(() => {
    getLists();
  }, []);

  const findButtonClick = async (e) => {
    if (inputLink.length > 0) {
      setLoading(true);
      const newItem = await getItem(inputLink);
      setItem(newItem);
      setInputLink("");
      setLoading(false);
    }
  };

  const addButtonClick = (e) => {
    e.preventDefault();
  };

  const onChangeList = (e) => {
    const newIndex = parseInt(e.target.value);
    setSelectedListIndex(newIndex);
    setListId(userLists[newIndex].id);
  };

  const handleChange = (event) => {
    setList(event.target.value);
  };

  const handleClose = () => {
    changeAddProductOpen();
  };

  const validations = () => {
    const errorsCopy = { ...errors };
    errorsCopy.inputLink = inputLink ? "" : "This field is required.";
    setErrors({ ...errorsCopy });

    return Object.values(errorsCopy).every((field) => field === "");
  };

  return (
    <Modal
      className={classes.popup}
      open={addProductOpen}
      onClose={handleClose}
      aria-labelledby="add-product"
      aria-describedby="confirms-adding-item-of-url-to-selected-list"
    >
      <Box className={classes.paper}>
        <Box className={classes.closeButtonContainer}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box className={classes.titleContainer}>
          <Typography className={classes.titleText}>Add new item:</Typography>
        </Box>
        <Box className={classes.bodyContainer}>
          <Typography className={classes.itemText}>
            Paste link to item:
          </Typography>
        </Box>
        <Box className={classes.textFieldContainer}>
          <TextField
            className={classes.textField}
            variant="outlined"
            placeholder="Paste your link here" // Placeholder needs to be centered.
            fullWidth
            type="text"
            error={Boolean(errors.inputLink)}
            helperText={errors.inputLink}
            onChange={(e) => setInputLink(e.target.value)}
          />
        </Box>
        <Box className={classes.bodyContainer}>
          <Typography className={classes.itemText}>Select list</Typography>
        </Box>
        <Box className={classes.selectListInput}>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.formControl}
          >
            <InputLabel id="select-list-label">Select</InputLabel>
            <Select
              id="select-list"
              value={list}
              onChange={handleChange}
              label="List"
            >
              {lists.map((list, i) => (
                <MenuItem key={i} value={list.name}>
                  {list.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.itemContainer}>
          {item.error ? (
            <Box className={classes.errorMessage}>{item.response}</Box>
          ) : item.name ? (
            <>
              <ItemDisplay item={item} className={classes.itemDisplay} />,
              <Button
                onClick={addButtonClick}
                variant="contained"
                className={classes.addButton}
              >
                ADD ITEM
              </Button>
            </>
          ) : loading ? (
            <CircularProgress className={classes.spinner} />
          ) : (
            <Button
              className={classes.addButton}
              variant="contained"
              onClick={findButtonClick}
            >
              FIND ITEM
            </Button>
          )}
        </Box>
        <Box className={classes.addButtonContainer}></Box>
      </Box>
    </Modal>
  );
};

export default AddProduct;
