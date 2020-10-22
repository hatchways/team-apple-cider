import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListPopup from "components/ListPopup";

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
  const classes = useStyles();
  const listTitle = props.list.title;
  const itemCount = props.list.itemCount;
  const [listOpen, setListOpen] = useState(false);
  const handleListClick = () => {
    setListOpen(true);
  };

  return (
    <Box>
      <Box onClick={handleListClick} className={classes.listContainer}>
        <img
          src={props.list.img}
          alt={props.list.title}
          className={classes.listImage}
        />

        <Box className={classes.listTextContainer}>
          <Typography className={classes.listTextTitle}>
            {listTitle}
          </Typography>
          <Typography
            className={classes.listTextItems}
          >{`${itemCount} items`}</Typography>
        </Box>
      </Box>
      <ListPopup {...{ listTitle, itemCount, listOpen, setListOpen }} />
    </Box>
  );
};

export default ListCard;
