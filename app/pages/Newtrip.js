import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import common from '../styles/Style';

export default class Newtrip extends Component{
  render() {
    return (
      <View style = {[common.greycontainer, {alignItems:'center'}]}>
        <View style = {styles.one}>
          <Text>새로운 여행 생성</Text>
        </View>

        <View style = {styles.second}>
          <View>
            <Text>제목</Text>
            <TextInput style={styles.inputbox} placeholder='Title' placeholderTextColor='#D9D9D9' />
          </View>
          <View>
            <Text>위치</Text>
            <TextInput style={styles.inputbox} placeholder='place' placeholderTextColor='#D9D9D9' />
          </View>
          <View>
            <Text>날짜</Text>
          </View>
            <Calendar
              minDate={'2019-01-01'}
              maxDate={'2020-12-31'}
              onDayPress={day => console.log('selected day', day)}
              theme={{
                selectedDayBackgroundColor: '#000'
              }}
            />
          <View>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Text>저장</Text></TouchableOpacity>
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  one: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7C5E',
  },
  second: {
    width: '80%',
  },
  inputbox: {
    marginTop:5,
    backgroundColor: '#FFF',
    height: 40,
    borderWidth:1,
    borderColor:'#D2D2D2'
  },
});