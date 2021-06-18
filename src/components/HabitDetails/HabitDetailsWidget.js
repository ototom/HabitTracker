import PropTypes from 'prop-types';
import './HabitDetailsWidget.css';

const HabitDetailsWidget = ({ children, className, header }) => {
    return (
        <div className={`${className} details__widget`}>
            {header && <h3>{header}</h3>}
            {children}
        </div>
    );
};

HabitDetailsWidget.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    header: PropTypes.string,
};

export default HabitDetailsWidget;
