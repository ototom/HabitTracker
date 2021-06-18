import { format, isSameMonth } from 'date-fns';
import HabitDetailsWidget from './HabitDetailsWidget';
import './HabitDetailsStats.css';
import PropTypes from 'prop-types';

const HabitDetailsStats = ({ date, habit }) => {
    return (
        <HabitDetailsWidget header='Checked Days' className='details__stats'>
            <div className='details__stats-data-wrapper'>
                <div className='details__stats-data-row'>
                    <div className='details__stats-data-col'>
                        {format(date, 'MMMM')}
                    </div>
                    <div className='details__stats-data-col move-right'>
                        {
                            habit.checkedDays.filter((day) =>
                                isSameMonth(day, date)
                            ).length
                        }
                    </div>
                </div>
                <div className='details__stats-data-row'>
                    <div className='details__stats-data-col'>Total</div>
                    <div className='details__stats-data-col move-right'>
                        {habit.checkedDays.length}
                    </div>
                </div>
            </div>
        </HabitDetailsWidget>
    );
};

HabitDetailsStats.propTypes = {
    date: PropTypes.object,
    habit: PropTypes.object,
};

export default HabitDetailsStats;
