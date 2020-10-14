import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import DashboardPage from "./pages/Dashboard";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/dashboard" component={DashboardPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
