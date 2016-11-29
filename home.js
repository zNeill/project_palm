import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    Text,
    ScrollView,
    View,
    Image
} from 'react-native';

import ImagePane from './pane.js';

const ACCESS_TOKEN = 'access_token';

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            accessToken: this.props.accessToken,
            photos: 
               [ {
                    uid: 1,
                    title: "Winter Wonderland",
                    username: "Jenna",
                    url: "http://www.z280.com/images/palm/000.jpg"

                },
                {   
                    uid: 2,                    
                    title: "Concern in Library",
                    username: "Bookmuncher",
                    url: "http://www.z280.com/images/palm/001.jpg"

                },
                {
                    uid: 3,
                    title: "I Like Cameras Bro",
                    username: "CameraDude",
                    url: "http://www.z280.com/images/palm/002.jpg"
                }

               ]
            

        }
    }
    
    redirect(routeName){
        this.props.navigator.push({
            name: routeName,
        });
    }

    navigate(routeName) {
        this.props.navigator.push({
            name: routeName
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

    renderPhotos(photos) {
        console.log('attempting render of photos');
        return (
            photos.map((photo) => {


                    return (
                        <View style={styles.photoContainer} key={photo.uid}>
                            <Text style={styles.username}>{photo.title} by - {photo.username}</Text>
                            <Image
                                source={{uri: photo.url}}
                                style={{width:400, height:300}} 
                            >
                            </Image>

                        </View>

                    );
             })
        
        )
    }

    render() {
        return(
            <View Style={styles.container}>
                <View style={styles.topText}>
                    <Text style={styles.title}>Photo Gallery</Text>
                    <Text style={styles.text}>The event photo gallery is below. Upload photos to share them with the group!</Text>
                </View>    
                <ScrollView style={{margin: 10}}>
                  {this.renderPhotos(this.state.photos)}
                </ScrollView>


                <TouchableHighlight onPress={ this.navigate.bind(this, 'kam') } style={styles.button}>
                   <Text style={styles.buttonText}>Camera</Text>
                </TouchableHighlight>

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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
        margin:20
    },
    photoContainer: {
        flex: 4,
        flexDirection: 'column',
        margin: 4,
        backgroundColor: '#eeeeee',
        width: 410,
        height: 320
    },
    topText: {
        paddingLeft:10,
        margin:0
    },
    title: {
        fontSize: 25,
        marginTop: 15,
        marginBottom: 15
    },
    text: {
        marginBottom: 2
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
    },
    username: {
        fontSize: 10,
        fontWeight: '700'
    }
});

export default Home
