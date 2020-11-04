import React, { useContext,useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListPopup from "components/ListPopup";
import AddProduct from "components/AddProduct";
import ListContext from "../contexts/ListContext";

const useStyles = makeStyles((theme) => ({
  listsTitle: {
    fontWeight: "bold",
    margin: "2rem 0",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  const [itemCount, setItemCount] = useState('');

  const changeListOpen = () => {
    setListOpen(!listOpen);
  };
  const [addProductOpen, setAddProductOpen] = useState(false);
  const changeAddProductOpen = () => {
    setAddProductOpen((previous) => !previous);
  };

  const getItemCount = async () => {
    const res = await fetch(`/list-to-products/${listId}`)
    const json = await res.json();
    setItemCount(json.length)
  };

  useEffect(() => {
    getItemCount()
  }, [listOpen,listChange]);


  return (
    <Box>
      <Box onClick={changeListOpen} className={classes.listContainer}>
        <img src={img} alt={listTitle} className={classes.listImage} />

        <Box className={classes.listTextContainer}>
          <Typography className={classes.listTextTitle}>{listTitle}</Typography>
          <Typography
            className={classes.listTextItems}
          >{`${itemCount} items`}</Typography>
        </Box>
      </Box>
      <ListPopup {...{listId, listTitle, itemCount, listOpen, changeListOpen }} />
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
