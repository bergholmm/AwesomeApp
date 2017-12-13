import App from '../components/App';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { checkAndGetCameraAndLocationPermission, getLocation } from '../actions/camera';
import { checkAndGetPhotosPermission } from '../actions/cameraRoll';
import { loginAndSaveState, loadState, resetState } from '../actions/user';

const mapStateToProps = state => ({
    Actions,
    cameraPermission: state.camera.cameraPermission,
    locationPermission: state.camera.locationPermission,
    photosPermission: state.cameraRoll.photosPermission,
    fetchingLocalState: state.user.loading.fetchingLocalState,
})

const mapDispatchToProps = (dispatch) => ({
    checkAndGetCameraAndLocationPermission: () => dispatch(checkAndGetCameraAndLocationPermission()),
    checkAndGetPhotosPermission: () => dispatch(checkAndGetPhotosPermission()),
    getCurrentPosition: () => dispatch(getLocation()),
    loadState: () => dispatch(loadState()),
    loginAndSaveState: (token) => dispatch(loginAndSaveState(token)),
    resetState: () => dispatch(resetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
