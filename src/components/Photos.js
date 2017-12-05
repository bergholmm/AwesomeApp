import React from 'react';
import GradientBackground from './GradientBackground'
import { PhotoGrid } from 'react-native-photo-grid-frame';
import {
    StyleSheet,
    Image,
    Text,
    View,
    ScrollView,
} from 'react-native';

const Photos = (props) => (
    <GradientBackground>
        <ScrollView style={ styles.container }>
            <View style={ styles.logoContainer }>
                <Image source={ require('../../resources/logox2.png') } style={ styles.logo } />
            </View>
            <View style={ styles.profileContainer }>
                <Image source={ require('../../resources/testProfilePicture.jpg') } style={ styles.profilePicture } />
                <View style={ styles.score }>
                    <GradientBackground>
                        <Text style={ styles.scoreText }>42</Text>
                    </GradientBackground>
                </View>
                <Text style={ styles.name }>Marcus Bergholm</Text>
                <Text style={ styles.location }>Stockholm, Sweden</Text>
            </View>
            <PhotoGrid PhotosList={ props.photos } />
        </ScrollView>
    </GradientBackground>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        alignItems: 'center',
    },
    profileContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 275,
        width: '100%',
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
        top: 35,
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
        bottom: '32%',
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
