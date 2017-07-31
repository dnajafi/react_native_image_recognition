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

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:8080/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        console.log('************* SUCCESS *************');

        // change the component-container state
        // this.setState({
        //   errors: {}
        // });
        this.props.navigation.navigate('ImageUpload');
        // console.log('The form is valid');
      } else {
        // failure
        console.log('************* FAILURE *************');
        console.log(xhr.response.errors);
        console.log(xhr.response.message);

        // change the component state
        // const errors = xhr.response.errors ? xhr.response.errors : {};
        // errors.summary = xhr.response.message;

        // this.setState({
        //   errors
        // });
      }
    });
    
    xhr.send(formData);



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













