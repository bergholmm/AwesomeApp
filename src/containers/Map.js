import Map from '../components/Map';
import { connect } from 'react-redux';
import { hideTabbar } from '../actions/tabbar';
import { getLocation } from '../actions/permissions';

const mapStateToProps = state => ({
    photos: state.photos.reactPhotos.photos,
    position: state.permissions.location,
})

const mapDispatchToProps = (dispatch) => ({
    getCurrentPosition: () => dispatch(getLocation()),
    hideTabbar: (val) => dispatch(hideTabbar(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);
