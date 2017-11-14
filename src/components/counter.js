import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Counter = (props) => (
    <View style={styles.container}>
        <Button
          title="Up"
          onPress={props.increment}/>
        <Text
          style={styles.counter}
          onPress={props.reset}>
          {props.count}
        </Text>
        <Button
          title="Down"
          onPress={props.decrement}/>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    counter: {
        padding: 30,
        alignSelf: 'center',
        fontSize: 26,
        fontWeight: 'bold',
    },
});

export default Counter;
