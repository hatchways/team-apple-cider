import React from 'react';
import { Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (user) {
          return <Component {...rest} {...props} />
        }
      }
    } />
  )
}

export default ProtectedRoute;