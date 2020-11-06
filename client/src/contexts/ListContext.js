import React, { useState,createContext } from "react";
const ListContext = createContext({});

export function ListStore(props) {
  const [listChange, setListChange] = useState(true);
  const [listDelete, setListDelete] = useState(true);

  const listToggle = () => {
    setListChange(!listChange);
  };
  const listDeleteToggle = () => {
    setListDelete(!listDelete);
  };
  return (
    <ListContext.Provider
      value={{
        listToggle: listToggle,
        listChange: listChange,
        listDeleteToggle: listDeleteToggle,
        listDelete: listDelete,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
}

export default ListContext;
