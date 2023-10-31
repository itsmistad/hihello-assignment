import React from 'react';

import { CalculatorContextValue } from './types';

export const initialCalculatorContextValue: CalculatorContextValue = {
    invalid: false,
    evaluations: [],
    invertCurrentNumber: () => {},
    appendExpression: () => {},
    clearEvaluations: () => {},
    clearExpression: () => {},
    evaluateExpression: () => NaN,
};

export const CalculatorContext = React.createContext(initialCalculatorContextValue);
