import Permissions from 'react-native-permissions';
import Camera from 'react-native-camera';
import { getLocation } from './permissions';

// Action types

export const CLEAR_CURRENT_PHOTO = 'CLEAR_CURRENT_PHOTO';
export const SET_PHOTO = 'SET_PHOTO';
export const SWITCH_CAMERA = 'SWITCH_CAMERA';
export const SWITCH_FLASH = 'SWITCH_FLASH';
export const SET_CAMERA = 'SET_CAMERA';
export const SET_CAMERA_STATE = 'SET_CAMERA_STATE';
export const LOGOUT_CAMERA = 'LOGOUT_CAMERA';

// Actions creators

export const logoutCamera = () => {
    return {
        type: LOGOUT_CAMERA,
    }
}

export const clearCurrentPhoto = () => {
    return {
        type: CLEAR_CURRENT_PHOTO,
    };
};

export const setPhoto = (photo) => {
    return {
        type: SET_PHOTO,
        photo
    };
};

export const switchCameraAction = (type) => {
    return {
        type: SWITCH_CAMERA,
        cameraType: type,
    };
};

export const switchFlashAction = (flashMode) => {
    return {
        type: SWITCH_FLASH,
        flashMode
    };
};

export const setCamera = (camera) => {
    return {
        type: SET_CAMERA,
        camera,
    };
};

export const setCameraState = (cameraState) => {
    return {
        type: SET_CAMERA_STATE,
        cameraState,
    };
};


export const takePicture = () => {
    return (dispatch, getState) => {
        const { camera } = getState().camera;
        dispatch(getLocation());
        camera.capture()
            .then((photo) => dispatch(setPhoto(photo)))
            .catch(err => console.error(err));
    };
};

export const switchCamera = () => {
    return (dispatch, getState) => {
        const { back, front } = Camera.constants.Type;
        const { type } = getState().camera.cameraSettings;

        if (type === back) {
            dispatch(switchCameraAction(front));
        } else {
            dispatch(switchCameraAction(back));
        }
    };
};

export const switchFlash = () => {
    return (dispatch, getState) => {
        const { auto, on, off } = Camera.constants.FlashMode;
        const { flashMode } = getState().camera.cameraSettings;

        if (flashMode === auto) {
            dispatch(switchFlashAction(on));
        } else if (flashMode === on) {
            dispatch(switchFlashAction(off));
        } else {
            dispatch(switchFlashAction(auto));
        }
    };
};
