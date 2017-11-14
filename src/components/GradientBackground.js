import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';


const GradientBackground = (props) => (
    <LinearGradient
        style={styles.container}
        colors={['#F54EA2', '#FF7676']}
        start={{ x: 0.0, y: 0.0 }}
    >
    {props.children}
    </LinearGradient>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default GradientBackground;
