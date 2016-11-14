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

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            error: "",
            showProgress: false
        }
    }

    redirect(routeName, token) {
        this.props.navigator.push({
            name: routeName,
            passProps: {
                accessToken: token
            }
        });
    }

    async storeToken(accessToken) {
        try {
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            this.getToken();
        } catch(error) {
                console.log("Error in storeToken");
        }
    }

    async getToken() {
        try {
            let token = await AsyncStorage.getItem(ACCESS_TOKEN);
            console.log("token is " + token);
        } catch(error) {
            console.log("Error in getToken");
        }
    }

    async removeToken() {
        try {
            await AsyncStorage.removeItem(ACCESS_TOKEN);
            this.getToken();
        } catch(error) {
            console.log("error in removeToken");
        }
    }

        /*storeToken (responseData) {
        AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err) => {
            if (err) {
                console.log("an error");
                throw err;
            }
            console.log("success");
        }).catch((err) => {
            console.log("error is: " + err);
        });
    }*/

    async onLoginPressed() {
        this.setState({showProgress: true});
        try {
            let response = await fetch('https://findmy.city/palmapi/?mode=auth', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            });

            let res = await response.text();

            if (response.status >= 200 && response.status < 300) {
                // success!!
                let accessToken = res; 
                // store access token in AsyncStorage when success
                this.storeToken(accessToken);
                this.redirect('home', accessToken);
            }
            else {
                //handle error
                let error = res;
                throw error;
            }
        }
        catch (error) {
            //this.removeToken();
            this.setState({error: error});
            console.log("error " + error);
            this.setState({showProgress: false});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>User Login BIOTCH</Text>
                <TextInput
                    onChangeText={ (text) => this.setState({email: text}) }
                    style={styles.input} placeholder="Email">
                </TextInput>
                <TextInput
                    onChangeText={ (text) => this.setState({password: text}) }
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}>
                </TextInput>
                <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableHighlight>

                <Text style={styles.error}>
                    {this.state.error}
                </Text>
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
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default Login
