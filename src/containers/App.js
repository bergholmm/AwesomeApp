import App from '../components/App';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { checkAndGetCameraAndLocationPermission } from '../actions/camera';
import { checkAndGetPhotosPermission } from '../actions/cameraRoll';

const mapStateToProps = state => ({
    Actions,
    cameraPermission: state.camera.cameraPermission,
    locationPermission: state.camera.locationPermission,
    photosPermission: state.cameraRoll.photosPermission,
})

const mapDispatchToProps = (dispatch) => ({
    checkAndGetCameraAndLocationPermission: () => dispatch(checkAndGetCameraAndLocationPermission()),
    checkAndGetPhotosPermission: () => dispatch(checkAndGetPhotosPermission()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
