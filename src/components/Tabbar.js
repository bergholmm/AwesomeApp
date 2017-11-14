import React from 'react';
import GradientBackground from './GradientBackground'
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';

const Tabbar = (props) => (
    <View style={styles.container}>
        <LinearGradient
            style={styles.container}
            colors={['#FF7676', '#F54EA2']}
            start={{ x: 0.0, y: 0.0 }}
        >
            <View style={styles.innerContainer}>
                <TouchableHighlight underlayColor='transparent' onPress={ () => props.changeTab(0) } style={ styles.buttonContainer }>
                    <Image source={ require('../../resources/discoverx2.png') }style={styles.discover} />
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={ () => props.changeTab(1) } style={ [styles.buttonContainer, { bottom: 10 }] }>
                    <Image source={ require('../../resources/addspotx2.png') }style={styles.addSpot} />
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={ () => props.changeTab(2) } style={ styles.buttonContainer }>
                    <Image source={ require('../../resources/mapx2.png') }style={styles.map} />
                </TouchableHighlight>
            </View>
        </LinearGradient>
    </View>
);

const styles = StyleSheet.create({
    container: {
        height: 60,
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        alignSelf: 'center',
        fontSize: 12,
        backgroundColor: 'transparent',
        color: 'white',
    },
    discover: {
        height: 37,
        width: 37,
    },
    addSpot: {
        height: 98,
        width: 98,
    },
    map: {
        height: 35,
        width: 35,
    },
});

export default Tabbar;
