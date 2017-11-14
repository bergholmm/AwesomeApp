import Counter from '../components/counter';
import { connect } from 'react-redux';
import {
    increment,
    decrement,
    reset,
} from '../actions/counter';

const mapStateToProps = state => ({
    count: state.counter.count,
})

const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
