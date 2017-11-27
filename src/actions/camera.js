import Permissions from 'react-native-permissions';
import Camera from 'react-native-camera';

// Action types

export const UPDATE_PERMISSION_CAMERA = 'UPDATE_PERMISSION_CAMERA';
export const UPDATE_PERMISSION_LOCATION = 'UPDATE_PERMISSION_LOCATION';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const CLEAR_CURRENT_PHOTO = 'CLEAR_CURRENT_PHOTO';
export const SET_PHOTO = 'SET_PHOTO';
export const SWITCH_CAMERA = 'SWITCH_CAMERA';
export const SWITCH_FLASH = 'SWITCH_FLASH';
export const SET_CAMERA = 'SET_CAMERA';

// Actions creators

export const updateLocation = (location) => {
    return {
        type: UPDATE_LOCATION,
        location,
    };
};

export const updatePermissionCamera = (permission) => {
    return {
        type: UPDATE_PERMISSION_CAMERA,
        permission,
    };
};

export const updatePermissionLocation = (permission) => {
    return {
        type: UPDATE_PERMISSION_LOCATION,
        permission,
    };
};

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



export const getCameraPermission = () => {
    return (dispatch, getState) => {
        Permissions.request('camera').then(response => {
            dispatch(updatePermissionCamera(response));
        });
    };
};

export const getLocationPermission = () => {
    return (dispatch, getState) => {
        Permissions.request('location').then(response => {
            dispatch(updatePermissionLocation(response));
        });
    };
}

export const checkAndGetCameraAndLocationPermission = () => {
    return (dispatch, getState) => {
        Permissions.checkMultiple(['camera', 'location']).then(response => {
            const { camera, location } = response;

            dispatch(updatePermissionCamera(camera));
            dispatch(updatePermissionLocation(location));

            if (camera !== 'authorized') {
                dispatch(getCameraPermission());
            }

            if (location !== 'authorized') {
                dispatch(getLocationPermission());
            }
        });
    };
};


export const getLocation = () => {
    return (dispatch, getState) => {
        const { locationPermission } = getState().camera;

        if ( locationPermission === 'authorized' ) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    dispatch(updateLocation(position));
                },
                (error) => {},
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
        }
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
