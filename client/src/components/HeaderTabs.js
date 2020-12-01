import React, { useEffect } from "react";
import { Box, Typography, Tabs, Tab } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import NotificationsButton from "components/NotificationsButton";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    tabContainer: {
        marginLeft: theme.spacing(6),
        marginRight: theme.spacing(6),
        display: "flex",
        alignItems: "center"
    },
    notificationIcon: {
        top: "0",
        right: "0",
        height: "10px",
        width: "10px",
        backgroundColor: "#35d554",
        borderRadius: "100%",
        position: "absolute"
    },
    notificationButton: {
        position: "relative",
        padding: "5px 18px",
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    tabIndicator: {
        backgroundColor: "white"
    }
}));

const StyledTab = withStyles({
    root: {
        fontWeight: "normal",
        textTransform: "none"
    },
    selected: {
        textShadow: "0 0 0.01px black"
    }
})(Tab);

const HeaderTabs = (props) => {
    const { selectedPage, setSelectedPage } = props;
    const classes = useStyles();
    const handleTabChange = (e, newValue) => {
        setSelectedPage(newValue);
    };

    const resetTab = (path) => {
        if (path === `/`) setSelectedPage(0);
        else if (path.match(`/friends`)) setSelectedPage(1);
    };

    useEffect(() => {
        resetTab(window.location.pathname);
    }, []);

    return (
        <Box className={classes.tabContainer}>
            <Tabs
                value={selectedPage}
                onChange={handleTabChange}
                aria-label="page select"
            >
                <StyledTab
                    disableRipple
                    label={<Typography>Shopping Lists</Typography>}
                    component={Link}
                    to="/"
                />
                <StyledTab
                    disableRipple
                    label={<Typography>Friends</Typography>}
                    component={Link}
                    to="/friends/followers"
                />
            </Tabs>
            <NotificationsButton {...props} />
        </Box>
    );
};

export default HeaderTabs;
