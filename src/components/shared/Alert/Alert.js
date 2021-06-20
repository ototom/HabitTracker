import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({ errors }) => {
    if (errors.length === 0) return null;
    return (
        <div className='alert alert--red'>
            There are following errors: <br />
            {errors.map((error, i) => (
                <li key={i}>{error}</li>
            ))}
        </div>
    );
};

Alert.propTypes = {
    errors: PropTypes.array,
};

export default Alert;
