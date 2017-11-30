// Action types

export const SET_IMAGE = 'SET_IMAGE';
export const CLEAR_IMAGE = 'CLEAR_IMAGE';

// Actions creators

export const setImage = (image, location) => {
    return {
        type: SET_IMAGE,
        image,
        location,
    };
};

export const clearImage = () => {
    return {
        type: CLEAR_IMAGE,
    };
};

export const setImageFromCamera = (image) => {
    return (dispatch, getState) => {
        const location = getState().camera.location;
        dispatch(setImage(image, location));
    };
};
