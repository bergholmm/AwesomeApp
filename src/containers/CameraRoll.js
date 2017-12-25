import CameraRoll from  '../components/CameraRoll';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { setImage, clearCameraRoll, getPhotosCameraRoll } from '../actions/photos';

const mapStateToProps = state => ({
    Actions,
    drafts: state.photos.cameraRoll.drafts,
    photos: state.photos.cameraRoll.photos,
});

const mapDispatchToProps = (dispatch) => ({
    getPhotos: () => dispatch(getPhotosCameraRoll()),
    clear: () => dispatch(clearCameraRoll()),
    setImage: (image, location) => dispatch(setImage(image, location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraRoll);
