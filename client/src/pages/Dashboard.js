import React from "react";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import "../Dashboard.css";
import logo from "../img/logo.png";
import icon from "../img/icon.png";

const dashPageStyle = (theme) => ({
  dashContainer: {
    margin: theme.spacing.unit * 2,
  },
});

const Dashboard = () => {
  return (
    <div>
      <div className="dashboard-header">
        <img className="logo" src={logo} alt="logo" />
        <div className="link-container">
          <div className="link">
            <span className="link-text">Shopping Lists</span>
          </div>
          <div className="link">
            <span className="link-text">Friends</span>
          </div>
          <div className="link">
            <span className="link-text">Notifications</span>
            <div className="notification-icon" />
          </div>
        </div>
        <div className="profile">
          <img className="profile-icon" src={icon} alt="profile" />
          <div>Profile</div>
        </div>
      </div>
      <Typography>{"Dashboard"}</Typography>
    </div>
  );
};

export default withStyles(dashPageStyle)(Dashboard);
