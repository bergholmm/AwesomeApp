import {
    CHANGE_INDEX,
    HIDE,
} from '../actions/tabbar';

const initialState = {
    index: 0,
    hide: false,
};

const tabbar = (state = initialState, action = {}) => {
    switch (action.type) {
        case CHANGE_INDEX:
            return { ...state, index: action.index };
        case HIDE:
            return { ...state, hide: action.hide };
        default:
            return state;
    };
};

export default tabbar;
