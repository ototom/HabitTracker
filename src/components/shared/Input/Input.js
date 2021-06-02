import './Input.css';
import PropTypes from 'prop-types';

const Input = (props) => {
    const { type, ...htmlProps } = props;

    const input =
        type === 'textarea' ? (
            <textarea {...htmlProps} data-testid='textarea' />
        ) : (
            <input type={type} {...htmlProps} data-testid='input' />
        );

    return (
        <>
            {htmlProps.label && (
                <label htmlFor={htmlProps.id}>{htmlProps.label}</label>
            )}
            {input}
        </>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
};

export default Input;
