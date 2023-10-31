export type CalculatorExpressionInput = StringifiedNumeral | '.' | StringifiedMathOperator;
export type CalculatorAction = CalculatorExpressionInput | '=' | 'AC' | '+-';

export type SetExpression = React.Dispatch<React.SetStateAction<string | undefined>>;
export type SetEvaluations = React.Dispatch<React.SetStateAction<[string, string][]>>;
export type SetCurrentNumber = React.Dispatch<React.SetStateAction<string | undefined>>;
export type SetInvalid = React.Dispatch<React.SetStateAction<boolean>>;

export type InvertCurrentNumber = () => void;
export type ClearEvaluations = () => void;
export type EvaluateExpression = () => void;
export type AppendExpression = (input: CalculatorExpressionInput) => void;
export type ClearExpression = () => void;

export type CalculatorContextValue = {
    expression?: string;
    invalid: boolean;
    evaluations: [string, string][];
    clearEvaluations: ClearEvaluations;
    invertCurrentNumber: InvertCurrentNumber;
    evaluateExpression: EvaluateExpression;
    appendExpression: AppendExpression;
    clearExpression: ClearExpression;
};
