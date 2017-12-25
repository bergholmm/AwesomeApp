import Permissions from 'react-native-permissions';

// Action types
export const UPDATE_PERMISSION_CAMERA = 'UPDATE_PERMISSION_CAMERA';
export const UPDATE_PERMISSION_LOCATION = 'UPDATE_PERMISSION_LOCATION';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_PERMISSION_PHOTOS = 'UPDATE_PERMISSION_PHOTOS';
export const SET_PERMISSIONS = 'SET_PERMISSIONS';


// Actions creators

export const setPermissions = (permissions) => {
    return {
        type: SET_PERMISSIONS,
        permissions,
    };
};

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

export const updatePermissionPhotos = (permission) => {
    return {
        type: UPDATE_PERMISSION_PHOTOS,
        permission,
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
        const { locationPermission } = getState().permissions;

        if ( locationPermission === 'authorized' ) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    dispatch(updateLocation(position.coords));
                },
                (error) => {},
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
        }
    };
};

export const getPhotosPermission = () => {
    return (dispatch, getState) => {
        Permissions.request('photo').then(response => {
            dispatch(updatePermissionPhotos(response));
        });
    };
};

export const checkAndGetPhotosPermission = () => {
    return (dispatch, getState) => {
        Permissions.check('photo').then(response => {
            dispatch(updatePermissionPhotos(response));
            if (response !== 'authorized') {
                dispatch(getPhotosPermission());
            }
        });
    };
};
