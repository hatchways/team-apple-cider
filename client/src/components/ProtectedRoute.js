import React, { useContext } from "react";
import { Route } from "react-router-dom";
import Login from "components/Login";
import UserContext from "contexts/UserContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const value = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        value.user ? <Component {...rest} {...props} /> : <Login />
      }
    />
  );
};

export default ProtectedRoute;
