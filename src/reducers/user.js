import {
    LOGIN,
    LOGOUT_USER,
    FETCHING_LOCAL_STATE,
    LOGIN_STATE,
} from '../actions/user';

const initialState = {
    token: null,
    id: null,
    name: null,
    picture: null,
    firstLogin: true,
    loading: {
        fetchingLocalState: true,
    }
};

const user = (state = initialState, action = {}) => {
    const { type } = action;

    if ( type === LOGIN ) {
        const { id, name, picture } = action.userData;
        return { ...state, token: action.token, id, name, picture: picture.data.url };
    }
    else if ( type === LOGIN_STATE ) {
        return { ...state, firstLogin: action.val };
    }
    else if ( type === LOGOUT_USER ) {
        return { ...initialState };
    }
    else if ( type === FETCHING_LOCAL_STATE ) {
        const x = { ...state.loading, fetchingLocalState: action.fetchingLocalState };
        return { ...state,  loading: x };
    } else {
        return state;
    }
};

export default user;
