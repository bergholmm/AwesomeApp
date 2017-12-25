import EditImage from  '../components/EditImage';
import { connect } from 'react-redux';
import { saveToReactPhotos, clearImage } from '../actions/photos';
import { Actions } from 'react-native-router-flux';
import { changeTab } from '../actions/tabbar.js';

const mapStateToProps = state => ({
    image: state.photos.currentPhoto.image,
    location: state.photos.currentPhoto.location,
    Actions,
});

const mapDispatchToProps = (dispatch) => ({
    clear: () => dispatch(clearImage()),
    saveImage: (image) => dispatch(saveToReactPhotos(image)),
    changeTab: (index) => dispatch(changeTab(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditImage);

