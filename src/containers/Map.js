import Map from '../components/Map';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    photos: state.photos.photos,
    position: state.camera.location,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);
