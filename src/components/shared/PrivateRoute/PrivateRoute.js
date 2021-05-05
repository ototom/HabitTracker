import React from 'react';
import { Route } from 'react-router';

const PrivateRoute = (props) => {
    return <Route {...props}>{props.children}</Route>;
};

export default PrivateRoute;
