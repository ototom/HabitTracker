import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const SidebarMenuItem = ({ onClick, exact, to, children }) => {
    const element = to ? (
        <NavLink to={to} exact={exact}>
            {children}
        </NavLink>
    ) : (
        <button onClick={onClick}>{children}</button>
    );

    return <li>{element}</li>;
};

SidebarMenuItem.propTypes = {
    onClick: PropTypes.func,
    exact: PropTypes.bool,
    to: PropTypes.string,
    children: PropTypes.node,
};

export default SidebarMenuItem;
