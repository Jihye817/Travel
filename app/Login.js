/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

export default class Login extends Component{
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.whitebox}>
          <View>
            <Text>HAT</Text>
          </View>

          <View>
            <Text>ID</Text>
            <TextInput style={styles.inputbox} />
          </View>

          <View>
            <Text>PASSWORD</Text>
            <TextInput style={styles.inputbox} />
          </View>
          
          <TouchableOpacity style={styles.loginbtn}><Text>LOGIN</Text></TouchableOpacity>
          
          <TouchableOpacity style={[styles.loginbtn, {backgroundColor:'#19C959'}]}><Text>네이버 아이디로 로그인</Text></TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity><Text>ID/PW찾기</Text></TouchableOpacity>
          <TouchableOpacity><Text>회원가입</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7C5E',
  },
  whitebox: {
    backgroundColor: '#FFF',
    width: '80%',
    height:'70%',
  },
  inputbox: {
    backgroundColor: '#CCC'
  },
  loginbtn: {
    width: '80%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7C5E'
  },
  bottom: {
    width: '80%',
  }
});