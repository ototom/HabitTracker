import { useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import './HabitItem.css';

const HabitItem = ({ habit }) => {
    const [isMarkedAsDone, setIsMarkedAsDone] = useState(false);
    const route = useRouteMatch();
    const selectedHabitId = useLocation().search.split('=')[1];

    return (
        <li
            className={`habit-list__item ${
                selectedHabitId === habit.id ? 'habit-list__item--active' : ''
            } ${isMarkedAsDone ? 'checked' : ''}`}
        >
            <button
                className='habit-list__checkbox'
                onClick={() => setIsMarkedAsDone((prev) => !prev)}
            >
                <span
                    className={`habit-list__checkbox-icon ${
                        isMarkedAsDone ? 'checked' : ''
                    }`}
                ></span>
            </button>
            <Link to={`${route.url}?id=${habit.id}`}>{habit.name}</Link>
        </li>
    );
};

export default HabitItem;
