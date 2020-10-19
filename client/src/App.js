import React, { Fragment } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route } from "react-router-dom";

import SignUp from './components/SignUp';
import Login from './components/Login';



import DashboardPage from "pages/Dashboard";

function App() {
  return (
    <Fragment>
      <CssBaseline></CssBaseline>
      <BrowserRouter>
          <Route path="/" component={SignUp} exact/>
          <Route path="/login" component={Login}/>
        <Route path="/" component={DashboardPage} />
      </BrowserRouter>
    </Fragment>
      
  )
}

export default App;
