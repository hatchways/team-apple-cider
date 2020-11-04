import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Page from "layout/Page";
import Body from "layout/Body";

const UserContext = React.createContext({});

export function UserStore(props) {
  const [userId, setUserId] = useState('');
  const checkCookie = () =>{
    fetch("/auth/status", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success"){
          setUser(true);
          setUserId(response.data.user_id)
        } 
        
        else setUser(false);
        setLoading(false);
      })
      .catch((error) => setUser(false));
    }

  const [user, setUser] = useState(checkCookie());
  const [loading, setLoading] = useState(true);

  const handleSignup = (name, email, password, confirm) =>
    fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        confirm: confirm,
      }),
    })
      .then((response) => response.json())
      .then(function (response) {
        if (response.status === "success") {
          setUser(true);
          return response;
        } else return response;
      })
      .catch((error) => {
        return false;
      });

  const handleLogin = (email, password) =>
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          setUser(true);
          return response;
        } else return response;
      })
      .catch((error) => {
        return false;
      });

  const handleLogout = () => {
    fetch("/auth/logout", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setUser(false))
      .catch((error) => setUser(false));
  };

  if (loading)
    return (
      <Page>
        <Body>
          <CircularProgress />
        </Body>
      </Page>
    );
  return (
    <UserContext.Provider
      value={{
        user: user,
        userId:userId,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        handleSignup: handleSignup,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
export default UserContext;
