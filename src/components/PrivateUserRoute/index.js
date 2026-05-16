/* eslint-disable react/function-component-definition, react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateUserRoute(props) {
  if (props.user?.role === 'Usuario') {
    return <Route {...props} />
  }

  return <Redirect to={{ pathname: '/' }} />
}

export default PrivateUserRoute
