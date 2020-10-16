import React from "react";

import { Box, Typography, Tabs, Tab, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Notifications from "components/Notifications";

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    display: "flex",
    alignItems: "center",
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
  notificationButton: {
    position: "relative",
    padding: "5px 18px",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const HeaderTabs = (props) => {
  const { selectedPage, setSelectedPage, notificationsOpen } = props;
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
          disableRipple
          label={
            <Typography className={classes.tabLabel}>Shopping Lists</Typography>
          }
        />
        <Tab
          disableRipple
          label={<Typography className={classes.tabLabel}>Friends</Typography>}
        />
        <Button className={classes.notificationButton} disableRipple>
          <Typography className={classes.tabLabel}>Notifications</Typography>
          <Box className={classes.notificationIcon} />
          <Notifications {...props} />
        </Button>
      </Tabs>
    </Box>
  );
};

export default HeaderTabs;
