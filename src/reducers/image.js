import {
    SET_IMAGE,
    CLEAR_IMAGE,
} from '../actions/image';

const initialState = {
    image: null,
    location: null,
};

const image = (state = initialState, action = {}) => {
    const { type } = action;

    if ( type === SET_IMAGE) {
        return { ...state, image: action.image, location: action.location };
    }
    else if ( type === CLEAR_IMAGE ) {
        return initialState;
    } else {
        return state;
    }
};

export default image;
