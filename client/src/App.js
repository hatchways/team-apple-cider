import React, { Fragment, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route } from "react-router-dom";

import SignUp from './components/SignUp';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { theme } from './themes/theme';
import {UserStore} from './contexts/UserContext'

function App() {
  // const [user, setUser] = useState(false)

  // const handleLogin = (email, password) => {
  //   console.log(email, password)
  //   if (true) {
  //       fetch("/auth/login", {
  //           method: 'POST',
  //           headers: {
  //               'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify({
  //               'email': email,
  //               'password': password,
  //           })})
  //           .then(response => response.json())
  //           .then((response) => {
  //               console.log(response)
  //               if (response.status === 'success') {
  //                   console.log('Success:', email);
  //                   setUser(true);
  //                   console.log(user)
  //               }
  //               else {
  //                   window.alert(response.message);
  //                   console.log(response.message);
  //               }
  //           })
  //           .catch((error) => {
  //               console.error('Error:', error)
  //           })
  //       }
  // }
  // // const handleLogin = e => {
  // //   e.preventDefault();
  // //   setUser(true);
  // //   console.log(user)
  // // }

  // const handleLogout = e => {
  //   e.preventDefault();
  //   setUser(false);
  // }


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
