import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import common from '../styles/Style';

export default class Found extends Component{
  render() {
    return (
      <SafeAreaView style={[common.orangecontainer, {flex: 1}]}>
        <View style={styles.container}>
          <View style={styles.whitebox}>
            <View style={styles.logobox}>
              <Text>HAT</Text>
            </View>

            <View style={styles.infobox}>
              <Text>이름</Text>
              <TextInput style={styles.inputbox} placeholder='ex) hat@email.com' placeholderTextColor='#D9D9D9' />
            </View>

            <View style={[styles.infobox, { paddingBottom: 10 }]}>
              <Text>닉네임</Text>
              <TextInput style={styles.inputbox} placeholder='ex) 박밀레' placeholderTextColor='#D9D9D9' />
            </View>

            <View style={styles.btnwrap}>
              <TouchableOpacity style={styles.loginbtn}><Text>찾기</Text></TouchableOpacity>
            </View>
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
  bottom: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnwrap: {
    paddingVertical: 10,

  },
});