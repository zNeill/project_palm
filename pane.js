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
            <View>
            <View style={styles.post}>
                    <Text style={styles.username}>[username.test]</Text>
                    <Image source={require('./img/jpg/000.jpg')} 
                        style={{width:400, height:300}} 
                    ></Image>
                    <Text style={styles.text}>[description]</Text>
            </View>
                <View style={styles.post}>
                    <Text style={styles.username}>[username.test]</Text>
                    <Image source={require('./img/jpg/001.jpg')} 
                        style={{width:400, height:300}} 
                    ></Image>
                    <Text style={styles.text}>[description]</Text>
            </View>

                        <View style={styles.post}>
                    <Text style={styles.username}>[username.test]</Text>
                    <Image source={require('./img/jpg/002.jpg')} 
                        style={{width:400, height:300}} 
                    ></Image>
                    <Text style={styles.text}>[description]</Text>
            </View>

                        <View style={styles.post}>
                    <Text style={styles.username}>[username.test]</Text>
                    <Image source={require('./img/jpg/003.jpg')} 
                        style={{width:400, height:300}} 
                    ></Image>
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
        flex: 4,
        flexDirection: 'column',
        margin: 4,
        backgroundColor: '#eeeeee',
        width: 410,
        height: 320
    },
    vertcontainer: {
        flexDirection: 'row',
        flex: 2,
        backgroundColor: '#eeeeee',
        fontSize: 25,
        marginBottom: 5
    },
    username: {
        fontSize: 10,
        fontWeight: '700'
    },
    text: {
        marginTop:20,
        fontSize: 20,
        marginBottom: 15
    }
});

