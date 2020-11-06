import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListPopup from "components/ListPopup";
import AddProduct from "components/AddProduct";
import ListContext from "../contexts/ListContext";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ListSettingsPopup from "components/ListSettingsPopup";

const useStyles = makeStyles((theme) => ({
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
  const listId = props.list.id;
  const listTitle = props.list.name;
  const img = props.list.img_url;
  const listChange = useContext(ListContext).listChange;
  const classes = useStyles();
  const [listOpen, setListOpen] = useState(false);
  const [itemCount, setItemCount] = useState("");
  const [listToProducts, setListToProducts] = useState([]); // list-to-products table {list_id, product_id}
  const [products, setProducts] = useState([]); // products table {product_id, img_url, price}
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const settingsOpen = Boolean(anchorEl);

  // This affects the Modal open component which opens the modal when set to True
  const changeListOpen = (event) => {
    setListOpen(!listOpen);
    getProductIds();
  };

  // Gets the total number of items in the list
  const getProductIds = async () => {
    const res = await fetch(`/list-to-products/${listId}`);
    const json = await res.json();
    setItemCount(json.length);
    setListToProducts(json);
  };

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

  useEffect(() => {
    getProductIds();
  }, [listChange]);

  const settingsClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const settingsClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box onClick={!settingsOpen && changeListOpen} className={classes.listContainer}>
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
        }}
      />
      <ListSettingsPopup {...{ listId, settingsOpen, settingsClose }} />
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
