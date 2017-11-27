import App from '../components/App';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { checkAndGetCameraAndLocationPermisson } from '../actions/camera';

const mapStateToProps = state => ({
    Actions,
})

const mapDispatchToProps = (dispatch) => ({
    checkAndGetCameraAndLocationPermisson: () => dispatch(checkAndGetCameraAndLocationPermisson()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
