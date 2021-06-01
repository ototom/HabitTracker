import { useHistory } from 'react-router';

import './HabitDetails.css';
import img from '../../assets/placeholder-img.svg';

const HabitDetails = ({ id }) => {
    const history = useHistory();

    const closeHandler = () => {
        history.push('/');
    };

    return (
        <div className={`details ${id ? 'details--is-open' : ''}`}>
            {id ? (
                <div>
                    <button
                        className='details__close-btn'
                        onClick={closeHandler}
                    >
                        <i className='fas fa-times'></i>
                    </button>
                    DETAILS CONTENT - {id}
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default HabitDetails;
