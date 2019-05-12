import React, {Component} from 'react';
import {  StyleSheet, Text, View,TouchableOpacity,Linking,AppRegistry,} from 'react-native';
import firebase from 'react-native-firebase';
import AppNavigator from './navigation/AppNavigator';
import Login from './screens/setting/LoginScreen';

export default class App extends Component{

  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      user: null,
    };
  }
  /**
   * Listen for any auth state changes and update component state
   */
  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }
  
  componentWillUnmount() {
    if(this.unsubscriber)
      this.unsubscriber();
    if(this.unsubscriber2)
      this.unsubscriber2();
  }

  myLogin = (email, password) => {
    this.unsubscriber2 = firebase.auth().signInWithEmailAndPassword(email, password)
  }

  render() {
    
      if(!this.state.user) {
        return <Login Login={this.myLogin}/>;
      }
      // console.log(this.state.user)
      return (
        <AppNavigator user={this.state.user}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

//%LOCALAPPDATA%\Android\Sdk\platform-tools\adb reverse tcp:8081 tcp:8081
// %LOCALAPPDATA%\Android\Sdk\platform-tools\adb shell input text rr