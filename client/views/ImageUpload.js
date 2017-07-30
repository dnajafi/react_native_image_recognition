import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class ImageUpload extends React.Component {

  static navigationOptions = (props) => ({
    title: 'Image Upload Page'
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>Image Upload Screen</Text>
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