import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import HabitDetails from '../components/HabitDetails/HabitDetails';

const Habits = () => {
    const selectedHabitId = useLocation().search.split('=')[1];
    const route = useRouteMatch();

    return (
        <>
            <div>
                <ul>
                    <li>
                        <Link to={`${route.url}?id=1`}>habit 1</Link>
                    </li>
                    <li>
                        <Link to={`${route.url}?id=2`}>habit 3</Link>
                    </li>
                    <li>
                        <Link to={`${route.url}?id=3`}>habit 3</Link>
                    </li>
                    <li>
                        <Link to={`${route.url}?id=4`}>habit 4</Link>
                    </li>
                </ul>
            </div>
            <HabitDetails id={selectedHabitId} />
        </>
    );
};

export default Habits;
