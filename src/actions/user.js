import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';

// Action types

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FETCHING_LOCAL_STATE = 'FETCHING_LOCAL_STATE';
export const LOGIN_STATE = 'LOGIN_STATE';

// Actions creators

export const login = (token) => {
    return {
        type: LOGIN,
        token,
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
    };
};

export const fetchingLocalState = (val) => {
    return {
        type: FETCHING_LOCAL_STATE,
        fetchingLocalState: val,
    };
};

export const setLoginState = (val) => {
    return {
        type: LOGIN_STATE,
        val,
    };
};


export const saveState = (token) => {
    return async (dispatch, getState) => {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('firstLogin', 'false');
    };
};

export const loadState = () => {
    return async (dispatch, getState) => {
        dispatch(fetchingLocalState(true));
        const token = await AsyncStorage.getItem('token');
        const firstLogin = (await AsyncStorage.getItem('firstLogin') == 'true');


        if (token === '' || token === null) {
            dispatch(login(null));
        } else {
            dispatch(login(token));
            Actions.replace('main');
        }

        dispatch(setLoginState(firstLogin));
        dispatch(fetchingLocalState(false));
        SplashScreen.hide();
    };
};

export const removeState = () => {
    return async (dispatch, getState) => {
        await AsyncStorage.setItem('token', '');
    };
};

export const resetState = () => {
    return async (dispatch, getState) => {
        await AsyncStorage.setItem('token', '');
        await AsyncStorage.setItem('firstLogin', 'true');
        dispatch(loadState());
    };
};

export const logoutAndRemoveState = () => {
    return (dispatch, getState) => {
        dispatch(removeState());
        dispatch(logout());
        Actions.replace('landing');
    };
};

export const loginAndSaveState = (token) => {
    return (dispatch, getState) => {
        const { firstLogin } = getState().user;

        dispatch(saveState(token));
        dispatch(login(token));
        dispatch(setLoginState(false));

        if (firstLogin) {
            Actions.replace('tutorial');
        } else {
            Actions.replace('main');
        }
    };
};
