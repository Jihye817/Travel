/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import common from './styles/Style';
import {Login, Signup, SendVerifEmail, VerifyEmail} from '../serverRequest/member_request';

export default class Loginpage extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', pwd: ''}
  }

  loginFunction () {
    fetch("http://106.10.53.87:8080/login",{
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        pwd: this.state.pwd
      }),
      headers: {"Content-Type": "application/json"}
    }).then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data)
    });

    this.props.navigation.navigate('TriplistmainScreen');
  }

  render() {
    return (
      <SafeAreaView style={common.orangecontainer}>
        <View style={styles.container} behavior='padding'>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.whitebox}>
                <View style={styles.logobox}>
                  <Image style={{ width: '100%', height: '100%' }} resizeMode='contain' source={require('./assets/images/HATlogowithtxt.png')}></Image>
                </View>

                <View style={styles.infobox}>
                  <Text>ID</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder='E-mail'
                    placeholderTextColor='#D9D9D9'
                    keyboardType='email-address'
                    returnKeyType='next'
                    autoCorrect={false}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email : text})}
                    onSubmitEditing={() => this.refs.txtPassword.focus()}
                  />
                </View>

                <View style={[styles.infobox, { paddingBottom: 10 }]}>
                  <Text>PASSWORD</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder='password'
                    placeholderTextColor='#D9D9D9'
                    returnKeyType='go'
                    secureTextEntry
                    autoCorrect={false}
                    value={this.state.pwd}
                    onChangeText={(text) => this.setState({pwd : text})}
                    ref={'txtPassword'}

                  />
                </View>
                <View style={styles.btnwrap}>
                  <TouchableOpacity style={styles.loginbtn} onPress={() => this.loginFunction()}><Text style={styles.btntext}>LOGIN</Text></TouchableOpacity>
                </View>
                <View style={styles.btnwrap}>
                  <TouchableOpacity style={[styles.loginbtn, { backgroundColor: '#19C959' }]}><Text style={styles.btntext}>네이버 아이디로 로그인</Text></TouchableOpacity>
                </View>
              </View>
              <View style={styles.bottom}>
                <TouchableOpacity><Text style={styles.bottomtext} onPress={() => this.props.navigation.navigate('FoundScreen')}>ID/PW찾기</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.bottomtext} onPress={() => this.props.navigation.navigate('RegisterScreen')}>회원가입</Text></TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7C5E',
  },
  whitebox: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    width: '80%', //height주면 위로 같이 밀려올라감 왜인지는 알수 없음
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  logobox: {
    height: '30%',
  },
  infobox: {
    paddingTop: 10,
  },
  inputbox: {
    marginTop: 5,
    backgroundColor: '#F2F2F2',
    height: 40,
  },
  loginbtn: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7C5E',
  },
  btntext: {
    color: '#FFF',
    fontSize: 20,
  },
  bottom: {
    width: '80%',
    marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomtext: {
    color: '#FFF'
  },
  btnwrap: {
    paddingVertical: 10,

  },
});