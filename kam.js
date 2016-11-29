import React, { Component } from 'react';
import {
    StyleSheet,
    AsyncStorage,
    ScrollView,
    Image,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';



import FileTransfer from 'NativeModules';
var sha1 = require('sha1');
var secretos = require('./secret.js');

const ACCESS_TOKEN = 'access_token';

class Kam extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      images: null
    };
  }


	upload(uri, successCb, errorCb) {

		let timestamp = Date.now(),
			keys = "timestamp=" + timestamp + secretos.apiSecret,
			signature = Sha1.hash( keys ),
			obj = {
			    uri: uri,
			    uploadUrl: "https://api.cloudinary.com/v1_1/" + this.state.cloudi.cloudName + "/image/upload",
			    data: {
			    	api_key: secretos.apiKey,
			    	timestamp: timestamp,
			    	signature: signature
			    }
			};

		FileTransfer.upload(obj, (err, res) => {
			if(res) successCb(res);
		    if(err) errorCb(err);
		});
}



  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping,
      width: 500,
      height: 500
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height},
        images: null
      });
    }).catch(e => alert(e));
  }

  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height},
        images: null
      });
    }).catch(e => alert(e));
  }

  cleanupImages() {
    ImagePicker.clean().then(() => {
      console.log('removed tmp images from tmp directory');
    }).catch(e => {
      alert(e);
    });
  }

  cleanupSingleImage() {
    let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
    console.log('will cleanup image', image);

    ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
      console.log(`removed tmp image ${image.uri} from tmp directory`);
    }).catch(e => {
      alert(e);
    })
  }

  pickSingle(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      compressVideo: true
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => {
      console.log(e.code);
      alert(e);
    });
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      this.setState({
        image: null,
        images: images.map(i => {
          console.log('received image', i);
          return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
        })
      });
    }).catch(e => alert(e));
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }

  renderVideo(uri) {
    return <View style={{height: 300, width: 300}}>
      <Video source={{uri}}
         style={{position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}
         rate={1}
         paused={false}
         volume={1}
         muted={false}
         resizeMode={'cover'}
         onLoad={load => console.log(load)}
         onProgress={() => {}}
         onEnd={() => { console.log('Done!'); }}
         repeat={true} />
     </View>;
  }

  renderImage(image) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image.uri);
    }

    return this.renderImage(image);
  }

  render() {
    return <View style={styles.container}>
      <ScrollView>
        {this.state.image ? this.renderAsset(this.state.image) : null}
        {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
      </ScrollView>

      <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
        <Text style={styles.text}>Select Single With Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Camera With Cropping</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingle(false)} style={styles.button}>
        <Text style={styles.text}>Select Single</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingleBase64(false)} style={styles.button}>
        <Text style={styles.text}>Select Single Returning Base64</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingle(true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Cropping</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
        <Text style={styles.text}>Select Multiple</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.cleanupImages.bind(this)} style={styles.button}>
        <Text style={styles.text}>Cleanup All Images</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.cleanupSingleImage.bind(this)} style={styles.button}>
        <Text style={styles.text}>Cleanup Single Image</Text>
      </TouchableOpacity>
    </View>
    
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000',
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
    margin: 10,
    padding: 15,
    justifyContent: 'center'
  },
  text: {
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

export default Kam
