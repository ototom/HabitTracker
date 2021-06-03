import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { firestore, getCurrentTimestamp } from '../../firebase';

import './AddHabitForm.css';
import { useForm } from '../../hooks/use-form';

const AddTaskForm = ({ hideForm }) => {
    const { values, onInputChange, submitHandler } = useForm({
        initialValues: { habitname: '' },
        validateRules: { habitname: { req: true } },
        onSubmit: (values) => {
            firestore
                .collection('habits')
                .add({
                    name: values.habitname,
                    checkedDays: [],
                    createdAt: getCurrentTimestamp(),
                })
                .then((data) => {
                    // TODO: show notification on success
                    hideForm();
                })
                .catch((error) => {
                    //TODO: show notification on error
                    console.log(error);
                });
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

AddTaskForm.propTypes = {
    hideForm: PropTypes.func,
};

export default AddTaskForm;
