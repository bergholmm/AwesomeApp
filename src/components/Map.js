import React, { Component } from 'react';
import GradientBackground from './GradientBackground'
import MapView from 'react-native-maps';
import ImageViewer from 'react-native-image-zoom-viewer';
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
        this.state = {
            photo: null,
        };
    }
    componentDidMount() {
        this.props.getCurrentPosition();
    }
    displayPhoto(photo) {
        this.setState({
            photo,
        });
    }
    backToMap() {
        this.setState({
            photo: null,
        });
    }
    render() {
        const { photos = [] } = this.props;

        const photosWithLocation = photos.filter( photo => photo.location !== null || photo.location !== undefined );
        const photosWithLocation2 = photosWithLocation.filter( photo => (
            !(Object.keys(photo.location).length === 0 && photo.location.constructor === Object)
        ));

        const markers = photosWithLocation2.map((photo, i) =>
            <MapView.Marker
                key={ i }
                coordinate={ photo.location }
            >
                <TouchableHighlight underlayColor='transparent' onPress={ () => this.displayPhoto(photo) } >
                    <Image source={{ uri: photo.url }} style={ styles.pin } />
                </TouchableHighlight>
            </MapView.Marker>
        );

        if ( this.props.position !== null ) {
            if (!(Object.keys(this.props.position).length === 0 && this.props.position.constructor === Object)) {
                position = this.props.position;
            }
        }


        let content = <View></View>;
        if (this.state.photo !== null) {
            content = (
                <Modal visible={true} transparent={true}>
                    <ImageViewer imageUrls={[{ url: this.state.photo.url }]} onClick={ this.backToMap.bind(this) }/>
                </Modal>
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
                    { content }
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
