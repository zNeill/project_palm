/**
 * Incentive Photo Sharing App, codename 'Project Palm'
 * By: Chris Matzenbach and Neill Lewis
 * Done for the JS track in CS50x Miami
 *
 * Login system was derived with help of the youtube tutorial 
 * 'React Native Registration' by user Isaac Ben Hutta and the
 * accompanying source code
 * Video Tutorial:
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
import Kam from './kam';
//import ImagePane from './pane.js';

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
        if (route.name == 'kam') {
            return <Kam navigator={navigator} {...route.passProps} />
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
