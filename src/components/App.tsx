import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { CalculatorPad } from '@/components/CalculatorPad';
import { Providers } from '@/providers';

export const App = () => {
    return (
        <Providers>
            <View style={styles.viewport}>
                <View style={styles.container}>
                    <StatusBar style="auto" />
                    <CalculatorPad />
                </View>
            </View>
        </Providers>
    );
};

const styles = StyleSheet.create({
    viewport: {
        flex: 1,
        backgroundColor: 'black',
    },
    container: {
        flex: 1,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 800,
    },
});
