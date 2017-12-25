import { combineReducers } from 'redux';
import routes from './routes';
import tabbar from './tabbar';
import camera from './camera';
import photos from './photos';
import user from './user';
import permissions from './permissions';

const reducer = combineReducers({
    routes,
    tabbar,
    camera,
    photos,
    user,
    permissions,
});

export default reducer;
