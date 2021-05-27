import PropTypes from 'prop-types';
import './SidebarCloseBtn.css';

const SidebarCloseBtn = ({ onClick }) => {
    return (
        <button className='sidebar__close-btn' onClick={onClick}>
            <i className='fas fa-times'></i>
        </button>
    );
};

SidebarCloseBtn.propTypes = {
    onClick: PropTypes.func,
};

export default SidebarCloseBtn;
