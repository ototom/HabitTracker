import './MobileTopBar.css';
import PropTypes from 'prop-types';

const MobileTopBar = ({ openSidebarHandler }) => {
    return (
        <div className='topbar'>
            <button className='menu-btn' onClick={openSidebarHandler}>
                <i className='fas fa-bars'></i>
            </button>
        </div>
    );
};

MobileTopBar.propTypes = {
    openSidebarHandler: PropTypes.func,
};

export default MobileTopBar;
