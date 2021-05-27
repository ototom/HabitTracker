import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import SidebarCloseBtn from './SidebarCloseBtn';
import SidebarMenu from './SidebarMenu';
import UserProfile from './UserProfile';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeHandler }) => {
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
            <UserProfile />
            <SidebarMenu />
        </div>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool,
    closeHandler: PropTypes.func,
};

export default Sidebar;
