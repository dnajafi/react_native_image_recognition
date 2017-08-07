import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, CameraRoll, ImagePickerIOS } from 'react-native';
import { Button } from 'native-base';
import { RNS3 } from 'react-native-aws3';


export default class ImageUpload extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      token: '',
      S3_BUCKET: '',
      S3_KEY: '',
      S3_LOCATION: '',
      S3_SECRET: '',
      photos: [],
      image: null
    };
  }

  static navigationOptions = (props) => ({
    title: 'Image Upload Page'
  });

  onPressS3Data() {
    return fetch('http://localhost:8080/api/gets3data?access_token='+this.state.token, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {

      console.log('1111111');
      console.log(responseJson);

      this.setState({ 
        S3_BUCKET: responseJson["S3_BUCKET"],
        S3_KEY: responseJson["S3_KEY"],
        S3_LOCATION: responseJson["S3_LOCATION"],
        S3_SECRET: responseJson["S3_SECRET"]
      });

    })
    .catch((error) => {
      console.log('2222222');
      console.error(error);
    });
  }

  sendToS3() {

    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: this.state.image,
      name: "food.png",
      type: "image/png"
    }


    const options = {
      bucket: this.state.S3_BUCKET,
      region: "us-west-2",
      accessKey: this.state.S3_KEY,
      secretKey: this.state.S3_SECRET,
      successActionStatus: 201
    }


    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      console.log(response.body);
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
    });




  }

  uploadPhotoS3() {

    console.log('HIT UPLOAD PHOTO FUNCTION');

    // openSelectDialog(config, successCallback, errorCallback);
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      console.log('HIT THE GOOD SPOT');
      console.log(imageUri);
      this.setState({ image: imageUri });
      this.sendToS3();
    }, error => console.error(error));

  }


  componentDidMount() {
    AsyncStorage.getItem('currToken')
    .then((value) => {
      this.setState({ 'token': value });
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Image Upload Screen</Text>
        <Text>Current token: {this.state.token}</Text>
        <Button style={styles.button} onPress={() => this.onPressS3Data()}>
          <Text style={styles.loginText}>Get S3 Credentials</Text>
        </Button>
        {this.state.S3_BUCKET ? 
            <Button style={styles.button} onPress={() => this.uploadPhotoS3()}>
              <Text style={styles.loginText}>Upload a Photo</Text>
            </Button> :
            <Text>Press button above to access S3 Credentials</Text>
        }
        {this.state.photos ? this.state.photos : <Text>No photos in state</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});