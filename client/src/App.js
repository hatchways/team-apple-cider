import React, { Fragment } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route } from "react-router-dom";

import SignUp from './components/SignUp';
import Login from './components/Login';

import "./App.css";

function App() {
  return (
    <Fragment>
      <CssBaseline></CssBaseline>
      <BrowserRouter>
          <Route path="/" component={SignUp} exact/>
          <Route path="/login" component={Login}/>
      </BrowserRouter>
    </Fragment>
      
  )
}

export default App;
