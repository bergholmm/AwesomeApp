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
    let { photos = [] } = props;
    const photoMarkers = photos.filter( (photo) => photo.location !== null || !Object.is(photo.location, null) );

    let position = { latitude: 37.78825, longitude: -122.4324 };
    if ( props.position !== null ) {
        if (!(Object.keys(props.position).length === 0 && position.constructor === Object)) {
            position = props.position;
        }
    }

    return (
        <GradientBackground>
            <View style={ styles.container }>
                <MapView
                    style={ styles.map }
                    initialRegion={{
                        latitude: position.latitude,
                        longitude: position.longitude,
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
        height: height - 60,
    },
    pin: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
});

export default Map;
