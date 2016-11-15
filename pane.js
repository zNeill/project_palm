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
            <View style={styles.container}>
                <View style={styles.vertcontainer}>
                    <Text style={styles.text}>sleepy_gary</Text>
                    <Image source={require('./img/ph1.png')} />
                    <Text style={styles.text}>Outside the world mattress museum!</Text>
                </View>
                <View style={styles.vertcontainer}>
                    <Text style={styles.text}>triggered_by_trump</Text>
                    <Image source={require('./img/ph1.png')} />
                    <Text style={styles.text}>Sunrise over the lake</Text>
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

