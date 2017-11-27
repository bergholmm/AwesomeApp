import Camera from 'react-native-camera';
import {
    UPDATE_PERMISSION_CAMERA,
    UPDATE_PERMISSION_LOCATION,
    UPDATE_LOCATION,
    CLEAR_CURRENT_PHOTO,
    SET_PHOTO,
    SWITCH_FLASH,
    SWITCH_CAMERA,
    SET_CAMERA,
} from '../actions/camera';

const initialState = {
    cameraPermission: null,
    locationPermission: null,
    location: null,
    currentPhoto: null,
    camera: 'noCamera',
    cameraSettings: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.temp,
        type: Camera.constants.Type.back,
        flashMode: Camera.constants.FlashMode.auto,
    }
};

const camera = (state = initialState, action = {}) => {
    const { type } = action;

    if ( type === UPDATE_PERMISSION_CAMERA ) {
        return { ...state, cameraPermission: action.permission };
    }
    else if ( type === UPDATE_PERMISSION_LOCATION ) {
        return { ...state, locationPermission: action.permission };
    }
    else if ( type === UPDATE_LOCATION ) {
        return { ...state, location: action.location };
    }
    else if ( type === CLEAR_CURRENT_PHOTO ) {
        return { ...state, currentPhoto: null };
    }
    else if ( type === SET_PHOTO ) {
        return { ...state, currentPhoto: action.photo };
    }
    else if ( type === SWITCH_CAMERA ) {
        const cameraSettings = { ...state.cameraSettings, type: action.cameraType };
        return { ...state, cameraSettings };
    }
    else if ( type === SWITCH_FLASH ) {
        const cameraSettings = { ...state.cameraSettings, flashMode: action.flashMode };
        return { ...state, cameraSettings };
    }
    else if ( type === SET_CAMERA ) {
        if ( action.camera === null ) {
            return state;
        } else {
            return { ...state, camera: action.camera };
        }
    } else {
        return state;
    }
};

export default camera;
