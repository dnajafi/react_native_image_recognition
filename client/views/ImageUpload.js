import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';

export default class ImageUpload extends React.Component {


    constructor(props) {
      super(props);

      this.state = {
        token: ''
      };
    }

  static navigationOptions = (props) => ({
    title: 'Image Upload Page'
  });

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