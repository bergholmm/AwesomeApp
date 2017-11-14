import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const EditImage = (props) => (
    <View style={styles.container}>
        <Text style={styles.text}>
            EditImage component
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        padding: 30,
        alignSelf: 'center',
        fontSize: 26,
        fontWeight: 'bold',
    },
});

export default EditImage;
