import { combineReducers } from 'redux';
import counter from './counter';
import routes from './routes';
import tabbar from './tabbar';

const reducer = combineReducers({
    counter,
    routes,
    tabbar,
});

export default reducer;
