import { InvertCurrentNumber, SetCurrentNumber, SetExpression } from './types';

export const invertCurrentNumber: (deps: {
    setCurrentNumber: SetCurrentNumber;
    setExpression: SetExpression;
}) => InvertCurrentNumber =
    ({ setCurrentNumber, setExpression }) =>
    () => {
        setCurrentNumber((previousNumber) => {
            if (previousNumber == null) {
                return previousNumber;
            }

            const nextNumber = Number(previousNumber) * -1;
            setExpression((previousExpression) => {
                const lastIndex = previousExpression.lastIndexOf(`${previousNumber}`);

                if (lastIndex === -1) {
                    return previousExpression;
                }

                return `${previousExpression.slice(0, lastIndex)}${nextNumber}`;
            });
            return `${nextNumber}`;
        });
    };
