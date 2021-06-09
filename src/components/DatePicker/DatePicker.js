import { isSameDay, format } from 'date-fns';
import { useContext } from 'react';
import { dateContext } from '../../context/date-context';
import './DatePicker.css';

const DatePicker = () => {
    const { date, returnToToday, addDay, subDay } = useContext(dateContext);

    return (
        <div className='datepicker'>
            <div className='datepicker__controls'>
                <button
                    onClick={subDay}
                    className='datepicker__btn datepicker__btn--left'
                >
                    <i className='fas fa-chevron-left'></i>
                </button>
                {format(date, 'd MMMM yyyy')}
                <button
                    onClick={addDay}
                    className='datepicker__btn datepicker__btn--right'
                >
                    <i className='fas fa-chevron-right'></i>
                </button>
            </div>

            <button
                className='datepicker__return-btn'
                onClick={returnToToday}
                disabled={isSameDay(new Date(), date)}
            >
                Today
            </button>
        </div>
    );
};

export default DatePicker;
