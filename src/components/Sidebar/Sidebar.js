import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import SidebarCloseBtn from './SidebarCloseBtn';
import SidebarMenu from './SidebarMenu';
import UserProfile from './UserProfile';
import './Sidebar.css';
import { authContext } from '../../context/auth-context';

const Sidebar = ({ isOpen, closeHandler, addNewHabitHandler }) => {
    const { user } = useContext(authContext);
    const history = useHistory();

    // NOTE: close sidebar when route changes
    useEffect(() => {
        history.listen(closeHandler);
    }, [history, closeHandler]);
    return (
        <div
            data-testid='sidebar'
            className={`sidebar ${isOpen ? 'sidebar--is-open' : ''}`}
        >
            <SidebarCloseBtn onClick={closeHandler} />
            {user && (
                <UserProfile
                    displayName={user.displayName}
                    mail={user.email}
                    photoURL={user.photoURL}
                />
            )}
            <SidebarMenu
                closeSidebarHandler={closeHandler}
                addNewHabitHandler={addNewHabitHandler}
            />
        </div>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool,
    closeHandler: PropTypes.func,
};

export default Sidebar;
