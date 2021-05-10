import { Link } from 'react-router-dom';
import '../../../styles/button.css';

const Button = ({ variant, color, onClick, to, className, ...props }) => {
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

export default Button;
