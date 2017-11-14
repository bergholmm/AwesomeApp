import ActionSelect from  '../components/ActionSelect';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = state => ({
    Actions,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionSelect);
