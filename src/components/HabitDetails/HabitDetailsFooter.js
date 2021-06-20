import { useState } from 'react';
import HabitForm from '../HabitForm/HabitForm';
import Button, { BUTTON_OPTIONS } from '../shared/Button/Button';
import Confirm from '../shared/Confirm/Confirm';
import PropTypes from 'prop-types';
import './HabitDetailsFooter.css';

const HabitDetailsFooter = ({
    deleteHabit,
    closeSidebar,
    habitName,
    habitId,
}) => {
    const [isConfirmActive, setIsConfirmActive] = useState(false);
    const [isEditModeActive, setIsEditModeActive] = useState(false);

    const onShowDeleteConfirmDialog = () => setIsConfirmActive(true);
    const onHideDeleteConfirmDialog = () => setIsConfirmActive(false);

    const onDeleteHabit = () => {
        deleteHabit();
        closeSidebar();
    };

    const onMakeEditModeActive = () => setIsEditModeActive(true);
    const onFormHide = () => setIsEditModeActive(false);

    return (
        <>
            <div className='details__footer'>
                <Button
                    onClick={onMakeEditModeActive}
                    className='btn--rounded btn--icon-only'
                    data-testid='button-edit'
                >
                    <i className='far fa-edit'></i>
                </Button>
                <Button
                    onClick={onShowDeleteConfirmDialog}
                    options={[BUTTON_OPTIONS.danger]}
                    className='btn--rounded btn--icon-only'
                    data-testid='button-delete'
                >
                    <i className='far fa-trash-alt'></i>
                </Button>
            </div>
            {isConfirmActive && (
                <Confirm
                    onConfirm={onDeleteHabit}
                    onCancel={onHideDeleteConfirmDialog}
                >
                    Do you really want to delete this item?
                </Confirm>
            )}
            {isEditModeActive && (
                <HabitForm
                    initialValue={habitName}
                    hideForm={onFormHide}
                    id={habitId}
                />
            )}
        </>
    );
};

HabitDetailsFooter.propTypes = {
    deleteHabit: PropTypes.func,
    closeSidebar: PropTypes.func,
    habitName: PropTypes.string,
    habitId: PropTypes.string,
};

export default HabitDetailsFooter;
