import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    Text,
    View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            accessToken: this.props.accessToken,
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}> Welcome User </Text>
                <Text style={styles.text}> Your new token is {this.state.accessToken} </Text>

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
