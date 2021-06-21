import Button from '../shared/Button/Button';
import Input from '../shared/Input/Input';
import PropTypes from 'prop-types';
import Alert from '../shared/Alert/Alert';

const AuthForm = ({
    submitHandler,
    errors,
    isLoading,
    isLoginMode,
    values,
    onInputChange,
}) => {
    return (
        <form className='auth__form' onSubmit={submitHandler}>
            {isLoginMode && (
                <div className='alert alert--blue'>
                    <strong>Demo account:</strong>
                    <li>Email: demo@demo.com</li>
                    <li>Password: demo00</li>
                </div>
            )}
            <Alert errors={errors} />
            {!isLoginMode && (
                <Input
                    type='text'
                    disabled={isLoading}
                    id='username'
                    name='name'
                    label='Username:'
                    placeholder='Choose username'
                    value={values.username}
                    onChange={onInputChange}
                />
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
            <Button disabled={isLoading} isLoading={isLoading}>
                {isLoginMode ? 'Login' : 'Sign up'}
            </Button>
        </form>
    );
};

AuthForm.propTypes = {
    submitHandler: PropTypes.func,
    errors: PropTypes.array,
    isLoading: PropTypes.bool,
    isLoginMode: PropTypes.bool,
    values: PropTypes.object,
    onInputChange: PropTypes.func,
};

export default AuthForm;
