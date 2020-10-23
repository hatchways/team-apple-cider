import React, { Fragment, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route } from "react-router-dom";

import SignUp from './components/SignUp';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { theme } from './themes/theme';
import {UserStore} from './contexts/UserContext'

function App() {
  return (
    <Fragment>
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <UserStore>
            <BrowserRouter>
              <Route path="/" exact render={()=><Login></Login>}/>
              <Route path="/signup" component={SignUp} exact/>
              <ProtectedRoute exact path='/dashboard' component={Dashboard} />
            </BrowserRouter>
          </UserStore>
        </MuiThemeProvider>
      </CssBaseline>
    </Fragment>
  );
}

export default App;
