import React, { Component }from 'react';
import Swiper from 'react-native-swiper';
import GradientBackground from './GradientBackground'
import {
    Button,
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    TouchableHighlight,
} from 'react-native';


class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonOpacity: new Animated.Value(0),
        };
    }
    captureSwiperState(e, state, context) {
        if ( state.index === 2 ) {
            Animated.timing(
                this.state.buttonOpacity,
                {
                    toValue: 1,
                    duration: 1000,
                },
            ).start((() => {}));
        }
    }
    render() {
        const button = <Image source={ require('../../resources/nextButton.png') } style={ styles.nButton } />;
        return (
            <GradientBackground>
                <Swiper
                    style={ styles.wapper }
                    showsButtons={ true }
                    loop={ false }
                    activeDotColor='white'
                    buttonWrapperStyle={ styles.wrapper }
                    nextButton={ button }
                    prevButton={ <View></View> }
                    onMomentumScrollEnd={ this.captureSwiperState.bind(this) }
                    scrollEnabled={ false }
                >
                    <View style={ styles.slide }>
                        <View style={ styles.iconContainer }>
                            <Image source={ require('../../resources/tutorialAdd.png') } style={ styles.icon } />
                        </View>
                        <View style={ styles.textContainer }>
                            <Text style={ styles.text }>Import or take new photos, customize your photos with filters and then store them in the cloud!</Text>
                        </View>
                    </View>
                    <View style={ styles.slide }>
                        <View style={ styles.iconContainer }>
                            <Image source={ require('../../resources/tutotialMap.png') } style={ styles.icon } />
                        </View>
                        <View style={ styles.textContainer }>
                            <Text style={ styles.text }>See the locations of your pictures!</Text>
                        </View>
                    </View>
                    <View style={ styles.slide }>
                        <View style={ styles.iconContainer }>
                            <Image source={ require('../../resources/tutorialCheck.png') } style={ styles.finishIcon } />
                        </View>
                        <View style={ styles.textContainer }>
                            <Text style={ styles.text }>{ "Let's go!" }</Text>
                        </View>
                        <TouchableHighlight underlayColor='transparent' style={ styles.nextButtonContainer } onPress={ () => this.props.Actions.replace('main') }>
                            <Animated.Image source={ require('../../resources/nextButton.png') } style={ [styles.nextButton, { opacity: this.state.buttonOpacity }] } />
                        </TouchableHighlight>
                    </View>
                </Swiper>
            </GradientBackground>
        );

    }
};

const styles = StyleSheet.create({
    wrapper: {
        width: 212,
        height: 124,
        position: 'absolute',
        left: '19%',
        top: '77%',
    },
    slide: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    text: {
        padding: 40,
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: '100',
        color: 'white',
        fontFamily: 'Avenir',
        textAlign: 'center',
    },
    nextButtonContainer: {
        width: 212,
        height: 124,
        position: 'absolute',
        top: '77%',
        left: '22%',
    },
    nextButton: {
        width: 212,
        height: 124,
    },
    nButton: {
        width: 212,
        height: 124,
    },
    icon: {
        width: 152,
        height: 152,
    },
    finishIcon: {
        width: 205,
        height: 205,
        bottom: 0,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    iconContainer: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Tutorial;
