import Photos from '../components/Photos';
import { connect } from 'react-redux';
import { logoutAndRemoveState } from '../actions/user';
import { getLocation, requestExternalStoragePermission } from '../actions/permissions';

const mapStateToProps = state => ({
    photos: state.photos.reactPhotos.photos,
    name: state.user.name,
    profilePicture: state.user.picture,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutAndRemoveState()),
    getCurrentPosition: () => dispatch(getLocation()),
    requestExternalStoragePermission: () => dispatch(requestExternalStoragePermission()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);

