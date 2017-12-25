import React, { Component } from 'react';
import Tabbar from '../containers/Tabbar';
import Photos from '../containers/Photos';
import Map from '../containers/Map';
import ActionSelect from '../containers/ActionSelect';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class MainWrapper extends Component {
    componentDidMount() {
        const { cameraPermission, locationPermission, photosPermission, getCurrentPosition } = this.props;

        if ( cameraPermission !== 'authorized' || locationPermission !== 'authorized') {
            this.props.checkAndGetCameraAndLocationPermission();
        }

        if ( photosPermission !== 'authorized' ) {
            this.props.checkAndGetPhotosPermission();
        }

        getCurrentPosition();
    }
    render() {
        const { tabIndex } = this.props;
        let page = <Photos/>;

        if (tabIndex == 1) {
            page = <ActionSelect/>
        }
        else if (tabIndex == 2) {
            page = <Map/>;
        }

        return (
            <View style={styles.container}>
                {page}
                <Tabbar/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MainWrapper;
