import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { dateContext } from '../context/date-context';
import { habitsContext } from '../context/habits-context';
import Habits from './Habits';

it('Displays placeholder when there are no habits provided', () => {
    const history = createMemoryHistory();

    const { queryByText } = render(
        <Router history={history}>
            <dateContext.Provider value={{ date: new Date() }}>
                <habitsContext.Provider
                    value={{
                        habits: [],
                        checkHabit: () => {},
                        uncheckHabit: () => {},
                        getDataByDate: () => {},
                    }}
                >
                    <Habits />
                </habitsContext.Provider>
            </dateContext.Provider>
        </Router>
    );

    expect(queryByText(/There are no habits yet/i)).toBeInTheDocument();
});
it('Show no habit details sidebar if there are no habits provided', () => {
    const history = createMemoryHistory();

    const { queryByText } = render(
        <Router history={history}>
            <dateContext.Provider value={{ date: new Date() }}>
                <habitsContext.Provider
                    value={{
                        habits: [],
                        checkHabit: () => {},
                        uncheckHabit: () => {},
                        getDataByDate: () => {},
                    }}
                >
                    <Habits />
                </habitsContext.Provider>
            </dateContext.Provider>
        </Router>
    );

    expect(
        queryByText(/Click the habit title to view its details/i)
    ).not.toBeInTheDocument();
});
