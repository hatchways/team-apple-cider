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
        console.error("Error:", error);
        setUser(false);
      });
  const [user, setUser] = useState(checkCookie());
  const handleSignup =(name, email, password, confirm) => {
    
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
            console.log("Success:", email);
            setUser(true);
            return true;
          } else {
            // handleSnack(response.message);
            console.log(response.message);
            return false;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
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
        console.log(response);
        if (response.status === "success") {
          console.log("Success:", email);
          setUser(true);
          return true;
        } else {
          window.alert(response.message);
          console.log(response.message);
          return false;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });

  const handleLogout = () => {
    fetch("/auth/logout", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          console.log("Logout successful");
          setUser(false);
        } else {
          setUser(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
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
