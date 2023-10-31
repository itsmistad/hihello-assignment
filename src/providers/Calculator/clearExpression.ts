import { ClearExpression, SetCurrentNumber, SetExpression, SetInvalid } from './types';

export const clearExpression: (deps: {
    setExpression: SetExpression;
    setInvalid: SetInvalid;
    setCurrentNumber: SetCurrentNumber;
}) => ClearExpression =
    ({ setExpression, setInvalid, setCurrentNumber }) =>
    () => {
        setCurrentNumber(undefined);
        setExpression(undefined);
        setInvalid(false);
    };
