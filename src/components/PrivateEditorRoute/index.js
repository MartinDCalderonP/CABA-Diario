/* eslint-disable react/function-component-definition, react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateEditorRoute(props) {
  if (props.user?.role === 'Editor') {
    return <Route {...props} />
  }

  return <Redirect to={{ pathname: '/' }} />
}

export default PrivateEditorRoute
