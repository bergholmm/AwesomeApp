import Camera from  '../components/Camera';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { setImageFromCamera } from '../actions/photos';
import { getLocation } from '../actions/permissions';
import {
    switchFlash,
    switchCamera,
    takePicture,
    clearCurrentPhoto,
    setCamera,
} from '../actions/camera';

const mapStateToProps = state => ({
    Actions,
    location: state.permissions.location,
    cameraPermission: state.permissions.cameraPermission,
    locationPermission: state.permissions.locationPermission,
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
