import React, { Component }from 'react';
import GradientBackground from './GradientBackground';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
} from 'react-native';


const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} = FBSDK;



const responseInfoCallback = (token, loginFunc) => (error, result) => {
    if (error) {
        console.log('Error fetching data: ',error);
    } else {
        loginFunc(token, result);
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        props.loadState();
    }
    handleFBLogin(loginFunc) {
        LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
            (result) => {
                if (result.isCancelled) {
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            const infoRequest = new GraphRequest(
                                '/me',
                                {
                                    parameters: {
                                        fields: {
                                            string: 'picture.type(large),name'
                                        }
                                    }
                                },
                                responseInfoCallback(data.accessToken, loginFunc),
                            );
                            new GraphRequestManager().addRequest(infoRequest).start();
                        }
                    )
                }
            },
            (error) => {
                console.log('Login fail with error: ' + error)
            }
        );
    }
    render() {
        return (
            <GradientBackground>
                <View style={ styles.logoContainer }>
                    <Image source={ require('../../resources/logox2.png') } style={ styles.logo } />
                </View>
                <View style={ styles.loginContainer }>
                    <TouchableHighlight underlayColor='white' style={ styles.buttonContainer } onPress={ () => this.handleFBLogin(this.props.loginAndSaveState) }>
                        <Text style={ styles.buttonText }>Login with Facebook</Text>
                    </TouchableHighlight>
                    <Text onPress={ this.props.resetState } style={ styles.smallText }>React</Text>
                </View>
            </GradientBackground>
        );
    }
};


const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 98,
        width: 98,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: 'white',
        height: 60,
        width: 200,
    },
    buttonText: {
        fontSize: 14,
        color: '#FF7676',
    },
    smallText: {
        fontSize: 11,
        color: 'white',
        backgroundColor: 'transparent',
        top: 20,
    }
});

export default App;
