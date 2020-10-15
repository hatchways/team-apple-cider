import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "themes/theme";
import DashboardPage from "pages/Dashboard";

import "css/App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={DashboardPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
