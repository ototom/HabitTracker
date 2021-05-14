import { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { authContext } from '../../../context/auth-context';
import PropTypes, { oneOfType } from 'prop-types';

const PrivateRoute = (props) => {
    const { user } = useContext(authContext);

    return (
        <Route {...props}>
            {user !== null ? props.children : <Redirect to='/auth/sign-in' />}
        </Route>
    );
};

PrivateRoute.propTypes = {
    to: PropTypes.string,
    children: oneOfType([PropTypes.object, PropTypes.string]),
    exact: PropTypes.bool,
};

export default PrivateRoute;
