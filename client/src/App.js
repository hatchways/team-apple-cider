import React, { Fragment, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route } from "react-router-dom";

import SignUp from './components/SignUp';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { theme } from './themes/theme';

function App() {
  const [user, setUser] = useState(false)

  const handleLogin = e => {
    e.preventDefault();
    setUser(true);
    console.log(user)
  }

  const handleLogout = e => {
    e.preventDefault();
    setUser(false);
  }


  return (
    <Fragment>
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Route path="/" exact render={()=><Login user={user} handleLogin={handleLogin}></Login>}/>
            <Route path="/signup" component={SignUp}></Route>
            <ProtectedRoute exact path='/dashboard' user={user} handleLogout={handleLogout} component={Dashboard} />
          </BrowserRouter>
        </MuiThemeProvider>
      </CssBaseline>
    </Fragment>
  );
}

export default App;
