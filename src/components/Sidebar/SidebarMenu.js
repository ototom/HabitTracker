import { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { authContext } from '../../context/auth-context';

import SidebarMenuItem from './SidebarMenuItem';
import AddTaskForm from '../AddTaskForm/AddTaskForm';

import './SidebarMenu.css';

const SidebarMenu = ({ closeSidebarHandler }) => {
    const { logout } = useContext(authContext);
    const [isAddTaskMode, setIsAddTaskMode] = useState(false);

    const showAddTaskForm = () => {
        closeSidebarHandler();
        setIsAddTaskMode(true);
    };

    const hideAddTaskForm = useCallback(() => setIsAddTaskMode(false), []);

    return (
        <>
            <div className='sidebar__menu'>
                <ul>
                    <SidebarMenuItem to='/habits'>
                        <i className='fas fa-home'></i>Home
                    </SidebarMenuItem>
                    <SidebarMenuItem to='/user'>
                        <i className='fas fa-cog'></i>Settings
                    </SidebarMenuItem>
                    <SidebarMenuItem onClick={showAddTaskForm}>
                        <i className='fas fa-plus-circle'></i>Add New Habit
                    </SidebarMenuItem>
                    <SidebarMenuItem onClick={logout}>
                        <i className='fas fa-sign-out-alt'></i>Logout
                    </SidebarMenuItem>
                </ul>
            </div>
            {isAddTaskMode && <AddTaskForm hideForm={hideAddTaskForm} />}
        </>
    );
};

SidebarMenu.propTypes = {
    closeSidebarHandler: PropTypes.func,
};

export default SidebarMenu;
