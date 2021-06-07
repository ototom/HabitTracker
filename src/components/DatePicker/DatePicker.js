import './DatePicker.css';

const DatePicker = () => {
    return (
        <div className='datepicker'>
            <div className='datepicker__controls'>
                <button className='datepicker__btn datepicker__btn--left'>
                    <i className='fas fa-chevron-left'></i>
                </button>
                23 Czerwiec 2021
                <button className='datepicker__btn datepicker__btn--right'>
                    <i className='fas fa-chevron-right'></i>
                </button>
            </div>
            <button className='datepicker__return-btn'>Today</button>
        </div>
    );
};

export default DatePicker;
