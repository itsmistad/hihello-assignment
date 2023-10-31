import Mexp from 'math-expression-evaluator';

import { EvaluateExpression, SetCurrentNumber, SetEvaluations, SetExpression, SetInvalid } from './types';

const mexp = new Mexp();

export const evaluateExpression: (deps: {
    expression: string;
    setExpression: SetExpression;
    setInvalid: SetInvalid;
    setCurrentNumber: SetCurrentNumber;
    setEvaluations: SetEvaluations;
}) => EvaluateExpression =
    ({ expression, setExpression, setInvalid, setEvaluations, setCurrentNumber }) =>
    () => {
        const captureError = () => {
            setInvalid(true);
            setCurrentNumber(undefined);
            setExpression(undefined);
        };

        try {
            if (expression.endsWith('.')) {
                expression += '0';
            }
            const mexpression = expression.replace('%', 'Mod').replace(' ', '');

            const result = mexp.eval(mexpression, [], {});
            if (isNaN(result) || result === Infinity) {
                captureError();
                return;
            }

            setEvaluations((previous) => {
                const next = [...previous];
                if (previous.length >= 5) {
                    return next.slice(1, 6).concat([[expression, `${result}`]]);
                }
                return next.concat([[expression, `${result}`]]);
            });
            setCurrentNumber(`${result}`);
            setExpression(`${result}`);
        } catch {
            captureError();
        }
    };
