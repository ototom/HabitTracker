import { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { authContext } from '../../../context/auth-context';

const PrivateRoute = (props) => {
    const { user } = useContext(authContext);

    return (
        <Route {...props}>
            {user !== null ? props.children : <Redirect to='/auth/sign-in' />}
        </Route>
    );
};

export default PrivateRoute;
