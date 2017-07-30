import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './views/login';
import ImageUpload from './views/ImageUpload';



// const Navigator = StackNavigator({
//   Home: {screen: Login}
// });

const Navigator = StackNavigator({
  Home: {screen: Login},
  ImageUpload: {screen: ImageUpload}
});




export default Navigator;



