import App from '../components/App';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { loginAndSaveState, loadAppState, resetAppState } from '../actions/user';

const mapStateToProps = state => ({
    Actions,
    fetchingLocalState: state.user.loading.fetchingLocalState,
})

const mapDispatchToProps = (dispatch) => ({
    loadState: () => dispatch(loadAppState()),
    loginAndSaveState: (token) => dispatch(loginAndSaveState(token)),
    resetState: () => dispatch(resetAppState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
