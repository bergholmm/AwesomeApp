import MainWrapper from  '../components/MainWrapper';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    tabIndex: state.tabbar.index,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWrapper);
