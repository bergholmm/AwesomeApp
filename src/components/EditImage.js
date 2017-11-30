import React, { Component } from 'react';
import { Surface } from 'gl-react-native';
import Effects from './Effects/Effects';
import EffectSlider from './Effects/EffectSlider/EffectSlider';
import { BlurView } from 'react-native-blur';
import {
    Button,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ScrollView,
    TouchableHighlight,
    findNodeHandle,
} from 'react-native';

const { width: ww, height: hh } = Dimensions.get('window');

const initialEffects = {
  blur: 0,
  saturation: 1,
  contrast: 1,
  brightness: 1,
  negative: 0,
  hue: 0,
  sepia: 0,
};

const effectsList = [
  { id: "blur", name: "Blur", min: 0, max: 6, step: 0.1 },
  { id: "contrast", name: "Contrast", min: 0, max: 4, step: 0.1 },
  { id: "brightness", name: "Brightness", min: 0, max: 4, step: 0.1 },
  { id: "saturation", name: "Saturation", min: 0, max: 10, step: 0.1 },
  { id: "hue", name: "HueRotate", min: 0, max: 2 * Math.PI, step: 0.1 },
  { id: "negative", name: "Negative", min: 0, max: 1, step: 0.05 },
  { id: "sepia", name: "Sepia", min: 0, max: 1, step: 0.05 },
];

class EditImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedEffect: null,
            effects: {
                blur: 0,
                saturation: 1,
                contrast: 1,
                brightness: 1,
                negative: 0,
                hue: 0.0,
                sepia: 0,
            },
            viewRef: null,
        };
    }
    imageLoaded() {
        if ( this.state.viewRef === null ) {
            this.setState({
                viewRef: findNodeHandle(this.img),
            })
        }
    }
    selectEffect(effect) {
        this.setState({
            selectedEffect: effect,
        });
    }
    onSaveEffect(effectValue) {
        this.setState({
            selectedEffect: null,
        });
    }
    onCancelEffect(effect) {
        let { effects } = this.state;
        effects[effect.toLowerCase()] = initialEffects[effect.toLowerCase()];
        this.setState({
            effects,
            selectedEffect: null,
        });
    }
    onSliderChange(val, effect) {
        let { effects } = this.state;
        effects[effect.toLowerCase()] = val;

        this.setState({
            effects,
        });
    }
    captureImage() {
        this.refs.surface.captureFrame()
        .then((image) => this.props.saveImage({ url: image, location: this.props.location }));
    }
    render() {
        const { selectedEffect, effects, viewRef } = this.state;
        const { image: { uri, width, height }} = this.props;

        let content = <View></View>;

        if ( selectedEffect === null ) {
            const scrollViewEffects = effectsList.map((effect) =>
                <TouchableHighlight underlayColor='transparent' key={ effect.id } style={ styles.effectButton } onPress={ () => this.selectEffect(effect) }>
                    <Text style={ styles.effectText }>{ effect.name }</Text>
                </TouchableHighlight>
            );
            const scrollView = (
                <ScrollView style={ styles.scrollView } horizontal={ true } showsHorizontalScrollIndicator={ false }>
                    { scrollViewEffects }
                </ScrollView>
            );
            content = scrollView;
        } else {
            const effectSlider = (
                <EffectSlider
                    effect={ selectedEffect }
                    onSave={ this.onSaveEffect.bind(this) }
                    onCancel={ this.onCancelEffect.bind(this) }
                    onChange={ this.onSliderChange.bind(this) }
                    value={ effects[selectedEffect.id] }
                />
            );
            content = effectSlider;
        }

        const ratio = width && height ? height / width : 1;
        let h = hh;
        let w = ww;
        if (ratio < 1)
            h = w * ratio;
        else
            w = h / ratio;


        return (
            <View style={{ flex: 1 }}>
                <View ref={ (img) => { this.img = img; this.imageLoaded(); } } style={ styles.container }>
                    <Surface ref='surface' width={ w } height={ h } backgroundColor={ 'transparent' }>
                        <Effects width={ w } height={ h } { ...effects }>
                            { uri }
                        </Effects>
                    </Surface>
                </View>
                <View style={ styles.topContainer }>
                    <View style={ styles.leftButton }>
                        <TouchableHighlight underlayColor='transparent' style={ styles.topButtonContainer } onPress={ this.props.Actions.pop }>
                            <Image source={ require('../../resources/xWhite.png') } style={ styles.closeButton } />
                        </TouchableHighlight>
                    </View>
                    <View style={ styles.rightButton }>
                        <TouchableHighlight underlayColor='transparent' style={ styles.topButtonContainer } onPress={ this.captureImage.bind(this) }>
                            <Image source={ require('../../resources/doneWhite.png') } style={ styles.doneButton } />
                        </TouchableHighlight>
                    </View>
                </View>
                <BlurView style={ styles.bottomContainer } blurType='dark' blurAmount={ 32 } viewRef={ viewRef }/>
                <View style={ [styles.bottomContainer, { backgroundColor: 'transparent' }] }>
                    { content }
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: ww,
        height: hh,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topButtonContainer: {
        width: 39,
        height: 39,
        marginTop: 30,
        marginLeft: 25,
    },
    topContainer: {
        position: 'absolute',
        height: 100,
        width: ww,
        top: 0,
        flexDirection: 'row',
    },
    bottomContainer: {
        position: 'absolute',
        height: 100,
        width: ww,
        bottom: 0,
    },
    effectButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,
    },
    effectText: {
        padding: 10,
        paddingLeft: 20,
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '100',
        color: 'white',
    },
    text: {
        padding: 30,
        alignSelf: 'center',
        fontSize: 26,
        fontWeight: 'bold',
    },
    leftButton: {
        flex: 0.5,
    },
    rightButton: {
        flex: 0.5,
        alignItems: 'flex-end',
        marginRight: 15,
    },
    closeButton: {
        width: 15,
        height: 15,
    },
    doneButton: {
        width: 21,
        height: 15,
    },
});

export default EditImage;
