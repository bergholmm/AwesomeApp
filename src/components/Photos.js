import React, { Component } from 'react';
import GradientBackground from './GradientBackground'
import { PhotoGrid } from 'react-native-photo-grid-frame';
import { Platform } from 'react-native';
import {
    StyleSheet,
    Image,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

class Photos extends Component {
    componentDidMount() {
        this.props.getCurrentPosition();

        if ( Platform.OS === 'android' ) {
            this.props.requestExternalStoragePermission();
        }
    }
    render() {
        const score = this.props.photos.length || 0;
        return (
            <GradientBackground>
                <ScrollView style={ styles.container }>
                    <View style={ styles.topContainer }>
                        <View style={ styles.logoutContainer }>
                            <TouchableHighlight style={ styles.logoutButton } onPress={ () => this.props.logout() } underlayColor='transparent'>
                                <Text style={ styles.logoutText }>Logout</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={ styles.logoContainer }>
                            <Image source={ require('../../resources/logox2.png') } style={ styles.logo } />
                        </View>
                    </View>
                    <View style={ styles.profileContainer }>
                        <Image source={{ uri: this.props.profilePicture }} style={ styles.profilePicture } />
                        <View style={ styles.score }>
                            <GradientBackground>
                                <Text style={ styles.scoreText }>{ score }</Text>
                            </GradientBackground>
                        </View>
                        <Text style={ styles.name }>{ this.props.name }</Text>
                    </View>
                    <PhotoGrid PhotosList={ this.props.photos } />
                </ScrollView>
            </GradientBackground>
        );
    }
}
                        // <Text style={ styles.location }>Stockholm, Sweden</Text>

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flexDirection: 'row',
        width,
        marginTop: 35,
    },
    logoutContainer: {
        alignItems: 'center',
        width: 81,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingRight: 81,
    },
    logoutButton: {
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 275,
        width: '100%',
    },
    logoutText: {
        padding: 10,
        paddingLeft: 20,
        fontSize: 16,
        fontWeight: '100',
        color: 'white',
        textAlign: 'center'
    },
    text: {
        alignSelf: 'center',
        fontSize: 26,
        backgroundColor: 'transparent',
        color: 'white',
    },
    profilePicture: {
        borderRadius: 60,
        height: 120,
        width: 120,
    },
    logo: {
        height: 38,
        width: 38,
    },
    score: {
        width: 38,
        height: 38,
        borderRadius: 18,
        borderColor: 'white',
        borderWidth: 3,
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'absolute',
        right: '32%',
        bottom: '38%',
    },
    name: {
        color: 'white',
        fontSize: 24,
        fontWeight: '100',
        backgroundColor: 'transparent',
        fontFamily: 'Avenir',
        marginTop: 20,
    },
    location: {
        color: 'white',
        fontSize: 16,
        fontWeight: '100',
        backgroundColor: 'transparent',
        fontFamily: 'Avenir',
    },
    scoreText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '100',
        backgroundColor: 'transparent',
        fontFamily: 'Avenir',
        textAlign: 'center',
        top: 6,
    }
});

export default Photos;
