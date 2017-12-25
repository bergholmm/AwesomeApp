import MainWrapper from  '../components/MainWrapper';
import { checkAndGetPhotosPermission, checkAndGetCameraAndLocationPermission, getLocation } from '../actions/permissions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    tabIndex: state.tabbar.index,
    cameraPermission: state.permissions.cameraPermission,
    locationPermission: state.permissions.locationPermission,
    photosPermission: state.permissions.photosPermission,
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentPosition: () => dispatch(getLocation()),
    checkAndGetCameraAndLocationPermission: () => dispatch(checkAndGetCameraAndLocationPermission()),
    checkAndGetPhotosPermission: () => dispatch(checkAndGetPhotosPermission()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWrapper);
