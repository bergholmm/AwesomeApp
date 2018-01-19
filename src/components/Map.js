import React, { Component } from 'react';
import GradientBackground from './GradientBackground'
import MapView from 'react-native-maps';
import ZoomImage from 'react-native-zoom-image';
import { Platform } from 'react-native';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
    Modal,
} from 'react-native';

const { width, height } = Dimensions.get('window')
let position = { latitude: 37.78825, longitude: -122.4324 };

class Map extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getCurrentPosition();
    }
    render() {
        const { photos } = this.props;
        position = this.props.position || position;

        const photosWithLocation = photos.filter( photo => photo.location );

        let markers;
        if ( Platform.OS === 'android' ) {
            markers = photosWithLocation.map((photo, i) =>
                <MapView.Marker
                    key={ i }
                    coordinate={ photo.location }
                >
                    <TouchableHighlight underlayColor='transparent' onPress={ () => this.displayPhoto(photo) } >
                        <View style={ [styles.pin, {backgroundColor: 'pink'}] }></View>
                    </TouchableHighlight>
                </MapView.Marker>
            );
        } else {
            markers = photosWithLocation.map((photo, i) =>
                <MapView.Marker
                    key={ i }
                    coordinate={ photo.location }
                >
                    <ZoomImage
                        source={{uri: photo.url}}
                        imgStyle={styles.pin}
                        style={styles.pin}
                        duration={200}
                        enableScaling={false}
                    />
                </MapView.Marker>
            );
        }

        return (
            <GradientBackground>
                <View style={ styles.container }>
                    <MapView
                        style={ styles.map }
                        initialRegion={{
                            latitude: position.latitude,
                            longitude: position.longitude,
                            latitudeDelta: 1,
                            longitudeDelta: 1,
                        }}
                    >
                    { markers }
                    </MapView>
                </View>
            </GradientBackground>
        );
    }
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
