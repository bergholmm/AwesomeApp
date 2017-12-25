import React from 'react';
import Camera from 'react-native-camera';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

const { width, height } = Dimensions.get('window')


const getFlashIcon = (flashMode) => {
    const { auto, on, off } = Camera.constants.FlashMode;

    if (flashMode === auto) {
        return <Image source={ require('../../resources/flashAuto.png') } style={ styles.flashButtonAuto } />;
    } else if (flashMode === on) {
        return <Image source={ require('../../resources/flashOn.png') } style={ styles.flashButtonOn } />;
    } else {
        return <Image source={ require('../../resources/flashOff.png') } style={ styles.flashButtonOff } />;
    }
};

const goToEditImage = (props) => {
    props.setImage({ uri: props.photo.path, width, height });
    props.Actions.push('editImage');
}

const CameraComponent = (props) => {
    const { camera, cameraPermission, locationPermission, photo } = props;
    const { aspect, captureTarget, type, flashMode } = props.settings;
    const flashIcon = getFlashIcon(flashMode);

    let content;
    let getCamera = (a) => {};


    if ( camera === 'noCamera' ) {
        getCamera = (a) => props.setCamera(a);
    }

    if ( cameraPermission !== 'authorized' ) {
        content = (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Please allow permissions for camera
                </Text>
            </View>
        )
    }
    else if (photo !== null) {
        content = (
            <View style={{ flex: 1 }}>
                <Image style={ styles.preview } source={{ uri: photo.path }}/>
                <View style={ styles.topContainer }>
                    <View style={ styles.leftButton }>
                        <TouchableHighlight underlayColor='transparent' style={ styles.topButtonContainer } onPress={ props.clear }>
                            <Image source={ require('../../resources/xColored.png') } style={ styles.closeButton } />
                        </TouchableHighlight>
                    </View>
                    <View style={ styles.rightButton }>
            <TouchableHighlight underlayColor='transparent' style={ styles.topButtonContainer } onPress={ () => {
                props.clear()
                goToEditImage(props)
            }}>
                            <Image source={ require('../../resources/done.png') } style={ styles.doneButton } />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    } else {
        content = (
            <Camera
                ref={ getCamera }
                style={ styles.camera }
                aspect={ aspect }
                captureTarget={ captureTarget }
                type={ type }
                flashMode={ flashMode }
                onFocusChanged={() => {}}
                onZoomChanged={() => {}}
                defaultTouchToFocus
                mirrorImage={ false }
            >
                <View style={ styles.topContainer }>
                    <TouchableHighlight underlayColor='transparent' style={ styles.closeContainer } onPress={ props.Actions.pop }>
                        <Image source={ require('../../resources/xColored.png') } style={ styles.closeButton } />
                    </TouchableHighlight>
                </View>
                <View style={ styles.buttonsContainer }>
                    <TouchableHighlight underlayColor='transparent' style={ styles.flashContainer } onPress={ props.switchFlash }>
                        {flashIcon}
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent' style={ styles.takePhotoContainer } onPress={ props.takePicture }>
                        <Image source={ require('../../resources/takePhoto.png') } style={ styles.takePhotoButton } />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent' style={ styles.switchCameraContainer } onPress={ props.switchCamera }>
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topButtonContainer: {
        width: 39,
        height: 39,
        marginTop: 30,
        marginLeft: 25,
    },
    topContainer: {
        position: 'absolute',
        height: 100,
        width: width,
        top: 0,
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
        width: width,
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
        width: 15,
        height: 15,
    },
    doneButton: {
        width: 21,
        height: 15,
    },
});

export default CameraComponent;
