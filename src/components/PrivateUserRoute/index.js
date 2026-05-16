import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateUserRoute = (props) => {
  if (props.user?.role === 'Usuario') {
    return <Route {...props} />
  }

  return <Redirect to={{ pathname: '/' }} />
}

export default PrivateUserRoute
