import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProfileMenu from "components/ProfileMenu";
import logo from "img/logo.png";
import HeaderTabs from "components/HeaderTabs";

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        boxSizing: "border-box",
        padding: theme.spacing(3),
        backgroundColor: "white",
        boxShadow: "0 2px 15px 2px #f4f8ff",
        zIndex: "10"
    },
    logo: {
        height: "2.8rem",
        padding: theme.spacing(1),
        marginLeft: theme.spacing(5),
        marginRight: "auto"
    }
}));

const Header = (props) => {
    const [selectedPage, setSelectedPage] = useState(0);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const classes = useStyles();
    return (
        <Box className={classes.headerContainer}>
            <img className={classes.logo} src={logo} alt="logo" />
            {props.children}
            <HeaderTabs
                {...{
                    selectedPage,
                    setSelectedPage,
                    notificationsOpen,
                    setNotificationsOpen
                }}
            />
            <ProfileMenu />
        </Box>
    );
};

export default Header;
