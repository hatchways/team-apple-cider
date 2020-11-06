import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "layout/Header";
import Page from "layout/Page";
import Body from "layout/Body";

import ShoppingLists from "body/ShoppingLists";
import Friends from "body/Friends";

const Dashboard = () => {
  return (
    <Page>
      <Header />
      <Body>
        <Switch>
          <Route exact path="/" component={ShoppingLists} />
          <Route exact path="/friends" component={Friends} />
        </Switch>
      </Body>
    </Page>
  );
};

export default Dashboard;
