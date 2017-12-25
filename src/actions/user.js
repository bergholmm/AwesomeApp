import SplashScreen from 'react-native-splash-screen';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { logoutCamera } from './camera';
import { logoutPhoto } from './photos';
import { setPermissions } from './permissions';

// Action types

export const LOGIN = 'LOGIN';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCHING_LOCAL_STATE = 'FETCHING_LOCAL_STATE';
export const LOGIN_STATE = 'LOGIN_STATE';

// Actions creators

export const login = (token) => {
    return {
        type: LOGIN,
        token,
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
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


export const saveToken = (token, id) => {
    return async (dispatch, getState) => {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('firstLogin', 'false');
    };
};

export const removeToken = () => {
    return async (dispatch, getState) => {
        await AsyncStorage.setItem('token', '');
    };
};

export const savePermissions = () => {
    return async (dispatch, getState) => {
        const { permissions } = getState();
        console.log('savePer', permissions)

        permissionsStringified = JSON.stringify(permissions);
        await AsyncStorage.setItem('permissions', permissionsStringified);
    }
}

export const loadPermissions = () => {
    return async (dispatch, getState) => {
        const permissions = JSON.parse(await AsyncStorage.getItem('permissions'));

        console.log('load', permissions)
        if (permissions === null) {
            return;
        }

        dispatch(setPermissions(permissions));
    }
}

export const loadAppState = () => {
    return async (dispatch, getState) => {
        dispatch(fetchingLocalState(true));
        const token = await AsyncStorage.getItem('token');
        const firstLogin = (await AsyncStorage.getItem('firstLogin') == 'true');

        if (token === '' || token === null) {
            dispatch(login(null));
        } else {
            dispatch(login(token))
            dispatch(loadPermissions())
            Actions.replace('main');
        }
        dispatch(setLoginState(firstLogin));
        dispatch(fetchingLocalState(false));
        SplashScreen.hide();
    };
};


export const resetAppState = () => {
    return async (dispatch, getState) => {
        await AsyncStorage.setItem('token', '');
        await AsyncStorage.setItem('permissions', '');
        await AsyncStorage.setItem('firstLogin', 'true');
    };
};

export const logoutAndRemoveState = () => {
    return (dispatch, getState) => {
        dispatch(savePermissions());
        dispatch(removeToken());
        dispatch(logoutUser());
        dispatch(logoutCamera());
        dispatch(logoutPhoto());
        Actions.replace('landing');
    };
};

export const loginAndSaveState = (token) => {
    return (dispatch, getState) => {
        const { firstLogin } = getState().user;

        dispatch(loadPermissions());
        dispatch(saveToken(token));
        dispatch(login(token));
        dispatch(setLoginState(false));

        if (firstLogin) {
            Actions.replace('tutorial');
        } else {
            Actions.replace('main');
        }
    };
};
