import {
    UPDATE_PERMISSION_PHOTOS,
    UPDATE_PHOTOS,
    CLEAR_PHOTOS,
} from '../actions/cameraRoll';

const initialState = {
    photosPermission: null,
    lastIndex: 0,
    photos: [],
    drafts: [],
    pageInfo: null,
};

const cameraRoll = (state = initialState, action = {}) => {
    const { type } = action;

    if ( type === UPDATE_PERMISSION_PHOTOS ) {
        return { ...state, photosPermission: action.permission };
    }
    else if ( type === UPDATE_PHOTOS ) {
        const photos = [...state.photos, ...action.photos];
        return { ...state, photos, pageInfo: action.pageInfo};
    }
    else if ( type === CLEAR_PHOTOS ) {
        return { ...state, photos: [], pageInfo: null };
    } else {
        return state;
    }
};

export default cameraRoll;
