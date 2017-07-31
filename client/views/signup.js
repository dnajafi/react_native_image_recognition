import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button, Container, Header, Title, InputGroup, Icon, Input } from 'native-base';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

// class Br extends React.Component({ render() { return ( <Text> {"\n"}{"\n"} </Text> ) } })

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  onPressSignup() {

    dismissKeyboard();

    console.log('111111');

    console.log(this.state.email);

    return fetch('http://localhost:8080/auth/signup', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })

    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('222222');
      console.log(responseJson);
    })
    .catch((error) => {
      console.log('333333');
      console.error(error);
    });

    // return fetch('https://facebook.github.io/react-native/movies.json')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log('22222');
    //     console.log(responseJson.movies);
    //     return responseJson.movies;
    //   })
    //   .catch((error) => {
    //     console.log('33333');
    //     console.error(error);
    //   });


  }

  render() {
    return (
      <Container>
        <View style={styles.header}>
          <Header>
            <Title>Registration</Title>
          </Header>
        </View>


        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.content}>
          <InputGroup>
            <Icon style={styles.inputIcon} name="ios-person" />
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </InputGroup>

          <InputGroup>
            <Icon style={styles.inputIcon} name="ios-unlock" />
              <Input
                placeholder="Password"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                secureTextEntry
              />
          </InputGroup>
             <Button
                  style={styles.button}
                  onPress={() => this.onPressSignup()}
            >
              <Text style={styles.loginText}>Signup</Text>
            </Button>


          </View>

          


        </TouchableWithoutFeedback>
        

      </Container>
    );




    // return (
    //   <View style={styles.container}>
    //     <Text>{`\n`}</Text>
    //     <Button
    //       onPress={() => (this.props.navigation.navigate('ImageUpload'))}
    //       title="To ImageUpload"
    //       color="red"
    //     />
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    width: 150,
  },
  loginText: {
    textAlign: 'center'
  }
  // content: {
  //   marginTop: 30,
  //   flex: 1
  // },
});


//localhost:8080/auth/signup