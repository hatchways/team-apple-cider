import React from "react";

import { Box, Typography, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Notifications from "components/Notifications";

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    display: "flex",
    alignItems: "center",
  },
  tab: {
    margin: theme.spacing(3),
    textDecoration: "none",
    color: "black",
    position: "relative",
    padding: "5px 18px",
  },
  notificationIcon: {
    top: "0",
    right: "0",
    height: "10px",
    width: "10px",
    backgroundColor: "#35d554",
    borderRadius: "100%",
    position: "absolute",
  },
  tabLabel: {
    textTransform: "none",
  },
}));

const HeaderTabs = (props) => {
  const { selectedPage, setSelectedPage } = props;
  const classes = useStyles();

  const handleTabChange = (e, newValue) => setSelectedPage(newValue);

  return (
    <Box className={classes.tabContainer}>
      <Tabs
        value={selectedPage}
        onChange={handleTabChange}
        aria-label="page select"
        TabIndicatorProps={{
          style: { backgroundColor: "white" },
        }}
      >
        <Tab
          label={
            <Typography className={classes.tabLabel}>Shopping Lists</Typography>
          }
        />
        <Tab
          label={<Typography className={classes.tabLabel}>Friends</Typography>}
        />
      </Tabs>
      <Box className={classes.tab}>
        <Typography>Notifications</Typography>
        <Box className={classes.notificationIcon} />
        <Notifications />
      </Box>
    </Box>
  );
};

export default HeaderTabs;
