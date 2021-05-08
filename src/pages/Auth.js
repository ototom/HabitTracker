import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/auth.css';

const Auth = () => {
    const { mode } = useParams();
    const [isLoginMode, setIsLoginMode] = useState(false);

    useEffect(() => {
        if (mode === 'sign-in') {
            setIsLoginMode(true);
        } else {
            setIsLoginMode(false);
        }
    }, [mode]);

    return (
        <div className='auth__container'>
            <div className='auth__heading'>
                <h1>{isLoginMode ? 'Login' : 'Sign up'}</h1>
            </div>
            <form className='auth__form'>
                <input type='email' />
                <input type='password' />
                <button>{isLoginMode ? 'Login' : 'Sign up'}</button>
            </form>
            {isLoginMode ? (
                <p className='auth__switcher'>
                    Don't have an account?
                    <Link to='/auth/sign-up' style={{ marginLeft: '.5rem' }}>
                        Create one!
                    </Link>
                </p>
            ) : (
                <p className='auth__switcher'>
                    Already have an account?
                    <Link to='/auth/sign-in' style={{ marginLeft: '.5rem' }}>
                        Switch to login page
                    </Link>
                </p>
            )}
        </div>
    );
};

export default Auth;
