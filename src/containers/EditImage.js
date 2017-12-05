import EditImage from  '../components/EditImage';
import { connect } from 'react-redux';
import { clearImage } from '../actions/image';
import { addImage } from '../actions/photos';
import { Actions } from 'react-native-router-flux';
import { changeTab } from '../actions/tabbar.js';

const mapStateToProps = state => ({
    image: state.image.image,
    location: state.image.location,
    Actions,
});

const mapDispatchToProps = (dispatch) => ({
    clear: () => dispatch(clearImage()),
    saveImage: (image) => dispatch(addImage(image)),
    changeTab: (index) => dispatch(changeTab(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditImage);

