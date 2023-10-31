import React, { useCallback } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { CalculatorButton } from './CalculatorButton';
import { CurrentExpression } from './CurrentExpression';
import { ExpressionHistory } from './ExpressionHistory';

import { useCalculator } from '@/providers/Calculator';
import { CalculatorAction } from '@/providers/Calculator/types';

const CalculatorPadRow = ({ children }: React.PropsWithChildren) => {
    return <View style={styles.rowContainer}>{children}</View>;
};

export const CalculatorPad = () => {
    const { appendExpression, clearExpression, evaluateExpression, invertCurrentNumber, expression, clearEvaluations } =
        useCalculator();

    const onPress = useCallback(
        (action: CalculatorAction) => {
            if (action === 'AC') {
                if (expression == null) {
                    clearEvaluations();
                }
                clearExpression();
                return;
            }

            if (action === '=') {
                evaluateExpression();
                return;
            }

            if (action === '+-') {
                invertCurrentNumber();
                return;
            }

            appendExpression(action);
        },
        [expression, clearExpression, evaluateExpression, appendExpression],
    );

    return (
        <View style={styles.padContainer}>
            <ExpressionHistory />
            <CurrentExpression />
            <CalculatorPadRow>
                <CalculatorButton
                    label="AC"
                    action="AC"
                    backgroundColor="#bbb"
                    labelColor="#000"
                    curveTopLeft
                    onPress={onPress}
                />
                <CalculatorButton action="+-" backgroundColor="#bbb" onPress={onPress}>
                    <Image style={styles.buttonIcon} source={require('@/assets/plus-minus.png')} />
                </CalculatorButton>
                <CalculatorButton action="%" label="%" backgroundColor="#bbb" labelColor="#000" onPress={onPress} />
                <CalculatorButton action="/" backgroundColor="#0884ff" curveTopRight onPress={onPress}>
                    <Image style={styles.buttonIcon} source={require('@/assets/divide-inverted.png')} />
                </CalculatorButton>
            </CalculatorPadRow>
            <CalculatorPadRow>
                <CalculatorButton action="7" label="7" backgroundColor="#333" onPress={onPress} />
                <CalculatorButton action="8" label="8" backgroundColor="#333" onPress={onPress} />
                <CalculatorButton action="9" label="9" backgroundColor="#333" onPress={onPress} />
                <CalculatorButton action="*" backgroundColor="#0884ff" onPress={onPress}>
                    <Image style={styles.buttonIcon} source={require('@/assets/multiply-inverted.png')} />
                </CalculatorButton>
            </CalculatorPadRow>
            <CalculatorPadRow>
                <CalculatorButton action="4" label="4" backgroundColor="#333" onPress={onPress} />
                <CalculatorButton action="5" label="5" backgroundColor="#333" onPress={onPress} />
                <CalculatorButton action="6" label="6" backgroundColor="#333" onPress={onPress} />
                <CalculatorButton action="-" backgroundColor="#0884ff" onPress={onPress}>
                    <Image style={styles.buttonIcon} source={require('@/assets/minus-inverted.png')} />
                </CalculatorButton>
            </CalculatorPadRow>
            <CalculatorPadRow>
                <CalculatorButton action="1" label="1" backgroundColor="#333" onPress={onPress} />
                <CalculatorButton action="2" label="2" backgroundColor="#333" onPress={onPress} />
                <CalculatorButton action="3" label="3" backgroundColor="#333" onPress={onPress} />
                <CalculatorButton action="+" backgroundColor="#0884ff" onPress={onPress}>
                    <Image style={styles.buttonIcon} source={require('@/assets/plus-inverted.png')} />
                </CalculatorButton>
            </CalculatorPadRow>
            <CalculatorPadRow>
                <CalculatorButton
                    action="0"
                    label="0"
                    backgroundColor="#333"
                    containerStyle={styles.zeroButtonContainer}
                    curveBottomLeft
                    onPress={onPress}
                />
                <CalculatorButton action="." label="." backgroundColor="#333" onPress={onPress} />
                <CalculatorButton action="=" backgroundColor="#0884ff" curveBottomRight onPress={onPress}>
                    <Image style={styles.buttonIcon} source={require('@/assets/equals-inverted.png')} />
                </CalculatorButton>
            </CalculatorPadRow>
        </View>
    );
};

const styles = StyleSheet.create({
    zeroButtonContainer: {
        flex: 2,
    },
    buttonIcon: {
        height: 24,
        width: 24,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    padContainer: {
        padding: 20,
        paddingBottom: 60,
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
        width: '100%',
    },
});
