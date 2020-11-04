import React, { useState } from "react";
const ListContext = React.createContext({});

export function ListStore(props) {
const [listChange, setListChange] = useState(true);

const listToggle = () => {
    setListChange(!listChange);
}
return (
    <ListContext.Provider
      value={{
          listToggle :listToggle,
          listChange : listChange
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
 }

export default ListContext;
