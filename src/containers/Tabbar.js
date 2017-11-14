import Tabbar from  '../components/Tabbar';
import { connect } from 'react-redux';
import { changeTab } from '../actions/tabbar.js';

const mapStateToProps = state => ({
    index: state.tabbar.index,
});

const mapDispatchToProps = (dispatch) => ({
    changeTab: (index) => dispatch(changeTab(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabbar);
