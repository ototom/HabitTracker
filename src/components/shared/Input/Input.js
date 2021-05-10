import '../../../styles/Forms/input.css';

const Input = (props) => {
    const { type, ...htmlProps } = props;

    const input =
        type === 'textarea' ? (
            <textarea {...htmlProps} />
        ) : (
            <input type={type} {...htmlProps} />
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

export default Input;
