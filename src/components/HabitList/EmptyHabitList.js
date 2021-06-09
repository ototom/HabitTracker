import noHabitsImg from '../../assets/no-habits.svg';
import './EmptyHabitList.css';

const EmptyHabitList = () => {
    return (
        <div className='empty-list'>
            <img src={noHabitsImg} alt='Empty list' />
            <h3>There are no habits yet</h3>
            <h4>Maybe you should add one?</h4>
        </div>
    );
};

export default EmptyHabitList;
