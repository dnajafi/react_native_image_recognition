import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button, Container, Header, Title, InputGroup, Icon, Input } from 'native-base';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

// class Br extends React.Component({ render() { return ( <Text> {"\n"}{"\n"} </Text> ) } })

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  onPressLogin() {
    dismissKeyboard();

    return fetch('http://localhost:8080/auth/login', {
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
      console.log(responseJson);
      

    })
    .catch((error) => {
      console.error(error);
    });



  }

  render() {
    return (
      <Container>
        <View style={styles.header}>
          <Header>
            <Title>Login</Title>
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
                  onPress={() => this.onPressLogin()}
            >
              <Text style={styles.loginText}>Login</Text>
            </Button>

             <Button
                  style={styles.button}
                  onPress={() => (this.props.navigation.navigate('SignUp'))}
            >
              <Text style={styles.loginText}>Not signed up?{'\n'}Click here</Text>
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













