import Photos from '../components/Photos';
import { connect } from 'react-redux';
import { logoutAndRemoveState } from '../actions/user';

const mapStateToProps = state => ({
    photos: state.photos.photos,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutAndRemoveState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);

