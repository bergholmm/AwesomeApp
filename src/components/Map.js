import React from 'react';
import GradientBackground from './GradientBackground'
import MapView, { PROVIDER_GOOGLE }from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const Map = (props) => (
    <GradientBackground>
        <View style={ styles.container }>
            <MapView
                style={ styles.map }
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    </GradientBackground>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    }
});

export default Map;
