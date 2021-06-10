import { fireEvent, render } from '@testing-library/react';
import { dateContext } from '../../context/date-context';
import DatePicker from './DatePicker';

it('Makes the return button disabled when provided date is not today', () => {
    const { getByText, rerender } = render(
        <dateContext.Provider
            value={{
                date: new Date(2021, 5, 1),
            }}
        >
            <DatePicker />
        </dateContext.Provider>
    );

    const btn = getByText(/Today/i);

    expect(btn).not.toHaveAttribute('disabled');

    rerender(
        <dateContext.Provider
            value={{
                date: new Date(),
            }}
        >
            <DatePicker />
        </dateContext.Provider>
    );

    expect(btn).toHaveAttribute('disabled');
});
it('Calls a function when user clicks the return button', () => {
    const returnToToday = jest.fn();
    const { getByText } = render(
        <dateContext.Provider
            value={{
                date: new Date(2021, 5, 1),
                returnToToday,
            }}
        >
            <DatePicker />
        </dateContext.Provider>
    );

    const btn = getByText(/today/i);

    fireEvent.click(btn);

    expect(returnToToday).toHaveBeenCalled();
});
it('Displays provided date in proper format', () => {
    const { getByText } = render(
        <dateContext.Provider
            value={{
                date: new Date(2021, 5, 1),
            }}
        >
            <DatePicker />
        </dateContext.Provider>
    );

    expect(getByText(/1 June 2021/i)).toBeInTheDocument();
});
it('Calls a function when user clicks the previous date button', () => {
    const subDay = jest.fn();
    const { getByTestId } = render(
        <dateContext.Provider
            value={{
                date: new Date(2021, 5, 1),
                subDay,
            }}
        >
            <DatePicker />
        </dateContext.Provider>
    );

    const btn = getByTestId(/prev-btn/i);

    fireEvent.click(btn);

    expect(subDay).toHaveBeenCalled();
});
it('Calls a function when user clicks the next date button', () => {
    const addDay = jest.fn();
    const { getByTestId } = render(
        <dateContext.Provider
            value={{
                date: new Date(2021, 5, 1),
                addDay,
            }}
        >
            <DatePicker />
        </dateContext.Provider>
    );

    const btn = getByTestId(/next-btn/i);

    fireEvent.click(btn);

    expect(addDay).toHaveBeenCalled();
});
