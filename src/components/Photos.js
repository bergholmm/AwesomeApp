import React from 'react';
import GradientBackground from './GradientBackground'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Photos = (props) => (
    <GradientBackground>
        <View style={ styles.container }>
            <Text style={ styles.text }>Photos</Text>
        </View>
    </GradientBackground>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        alignSelf: 'center',
        fontSize: 26,
        backgroundColor: 'transparent',
        color: 'white',
    },
});

export default Photos;
