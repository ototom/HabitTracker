import { useContext } from 'react';
import { authContext } from '../../context/auth-context';
import SidebarMenuItem from './SidebarMenuItem';
import './SidebarMenu.css';

const SidebarMenu = () => {
    const { logout } = useContext(authContext);

    return (
        <div className='sidebar__menu'>
            <ul>
                <SidebarMenuItem to='/' exact>
                    <i className='fas fa-home'></i>Home
                </SidebarMenuItem>
                <SidebarMenuItem to='/user'>
                    <i className='fas fa-cog'></i>Settings
                </SidebarMenuItem>
                <SidebarMenuItem to='/add'>
                    <i className='fas fa-plus-circle'></i>Add New Habit
                </SidebarMenuItem>
                <SidebarMenuItem onClick={logout}>
                    <i className='fas fa-sign-out-alt'></i>Logout
                </SidebarMenuItem>
            </ul>
        </div>
    );
};

export default SidebarMenu;
