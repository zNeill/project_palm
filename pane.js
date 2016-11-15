// import ImagePane from './pane';
import React, { Component } from 'react';
import {
    StyleSheet,
    AsyncStorage,
    Text,
    Image,
    View
} from 'react-native';

export default class ImagePane extends Component {
    render() {
        return (
            <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.text}>[username]</Text>
                    <Image source={require('./img/ph1.png')} />
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
    vertcontainer: {
        flexDirection: 'row',
        flex: 2,
        backgroundColor: '#eeeeee'
    },
    title: {
        fontSize: 25,
        marginBottom: 15
    },
    text: {
        fontSize: 20,
        marginBottom: 15
    }
});

