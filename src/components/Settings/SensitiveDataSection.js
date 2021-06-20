import { useForm } from '../../hooks/use-form';
import Button from '../shared/Button/Button';
import Input from '../shared/Input/Input';
import PropTypes from 'prop-types';
import Alert from '../shared/Alert/Alert';

const SensitiveDataSection = ({ user, updateSensitiveData }) => {
    const { onInputChange, submitHandler, values, errors, setError } = useForm({
        validateRules: {
            email: { type: 'EMAIL', req: true },
            confirmChanges: { req: true },
        },
        initialValues: {
            email: user.email,
            newPassword: '',
            newPasswordConfirm: '',
            confirmChanges: '',
        },
        onSubmit: async (values) => {
            if (values.newPassword && values.newPassword.length < 6) {
                setError('Password field must contain at least 6 characters');
                return;
            } else if (values.newPassword && !values.newPasswordConfirm) {
                setError('Password must be repeated');
                return;
            } else if (values.newPassword !== values.newPasswordConfirm) {
                setError('Passwords do not match');
                return;
            }

            const error = await updateSensitiveData(
                { password: values.confirmChanges },
                {
                    email: values.email,
                    password: values.newPassword,
                }
            );

            if (error) {
                setError(error);
            }
        },
    });

    return (
        <div className='settings__section'>
            <form onSubmit={submitHandler}>
                <h3>Sensitive data</h3>
                <Alert errors={errors} />
                <Input
                    type='email'
                    name='email'
                    id='email'
                    value={values.email}
                    onChange={onInputChange}
                    label='Email'
                />
                <Input
                    type='password'
                    name='newPassword'
                    id='newPassword'
                    value={values.newPassword}
                    onChange={onInputChange}
                    label='New password'
                />
                <Input
                    type='password'
                    name='newPasswordConfirm'
                    id='newPasswordConfirm'
                    value={values.newPasswordConfirm}
                    onChange={onInputChange}
                    label='New password - confirm'
                />
                <Input
                    type='password'
                    name='confirmChanges'
                    id='confirmChanges'
                    value={values.confirmChanges}
                    onChange={onInputChange}
                    label='Confirm changes'
                />
                <Button>Update</Button>
            </form>
        </div>
    );
};

SensitiveDataSection.propTypes = {
    user: PropTypes.object,
    updateSensitiveData: PropTypes.func,
};

export default SensitiveDataSection;
