import { useForm } from '../../hooks/use-form';
import Button from '../shared/Button/Button';
import Input from '../shared/Input/Input';
import PropTypes from 'prop-types';
import Alert from '../shared/Alert/Alert';

const PersonalDetailsSection = ({ user, updateProfile }) => {
    const { values, onInputChange, errors, submitHandler } = useForm({
        initialValues: { username: user.displayName },
        validateRules: { username: { req: true } },
        onSubmit: (values) => {
            updateProfile({ displayName: values.username });
        },
    });

    return (
        <div className='settings__section'>
            <form onSubmit={submitHandler}>
                <h3>Personal details</h3>
                <Alert errors={errors} />
                <Input
                    type='text'
                    name='username'
                    id='username'
                    value={values.username}
                    onChange={onInputChange}
                    label='Username'
                />
                <Button>Update</Button>
            </form>
        </div>
    );
};

PersonalDetailsSection.propTypes = {
    user: PropTypes.object,
    updateProfile: PropTypes.func,
};

export default PersonalDetailsSection;
