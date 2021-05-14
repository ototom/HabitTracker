import Button from '../shared/Button/Button';
import Input from '../shared/Input/Input';
import PropTypes from 'prop-types';

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
            {errors.length > 0 && (
                // TODO: CREATE ALERT COMPONENT
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
            {/* TODO: add prop isLoading to the button component */}
            <Button
                disabled={isLoading}
                className={isLoading ? `btn--loading` : ``}
            >
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
