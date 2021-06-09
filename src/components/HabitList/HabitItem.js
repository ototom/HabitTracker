import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './HabitItem.css';

const HabitItem = ({ habit, onCheckboxClick }) => {
    const route = useRouteMatch();
    const selectedHabitId = useLocation().search.split('=')[1];

    const toggleHabitState = () => {
        onCheckboxClick(habit.date, habit.id);
    };

    return (
        <li
            className={`habit-list__item ${
                selectedHabitId === habit.id ? 'habit-list__item--active' : ''
            } ${habit.isCompleted ? 'checked' : ''}`}
        >
            <button className='habit-list__checkbox' onClick={toggleHabitState}>
                <span
                    className={`habit-list__checkbox-icon ${
                        habit.isCompleted ? 'checked' : ''
                    }`}
                ></span>
            </button>
            <Link to={`${route.url}?id=${habit.id}`}>{habit.name}</Link>
        </li>
    );
};

HabitItem.propTypes = {
    habit: PropTypes.object,
    onCheckboxClick: PropTypes.func,
};

export default HabitItem;
