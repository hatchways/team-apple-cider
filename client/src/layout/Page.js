import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  page: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
}));

const Page = (props) => {
  const classes = useStyles();
  return <Box className={classes.page}>{props.children}</Box>;
};

export default Page;
