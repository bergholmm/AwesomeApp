import {
    UPDATE_PERMISSION_CAMERA,
    UPDATE_PERMISSION_LOCATION,
    UPDATE_PERMISSION_PHOTOS,
    UPDATE_LOCATION,
    SET_PERMISSIONS,
} from '../actions/permissions';

const initialState = {
    photosPermission: null,
    cameraPermission: null,
    locationPermission: null,
    location: null,
};

const permissions = (state = initialState, action = {}) => {
    const { type } = action;

    if ( type === UPDATE_PERMISSION_CAMERA ) {
        return { ...state, cameraPermission: action.permission };
    }
    else if ( type === SET_PERMISSIONS ) {
        return { ...state, ...action.permissions }
    }
    else if ( type === UPDATE_PERMISSION_PHOTOS ) {
        return { ...state, photosPermission: action.permission };
    }
    else if ( type === UPDATE_PERMISSION_LOCATION ) {
        return { ...state, locationPermission: action.permission };
    }
    else if ( type === UPDATE_LOCATION ) {
        return { ...state, location: action.location };
    } else {
        return state;
    }
};

export default permissions;
