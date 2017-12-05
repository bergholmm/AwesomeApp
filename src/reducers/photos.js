import {
    ADD_IMAGE,
} from '../actions/photos';

const initialState = {
    photos: [],
};

const photos = (state = initialState, action = {}) => {
    const { type } = action;

    if ( type === ADD_IMAGE ) {
        const photos =  [ action.image, ...state.photos ];
        return { ...state, photos };
    } else {
        return state;
    }
};

export default photos;
