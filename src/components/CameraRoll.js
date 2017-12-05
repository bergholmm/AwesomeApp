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
    nextAndSetImage() {
        const { photos, drafts } = this.props;
        const draftsLen = drafts.length;
        const index = this.state.selected - draftsLen;

        if ( index >= draftsLen ) {
            this.props.setImage(photos[index].node.image, photos[index].node.location);
        } else {
            this.props.setImage(drafts[index].node.image, drafts[index].node.location);
        }

        this.props.Actions.push('editImage');
    }
    render() {
        const { photos, drafts } = this.props;
        const { selected } = this.state;

        const nextButton = ((selected === -1) ? <View></View> : (
            <TouchableHighlight style={ styles.topButtonContainer } underlayColor='transparent' onPress={ this.nextAndSetImage.bind(this) }  >
                <Text style={ styles.buttonText }>Next</Text>
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

        let sections = [
            {data: dd, title: 'Drafts' },
            {data: pp, title: 'All photos' },
        ];

        if ( drafts.length === 0 ) {
            sections = [
                {data: pp, title: 'All photos' },
            ];
        }

        return (
            <GradientBackground>
                <View style= { styles.header }>
                    <View style={ styles.leftButton }>
                        <TouchableHighlight underlayColor='transparent' style={ styles.topButtonContainer } onPress={ this.props.Actions.pop }>
                            <Text style={ styles.buttonText }>Back</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={ styles.rightButton }>
                        {nextButton}
                    </View>
                </View>
                <SectionList
                    renderItem={ this.renderItem.bind(this) }
                    renderSectionHeader={ this.renderSectionHeader.bind(this) }
                    sections={ sections }
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
        height: 100,
        width: width,
        flexDirection: 'row',
    },
    scrollView: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftButton: {
        flex: 0.5,
    },
    rightButton: {
        flex: 0.5,
        alignItems: 'flex-end',
        marginRight: 15,
    },
    topButtonContainer: {
        marginTop: 30,
    },
    closeButton: {
        width: 15,
        height: 15,
    },
    buttonText: {
        padding: 10,
        paddingLeft: 20,
        fontSize: 16,
        fontWeight: '100',
        color: 'white',
    },
});

export default CameraRoll;
