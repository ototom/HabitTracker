import { useLocation } from 'react-router-dom';
import DatePicker from '../components/DatePicker/DatePicker';
import HabitDetails from '../components/HabitDetails/HabitDetails';
import HabitList from '../components/HabitList/HabitList';

const Habits = ({ habits }) => {
    const selectedHabitId = useLocation().search.split('=')[1];

    return (
        <>
            <DatePicker />
            <HabitList habits={habits} />
            {habits.length > 0 && <HabitDetails id={selectedHabitId} />}
        </>
    );
};

export default Habits;
