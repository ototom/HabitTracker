import PropTypes from 'prop-types';
import './HabitDetailsHeader.css';

const HabitDetailsHeader = ({ closeHandler, name }) => {
    return (
        <div className='details__header'>
            <button className='details__close-btn' onClick={closeHandler}>
                <i className='fas fa-arrow-left'></i>
            </button>
            <h2>{name}</h2>
        </div>
    );
};

HabitDetailsHeader.propTypes = {
    closeHandler: PropTypes.func,
    name: PropTypes.string,
};

export default HabitDetailsHeader;
