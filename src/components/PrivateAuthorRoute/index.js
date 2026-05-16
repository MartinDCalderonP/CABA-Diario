import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateAuthorRoute = (props) => {
  if (props.user?.role === 'Autor') {
    return <Route {...props} />
  }

  return <Redirect to={{ pathname: '/' }} />
}

export default PrivateAuthorRoute
