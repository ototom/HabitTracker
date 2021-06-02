import { useCallback, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import './Dashboard.css';

import Sidebar from '../components/Sidebar/Sidebar';
import NotFound from './NotFound';
import Habits from './Habits';

const Dashboard = () => {
    const [isSidebarOpen, setisSidebarOpen] = useState(false);

    const openSidebarHandler = () => setisSidebarOpen(true);
    const closeSidebarHandler = useCallback(() => setisSidebarOpen(false), []);

    return (
        <div>
            <button onClick={openSidebarHandler} className='menu-btn'>
                <i className='fas fa-bars'></i>
            </button>
            <Sidebar
                isOpen={isSidebarOpen}
                closeHandler={closeSidebarHandler}
            />
            <div className='content'>
                <Switch>
                    <Redirect from='/' to='/habits' exact />
                    <Route path='/habits'>
                        <Habits />
                    </Route>
                    <Route path='/user'>user settings</Route>
                    <Route path='/cal'>cal</Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Dashboard;
