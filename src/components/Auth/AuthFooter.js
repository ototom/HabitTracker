import { Link } from 'react-router-dom';

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
            >
                {isLoginMode ? 'Create one!' : 'Switch to the login page'}
            </Link>
        </p>
    );
};

export default AuthFooter;
