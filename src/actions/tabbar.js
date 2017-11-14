// Action types

export const CHANGE_INDEX = 'CHANGE_INDEX';

// Actions creators

export const changeTab = (index) => {
    return {
        type: CHANGE_INDEX,
        index,
    }
}
