'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    AsyncStorage,
    Image,
    Text,
    View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Root extends Component {

    navigate(routeName) {
        this.props.navigator.push({
            name: routeName
        });
    }
    
    componentWillMount() {
        this.getToken();
    }

    async getToken() {
        try {
            let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            if(!accessToken) {
                    console.log("Token not set");
            } else {
                this.verifyToken(accessToken)
            }
        } catch(error) {
                console.log("Error in getToken");
        }
    }
    //If token is verified we will redirect the user to the home page
    async verifyToken(token) {
        let accessToken = token

        try {
            let response = await fetch('https://findmy.city/palmapi/?mode=verifyToken&token='+accessToken);
            let res = await response.text();
            if (response.status >= 200 && response.status < 300) {
                //Verified token means user is logged in so we redirect him to home.
                this.navigate('home');
            } else {
                //Handle error
                let error = res;
                throw error;
            }
        } catch(error) {
                console.log("error response: " + error);
        }
    }

    render() {
        return (
        <View style={styles.container}>
                
             <Image
                    source={require('./img/palm.jpg')}
                    style={{resizeMode:'cover',flex:10}}
             >
               <View style={{flex:4}}>
                    <Text style={styles.title}>Welcome</Text> 
                    <Text style={styles.title}>To Your</Text>
                    <Text style={styles.title}>Incentive Trip</Text>
                </View>
                <View style={{flex:6}}>
                    <TouchableHighlight onPress={ this.navigate.bind(this,'register') } style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={ this.navigate.bind(this, 'login') } style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableHighlight>
                </View>
            </Image>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    title: {
        fontSize: 40,
        color: '#000000',
        flex: 2,
        justifyContent: 'flex-start',
        alignItems:'center',
        alignSelf: 'center'
    }
});


export default Root
