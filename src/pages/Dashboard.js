import {
    useCallback,
    useEffect,
    useState,
    useReducer,
    useContext,
} from 'react';
import { firestore } from '../firebase';
import { Redirect, Route, Switch } from 'react-router';

import './Dashboard.css';

import Sidebar from '../components/Sidebar/Sidebar';
import NotFound from './NotFound';
import Habits from './Habits';
import { authContext } from '../context/auth-context';

const habitsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_HABITS': {
            return action.payload;
        }
        case 'ADD_NEW': {
            return [...state, action.payload];
        }
        default: {
            return state;
        }
    }
};

const Dashboard = () => {
    const { user } = useContext(authContext);
    const [habits, dispatch] = useReducer(habitsReducer, []);
    const [isSidebarOpen, setisSidebarOpen] = useState(false);

    const fetchHabits = useCallback(() => {
        if (!user) return;

        firestore
            .collection('habits')
            .where('user', '==', user.uid)
            .get()
            .then((snapshot) => {
                const habitsArray = [];
                snapshot.forEach((doc) =>
                    habitsArray.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                );

                dispatch({ type: 'SET_HABITS', payload: habitsArray });
            });
    }, [user]);

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    const addNewHabitHandler = (habit) => {
        dispatch({ type: 'ADD_NEW', payload: habit });
    };

    const openSidebarHandler = () => setisSidebarOpen(true);
    const closeSidebarHandler = useCallback(() => setisSidebarOpen(false), []);

    return (
        <div>
            <div className='topbar'>
                <button className='menu-btn' onClick={openSidebarHandler}>
                    <i className='fas fa-bars'></i>
                </button>
            </div>
            <Sidebar
                isOpen={isSidebarOpen}
                closeHandler={closeSidebarHandler}
                addNewHabitHandler={addNewHabitHandler}
            />
            <div className='content'>
                <Switch>
                    <Redirect from='/' to='/habits' exact />
                    <Route path='/habits'>
                        <Habits habits={habits} />
                    </Route>
                    <Route path='/user'>user settings</Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Dashboard;
