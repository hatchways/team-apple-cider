import React, { Fragment } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route } from "react-router-dom";

// import './App.css'; 
import SignUp from './components/SignUp';
import Login from './components/Login';


import { theme } from "themes/theme";
import DashboardPage from "pages/Dashboard";
import Cloudinary from "pages/Cloudinary";

function App() {
  return (
    <Fragment>
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            {/* <Route path="/" component={DashboardPage} /> */}
            <Route path="/" component={SignUp} exact/>
            <Route path="/login" component={Login}/>
          </BrowserRouter>
        </MuiThemeProvider>
      </CssBaseline>
    </Fragment>
  );
}

export default App;
