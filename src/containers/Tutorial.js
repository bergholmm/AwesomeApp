import Tutorial from  '../components/Tutorial';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = state => ({
    Actions,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
