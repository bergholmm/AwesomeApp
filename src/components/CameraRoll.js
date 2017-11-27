import React, { Component } from 'react';
import GradientBackground from './GradientBackground';
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    SectionList,
    TouchableHighlight,
    Image,
} from 'react-native';

const { width } = Dimensions.get('window');

class CameraRoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: -1,
        };
    }
    componentDidMount() {
        const { getPhotos } = this.props;
        getPhotos();
    }
    componentWillUnmount() {
        this.props.clear();
    }
    setSelected(i) {
        const { selected } = this.state;
        if ( i === selected ) {
            this.setState({
                selected: -1,
            });
        } else {
            this.setState({
                selected: i,
            });
        }
    }
    renderItem({ item }) {
        const items = item.map(( photo ) => {
            const { i } = photo;
            return (
                <TouchableHighlight
                    style={{ opacity: i === this.state.selected ? 0.5 : 1 }}
                    key={ i }
                    underlayColor='transparent'
                    onPress={ () => this.setSelected(i) }
                >
                    <Image
                        style={{
                            width: width/3,
                            height: width/3,
                        }}
                        source={{ uri: photo.node.image.uri }}
                        key={ i }
                    />
                </TouchableHighlight>
            );
        });

        return (
            <View style={ styles.scrollView }>
                {items}
            </View>
        );
    }
    renderSectionHeader({ section }) {
        return (
            <Text style={ styles.text }>{section.title}</Text>
        );
    }
    sliceList(list) {
        let newList = [];

        if ( list === undefined ) {
            return [];
        }

        for ( let i = 0; i < list.length; i += 3 ) {
            if ( i + 3 >= list.length ) {
                let item = list.splice(i, list.length);
                newList.push(item);
            } else {
                let item = list.splice(i, i + 3);
                newList.push(item);
            }
        }

        return newList;
    }
    render() {
        const { photos, drafts } = this.props;
        const { selected } = this.state;

        if ( selected !== -1 ) {

        }
        const nextButton = ((selected === -1) ? <View></View> : (
            <TouchableHighlight underlayColor='transparent' onPress={ () => this.props.Actions.push('editImage') }>
                <Text style={ styles.backText }>Next</Text>
            </TouchableHighlight>
        ));

        const d = drafts.map((photo, i) => {
            photo.i = i;
            return photo;
        })
        const p = photos.map((photo, i) => {
            photo.i = i + drafts.length;
            return photo;
        });

        const pp = this.sliceList(p);
        const dd = this.sliceList(d);

        return (
            <GradientBackground>
                <View style= { styles.header }>
                    <View style={ styles.leftButton }>
                        <TouchableHighlight underlayColor='transparent' style={ styles.closeContainer } onPress={ this.props.Actions.pop }>
                            <Image source={ require('../../resources/xWhite.png') } style={ styles.closeButton } />
                        </TouchableHighlight>
                    </View>
                    <View style={ styles.rightButton }>
                        {nextButton}
                    </View>
                </View>
                <SectionList
                    renderItem={ this.renderItem.bind(this) }
                    renderSectionHeader={ this.renderSectionHeader.bind(this) }
                    sections={[
                        {data: dd, title: 'Drafts' },
                        {data: pp, title: 'All photos' },
                    ]}
                    keyExtractor={ (item, index) => index }

                />
            </GradientBackground>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        padding: 2,
        fontSize: 11,
        fontWeight: '100',
        color: 'white',
        backgroundColor: 'transparent',
    },
    backText: {
        paddingRight: 20,
        fontSize: 14,
        fontWeight: '300',
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    header: {
        height: 75,
        flexDirection: 'row',
    },
    scrollView: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftButton: {
        flex: 1,
        justifyContent: 'center',
    },
    rightButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    closeContainer: {
        marginTop: 25,
        marginLeft: 20,
        width: 39,
        height: 39,
    },
    closeButton: {
        width: 15,
        height: 15,
    },
});

export default CameraRoll;
