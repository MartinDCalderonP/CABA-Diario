import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default (props)=>{
    if (props.user && props.user.role==='Usuario') {
        return <Route {...props} />
    }

    return <Redirect to={{pathname:'/'}}/>
}