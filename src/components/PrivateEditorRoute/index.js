import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateEditorRoute = (props) => {
  if (props.user?.role === 'Editor') {
    return <Route {...props} />
  }

  return <Redirect to={{ pathname: '/' }} />
}

export default PrivateEditorRoute
