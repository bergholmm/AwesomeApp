import React from 'react';
import Tabbar from '../containers/Tabbar';
import Photos from '../containers/Photos';
import Map from '../containers/Map';
import ActionSelect from '../containers/ActionSelect';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const MainWrapper = (props) => {
    const { tabIndex } = props;
    let page = <Photos/>;

    if (tabIndex == 1) {
        page = <ActionSelect/>
    }
    else if (tabIndex == 2) {
        page = <Map/>;
    }

    return (
        <View style={styles.container}>
            {page}
            <Tabbar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MainWrapper;
