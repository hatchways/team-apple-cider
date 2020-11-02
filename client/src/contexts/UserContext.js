import React, { useState } from "react";
const UserContext = React.createContext({});

export function UserStore(props) {
  const checkCookie = () =>
    fetch("/auth/status", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          setUser(true);
        } else {
          setUser(false);
        }
      })
      .catch((error) => {
        setUser(false);
      });
  const [user, setUser] = useState(checkCookie());
  const handleSignup = (name, email, password, confirm) => {
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
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  };

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
        } else {
        }
      })
      .catch((error) => {
        return false;
      });

  const handleLogout = () => {
    fetch("/auth/logout", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setUser(false);
      })
      .catch((error) => {
        setUser(false);
      });
  };

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
