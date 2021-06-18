import {
    getDate,
    isSameDay,
    parseISO,
    subMonths,
    addMonths,
    format,
    isSameMonth,
} from 'date-fns';
import { useContext } from 'react';
import { habitsContext } from '../../context/habits-context';
import './HabitDetailsCalendar.css';
import HabitDetailsWidget from './HabitDetailsWidget';
import PropTypes from 'prop-types';

const HabitDetailsCalendar = ({
    habitId,
    calendar,
    setDate,
    date,
    updateDay,
}) => {
    const { checkHabit, uncheckHabit } = useContext(habitsContext);

    const checkDay = (e) => {
        if (e.target.classList.contains('blocked')) return;
        if (!e.target.dataset.date) return;

        updateDay(
            e.target.dataset.date,
            !e.target.classList.contains('checked')
        );

        if (e.target.classList.contains('checked')) {
            uncheckHabit(new Date(e.target.dataset.date), habitId);
        } else {
            checkHabit(new Date(e.target.dataset.date), habitId);
        }
    };

    const prevMonth = () => setDate((prevDate) => subMonths(prevDate, 1));
    const nextMonth = () => setDate((prevDate) => addMonths(prevDate, 1));
    const returnToCurrentMonth = () => setDate(new Date());

    return (
        <HabitDetailsWidget className='calendar'>
            <div className='calendar__controls'>
                <h3>{format(date, 'MMMM yy')}</h3>
                <div className='calendar__btns-container'>
                    {!isSameMonth(date, new Date()) && (
                        <button onClick={returnToCurrentMonth}>
                            <i className='fas fa-undo'></i>
                        </button>
                    )}
                    <button onClick={prevMonth}>
                        <i className='fas fa-chevron-left'></i>
                    </button>
                    <button onClick={nextMonth}>
                        <i className='fas fa-chevron-right'></i>
                    </button>
                </div>
            </div>
            <div className='calendar__header'>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
            </div>
            <div onClick={checkDay}>
                {calendar.map((week, i) => {
                    return (
                        <div key={i} className='calendar__week'>
                            {week.map((day, i) => {
                                return (
                                    <div
                                        key={i}
                                        data-date={day.date}
                                        className={`${
                                            day.checked ? 'checked' : ''
                                        } ${
                                            isSameDay(
                                                parseISO(day.date),
                                                new Date()
                                            )
                                                ? 'today'
                                                : ''
                                        } ${
                                            day.isBlocked ? 'blocked' : ''
                                        } calendar__day`}
                                    >
                                        {getDate(new Date(day.date))}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </HabitDetailsWidget>
    );
};

HabitDetailsCalendar.propTypes = {
    habitId: PropTypes.string,
    calendar: PropTypes.array,
    setDate: PropTypes.func,
    date: PropTypes.object,
    updateDay: PropTypes.func,
};

export default HabitDetailsCalendar;
