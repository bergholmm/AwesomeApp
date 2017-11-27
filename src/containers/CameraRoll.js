import CameraRoll from  '../components/CameraRoll';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    getPhotos,
    clear,
} from '../actions/cameraRoll';

const mapStateToProps = state => ({
    Actions,
    drafts: state.cameraRoll.drafts,
    photos: state.cameraRoll.photos,
});

const mapDispatchToProps = (dispatch) => ({
    getPhotos: () => dispatch(getPhotos()),
    clear: () => dispatch(clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraRoll);
