import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

// class Br extends React.Component({ render() { return ( <Text> {"\n"}{"\n"} </Text> ) } })

export default class Login extends React.Component {

  static navigationOptions = (props) => ({
    title: 'Login Page'
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>{`\n`}</Text>
        <Button
          onPress={() => (this.props.navigation.navigate('ImageUpload'))}
          title="To ImageUpload"
          color="red"
        />
      </View>
    );
    // return (
    //   <View style={styles.container}>
    //     <Text>Open up App.js to start working on your app!</Text>
    //     <Text>Changes you make will automatically reload.</Text>
    //     <Text>Shake your phone to open the developer menu.</Text>
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});