import { Link } from 'react-router-dom';
import './Button.css';
import PropTypes from 'prop-types';

export const BUTTON_OPTIONS = {
    small: 'btn--small',
    neutral: 'btn--neutral',
    danger: 'btn--danger',
    outline: 'btn--outline',
};

const Button = ({
    variant,
    onClick,
    to,
    className,
    isLoading,
    options = [],
    ...props
}) => {
    const button =
        variant === 'link' ? (
            <Link
                {...props}
                to={to}
                className={`btn ${className || ''} ${options.join(' ')} `}
            />
        ) : (
            <button
                {...props}
                onClick={onClick}
                className={`btn ${isLoading ? 'btn--loading' : ''} ${
                    className || ''
                } ${options.join(' ')}`}
            />
        );

    return button;
};

Button.propTypes = {
    variant: PropTypes.string,
    onClick: PropTypes.func,
    to: PropTypes.string,
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    options: PropTypes.array,
};

export default Button;
