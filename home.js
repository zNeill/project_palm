import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    Text,
    View
} from 'react-native';

import ImagePane from './pane.js';

const ACCESS_TOKEN = 'access_token';

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            accessToken: this.props.accessToken,
        }
    }
    
    redirect(routeName){
        this.props.navigator.push({
            name: routeName,
        });
    }

    async deleteToken() {
        try {
            await AsyncStorage.removeItem(ACCESS_TOKEN)
            this.redirect('root');
        } catch(error) {
            console.log("Error in deleteToken");
        }
    }

    onLogout(){
        this.setState({showProgress: true})
        this.deleteToken();
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Photo Gallery</Text>
                <Text style={styles.text}>The event photo gallery is below. Upload photos to share them with the group!</Text>
                <ImagePane /><ImagePane />
                <TouchableHighlight onPress={this.onLogout.bind(this)} style={styles.button}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    title: {
        fontSize: 25,
        marginTop: 15,
        marginBottom: 15
    },
    text: {
        marginBottom: 30
    },
    button: {
        height: 50,
        backgroundColor: 'red',
        alignSelf: 'stretch',
        marginTop: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    flash: {
        height: 40,
        backgroundColor: '#00ff00',
        padding: 10,
        alignSelf: 'center',
    },
    loader: {
        marginTop: 20
    }
});

export default Home
