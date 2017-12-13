import {
    LOGIN,
    LOGOUT,
    FETCHING_LOCAL_STATE,
    LOGIN_STATE,
} from '../actions/user';

const initialState = {
    token: null,
    firstLogin: true,
    loading: {
        fetchingLocalState: true,
    }
};

const user = (state = initialState, action = {}) => {
    const { type } = action;

    if ( type === LOGIN ) {
        return { ...state, token: action.token };
    }
    else if ( type === LOGIN_STATE ) {
        return { ...state, firstLogin: action.val };
    }
    else if ( type === LOGOUT ) {
        return { ...state, token: null };
    }
    else if ( type === FETCHING_LOCAL_STATE ) {
        const x = { ...state.loading, fetchingLocalState: action.fetchingLocalState };
        return { ...state,  loading: x };
    } else {
        return state;
    }
};

export default user;
