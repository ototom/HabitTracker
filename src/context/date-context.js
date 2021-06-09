import { createContext, useState } from 'react';
import { addDays, subDays } from 'date-fns';

export const dateContext = createContext({
    date: null,
    returnToToday: () => {},
    addDay: () => {},
    subDay: () => {},
});

const DateProvider = ({ children }) => {
    const [date, setDate] = useState(new Date());

    const returnToToday = () => {
        setDate(new Date());
    };

    const addDay = () => setDate((prev) => addDays(prev, 1));
    const subDay = () => setDate((prev) => subDays(prev, 1));

    return (
        <dateContext.Provider value={{ date, returnToToday, addDay, subDay }}>
            {children}
        </dateContext.Provider>
    );
};

export default DateProvider;
