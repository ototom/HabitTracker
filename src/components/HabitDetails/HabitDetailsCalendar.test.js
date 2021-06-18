import { fireEvent, render } from '@testing-library/react';
import { habitsContext } from '../../context/habits-context';
import HabitDetailsCalendar from './HabitDetailsCalendar';

it("Renders the calendar's date properly(month and year)", () => {
    const { getByText } = render(
        <HabitDetailsCalendar date={new Date(2021, 5, 1)} calendar={[[]]} />
    );

    expect(getByText(/June 21/i)).toBeInTheDocument();
});
it('Calls uncheck function when user clicks the checked item', () => {
    const checkHabit = jest.fn();
    const uncheckHabit = jest.fn();
    const { getByText } = render(
        <habitsContext.Provider value={{ checkHabit, uncheckHabit }}>
            <HabitDetailsCalendar
                updateDay={() => {}}
                date={new Date(2021, 5, 1)}
                calendar={[
                    [
                        {
                            checked: false,
                            date: '2021-05-30T22:00:00.000Z',
                            isBlocked: false,
                        },
                        {
                            checked: true,
                            date: '2021-05-29T22:00:00.000Z',
                            isBlocked: false,
                        },
                        ,
                        {
                            checked: false,
                            date: '2021-05-28T22:00:00.000Z',
                            isBlocked: true,
                        },
                    ],
                ]}
            />
        </habitsContext.Provider>
    );

    const btn = getByText(/30/i);

    fireEvent.click(btn);

    expect(uncheckHabit).toHaveBeenCalled();
});
it('Calls check function when user clicks the unchecked item', () => {
    const checkHabit = jest.fn();
    const uncheckHabit = jest.fn();
    const { getByText } = render(
        <habitsContext.Provider value={{ checkHabit, uncheckHabit }}>
            <HabitDetailsCalendar
                updateDay={() => {}}
                date={new Date(2021, 5, 1)}
                calendar={[
                    [
                        {
                            checked: false,
                            date: '2021-05-30T22:00:00.000Z',
                            isBlocked: false,
                        },
                        {
                            checked: true,
                            date: '2021-05-29T22:00:00.000Z',
                            isBlocked: false,
                        },
                        ,
                        {
                            checked: false,
                            date: '2021-05-28T22:00:00.000Z',
                            isBlocked: true,
                        },
                    ],
                ]}
            />
        </habitsContext.Provider>
    );

    const btn = getByText(/31/i);

    fireEvent.click(btn);

    expect(checkHabit).toHaveBeenCalled();
});
it('Calls no function when user clicks the blocked item', () => {
    const checkHabit = jest.fn();
    const uncheckHabit = jest.fn();
    const { getByText } = render(
        <habitsContext.Provider value={{ checkHabit, uncheckHabit }}>
            <HabitDetailsCalendar
                updateDay={() => {}}
                date={new Date(2021, 5, 1)}
                calendar={[
                    [
                        {
                            checked: false,
                            date: '2021-05-30T22:00:00.000Z',
                            isBlocked: false,
                        },
                        {
                            checked: true,
                            date: '2021-05-29T22:00:00.000Z',
                            isBlocked: false,
                        },
                        ,
                        {
                            checked: false,
                            date: '2021-05-28T22:00:00.000Z',
                            isBlocked: true,
                        },
                    ],
                ]}
            />
        </habitsContext.Provider>
    );

    const btn = getByText(/29/i);

    fireEvent.click(btn);

    expect(uncheckHabit).not.toHaveBeenCalled();
    expect(checkHabit).not.toHaveBeenCalled();
});
