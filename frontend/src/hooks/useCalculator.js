import { useReducer } from 'react';
import { Calculate, Clear } from "../../wailsjs/go/main/App";

// Action types
const ACTIONS = {
    SET_DISPLAY: 'SET_DISPLAY',
    SET_FIRST_NUMBER: 'SET_FIRST_NUMBER',
    SET_OPERATION: 'SET_OPERATION',
    SET_WAITING: 'SET_WAITING',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    CLEAR: 'CLEAR'
};

// Initial state
const calculatorState = {
    display: "0",
    firstNumber: null,
    operation: null,
    waitingForSecondNumber: false,
    isLoading: false,
    error: null
};

// Reducer function
function calculatorReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_DISPLAY:
            return { ...state, display: action.payload };
        case ACTIONS.SET_FIRST_NUMBER:
            return { ...state, firstNumber: action.payload };
        case ACTIONS.SET_OPERATION:
            return { ...state, operation: action.payload };
        case ACTIONS.SET_WAITING:
            return { ...state, waitingForSecondNumber: action.payload };
        case ACTIONS.SET_LOADING:
            return { ...state, isLoading: action.payload };
        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload };
        case ACTIONS.CLEAR:
            return { ...calculatorState };
        default:
            return state;
    }
}

export function useCalculator() {
    const [state, dispatch] = useReducer(calculatorReducer, calculatorState);
    const { display, firstNumber, operation, waitingForSecondNumber, isLoading, error } = state;

    const handleNumber = (num) => {
        if (error) dispatch({ type: ACTIONS.SET_ERROR, payload: null });
        if (waitingForSecondNumber) {
            dispatch({ type: ACTIONS.SET_DISPLAY, payload: num });
            dispatch({ type: ACTIONS.SET_WAITING, payload: false });
        } else {
            dispatch({ type: ACTIONS.SET_DISPLAY, payload: display === "0" ? num : display + num });
        }
    };

    const handleDecimal = () => {
        if (error) dispatch({ type: ACTIONS.SET_ERROR, payload: null });
        if (!display.includes('.')) {
            dispatch({ type: ACTIONS.SET_DISPLAY, payload: display + '.' });
        }
    };

    const handlePercentage = () => {
        if (error) dispatch({ type: ACTIONS.SET_ERROR, payload: null });
        const currentNumber = parseFloat(display);
        const percentage = currentNumber / 100;
        dispatch({ type: ACTIONS.SET_DISPLAY, payload: percentage.toString() });
    };

    const handlePlusMinus = () => {
        if (error) dispatch({ type: ACTIONS.SET_ERROR, payload: null });
        const currentNumber = parseFloat(display);
        const negatedNumber = -currentNumber;
        dispatch({ type: ACTIONS.SET_DISPLAY, payload: negatedNumber.toString() });
    };

    const handleOperation = async (op) => {
        try {
            dispatch({ type: ACTIONS.SET_ERROR, payload: null });
            const currentNumber = parseFloat(display);
            
            if (firstNumber === null) {
                dispatch({ type: ACTIONS.SET_FIRST_NUMBER, payload: currentNumber });
            } else if (operation) {
                dispatch({ type: ACTIONS.SET_LOADING, payload: true });
                const result = await Calculate(operation, firstNumber, currentNumber);
                dispatch({ type: ACTIONS.SET_DISPLAY, payload: result });
                dispatch({ type: ACTIONS.SET_FIRST_NUMBER, payload: parseFloat(result) });
            }
            
            dispatch({ type: ACTIONS.SET_OPERATION, payload: op });
            dispatch({ type: ACTIONS.SET_WAITING, payload: true });
        } catch (err) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: "An error occurred during calculation" });
            console.error("Calculation error:", err);
        } finally {
            dispatch({ type: ACTIONS.SET_LOADING, payload: false });
        }
    };

    const handleEquals = async () => {
        if (firstNumber === null || operation === null) return;
        
        try {
            dispatch({ type: ACTIONS.SET_ERROR, payload: null });
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            
            const currentNumber = parseFloat(display);
            const result = await Calculate(operation, firstNumber, currentNumber);
            
            dispatch({ type: ACTIONS.SET_DISPLAY, payload: result });
            dispatch({ type: ACTIONS.SET_FIRST_NUMBER, payload: null });
            dispatch({ type: ACTIONS.SET_OPERATION, payload: null });
            dispatch({ type: ACTIONS.SET_WAITING, payload: false });
        } catch (err) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: "An error occurred during calculation" });
            console.error("Calculation error:", err);
        } finally {
            dispatch({ type: ACTIONS.SET_LOADING, payload: false });
        }
    };

    const handleClear = async () => {
        dispatch({ type: ACTIONS.SET_ERROR, payload: null });
        const result = await Clear();
        dispatch({ type: ACTIONS.CLEAR, payload: result });
    };

    return {
        display,
        isLoading,
        error,
        handleNumber,
        handleOperation,
        handleEquals,
        handleClear,
        handleDecimal,
        handlePercentage,
        handlePlusMinus
    };
} 