import React from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "components/ProtectedRoute";

import Header from "layout/Header";
import Page from "layout/Page";
import Body from "layout/Body";

import ShoppingLists from "body/ShoppingLists";
import Friends from "body/Friends";
import Profile from "body/Profile";

const Dashboard = () => {
    return (
        <Page>
            <Header />
            <Body>
                <Switch>
                    <Route exact path="/" component={ShoppingLists} />
                    <Route path="/friends/*" component={Friends} />
                    <ProtectedRoute
                        path="/profile/:id"
                        exact
                        component={Profile}
                    />
                </Switch>
            </Body>
        </Page>
    );
};

export default Dashboard;
