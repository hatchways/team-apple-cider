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

function App() {
  return (
    <Fragment>
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <UserStore>
            <BrowserRouter>
              <Route path="/" exact component={Profile} />
              {/* <Route path="/" exact component={Login} /> */}
              <Route path="/signup" exact component={SignUp} />
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            </BrowserRouter>
          </UserStore>
        </MuiThemeProvider>
      </CssBaseline>
    </Fragment>
  );
}

export default App;
