import {
    ADD_IMAGE,
} from '../actions/photos';

import { photos as p } from '../utils';

const initialState = {
    photos: p,
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
