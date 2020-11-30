import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Page from "layout/Page";
import Body from "layout/Body";
import { socket } from "sockets";

const UserContext = React.createContext({});
export const UserStore = (props) => {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);

    async function checkCookie() {
        const response = await fetch("/auth/status");
        const json = await response.json();
        if (json.status === "success") {
            setUser(true);
            setUserId(json.data.user_id);
        } else setUser(false);
        setLoading(false);
    }

    useEffect(() => {
        checkCookie();
    }, []);

    const handleSignup = async (name, email, password, confirm) => {
        const response = await fetch("/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, confirm })
        });
        const json = await response.json();
        if (json.status === "success") setUser(true);
        return json;
    };

    const handleLogin = async (email, password) => {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        if (json.status === "success") setUser(true);
        return json;
    };

    const handleLogout = async () => {
        const response = await fetch("/auth/logout");
        const json = await response.json();
        setUser(false);
    };

    // useEffect(() => {
    //   if (user) {
    //     socket.open();
    //     socket.on("connection_message", (message) => {
    //       console.log(message);
    //     });
    //   } else return () => socket.disconnect();
    // }, [user]);

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
                user,
                userId,
                handleLogin,
                handleLogout,
                handleSignup
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
export default UserContext;
