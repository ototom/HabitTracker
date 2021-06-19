import { isSameDay } from 'date-fns';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import { notificationTypes } from '../components/Notifications/NotificationService';
import {
    arrayRemove,
    arrayUnion,
    firestore,
    getCurrentTimestamp,
} from '../firebase';
import { authContext } from './auth-context';
import { dateContext } from './date-context';
import { notificationContext } from './notification-context';

export const ACTION_TYPES = {
    setHabits: 'SET_HABITS',
    addNew: 'ADD_NEW',
    checkHabit: 'CHECK_HABIT',
    uncheckHabit: 'UNCHECK_HABIT',
    deleteHabit: 'DELETE_HABIT',
    updateHabit: 'UPDATE_HABIT',
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
        case ACTION_TYPES.deleteHabit: {
            const copyState = [...state];
            const habitIndex = copyState.findIndex(
                (habit) => habit.id === action.payload
            );
            copyState.splice(habitIndex, 1);

            return copyState;
        }
        case ACTION_TYPES.updateHabit: {
            const copyState = [...state];
            const habitIndex = copyState.findIndex(
                (habit) => habit.id === action.payload.id
            );

            copyState[habitIndex].name = action.payload.name;

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
    const { createNotification } = useContext(notificationContext);
    const [isLoading, setIsLoading] = useState(false);
    const [habits, dispatch] = useReducer(habitsReducer, []);

    const addNewHabit = (habitName) => {
        const newHabit = {
            name: habitName,
            checkedDays: [],
            createdAt: getCurrentTimestamp(),
            user: user.uid,
        };
        setIsLoading(true);
        firestore
            .collection('habits')
            .add(newHabit)
            .then((data) => {
                dispatch({
                    type: ACTION_TYPES.addNew,
                    payload: {
                        id: data.id,
                        ...newHabit,
                        user: user.id,
                    },
                });
                createNotification(
                    notificationTypes.SUCCESS,
                    'New habit has been added'
                );
                setIsLoading(false);
            })
            .catch((error) => {
                createNotification(notificationTypes.ERROR, error.message);
                setIsLoading(false);
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
            setIsLoading(true);
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
                    setIsLoading(false);
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

    const getHabitById = useCallback(
        (id) => {
            return habits.filter((habit) => habit.id === id)[0];
        },
        [habits]
    );

    const deleteHabit = (id) => {
        firestore
            .collection('habits')
            .doc(id)
            .delete()
            .then(() => {
                createNotification(
                    notificationTypes.INFO,
                    'Habit has been successfully deleted',
                    true
                );
            })
            .catch((error) => {
                createNotification(
                    notificationTypes.ERROR,
                    error.message,
                    true
                );
            });
        dispatch({ type: ACTION_TYPES.deleteHabit, payload: id });
    };

    const editHabit = (value, id) => {
        firestore
            .collection('habits')
            .doc(id)
            .update({
                name: value,
            })
            .then(() => {
                createNotification(
                    notificationTypes.INFO,
                    'Habit has been changed',
                    true
                );
            })
            .catch((error) => {
                createNotification(
                    notificationTypes.ERROR,
                    error.message,
                    true
                );
            });
        dispatch({
            type: ACTION_TYPES.updateHabit,
            payload: { name: value, id },
        });
    };

    return (
        <habitsContext.Provider
            value={{
                habits,
                addNewHabit,
                checkHabit,
                uncheckHabit,
                getDataByDate,
                getHabitById,
                deleteHabit,
                editHabit,
                isLoading,
            }}
        >
            {children}
        </habitsContext.Provider>
    );
};

export default HabitsProvider;
