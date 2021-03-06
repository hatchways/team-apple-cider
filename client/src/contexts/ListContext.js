import React, { useState, useEffect, createContext, useContext } from "react";
import UserContext from "contexts/UserContext";

const ListContext = createContext({});

export function ListStore(props) {
    const userId = useContext(UserContext).userId;
    const [listsChange, setListsChange] = useState(true);
    const [productChange, setProductChange] = useState(true);
    const [lists, setLists] = useState([]);

    //get request list
    useEffect(() => {
        async function getLists() {
            const res = await fetch(`/lists?user_id=${userId}`);
            const json = await res.json();
            setLists(json);
        }
        getLists();
    }, [listsChange, userId]);

    const productToggle = () => {
        setProductChange(!productChange);
    };

    const listsToggle = () => {
        setListsChange(!listsChange);
    };

    return (
        <ListContext.Provider
            value={{
                productToggle: productToggle,
                productChange: productChange,
                listsToggle: listsToggle,
                lists: lists,
                setLists: setLists
            }}
        >
            {props.children}
        </ListContext.Provider>
    );
}

export default ListContext;
