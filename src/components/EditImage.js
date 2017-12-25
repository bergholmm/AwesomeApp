import React, { Component } from 'react';
import RNFS from 'react-native-fs';
import { Surface } from 'gl-react-native';
import Effects from './Effects/Effects';
import EffectSlider from './Effects/EffectSlider/EffectSlider';
import { BlurView } from 'react-native-blur';
import {
    F1977,
    Amaro,
    Brannan,
    Earlybird,
    Hefe,
    Hudson,
    Inkwell,
    Lokofi,
    LordKelvin,
    Nashville,
    Normal,
    Rise,
    Sierra,
    Sutro,
    Toaster,
    Valencia,
    Walden,
    XproII,
} from './Effects/Filters';
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
    { id: 'filters', name: 'Filters' },
    { id: 'blur', name: 'Blur', min: 0, max: 6, step: 0.1 },
    { id: 'contrast', name: 'Contrast', min: 0, max: 4, step: 0.1 },
    { id: 'brightness', name: 'Brightness', min: 0, max: 4, step: 0.1 },
    { id: 'saturation', name: 'Saturation', min: 0, max: 10, step: 0.1 },
    { id: 'hue', name: 'HueRotate', min: 0, max: 2 * Math.PI, step: 0.1 },
    { id: 'negative', name: 'Negative', min: 0, max: 1, step: 0.05 },
    { id: 'sepia', name: 'Sepia', min: 0, max: 1, step: 0.05 },
];

const filterList = [
    { name: 'No-filter', filter: Normal },
    { name: 'F1977', filter: F1977 },
    { name: 'Amaro', filter: Amaro },
    { name: 'Brannan', filter: Brannan },
    { name: 'Earlybird', filter: Earlybird },
    { name: 'Hefe', filter: Hefe },
    { name: 'Hudson', filter: Hudson },
    { name: 'Inkwell', filter: Inkwell },
    { name: 'Lokofi', filter: Lokofi },
    { name: 'LordKelvin', filter: LordKelvin },
    { name: 'Nashville', filter: Nashville },
    { name: 'Rise', filter: Rise },
    { name: 'Sierra', filter: Sierra },
    { name: 'Sutro', filter: Sutro },
    { name: 'Toaster', filter: Toaster },
    { name: 'Valencia', filter: Valencia },
    { name: 'Walden', filter: Walden },
    { name: 'XproII', filter: XproII },
];

class EditImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedEffect: null,
            Filter: Normal,
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
    selectFilter(Filter) {
        this.setState({
            Filter,
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
        const path = RNFS.DocumentDirectoryPath + '/' + Date.now() + '.png';
        this.refs.surface.captureFrame({ type: 'png', format: 'file', filePath: path })
        .then((image) => {
            this.props.saveImage({ uri: image, location: this.props.location, album: 'React' })
            this.props.changeTab(0);
            this.props.Actions.replace('main');
        });
    }
    render() {
        const { selectedEffect, effects, viewRef, Filter } = this.state;
        const { image: { uri, width, height }} = this.props;

        let content = <View></View>;
        let onPressBack = this.props.Actions.pop;
        let onPressDone = this.captureImage.bind(this);

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
        }
        else if ( selectedEffect.id === 'filters' ) {
            const scrollViewFilters = filterList.map((filter) =>
                <TouchableHighlight underlayColor='transparent' key={ filter.name } style={ styles.effectButton } onPress={ () => this.selectFilter(filter.filter) }>
                    <Text style={ styles.effectText }>{ filter.name }</Text>
                </TouchableHighlight>
            );
            const filterView = (
                <ScrollView style={ styles.scrollView } horizontal={ true } showsHorizontalScrollIndicator={ false }>
                    { scrollViewFilters }
                </ScrollView>
            );

            content = filterView;
            onPressBack = () => {
                this.selectFilter(Normal);
                this.selectEffect(null);
            };
            onPressDone = () => {
                this.selectEffect(null);
            };
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
                        <Filter>
                            <Effects width={ w } height={ h } { ...effects }>
                                { uri }
                            </Effects>
                        </Filter>
                    </Surface>
                </View>
                <View style={ styles.topContainer }>
                    <View style={ styles.leftButton }>
                        <TouchableHighlight underlayColor='transparent' style={ styles.topButtonContainer } onPress={ onPressBack }>
                            <Text style={ styles.buttonText }>Back</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={ styles.rightButton }>
                        <TouchableHighlight underlayColor='transparent' style={ styles.topButtonContainer } onPress={ onPressDone }>
                            <Text style={ styles.buttonText }>Done</Text>
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
        marginTop: 30,
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
    buttonText: {
        padding: 10,
        paddingLeft: 20,
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
