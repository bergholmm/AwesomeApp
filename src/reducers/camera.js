import Camera from 'react-native-camera';
import {
    CLEAR_CURRENT_PHOTO,
    SET_PHOTO,
    SWITCH_FLASH,
    SWITCH_CAMERA,
    SET_CAMERA,
    LOGOUT_CAMERA,
} from '../actions/camera';

const initialState = {
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

    if ( type === CLEAR_CURRENT_PHOTO ) {
        return { ...state, currentPhoto: null };
    }
    else if ( type === LOGOUT_CAMERA ) {
        return { ...initialState };
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
