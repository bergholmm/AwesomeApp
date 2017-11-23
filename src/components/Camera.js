import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {
    Button,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

const { width, height } = Dimensions.get('window')


class CameraComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aspect: Camera.constants.Aspect.fill,
            captureTarget: Camera.constants.CaptureTarget.temp,
            type: Camera.constants.Type.back,
            flashMode: Camera.constants.FlashMode.auto,
            photo: null,
            position: null,
        };
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    position,
                    error: null
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }
    takePicture() {
        const options = {};
        options.location = this.state.position;
        this.camera.capture({metadata: options})
            .then((data) => this.setState({photo: data}))
            .catch(err => console.error(err));
    }
    switchCamera() {
        const { back, front } = Camera.constants.Type;
        const { type } = this.state;

        if (type === back) {
            this.setState({
                type: front,
            });
        } else {
            this.setState({
                type: back,
            });
        }
    }
    switchFlash() {
        const { auto, on, off } = Camera.constants.FlashMode;
        const { flashMode } = this.state;

        if (flashMode === auto) {
            this.setState({
                flashMode: on,
            });
        } else if (flashMode === on) {
            this.setState({
                flashMode: off,
            });
        } else {
            this.setState({
                flashMode: auto,
            });
        }
    }
    getFlashIcon() {
        const { auto, on, off } = Camera.constants.FlashMode;
        const { flashMode } = this.state;

        if (flashMode === auto) {
            return <Image source={ require('../../resources/flashAuto.png') } style={ styles.flashButtonAuto } />;
        } else if (flashMode === on) {
            return <Image source={ require('../../resources/flashOn.png') } style={ styles.flashButtonOn } />;
        } else {
            return <Image source={ require('../../resources/flashOff.png') } style={ styles.flashButtonOff } />;
        }
    }
    clear() {
        this.setState({
            photo: null,
        });
    }
    render() {
        const { photo, aspect, captureTarget, type, flashMode } = this.state;
        const flashIcon = this.getFlashIcon();
        let content;

        if (photo !== null) {
            content = (
                <View>
                    <View style={ styles.topButtons }>
                    <Image style={ styles.preview } source={{ uri: photo.path }}/>
                        <View style={ styles.leftButton }>
                            <TouchableHighlight underlayColor='transparent' style={ styles.closeContainer } onPress={ this.clear.bind(this) }>
                                <Image source={ require('../../resources/xColored.png') } style={ styles.closeButton } />
                            </TouchableHighlight>
                        </View>
                        <View style={ styles.rightButton }>
                            <TouchableHighlight underlayColor='transparent' style={ styles.closeContainer } onPress={ () => this.props.Actions.push('editImage') }>
                                <Image source={ require('../../resources/done.png') } style={ styles.doneButton } />
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            );
        } else {
            content = (
                <Camera
                    ref={ (cam) => { this.camera = cam } }
                    style={ styles.camera }
                    aspect={ aspect }
                    captureTarget={ captureTarget }
                    type={ type }
                    flashMode={ flashMode }
                >
                    <View style={ styles.upperContainer }>
                        <TouchableHighlight underlayColor='transparent' style={ styles.closeContainer } onPress={ this.props.Actions.pop }>
                            <Image source={ require('../../resources/xColored.png') } style={ styles.closeButton } />
                        </TouchableHighlight>
                    </View>
                    <View style={ styles.buttonsContainer }>
                        <TouchableHighlight underlayColor='transparent' style={ styles.flashContainer } onPress={ this.switchFlash.bind(this) }>
                            {flashIcon}
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='transparent' style={ styles.takePhotoContainer } onPress={ this.takePicture.bind(this) }>
                            <Image source={ require('../../resources/takePhoto.png') } style={ styles.takePhotoButton } />
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='transparent' style={ styles.switchCameraContainer } onPress={ this.switchCamera.bind(this) }>
                            <Image source={ require('../../resources/switchCamera.png') } style={ styles.switchCameraButton } />
                        </TouchableHighlight>
                    </View>
                </Camera>
            );
        }

        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    upperContainer: {
        flex: 1,
    },
    topButtons: {
        flex: 0.22,
        width: '100%',
        flexDirection: 'row',
    },
    leftButton: {
        flex: 1,
    },
    rightButton: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 15,
    },
    text: {
        padding: 30,
        alignSelf: 'center',
        fontSize: 26,
        fontWeight: 'bold',
    },
    preview: {
        position: 'absolute',
        width: width,
        height: height,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    buttonsContainer: {
        flex: 0.2,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    flashContainer: {
        width: 22,
        height: 24,
    },
    takePhotoContainer: {
        width: 66,
        height: 66,
    },
    switchCameraContainer: {
        width: 32,
        height: 25,
    },
    closeContainer: {
        width: 39,
        height: 39,
        marginTop: 30,
        marginLeft: 25,
    },
    flashButtonAuto: {
        width: 21,
        height: 23,
    },
    flashButtonOn: {
        width: 14,
        height: 17,
    },
    flashButtonOff: {
        width: 22,
        height: 24,
    },
    takePhotoButton: {
        width: 66,
        height: 66,
    },
    switchCameraButton: {
        width: 32,
        height: 25,
    },
    closeButton: {
        width: 19,
        height: 19,
    },
    doneButton: {
        width: 31,
        height: 22,
    },
});

export default CameraComponent;
