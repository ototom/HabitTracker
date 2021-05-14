import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthFooter = ({ isLoginMode, isLoading }) => {
    return (
        <p className='auth__switcher'>
            {isLoginMode
                ? `Don't have an account?`
                : 'Already have an account?'}
            <Link
                to={`/auth/sign-${isLoginMode ? 'up' : 'in'}`}
                style={{ marginLeft: '.5rem' }}
                className={isLoading ? `disabled` : ''}
                data-testid='change-mode-link'
            >
                {isLoginMode ? 'Create one!' : 'Switch to the login page'}
            </Link>
        </p>
    );
};

AuthFooter.propTypes = {
    isLoginMode: PropTypes.bool,
    isLoading: PropTypes.bool,
};

export default AuthFooter;
