import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Button from '../components/shared/Button/Button';
import Input from '../components/shared/Input/Input';
import '../styles/auth.css';
import { useForm } from '../hooks/use-form';
import { authContext } from '../context/auth-context';

const Auth = () => {
    const { mode } = useParams();
    const history = useHistory();
    const { signIn, signUp } = useContext(authContext);
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {
        onInputChange,
        submitHandler,
        values,
        errors,
        clearErrors,
        setError,
    } = useForm({
        initialValues: { mail: '', password: '' },
        validateRules: {
            mail: { type: 'EMAIL', req: true },
            password: { req: true, min: isLoginMode ? null : 6 },
        },
        onSubmit: async (values) => {
            setIsLoading(true);
            clearErrors();
            if (isLoginMode) {
                try {
                    await signIn(values.mail, values.password);
                    setIsLoading(false);
                    history.push('/');
                } catch (error) {
                    setIsLoading(false);
                    setError(error.message);
                }
            } else {
                try {
                    await signUp(values.mail, values.password);
                    setIsLoading(false);
                    history.push('/auth/sign-in');
                } catch (error) {
                    setIsLoading(false);
                    setError(error.message);
                }
            }
        },
    });

    useEffect(() => {
        clearErrors();
        if (mode === 'sign-in') {
            setIsLoginMode(true);
        } else if (mode === 'sign-up') {
            setIsLoginMode(false);
        } else {
            history.push('/auth/sign-up');
        }
    }, [mode, history, clearErrors]);

    return (
        <div className='auth__container'>
            <div className='auth__heading'>
                <h1>{isLoginMode ? 'Login' : 'Sign up'}</h1>
            </div>
            <form className='auth__form' onSubmit={submitHandler}>
                {errors.length > 0 && (
                    <div className='alert alert--red'>
                        There are following errors: <br />
                        {errors.map((error, i) => (
                            <li key={i}>{error}</li>
                        ))}
                    </div>
                )}
                <Input
                    type='email'
                    disabled={isLoading}
                    id='mail'
                    name='mail'
                    label='Email:'
                    placeholder='Enter your email address'
                    value={values.mail}
                    onChange={onInputChange}
                />
                <Input
                    type='password'
                    disabled={isLoading}
                    id='password'
                    name='password'
                    label='Password:'
                    placeholder='Enter password'
                    value={values.password}
                    onChange={onInputChange}
                />
                <Button
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
