import React, { Component } from 'react';
import GradientBackground from './GradientBackground'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

class ActionSelect extends Component {
    componentDidMount() {
        this.props.getCurrentPosition();
    }
    render() {
        return (
            <GradientBackground>
                <View style={styles.container}>
                    <TouchableHighlight underlayColor='transparent' onPress={ this.props.Actions.cameraRoll } style={ styles.buttonContainer }>
                        <Text style={styles.text}>Add from camera roll</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent' onPress={ this.props.Actions.camera } style={ styles.buttonContainer }>
                        <Text style={styles.text}>Take new picture</Text>
                    </TouchableHighlight>
                </View>
            </GradientBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderRadius: 100,
        borderColor: 'white',
        marginBottom: 50,
        width: 220,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        alignSelf: 'center',
        fontSize: 17,
        backgroundColor: 'transparent',
        color: 'white',
    },
});

export default ActionSelect;
