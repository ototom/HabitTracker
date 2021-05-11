import { useCallback, useReducer } from 'react';
import { validate } from '../utils/validate';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_UPDATE': {
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.payload.id]: action.payload.value,
                },
            };
        }
        case 'SET_ERRORS': {
            return {
                ...state,
                errors: [...action.payload.errors],
            };
        }
        default:
            return state;
    }
};

export const useForm = (
    config = { initialValues: {}, validateRules: {}, onSubmit: () => {} }
) => {
    const [formState, dispatch] = useReducer(formReducer, {
        values: config.initialValues,
        errors: [],
    });

    const onInputChange = (e) =>
        dispatch({
            type: 'INPUT_UPDATE',
            payload: { id: e.target.id, value: e.target.value },
        });

    const submitHandler = (e) => {
        e.preventDefault();

        const errors = validate(formState.values, config.validateRules);

        dispatch({ type: 'SET_ERRORS', payload: { errors } });

        if (errors.length === 0) {
            config.onSubmit(formState.values);
        }
    };

    const clearErrors = useCallback(
        () => dispatch({ type: 'SET_ERRORS', payload: { errors: [] } }),
        []
    );

    return {
        onInputChange,
        values: formState.values,
        errors: formState.errors,
        clearErrors,
        submitHandler,
    };
};
