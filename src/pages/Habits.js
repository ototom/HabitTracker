import { useLocation } from 'react-router-dom';
import DatePicker from '../components/DatePicker/DatePicker';
import HabitDetails from '../components/HabitDetails/HabitDetails';
import HabitList from '../components/HabitList/HabitList';
import { useContext } from 'react';
import { habitsContext } from '../context/habits-context';
import EmptyHabitList from '../components/HabitList/EmptyHabitList';

const Habits = () => {
    const { habits, checkHabit, uncheckHabit, getDataByDate } =
        useContext(habitsContext);

    const selectedHabitId = useLocation().search.split('=')[1];

    return (
        <>
            {habits.length > 0 && <DatePicker />}
            {habits.length === 0 ? (
                <EmptyHabitList />
            ) : (
                <>
                    <HabitList
                        habits={getDataByDate().filter(
                            (habit) => !habit.isCompleted
                        )}
                        name='To do'
                        onCheckboxClick={checkHabit}
                    />
                    <HabitList
                        habits={getDataByDate().filter(
                            (habit) => habit.isCompleted
                        )}
                        name='Done'
                        onCheckboxClick={uncheckHabit}
                    />
                </>
            )}
            {habits.length > 0 && <HabitDetails id={selectedHabitId} />}
        </>
    );
};

export default Habits;
