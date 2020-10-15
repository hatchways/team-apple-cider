import React from "react";

// import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import logo from "../img/logo.png";
import icon from "../img/icon.png";

const headerStyle = (theme) => ({
  //
});

const Header = () => {
  return (
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
        <span className="profile-text">Profile</span>
      </div>
    </div>
  );
};

export default withStyles(headerStyle)(Header);
