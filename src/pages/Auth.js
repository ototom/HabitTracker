import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './Auth.css';
import { useForm } from '../hooks/use-form';
import { authContext } from '../context/auth-context';
import AuthForm from '../components/Auth/AuthForm';
import AuthFooter from '../components/Auth/AuthFooter';
import AuthHeader from '../components/Auth/AuthHeader';

const Auth = () => {
    const { mode } = useParams();
    const history = useHistory();
    const { signIn, signUp } = useContext(authContext);
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (values) => {
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
                await signUp(values.mail, values.password, values.username);
                setIsLoading(false);
                history.push('/auth/sign-in');
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        }
    };

    const {
        onInputChange,
        submitHandler,
        values,
        errors,
        clearErrors,
        setError,
    } = useForm({
        initialValues: { mail: '', password: '', username: '' },
        validateRules: {
            mail: { type: 'EMAIL', req: true },
            username: isLoginMode ? {} : { req: true, min: 3, max: 15 },
            password: { req: true, min: isLoginMode ? null : 6 },
        },
        onSubmit,
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
            <AuthHeader isLoginMode={isLoginMode} />
            <AuthForm
                isLoginMode={isLoginMode}
                isLoading={isLoading}
                errors={errors}
                values={values}
                onInputChange={onInputChange}
                submitHandler={submitHandler}
            />
            <AuthFooter isLoginMode={isLoginMode} isLoading={isLoading} />
        </div>
    );
};

export default Auth;
