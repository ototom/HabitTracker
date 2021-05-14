import { Link } from 'react-router-dom';
import '../../../styles/button.css';
import PropTypes from 'prop-types';

const Button = ({ variant, onClick, to, className, ...props }) => {
    // TODO: add props like "color" and "isLoading" to the component
    // TODO: create object with all the options available for colors, sizes ect.
    const button =
        variant === 'link' ? (
            <Link {...props} to={to} className={`btn ${className}`} />
        ) : (
            <button
                {...props}
                onClick={onClick}
                className={`btn ${className}`}
            />
        );

    return button;
};

Button.propTypes = {
    variant: PropTypes.string,
    onClick: PropTypes.func,
    to: PropTypes.string,
    className: PropTypes.string,
};

export default Button;
