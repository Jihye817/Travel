/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import common from './styles/Style';

export default class Login extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={common.orangecontainer}>
        <View style={styles.container}>
          <View style={styles.whitebox}>
            <View style={styles.logobox}>
              <Text>HAT</Text>
            </View>

            <View style={styles.infobox}>
              <Text>ID</Text>
              <TextInput style={styles.inputbox} placeholder='E-mail' placeholderTextColor='#D9D9D9' />
            </View>

            <View style={[styles.infobox, { paddingBottom: 10 }]}>
              <Text>PASSWORD</Text>
              <TextInput style={styles.inputbox} placeholder='password' placeholderTextColor='#D9D9D9' />
            </View>
            <View style={styles.btnwrap}>
              <TouchableOpacity style={styles.loginbtn} onPress = {() => this.props.navigation.navigate('TriplistmainScreen')}><Text style={styles.btntext}>LOGIN</Text></TouchableOpacity>
            </View>
            <View style={styles.btnwrap}>
              <TouchableOpacity style={[styles.loginbtn, { backgroundColor: '#19C959' }]}><Text style={styles.btntext}>네이버 아이디로 로그인</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity><Text style={styles.bottomtext} onPress = {() => this.props.navigation.navigate('FoundScreen')}>ID/PW찾기</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.bottomtext} onPress = {() => this.props.navigation.navigate('RegisterScreen')}>회원가입</Text></TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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
    padding: 20,
  },
  logobox: {
    height: '30%',
    backgroundColor: '#FF5',
  },
  infobox: {
    paddingTop: 10,
  },
  inputbox: {
    marginTop:5,
    backgroundColor: '#F2F2F2',
    height: 40
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
    marginTop:3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomtext:{
    color: '#FFF'
  },
  btnwrap: {
    paddingVertical: 10,

  },
});