import React, { useState, useEffect, createContext, useContext } from "react";
import UserContext from "contexts/UserContext";

const ListContext = createContext({});

export const ListStore = (props) => {
    const [listsLoading, setListsLoading] = useState(true);
    const userId = useContext(UserContext).userId;
    const [listsChange, setListsChange] = useState(true);
    const [productChange, setProductChange] = useState(true);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        async function getLists() {
            const res = await fetch(`/lists?user_id=${userId}`);
            const json = await res.json();
            setLists(json);
            setListsLoading(false);
        }
        getLists();
    }, [listsChange]);

    const productToggle = () => setProductChange((cur) => !cur);
    const listsToggle = () => setListsChange((cur) => !cur);

    return (
        <ListContext.Provider
            value={{
                productToggle,
                productChange,
                listsToggle,
                lists,
                listsLoading
            }}
        >
            {props.children}
        </ListContext.Provider>
    );
};

export default ListContext;
