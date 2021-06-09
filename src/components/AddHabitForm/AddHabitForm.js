import ReactDOM from 'react-dom';
import { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './AddHabitForm.css';
import { useForm } from '../../hooks/use-form';
import { habitsContext } from '../../context/habits-context';

const AddHabitForm = ({ hideForm }) => {
    const { addNewHabit } = useContext(habitsContext);
    const { values, onInputChange, submitHandler } = useForm({
        initialValues: { habitname: '' },
        validateRules: { habitname: { req: true } },
        onSubmit: (values) => {
            addNewHabit(values.habitname);
            hideForm();
        },
    });

    const inputRef = useRef();
    const modalRef = useRef();

    useEffect(() => {
        const closeModalHandler = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                hideForm();
            }
        };

        document.addEventListener('click', closeModalHandler);

        return () => document.removeEventListener('click', closeModalHandler);
    }, [hideForm]);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    return ReactDOM.createPortal(
        <div className='add-task-form' ref={modalRef}>
            <form data-testid='add-habit-form' onSubmit={submitHandler}>
                <input
                    type='text'
                    name='habitname'
                    id='habitname'
                    ref={inputRef}
                    value={values.habitname}
                    onChange={onInputChange}
                    placeholder='Enter habit name'
                />
                <button disabled={!values.habitname}>
                    <i className='fas fa-location-arrow'></i>
                </button>
            </form>
        </div>,
        document.getElementById('modal-container')
    );
};

AddHabitForm.propTypes = {
    hideForm: PropTypes.func,
};

export default AddHabitForm;
