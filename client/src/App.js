import React, { Fragment } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "components/Login";
import SignUp from "components/SignUp";
import ProtectedRoute from "components/ProtectedRoute";
import Dashboard from "pages/Dashboard";
import LandingPage from "pages/LandingPage";
import { theme } from "themes/theme";
import { UserStore } from "contexts/UserContext";
import { ListStore } from "contexts/ListContext";

function App() {
  return (
    <Fragment>
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <UserStore>
            <ListStore>
              <BrowserRouter>
                <ProtectedRoute path="/" component={Dashboard} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/landing" exact component={LandingPage} />
              </BrowserRouter>
            </ListStore>
          </UserStore>
        </MuiThemeProvider>
      </CssBaseline>
    </Fragment>
  );
}

export default App;
