import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListPopup from "components/ListPopup";
import AddProduct from "components/AddProduct";

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
  const { list, demoListsArray } = props;
  const { listTitle, itemCount, img } = props.list;
  const classes = useStyles();
  const [listOpen, setListOpen] = useState(false);
  const changeListOpen = () => {
    setListOpen(!listOpen);
  };
  const [addProductOpen, setAddProductOpen] = useState(false);
  const changeAddProductOpen = () => {
    setAddProductOpen((previous) => !previous);
  };

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
      <ListPopup
        {...{
          listTitle,
          itemCount,
          listOpen,
          changeListOpen,
          addProductOpen,
          changeAddProductOpen,
        }}
      />
      <AddProduct
        {...{
          listTitle,
          listOpen,
          changeListOpen,
          addProductOpen,
          changeAddProductOpen,
          demoListsArray,
        }}
      />
    </Box>
  );
};

export default ListCard;
