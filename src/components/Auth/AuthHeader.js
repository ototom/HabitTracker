import PropTypes from 'prop-types';

const AuthHeader = ({ isLoginMode }) => {
    return (
        <div className='auth__heading'>
            <h1>{isLoginMode ? 'Login' : 'Sign up'}</h1>
        </div>
    );
};

AuthHeader.propTypes = {
    isLoginMode: PropTypes.bool,
};

export default AuthHeader;
