import {
    ADD_IMAGE,
    SET_IMAGE,
    CLEAR_IMAGE,
    UPDATE_PHOTOS_CAMERA_ROLL,
    CLEAR_PHOTOS_CAMERA_ROLL,
    UPDATE_REACT_PHOTOS,
    LOGOUT_PHOTOS,
} from '../actions/photos';

const initialState = {
    reactPhotos: {
        lastIndex: 0,
        photos: [],
        drafts: [],
        pageInfo: null,
    },
    currentPhoto: {
        image: null,
        location: null,
    },
    cameraRoll: {
        lastIndex: 0,
        photos: [],
        drafts: [],
        pageInfo: null,
    }
};

const photos = (state = initialState, action = {}) => {
    const { type } = action;

    if ( type === ADD_IMAGE ) {
        let reactPhotos = state.reactPhotos;
        reactPhotos.photos =  [ action.image, ...reactPhotos.photos ];
        return { ...state, reactPhotos };
    }
    else if ( type === UPDATE_REACT_PHOTOS ) {
        let reactPhotos = state.reactPhotos;
        reactPhotos.photos =  action.photos;
        return { ...state, reactPhotos };
    }
    else if ( type === SET_IMAGE) {
        return { ...state, currentPhoto: { image: action.image, location: action.location }};
    }
    else if ( type === CLEAR_IMAGE ) {
        return { ...state, currentPhoto: { image: null, location: null }};
    }
    else if ( type === UPDATE_PHOTOS_CAMERA_ROLL ) {
        let cameraRoll = state.cameraRoll;
        cameraRoll.photos = [...cameraRoll.photos, ...action.photos];
        cameraRoll.pageInfo = action.pageInfo;
        return { ...state, cameraRoll };
    }
    else if ( type === LOGOUT_PHOTOS ) {
        return { ...initialState };
    }
    else if ( type === CLEAR_PHOTOS_CAMERA_ROLL ) {
        let cameraRoll = state.cameraRoll;
        cameraRoll.photos = [];
        cameraRoll.pageInfo = null;
        return { ...state, cameraRoll };
    } else {
        return state;
    }
};

export default photos;
