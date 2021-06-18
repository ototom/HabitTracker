import { useHistory } from 'react-router';
import './HabitDetails.css';
import { useContext, useEffect, useState } from 'react';
import { habitsContext } from '../../context/habits-context';
import { dateContext } from '../../context/date-context';
import HabitDetailsStats from './HabitDetailsStats';
import HabitDetailsPlaceholder from './HabitDetailsPlaceholder';
import HabitDetailsFooter from './HabitDetailsFooter';
import HabitDetailsCalendar from './HabitDetailsCalendar';
import HabitDetailsHeader from './HabitDetailsHeader';
import { useCalendar } from '../../hooks/use-calendar';
import PropTypes from 'prop-types';

const HabitDetails = ({ id }) => {
    const { getHabitById, deleteHabit } = useContext(habitsContext);
    const { date } = useContext(dateContext);
    const [habit, setHabit] = useState({ checkedDays: [] });

    useEffect(() => {
        if (!id) return;
        const habit = getHabitById(id);

        if (!habit) return;

        setHabit(habit);
    }, [id, getHabitById]);

    const { calendar, setDate, calendarDate, updateDay } = useCalendar(
        new Date(),
        habit.checkedDays
    );

    const history = useHistory();

    const closeHandler = () => {
        history.push('/');
    };

    return (
        <div className={`details ${id ? 'details--is-open' : ''}`}>
            {id && habit.name ? (
                <>
                    <HabitDetailsHeader
                        closeHandler={closeHandler}
                        name={habit.name}
                    />
                    <HabitDetailsCalendar
                        checkedDays={habit.checkedDays}
                        initialDate={date}
                        habitId={habit.id}
                        calendar={calendar}
                        setDate={setDate}
                        date={calendarDate}
                        updateDay={updateDay}
                    />
                    <HabitDetailsStats date={calendarDate} habit={habit} />
                    <HabitDetailsFooter
                        deleteHabit={deleteHabit.bind(this, habit.id)}
                        closeSidebar={closeHandler}
                        habitName={habit.name}
                        habitId={habit.id}
                    />
                </>
            ) : (
                <HabitDetailsPlaceholder />
            )}
        </div>
    );
};

HabitDetails.propTypes = {
    id: PropTypes.string,
};

export default HabitDetails;
