import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListPopup from "components/ListPopup";
import AddProduct from "components/AddProduct";
import ListContext from "../contexts/ListContext";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ListSettingsPopup from "components/ListSettingsPopup";

const useStyles = makeStyles(() => ({
  listsTitle: {
    fontWeight: "bold",
    margin: "2rem 0",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  const { lists } = props;
  const listId = props.list.id;
  const listTitle = props.list.name;
  const img = props.list.img_url;
  const changeOpenSuccessSnack = props.changeOpenSuccessSnack;
  const listChange = useContext(ListContext).listChange;
  const productChange = useContext(ListContext).productChange;
  const classes = useStyles();
  const [listOpen, setListOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [listToProducts, setListToProducts] = useState([]); // list-to-products table {list_id, product_id}
  const [products, setProducts] = useState([]); // products table {product_id, img_url, price}
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const settingsOpen = Boolean(anchorEl);

  // This affects the Modal open component which opens the modal when set to True
  const changeListOpen = () => {
    setListOpen(!listOpen);
  };

  // Gets the total number of items in the list
  const getProductIds = async () => {
    const res = await fetch(`/list-to-products/${listId}`);
    const json = await res.json();
    setItemCount(json.length);
    setListToProducts(json);
  };

  useEffect(() => {
    getProductIds();
  }, [listChange, productChange, listId]);

  const getProducts = async () => {
    const newProducts = await Promise.all(
      listToProducts.map(async (relation) => {
        const res = await fetch(`/products/${relation.product_id}`);
        return res.json(res);
      })
    );
    setProducts(newProducts);
  };

  useEffect(() => {
    getProducts();
  }, [listToProducts]);

  const settingsClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const settingsClose = () => {
    setAnchorEl(null);
  };

  const changeAddProductOpen = () => {
    setAddProductOpen((previous) => !previous);
  };
  return (
    <Box>
      <Box
        onClick={!settingsOpen && changeListOpen}
        className={classes.listContainer}
      >
        <img src={img} alt={listTitle} className={classes.listImage} />
        <Box>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={settingsClick}
          >
            <MoreHorizIcon />
          </IconButton>
        </Box>
        <Box className={classes.listTextContainer}>
          <Typography className={classes.listTextTitle}>{listTitle}</Typography>
          <Typography
            className={classes.listTextItems}
          >{`${itemCount} items`}</Typography>
        </Box>
      </Box>
      <ListPopup
        {...{
          products,
          listId,
          getProductIds,
          listTitle,
          itemCount,
          listOpen,
          changeListOpen,
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
          lists,
          changeOpenSuccessSnack,
        }}
      />
      <ListSettingsPopup {...{ listId, settingsOpen, settingsClose }} />
    </Box>
  );
};

export default ListCard;
