import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

import { useCalculator } from '@/providers/Calculator';

export const ExpressionHistory = () => {
    const { evaluations } = useCalculator();

    return (
        <View style={styles.container}>
            {evaluations.map(([expression, result], idx) => (
                <Animated.Text
                    selectable={false}
                    style={styles.expression}
                    key={idx}
                    entering={FadeInDown.duration(120)}
                    exiting={FadeOutUp.duration(120)}
                >
                    {expression}
                    {' = '}
                    <Animated.Text selectable={false} style={styles.result}>
                        {result}
                    </Animated.Text>
                </Animated.Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    expression: {
        textAlign: 'right',
        paddingVertical: 8,
        color: '#777',
        fontSize: 18,
    },
    result: {
        textAlign: 'right',
        color: '#0884ff',
    },
});
