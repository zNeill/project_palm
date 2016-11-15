/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow add comment to test git ssh key
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    ToolbarAndroid
} from 'react-native';

import Login from './login';
import Register from './register';
import Root from './root';
import Home from './home';
import ImagePane from './pane.js';

export default class project_palm extends Component {
    renderScene(route, navigator) {
        console.log(route);
        if (route.name == 'root') {
            return <Root navigator={navigator} />
        }
        if (route.name == 'register') {
            return <Register navigator={navigator} />
        }
        if (route.name == 'login') {
            return <Login navigator={navigator} />
        }
        if (route.name == 'home') {
            return <Home navigator={navigator} {...route.passProps} />
        }
            /*if (route.name == 'update') {
            return <Update navigator={navigator} {...route.passProps} />
        }*/
    } 

    render() {
        return (
            <View style={styles.container}>
                <Navigator
                    initialRoute={{name: 'root'}}
                    renderScene={this.renderScene.bind(this)}
                />
                <ImagePane />
            </View>
        );
        /*return (
            <View style={styles.container}>
                <Login />
            </View>
        )*/
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('project_palm', () => project_palm);
