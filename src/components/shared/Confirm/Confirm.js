import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Button, { BUTTON_OPTIONS } from '../Button/Button';
import './Confirm.css';

const Confirm = ({ heading, children, onConfirm, onCancel }) => {
    return createPortal(
        <div className='backdrop'>
            <div className='confirm'>
                {heading && (
                    <div className='confirm__heading'>
                        <h3>{heading}</h3>
                    </div>
                )}
                <div className='confirm__content'>{children}</div>
                <div className='confirm__footer'>
                    <Button
                        options={[BUTTON_OPTIONS.small]}
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                    <Button
                        options={[BUTTON_OPTIONS.small, BUTTON_OPTIONS.neutral]}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-container')
    );
};

Confirm.propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

export default Confirm;
