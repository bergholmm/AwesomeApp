import SplashScreen from 'react-native-splash-screen';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { logoutCamera } from './camera';
import { logoutPhoto } from './photos';
import { setPermissions } from './permissions';
import { listUsers, createUserAlbum, getUserAlbum } from './aws';

// Action types

export const LOGIN = 'LOGIN';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCHING_LOCAL_STATE = 'FETCHING_LOCAL_STATE';
export const LOGIN_STATE = 'LOGIN_STATE';

// Actions creators

export const login = (token, userData) => {
    return {
        type: LOGIN,
        token,
        userData,
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


export const saveToken = (token, userData) => {
    return async (dispatch, getState) => {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        await AsyncStorage.setItem('firstLogin', 'false');
    };
};

export const removeToken = () => {
    return async (dispatch, getState) => {
        await AsyncStorage.setItem('token', '');
        await AsyncStorage.setItem('userData', '');
    };
};

export const savePermissions = () => {
    return async (dispatch, getState) => {
        const { permissions } = getState();
        permissionsStringified = JSON.stringify(permissions);
        await AsyncStorage.setItem('permissions', permissionsStringified);
    }
}

export const loadPermissions = () => {
    return async (dispatch, getState) => {
        const permissions = JSON.parse(await AsyncStorage.getItem('permissions'));
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
            dispatch(logoutUser());
        } else {
            const userData = JSON.parse(await AsyncStorage.getItem('userData'));
            dispatch(login(token, userData))
            dispatch(loadPermissions())
            dispatch(getUserAlbum(userData.id));
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
        await AsyncStorage.setItem('userData', '');
        await AsyncStorage.setItem('permissions', '');
        await AsyncStorage.setItem('firstLogin', 'true');
    };
};

export const logoutAndRemoveState = () => {
    return (dispatch, getState) => {
        dispatch(savePermissions());
        dispatch(removeToken());
        dispatch(logoutCamera());
        dispatch(logoutPhoto());
        Actions.replace('landing');
    };
};

export const loginAndSaveState = (token, userData) => {
    return (dispatch, getState) => {
        const { firstLogin } = getState().user;
        const { id } = userData;

        dispatch(createUserAlbum(id));
        dispatch(getUserAlbum(id));
        dispatch(loadPermissions());
        dispatch(saveToken(token, userData));
        dispatch(login(token, userData));
        dispatch(setLoginState(false));

        if (firstLogin) {
            Actions.replace('tutorial');
        } else {
            Actions.replace('main');
        }
    };
};
