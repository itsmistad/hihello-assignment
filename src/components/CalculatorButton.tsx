import React, { useCallback } from 'react';
import { StyleSheet, View, Pressable, Text, TextProps, ViewProps } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';

import { CalculatorAction } from '@/providers/Calculator/types';

export type CalculatorButtonProps = {
    containerStyle?: ViewProps['style'];
    label?: string;
    action: CalculatorAction;
    backgroundColor: string;
    labelColor?: string;
    curveTopLeft?: boolean;
    curveTopRight?: boolean;
    curveBottomLeft?: boolean;
    curveBottomRight?: boolean;
    onPress: (value: string) => void;
};

const BORDER_RADIUS = 18;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const CalculatorButton = ({
    containerStyle,
    label,
    action,
    labelColor,
    backgroundColor,
    children,
    curveTopLeft,
    curveTopRight,
    curveBottomLeft,
    curveBottomRight,
    onPress,
}: React.PropsWithChildren<CalculatorButtonProps>) => {
    const opacity = useSharedValue(1);

    const animatedButtonStyle = useAnimatedStyle(() => {
        if (opacity.value === 0.7) {
            opacity.value = 1;
            return {
                ...styles.button,
                backgroundColor,
                opacity: 0.7,
            };
        }
        return {
            ...styles.button,
            backgroundColor,
            opacity: withTiming(opacity.value, {
                duration: 100,
                easing: Easing.ease,
            }),
        };
    });

    const _containerStyle: CalculatorButtonProps['containerStyle'] = [
        styles.container,
        {
            borderTopLeftRadius: curveTopLeft ? BORDER_RADIUS : 0,
            borderTopRightRadius: curveTopRight ? BORDER_RADIUS : 0,
            borderBottomRightRadius: curveBottomRight ? BORDER_RADIUS : 0,
            borderBottomLeftRadius: curveBottomLeft ? BORDER_RADIUS : 0,
        },
        containerStyle,
    ];

    const labelStyle: TextProps['style'] = [
        styles.label,
        {
            color: labelColor ?? '#fff',
        },
    ];

    const _onPress = useCallback(() => {
        opacity.value = 0.7;
        onPress(action);
    }, [onPress]);

    return (
        <View style={_containerStyle}>
            <AnimatedPressable onPress={_onPress} style={animatedButtonStyle}>
                {label ? (
                    <Text selectable={false} style={labelStyle}>
                        {label}
                    </Text>
                ) : (
                    children
                )}
            </AnimatedPressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    button: {
        height: 90,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    label: {
        fontSize: 24,
        lineHeight: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
