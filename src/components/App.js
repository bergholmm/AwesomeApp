import React, { Component }from 'react';
import GradientBackground from './GradientBackground';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
} from 'react-native';

class App extends Component {
    constructor(props) {
        super(props);
        // props.resetState();
        props.loadState();
    }
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
        return (
            <GradientBackground>
                <View style={ styles.logoContainer }>
                    <Image source={ require('../../resources/logox2.png') } style={ styles.logo } />
                </View>
                <View style={ styles.loginContainer }>
                    <TouchableHighlight underlayColor='white' style={ styles.buttonContainer } onPress={ () => this.props.loginAndSaveState('token') }>
                        <Text style={ styles.buttonText }>Login with Facebook</Text>
                    </TouchableHighlight>
                    <Text onPress={ this.props.resetState } style={ styles.smallText }>App name here</Text>
                </View>
            </GradientBackground>
        );
    }
};


const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 98,
        width: 98,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: 'white',
        height: 60,
        width: 200,
    },
    buttonText: {
        fontSize: 14,
        color: '#FF7676',
    },
    smallText: {
        fontSize: 11,
        color: 'white',
        backgroundColor: 'transparent',
        top: 20,
    }
});

export default App;
