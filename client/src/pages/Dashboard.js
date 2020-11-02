import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "layout/Header";
import Page from "layout/Page";
import Body from "layout/Body";
import HeaderTabs from "components/HeaderTabs";

import ShoppingLists from "body/ShoppingLists";
import Friends from "body/Friends";

const useStyles = makeStyles((theme) => ({
  //
}));

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const classes = useStyles();

  return (
    <Page>
      <Header>
        <HeaderTabs
          {...{
            selectedPage,
            setSelectedPage,
            notificationsOpen,
            setNotificationsOpen,
          }}
        />
      </Header>
      <Body>
        {selectedPage === 0 && <ShoppingLists />}
        {selectedPage === 1 && <Friends />}
      </Body>
    </Page>
  );
};

export default Dashboard;
