import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "elements/Header";
import Page from "elements/Page";
import Body from "elements/Body";
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
