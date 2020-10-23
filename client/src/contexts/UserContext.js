import React, { useState } from 'react'
const UserContext=React.createContext({});

export function UserStore(props) {
    const [user, setUser] = useState(false)

    const handleLogin = (email, password) => {
        if (true) {
            fetch("/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password,
                })})
                .then(response => response.json())
                .then((response) => {
                    console.log(response)
                    if (response.status === 'success') {
                        console.log('Success:', email);
                        setUser(true);
                        console.log(user)
                    }
                    else {
                        window.alert(response.message);
                        console.log(response.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
            }
      }
      const handleLogout = () => {
        setUser(false);
      }
      return(
        <UserContext.Provider
        value={{user:user, handleLogin:handleLogin, handleLogout:handleLogout}}
        >
            {props.children}
        </UserContext.Provider>
      )

}
export default UserContext