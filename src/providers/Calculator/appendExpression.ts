import { AppendExpression, SetCurrentNumber, SetExpression, SetInvalid } from './types';

export const appendExpression: (deps: {
    setExpression: SetExpression;
    setCurrentNumber: SetCurrentNumber;
    setInvalid: SetInvalid;
}) => AppendExpression =
    ({ setExpression, setCurrentNumber, setInvalid }) =>
    (input) => {
        const operators: StringifiedMathOperator[] = ['%', '*', '+', '-', '/'];

        if (operators.includes(input as StringifiedMathOperator)) {
            setCurrentNumber(undefined);
            setExpression((previous) => {
                if (!previous) {
                    return;
                }

                if (previous[previous.length - 1] === '.') {
                    return `${previous}0 ${input}`;
                }

                return `${previous} ${input}`;
            });
            return;
        }

        setInvalid(false);

        const updateExpression = () => {
            setExpression((previous) => {
                const isPreviousEmpty = !previous?.length,
                    endOfPreviousIsOperator = operators.includes(
                        previous?.[previous?.length - 1] as StringifiedMathOperator,
                    );

                if (input === '.' && isPreviousEmpty) {
                    return `0.`;
                }

                if (input === '.' && endOfPreviousIsOperator) {
                    return `${previous} 0.`;
                }

                if (isPreviousEmpty) {
                    return input;
                }

                if (endOfPreviousIsOperator) {
                    return `${previous} ${input}`;
                }

                return `${previous}${input}`;
            });
        };

        setCurrentNumber((previous) => {
            const isPreviousEmpty = !previous?.length,
                previousContainsDecimal = previous?.includes('.');

            if (input === '.' && previousContainsDecimal) {
                return previous;
            }

            updateExpression();

            if (input === '.' && isPreviousEmpty) {
                return `0.`;
            }

            if (isPreviousEmpty) {
                return input;
            }

            return `${previous}${input}`;
        });
    };
