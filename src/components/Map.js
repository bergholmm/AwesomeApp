import React from 'react';
import GradientBackground from './GradientBackground'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window')

const Map = (props) => {
    let { photos } = props;

    let location = {
        latitude: 37.78825,
        longitude: -122.4324,
    };

    if ( Object.keys(props.location).length === 0 ) {
        location = props.location;
    }

    const photoMarkers = photos.filter( (photo) => photo.location.latitude !== null );

    return (
        <GradientBackground>
            <View style={ styles.container }>
                <MapView
                    style={ styles.map }
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 1.1143,
                        longitudeDelta: 1.1134,
                    }}
                >
                {
                    photoMarkers.map( (photo, i) =>
                        <MapView.Marker
                            key={ i }
                            coordinate={ photo.location }
                        >
                            <Image source={{ uri: photo.url }} style={ styles.pin } />
                        </MapView.Marker>
                    )
                }
                </MapView>
            </View>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: width,
        height: height,
    },
    pin: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
});

export default Map;
