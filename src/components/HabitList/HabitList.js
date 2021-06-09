import { useState } from 'react';
import HabitItem from './HabitItem';
import PropTypes from 'prop-types';
import './HabitList.css';

const HabitList = ({ habits, onCheckboxClick, name }) => {
    const [isListOpen, setIsListOpen] = useState(true);

    return (
        <div className='habit-list'>
            <div
                className='habit-list__header'
                onClick={() => setIsListOpen((prev) => !prev)}
            >
                <i
                    className={`fas fa-chevron-${
                        isListOpen ? 'down' : 'right'
                    }`}
                ></i>
                <h2>{name}</h2>
            </div>
            {isListOpen ? (
                habits.length > 0 ? (
                    <ul>
                        {habits.map((habit) => (
                            <HabitItem
                                key={habit.id}
                                habit={habit}
                                onCheckboxClick={onCheckboxClick}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className='empty-list-placeholder'>
                        This list is empty
                    </div>
                )
            ) : null}
        </div>
    );
};

HabitList.propTypes = {
    habits: PropTypes.array,
    onCheckboxClick: PropTypes.func,
    name: PropTypes.string,
};

export default HabitList;
