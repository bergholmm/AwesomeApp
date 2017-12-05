import CameraRoll from  '../components/CameraRoll';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { setImage } from '../actions/image';
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
    setImage: (image, location) => dispatch(setImage(image, location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraRoll);
