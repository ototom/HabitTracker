import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Button from '../components/shared/Button/Button';
import Input from '../components/shared/Input/Input';
import '../styles/auth.css';

const Auth = () => {
    const { mode } = useParams();
    const history = useHistory();
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (mode === 'sign-in') {
            setIsLoginMode(true);
        } else if (mode === 'sign-up') {
            setIsLoginMode(false);
        } else {
            history.push('/auth/sign-up');
        }
    }, [mode, history]);

    return (
        <div className='auth__container'>
            <div className='auth__heading'>
                <h1>{isLoginMode ? 'Login' : 'Sign up'}</h1>
            </div>
            <form className='auth__form'>
                <Input
                    type='email'
                    disabled={isLoading}
                    id='mail'
                    name='mail'
                    label='Email:'
                    placeholder='Enter your email address'
                />
                <Input
                    type='password'
                    disabled={isLoading}
                    id='password'
                    name='password'
                    label='Password:'
                    placeholder='Enter password'
                />
                <Button
                    onClick={() => setIsLoading(true)}
                    disabled={isLoading}
                    className={isLoading ? `btn--loading` : ``}
                >
                    {isLoginMode ? 'Login' : 'Sign up'}
                </Button>
            </form>
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
        </div>
    );
};

export default Auth;
