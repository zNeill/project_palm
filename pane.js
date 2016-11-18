// import ImagePane from './pane';
import React, { Component } from 'react';
import {
    StyleSheet,
    AsyncStorage,
    Text,
    Image,
    ScrollView,
    View
} from 'react-native';

export default class ImagePane extends Component {
    render() {
        return (
            <View style={styles.post}>
                <View style={{flexDirection:'column',  }}>
                    <Text style={styles.username}>[username.test]</Text>
                    <Image source={require('./img/ph2.png')} />
                    <Text style={styles.text}>[description]</Text>
                </View>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
        paddingTop: 30
    },
    post: {
        flex: 1,
        flexDirection: 'column',
        margin: 20,
        backgroundColor: '#eeeeee'
    },
    vertcontainer: {
        flexDirection: 'row',
        flex: 2,
        backgroundColor: '#eeeeee',
        fontSize: 25,
        marginBottom: 15
    },
    username: {
        fontSize: 10,
        fontWeight: '700'
    },
    text: {
        fontSize: 20,
        marginBottom: 15
    }
});

