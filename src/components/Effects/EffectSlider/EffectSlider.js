import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Slider,
    TouchableHighlight,
} from 'react-native';


const EffectSlider = (props) => {
    const { effect: { id, name, min, max, step }, value } = props;
    return (
        <View style={ styles.container }>
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 2 }}>
                <Text style={ styles.effectText }>{ name }</Text>
            </View>
            <View style={ styles.sliderContainer }>
                <Slider minimumValue={ min } maximumValue={ max } step={ step } value={ value } onValueChange={ (val) => props.onChange(val, id) }/>
            </View>
            <View style={ styles.buttonsContainer }>
                <View style={ styles.buttonContainer }>
                    <TouchableHighlight style={ styles.button } underlayColor='transparent' onPress={ () => props.onCancel(id) }>
                        <Text style={ styles.effectText }>Back</Text>
                    </TouchableHighlight>
                </View>
                <View style={ styles.buttonContainer }>
                    <TouchableHighlight style={ styles.button } underlayColor='transparent' onPress={ props.onSave }>
                        <Text style={ styles.effectText }>Save</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sliderContainer: {
        flex: 1,
    },
    buttonContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    effectText: {
        fontSize: 16,
        fontWeight: '100',
        color: 'white',
    },
});

export default EffectSlider;
