import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './views/login';
import ImageUpload from './views/ImageUpload';
import SignUp from './views/signup'



// const Navigator = StackNavigator({
//   Home: {screen: Login}
// });

const Navigator = StackNavigator({
  Home: {screen: Login},
  ImageUpload: {screen: ImageUpload},
  SignUp: {screen: SignUp}
});




export default Navigator;



