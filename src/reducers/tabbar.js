import {
    CHANGE_INDEX,
} from '../actions/tabbar';

const initialState = {
    index: 0,
};

const tabbar = (state = initialState, action = {}) => {
    switch (action.type) {
        case CHANGE_INDEX:
            return { ...state, index: action.index };
        default:
            return state;
    };
};

export default tabbar;
