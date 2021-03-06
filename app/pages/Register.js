import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import common from '../styles/Style';
import {CheckBox} from 'react-native-elements';
import {Login, Signup, SendVerifEmail, VerifyEmail} from '../../../Travel/serverRequest/member_request';

export default class Register extends Component{
  constructor(props){
    super(props);
    this.state={checked:false, email: '', pwd: '', nickname: '', name: '', verifCode: ''}
  }

  codeRequestFunction () {
    fetch("http://106.10.53.87:8080/signup/verif",{
      method: "POST",
      body: JSON.stringify({
        email: this.state.email
      }),
      headers: {"Content-Type": "application/json"}
    }).then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data)
    });
  }

  verifyCodeFunction () {
    fetch("http://106.10.53.87:8080/signup/verif",{
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        verifCode: this.state.verifCode
      }),
      headers: {"Content-Type": "application/json"}
    }).then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data)
    });
  }

  signupFunction () {
    fetch("http://106.10.53.87:8080/signup",{
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        nickname: this.state.nickname,
        pwd: this.state.pwd
      }),
      headers: {"Content-Type": "application/json"}
    }).then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data)
    });
  }

  render() {
    return (
      <SafeAreaView style={common.orangecontainer}>
        <View style={styles.container}>
          <View style={styles.whitebox}>
            <View style={styles.logobox}>
              <Image style={{width:'100%', height:'100%'}} resizeMode='contain' source={require('../assets/images/HATlogowithtxt.png')}></Image>
            </View>

            <View style={styles.infobox}>
              <Text>ID</Text>
              <View style={styles.inputwrap}>
                <TextInput
                  style={[styles.inputbox, {width:'70%'}]}
                  placeholder='E-mail'
                  placeholderTextColor='#D9D9D9'
                  keyboardType='email-address'
                  returnKeyType='next'
                  autoCorrect={false}
                  value={this.state.email}
                  onChangeText={(text) => this.setState({email : text})}
                  />
                <TouchableOpacity style={styles.codebtn} onPress={()=>this.codeRequestFunction()}>
                  <Text style={styles.txt}>인증요청</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infobox}>
              <Text>인증코드</Text>
              <View style={styles.inputwrap}>
                <TextInput
                  style={[styles.inputbox, {width:'70%'}]}
                  placeholder='code'
                  placeholderTextColor='#D9D9D9'
                  returnKeyType='next'
                  autoCorrect={false}
                  value={this.state.verifCode}
                  onChangeText={(text) => this.setState({verifCode : text})}
                />
                <TouchableOpacity style={styles.codebtn} onPress={()=>this.verifyCodeFunction()}>
                  <Text style={styles.txt}>인증확인</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infobox}>
              <Text>PASSWORD</Text>
              <TextInput
                style={styles.inputbox}
                placeholder='password'
                placeholderTextColor='#D9D9D9'
                returnKeyType='next'
                secureTextEntry
                autoCorrect={false}
                value={this.state.pwd}
                onChangeText={(text) => this.setState({pwd : text})}
                />
            </View>

            <View style={styles.infobox}>
              <Text>이름</Text>
              <TextInput
                style={styles.inputbox}
                placeholder='Name'
                placeholderTextColor='#D9D9D9'
                returnKeyType='next'
                autoCorrect={false}
                value={this.state.name}
                onChangeText={(text) => this.setState({name : text})}
                />
            </View>

            <View style={[styles.infobox, { paddingBottom: 10 }]}>
              <Text>닉네임</Text>
              <TextInput
                style={styles.inputbox}
                placeholder='Username'
                placeholderTextColor='#D9D9D9'
                autoCorrect={false}
                value={this.state.nickname}
                onChangeText={(text) => this.setState({nickname : text})}
                />
            </View>

            <View style={styles.btnwrap}>
              <TouchableOpacity style={styles.loginbtn} onPress={()=>this.signupFunction()}>
                <Text style={{color:'#FFF', fontSize:18,}}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottom}>
            <CheckBox 
            checked={this.state.checked}
            onPress={()=>this.setState({checked:!this.state.checked})}
            uncheckedColor='#FFF'
            checkedColor='#FFF'></CheckBox>
            <Text style={{color:'#FFF'}}>이용약관 및 개인정보 취급방침에 동의합니다</Text>
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
    width: '78%',
    height:580,
    padding: 20,
  },
  logobox: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infobox: {
    paddingTop: 10,
  },
  inputwrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codebtn: {
    marginTop:5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7C5E',
    width:'30%'
  },
  txt:{
    color:'#FFF'
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
    justifyContent: 'space-around',
    alignItems:'center'
  },
  btnwrap: {
    paddingVertical: 10,
  },
});