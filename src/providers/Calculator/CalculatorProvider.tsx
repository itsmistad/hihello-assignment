import React, { useCallback, useMemo, useState } from 'react';

import { CalculatorContext } from './CalculatorContext';
import { appendExpression as appendExpressionFactory } from './appendExpression';
import { clearExpression as clearExpressionFactory } from './clearExpression';
import { evaluateExpression as evaluateExpressionFactory } from './evaluateExpression';
import { invertCurrentNumber as invertCurrentNumberFactory } from './invertCurrentNumber';

export const CalculatorProvider = ({ children }: React.PropsWithChildren) => {
    const [expression, setExpression] = useState<string>();
    const [evaluations, setEvaluations] = useState<[string, string][]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentNumber, setCurrentNumber] = useState<string>();
    const [invalid, setInvalid] = useState(false);

    const invertCurrentNumber = useCallback(invertCurrentNumberFactory({ setCurrentNumber, setExpression }), []);
    const evaluateExpression = useCallback(
        evaluateExpressionFactory({ expression, setExpression, setInvalid, setEvaluations, setCurrentNumber }),
        [expression],
    );
    const appendExpression = useCallback(appendExpressionFactory({ setExpression, setCurrentNumber, setInvalid }), []);
    const clearExpression = useCallback(clearExpressionFactory({ setExpression, setInvalid, setCurrentNumber }), []);
    const clearEvaluations = useCallback(() => setEvaluations([]), []);

    const contextValue = useMemo(
        () => ({
            expression,
            evaluations,
            clearEvaluations,
            invalid,
            invertCurrentNumber,
            evaluateExpression,
            appendExpression,
            clearExpression,
        }),
        [expression, evaluations, clearEvaluations, invalid, evaluateExpression, appendExpression, clearExpression],
    );

    return <CalculatorContext.Provider value={contextValue}>{children}</CalculatorContext.Provider>;
};
