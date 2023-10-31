import React from 'react';

import { CalculatorProvider } from './Calculator';

export const Providers = ({ children }: React.PropsWithChildren) => {
    return <CalculatorProvider>{children}</CalculatorProvider>;
};
