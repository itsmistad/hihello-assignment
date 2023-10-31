import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

import { useCalculator } from '@/providers/Calculator';

export const CurrentExpression = () => {
    const { expression, invalid } = useCalculator();

    return (
        <View style={styles.container}>
            {!expression && !invalid ? (
                <Text style={styles.expression}> </Text>
            ) : (
                <Animated.Text
                    selectable={false}
                    style={[
                        styles.expression,
                        {
                            color: invalid ? '#F47174' : '#fff',
                        },
                    ]}
                    entering={FadeInDown.duration(120)}
                    exiting={FadeOutUp.duration(120)}
                >
                    {invalid ? 'uh oh' : expression}
                </Animated.Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    expression: {
        textAlign: 'right',
        paddingVertical: 24,
        fontSize: 32,
    },
});
