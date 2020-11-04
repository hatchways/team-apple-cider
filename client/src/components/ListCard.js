import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListPopup from "components/ListPopup";
import AddProduct from "components/AddProduct";
import ListContext from "../contexts/ListContext";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({

  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  listsTitle: {
    fontWeight: "bold",
  },
  listContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginRight: "2rem",
    backgroundColor: "white",
    borderRadius: "1rem",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      opacity: "0.95",
      cursor: "pointer",
    },
  },
  listImage: {
    objectFit: "cover",
    height: "18rem",
    width: "18rem",
  },
  listSettingsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  listSettings: {
    fontSize: "3rem",
  },
  listTextContainer: {
    margin: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  listTextTitle: {
    fontWeight: "bold",
  },
  listTextItems: {
    color: "grey",
  },
}));

const ListCard = (props) => {
  const listId = props.list.id;
  const listTitle = props.list.name;
  const img = props.list.img_url;
  const listChange = useContext(ListContext).listChange;
  const classes = useStyles();
  const [listOpen, setListOpen] = useState(false);
  const [itemCount, setItemCount] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation()
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    deleteListOpen()
    handleClose()
  };

  const deleteListOpen = () => {
    setDeleteOpen(!deleteOpen)
  }


  const changeListOpen = () => {
    setListOpen(!listOpen);
  };
  const [addProductOpen, setAddProductOpen] = useState(false);
  const changeAddProductOpen = () => {
    setAddProductOpen((previous) => !previous);
  };

  const getItemCount = async () => {
    const res = await fetch(`/list-to-products/${listId}`);
    const json = await res.json();
    setItemCount(json.length);
  };

  useEffect(() => {
    getItemCount();
  }, [listOpen, listChange]);

  return (
    <Box>
      <Box onClick={changeListOpen} className={classes.listContainer}>
        <img src={img} alt={listTitle} className={classes.listImage}></img>
        <Box className={classes.listSettingsContainer}>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleDeleteClick}>Delete List</MenuItem>
          </Menu>
        </Box>

        <Box className={classes.listTextContainer}>
          <Typography className={classes.listTextTitle}>{listTitle}</Typography>
          <Typography
            className={classes.listTextItems}
          >{`${itemCount} items`}</Typography>
        </Box>
      </Box>
      <Modal
        open={deleteOpen}
        onClose={deleteListOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        
      </Modal>
      <ListPopup
        {...{ listId, listTitle, itemCount, listOpen, changeListOpen }}
      />
      {/* <AddProduct
        {...{
          listTitle,
          listOpen,
          changeListOpen,
          addProductOpen,
          changeAddProductOpen,
          demoListsArray,
        }}
      /> */}
    </Box>
  );
};

export default ListCard;
