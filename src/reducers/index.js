import { combineReducers } from 'redux';
import counter from './counter';
import routes from './routes';
import tabbar from './tabbar';
import camera from './camera';

const reducer = combineReducers({
    counter,
    routes,
    tabbar,
    camera,
});

export default reducer;
