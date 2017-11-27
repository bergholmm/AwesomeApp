import { combineReducers } from 'redux';
import counter from './counter';
import routes from './routes';
import tabbar from './tabbar';
import camera from './camera';
import cameraRoll from './cameraRoll';

const reducer = combineReducers({
    counter,
    routes,
    tabbar,
    camera,
    cameraRoll,
});

export default reducer;
