import { useEffect, useState } from 'react';
import EmptyHabitList from './EmptyHabitList';
import HabitItem from './HabitItem';
import './HabitList.css';

const HabitList = ({ habits }) => {
    const [isToDoListOpen, setIsToDoListOpen] = useState(true);
    const [isDoneListOpen, setIsDoneListOpen] = useState(false);
    const [habitsToDo, setHabitsToDo] = useState([]);
    const [habitsCompleted, setHabitsCompleted] = useState([]);

    useEffect(() => {
        if (habits.length === 0) return;
        // Fake mechanism
        // TODO: replace with normal one
        const habitsToDo = habits.filter((habit, i) => i !== 6);
        const habitsCompleted = habits.filter((habit, i) => i === 6);
        setHabitsToDo(habitsToDo);
        setHabitsCompleted(habitsCompleted);
    }, [habits]);

    return (
        <div className='habit-list'>
            {habits.length === 0 && <EmptyHabitList />}
            <div
                className='habit-list__header'
                onClick={() => setIsToDoListOpen((prev) => !prev)}
            >
                <i
                    className={`fas fa-chevron-${
                        isToDoListOpen ? 'down' : 'right'
                    }`}
                ></i>
                <h2>To do</h2>
            </div>
            {isToDoListOpen ? (
                habitsToDo.length > 0 ? (
                    <ul>
                        {habitsToDo.map((habit) => (
                            <HabitItem key={habit.id} habit={habit} />
                        ))}
                    </ul>
                ) : (
                    <div className='empty-list-placeholder'>
                        This list is empty
                    </div>
                )
            ) : null}
            <div
                className='habit-list__header'
                onClick={() => setIsDoneListOpen((prev) => !prev)}
            >
                <i
                    className={`fas fa-chevron-${
                        isDoneListOpen ? 'down' : 'right'
                    }`}
                ></i>
                <h2>Done</h2>
            </div>
            {isDoneListOpen ? (
                habitsCompleted.length > 0 ? (
                    <ul>
                        {habitsCompleted.map((habit) => (
                            <HabitItem key={habit.id} habit={habit} />
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

export default HabitList;
