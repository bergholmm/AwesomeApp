// Action types

export const CHANGE_INDEX = 'CHANGE_INDEX';
export const HIDE = 'HIDE';

// Actions creators

export const changeTab = (index) => {
    return {
        type: CHANGE_INDEX,
        index,
    };
};

export const hideTabbar = (hide) => {
    return {
        type: HIDE,
        hide,
    };
};
