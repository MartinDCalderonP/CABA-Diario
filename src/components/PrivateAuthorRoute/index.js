/* eslint-disable react/function-component-definition, react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateAuthorRoute(props) {
  if (props.user?.role === 'Autor') {
    return <Route {...props} />
  }

  return <Redirect to={{ pathname: '/' }} />
}

export default PrivateAuthorRoute
