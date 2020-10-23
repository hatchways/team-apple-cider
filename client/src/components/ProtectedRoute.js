import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import UserContext from '../contexts/UserContext'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const value=useContext(UserContext)
  return (
    <Route {...rest} render={
      props => {
        if (value.user) {
          return <Component {...rest} {...props} />
        }
      }
    } />
  )
}

export default ProtectedRoute;