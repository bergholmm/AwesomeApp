import { combineReducers } from 'redux';
import routes from './routes';
import tabbar from './tabbar';
import camera from './camera';
import cameraRoll from './cameraRoll';
import image from './image';
import photos from './photos';
import user from './user';

const reducer = combineReducers({
    routes,
    tabbar,
    camera,
    cameraRoll,
    image,
    photos,
    user,
});

export default reducer;
