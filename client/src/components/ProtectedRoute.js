import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "contexts/UserContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const value = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                value.user ? (
                    <Component {...rest} {...props} />
                ) : (
                    <Redirect to={"/signup"} />
                )
            }
        />
    );
};

export default ProtectedRoute;
