import React, { Fragment } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "components/Login";
import SignUp from "components/SignUp";
import ProtectedRoute from "components/ProtectedRoute";
import Dashboard from "pages/Dashboard";
import Profile from "pages/Profile";
import { theme } from "themes/theme";
import { UserStore } from "contexts/UserContext";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Fragment>
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <UserStore>
            <BrowserRouter>
              <Route path="/" exact component={Login} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/landing" exact component={LandingPage} />
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              <Route path="/profile/:id" exact component={Profile} />
            </BrowserRouter>
          </UserStore>
        </MuiThemeProvider>
      </CssBaseline>
    </Fragment>
  );
}

export default App;
