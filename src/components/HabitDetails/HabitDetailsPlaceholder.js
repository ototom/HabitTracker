import img from '../../assets/placeholder-img.svg';
import './HabitDetailsPlaceholder.css';

const HabitDetailsPlaceholder = () => {
    return (
        <div className='placeholder'>
            <img
                className='placeholder__img'
                src={img}
                alt='Click the habit title to view its details'
            />
            <h3 className='placeholder__text'>
                Click the habit title to view its details
            </h3>
        </div>
    );
};

export default HabitDetailsPlaceholder;
