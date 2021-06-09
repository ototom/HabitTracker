import { isSameDay } from 'date-fns';
import { createContext, useContext, useEffect, useReducer } from 'react';
import {
    arrayRemove,
    arrayUnion,
    firestore,
    getCurrentTimestamp,
} from '../firebase';
import { authContext } from './auth-context';
import { dateContext } from './date-context';

export const ACTION_TYPES = {
    setHabits: 'SET_HABITS',
    addNew: 'ADD_NEW',
    checkHabit: 'CHECK_HABIT',
    uncheckHabit: 'UNCHECK_HABIT',
};

export const habitsContext = createContext({
    habits: [],
    addNewHabit: () => {},
    checkHabit: () => {},
    uncheckHabit: () => {},
    getDataByDate: () => {},
});

const habitsReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.setHabits: {
            return action.payload;
        }
        case ACTION_TYPES.addNew: {
            return [...state, action.payload];
        }
        case ACTION_TYPES.checkHabit: {
            const date = action.payload.date;
            const copyState = [...state];

            const habitIndex = copyState.findIndex(
                (habit) => habit.id === action.payload.id
            );

            copyState[habitIndex] = {
                ...copyState[habitIndex],
                checkedDays: [...copyState[habitIndex].checkedDays, date],
            };

            return copyState;
        }
        case ACTION_TYPES.uncheckHabit: {
            const date = action.payload.date;
            const copyState = [...state];

            const habitIndex = copyState.findIndex(
                (habit) => habit.id === action.payload.id
            );

            const checkedDayIndex = copyState[habitIndex].checkedDays.findIndex(
                (day) => isSameDay(day, date)
            );

            copyState[habitIndex].checkedDays.splice(checkedDayIndex, 1);

            return copyState;
        }
        default: {
            return state;
        }
    }
};

const HabitsProvider = ({ children }) => {
    const { date } = useContext(dateContext);
    const { user } = useContext(authContext);

    const [habits, dispatch] = useReducer(habitsReducer, []);

    const addNewHabit = (habitName) => {
        const newHabit = {
            name: habitName,
            checkedDays: [],
            createdAt: getCurrentTimestamp(),
            user: user.uid,
        };

        firestore
            .collection('habits')
            .add(newHabit)
            .then((data) => {
                // TODO: show notification on success
                dispatch({
                    type: ACTION_TYPES.addNew,
                    payload: {
                        id: data.id,
                        ...newHabit,
                        user: user.id,
                    },
                });
            })
            .catch((error) => {
                //TODO: show notification on error
                console.log(error);
            });
    };

    const checkHabit = (date, id) => {
        firestore
            .collection('habits')
            .doc(id)
            .update({
                checkedDays: arrayUnion(date),
            });
        dispatch({ type: ACTION_TYPES.checkHabit, payload: { date, id } });
    };

    const uncheckHabit = (date, id) => {
        firestore
            .collection('habits')
            .doc(id)
            .update({
                checkedDays: arrayRemove(date),
            });
        dispatch({ type: ACTION_TYPES.uncheckHabit, payload: { date, id } });
    };

    useEffect(() => {
        const fetchHabits = () => {
            if (!user) return;

            firestore
                .collection('habits')
                .where('user', '==', user.uid)
                .get()
                .then((snapshot) => {
                    const habitsArray = [];
                    snapshot.forEach((doc) =>
                        habitsArray.push({
                            id: doc.id,
                            checkedDays: doc
                                .data()
                                .checkedDays.map((day) => day.toDate()),
                            name: doc.data().name,
                            user: doc.data().user,
                        })
                    );

                    dispatch({
                        type: ACTION_TYPES.setHabits,
                        payload: habitsArray,
                    });
                });
        };

        fetchHabits();
    }, [user]);

    const getDataByDate = (selectedDate = date) => {
        const newHabits = habits.map((habit) => {
            const habitDate = habit.checkedDays.find((day) =>
                isSameDay(day, selectedDate)
            );

            return {
                isCompleted: !!habitDate,
                date: habitDate === undefined ? selectedDate : habitDate,
                name: habit.name,
                id: habit.id,
                user: habit.user,
            };
        });
        return newHabits;
    };

    return (
        <habitsContext.Provider
            value={{
                habits,
                addNewHabit,
                checkHabit,
                uncheckHabit,
                getDataByDate,
            }}
        >
            {children}
        </habitsContext.Provider>
    );
};

export default HabitsProvider;
