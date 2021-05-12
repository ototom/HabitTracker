const AuthHeader = ({ isLoginMode }) => {
    return (
        <div className='auth__heading'>
            <h1>{isLoginMode ? 'Login' : 'Sign up'}</h1>
        </div>
    );
};

export default AuthHeader;
