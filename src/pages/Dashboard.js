import { useCallback, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import './Dashboard.css';

import Sidebar from '../components/Sidebar/Sidebar';
import NotFound from './NotFound';
import Habits from './Habits';
import HabitsProvider from '../context/habits-context';
import DateProvider from '../context/date-context';
import MobileTopBar from '../components/MobileTopBar/MobileTopBar';
import Settings from './Settings';

const Dashboard = () => {
    const [isSidebarOpen, setisSidebarOpen] = useState(false);

    const openSidebarHandler = () => setisSidebarOpen(true);
    const closeSidebarHandler = useCallback(() => setisSidebarOpen(false), []);

    return (
        <DateProvider>
            <HabitsProvider>
                <MobileTopBar openSidebarHandler={openSidebarHandler} />
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
                        <Route path='/user'>
                            <Settings />
                        </Route>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </HabitsProvider>
        </DateProvider>
    );
};

export default Dashboard;
