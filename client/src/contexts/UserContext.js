import React, { useState } from "react";
const UserContext = React.createContext({});

export function UserStore(props) {
  const [user, setUser] = useState(false);

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
    setUser(false);
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
export default UserContext;
