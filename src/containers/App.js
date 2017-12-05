import App from '../components/App';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { checkAndGetCameraAndLocationPermission, getLocation } from '../actions/camera';
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
    getCurrentPosition: () => dispatch(getLocation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
