import React from 'react';
import Swiper from 'react-native-swiper';
import GradientBackground from './GradientBackground'
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';


const Tutorial = (props) => (
    <GradientBackground>
        <Swiper style={styles.wapper} showsButtons={false} loop={false} activeDotColor='white'>
            <View style={styles.slide}>
                <Text style={styles.text}>Page 1 (Tutorial)</Text>
            </View>
            <View style={styles.slide}>
                <Text style={styles.text}>Page 2 (Tutorial)</Text>
            </View>
            <View style={styles.slide}>
                <Text style={styles.text}>Page 3 (Tutorial)</Text>
            </View>
        </Swiper>
    </GradientBackground>
);

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        padding: 30,
        alignSelf: 'center',
        fontSize: 26,
        color: 'white'
    },
});

export default Tutorial;
