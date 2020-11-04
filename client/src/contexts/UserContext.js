import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Page from "layout/Page";
import Body from "layout/Body";
import { socket } from "sockets";

const UserContext = React.createContext({});
export function UserStore(props) {
  const checkCookie = () =>
    fetch("/auth/status", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") setUser(true);
        else setUser(false);
        setLoading(false);
      })
      .catch((error) => setUser(false));

  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkCookie();
  }, []);

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

  useEffect(() => {
    if (user) {
      socket.open();
      socket.on("someEvent", (message) => {
        console.log(message);
      });
      return () => socket.disconnect();
    }
  }, [user]);

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
