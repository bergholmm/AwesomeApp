import Camera from  '../components/Camera';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { setImageFromCamera } from '../actions/image';
import {
    getLocation,
    switchFlash,
    switchCamera,
    takePicture,
    clearCurrentPhoto,
    setCamera,
} from '../actions/camera';

const mapStateToProps = state => ({
    Actions,
    location: state.camera.location,
    cameraPermission: state.camera.cameraPermission,
    locationPermission: state.camera.locationPermission,
    photo: state.camera.currentPhoto,
    settings: state.camera.cameraSettings,
    camera: state.camera.camera,
});

const mapDispatchToProps = (dispatch) => ({
    getLocation: () => dispatch(getLocation()),
    switchCamera: () => dispatch(switchCamera()),
    switchFlash: () => dispatch(switchFlash()),
    takePicture: () => dispatch(takePicture()),
    clear: () => dispatch(clearCurrentPhoto()),
    setCamera: (cam) => dispatch(setCamera(cam)),
    setImage: (image) => dispatch(setImageFromCamera(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
