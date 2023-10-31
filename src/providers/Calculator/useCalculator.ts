import { useContext } from 'react';

import { CalculatorContext } from './CalculatorContext';

export const useCalculator = () => {
    return useContext(CalculatorContext);
};
