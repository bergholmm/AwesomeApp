import ActionSelect from  '../components/ActionSelect';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getLocation } from '../actions/permissions';

const mapStateToProps = state => ({
    Actions,
})

const mapDispatchToProps = (dispatch) => ({
    getCurrentPosition: () => dispatch(getLocation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionSelect);
