// Action types

export const ADD_IMAGE = 'ADD_IMAGE';

// Actions creators

export const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        image,
    };
};
