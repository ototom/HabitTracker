import { useState, useCallback, useEffect, useReducer } from 'react';
import { isSameDay, parseISO, subDays } from 'date-fns';

const calendarReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'UPDATE':
            const updatedState = [...state];
            updatedState.forEach((week) =>
                week.map((day) => {
                    if (
                        isSameDay(
                            parseISO(day.date),
                            parseISO(action.payload.day)
                        )
                    ) {
                        day.checked = action.payload.state;
                    }
                    return day;
                })
            );
            return updatedState;
        default:
            return state;
    }
};

export const useCalendar = (startDate = new Date(), checkedDays = []) => {
    const [date, setDate] = useState(startDate);
    const [monthData, dispatch] = useReducer(calendarReducer, []);

    const generateMonth = useCallback(
        (year, month, processedDays = 0, calendarData = []) => {
            const weekData = [];
            // NOTE: new Date(year, month + 1, 0).getDate() returns last day of previous month, so +1 to current month must be added
            const monthTotalDays = new Date(year, month + 1, 0).getDate();
            // NOTE: determine how many days must be added at the beggining of the current month from the previous month
            const prevMonthDays =
                new Date(year, month, 1).getDay() === 0
                    ? 6
                    : new Date(year, month, 1).getDay() - 1;
            // NOTE: determine how many days must be added at the end of the current month from the next one
            const nextMonthDays =
                new Date(year, month + 1, 0).getDay() === 0
                    ? 7
                    : new Date(year, month + 1, 0).getDay();
            // NOTE: first week -> add days from prev month
            if (calendarData.length === 0) {
                for (let i = 0; i < prevMonthDays; i++) {
                    weekData.push({
                        date: subDays(
                            new Date(year, month, 1),
                            prevMonthDays - i
                        ).toISOString(),
                        checked: false,
                        isBlocked: true,
                    });
                }
            }
            for (let i = processedDays; i < monthTotalDays; i++) {
                const date = new Date(year, month, i + 1);
                const isChecked = checkedDays.filter((day) =>
                    isSameDay(date, new Date(day))
                )[0];
                weekData.push({
                    date: date.toISOString(),
                    checked: !!isChecked,
                });
                processedDays += 1;
                if (date.getDay() === 0) {
                    break;
                }
            }
            calendarData.push(weekData);
            if (processedDays >= monthTotalDays) {
                for (let i = 1; i <= 7 - nextMonthDays; i++) {
                    weekData.push({
                        date: new Date(year, month + 1, i).toISOString(),
                        checked: false,
                        isBlocked: true,
                    });
                }
                dispatch({ type: 'SET_DATA', payload: calendarData });
                return;
            }
            generateMonth(year, month, processedDays, calendarData);
        },
        [checkedDays]
    );

    const updateDay = (day, state) => {
        dispatch({ type: 'UPDATE', payload: { day, state } });
    };

    useEffect(() => {
        generateMonth(date.getFullYear(), date.getMonth());
    }, [generateMonth, date]);

    return {
        calendar: monthData,
        setDate,
        calendarDate: date,
        updateDay,
        generateMonth,
    };
};
