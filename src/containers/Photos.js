import Photos from '../components/Photos';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    photos: state.photos.photos,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);

