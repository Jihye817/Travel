import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import CalendarPicker from 'react-native-calendar-picker';
import common from '../styles/Style';

export default class Newtrip extends Component{
  constructor(props) {
    super(props);
    this.state = {
      marked : null,
      selectedStartDate: null,
      selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if(type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    }
    else{
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }
  
  render() {

    const {selectedStartDate, selectedEndDate} = this.state;
    const minDate = new Date(); //today
    const maxDate = new Date(2025, 12, 31);
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';

    return (
      <View style = {[common.greycontainer, {alignItems:'center'}]}>
        <View style = {styles.one}>
          <Text style={styles.toptext}>새로운 여행 생성</Text>
        </View>

        <View style = {styles.second}>
          <View style={styles.inputwrap}>
            <Text>제목</Text>
            <TextInput style={styles.inputbox} placeholder='Title' placeholderTextColor='#D9D9D9' />
          </View>
          <View style={styles.inputwrap}>
            <Text>위치</Text>
            <TextInput style={styles.inputbox} placeholder='place' placeholderTextColor='#D9D9D9' />
          </View>
          <View style={[styles.inputwrap, {marginBottom:5,}]}>
            <Text>날짜</Text>
          </View>
          <View style={styles.calendarwrap}>
            <CalendarPicker
              allowRangeSelection={true}
              minDate={minDate}
              maxDate={maxDate}
              selectedDayColor='#FF7C5E'
              selectedDayTextColor='#FFF'
              onDateChange={this.onDateChange}
              scaleFactor={450}
            >
            </CalendarPicker>
          </View>
          <View style={styles.btnwrap}>
            <TouchableOpacity style={styles.btn} onPress={()=>this.props.navigation.goBack()}>
              <Text style={{color:'#FFF', fontSize: 18,}}>저장</Text>
            </TouchableOpacity>
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
  toptext:{
    fontSize: 20,
    color:'#FFF',
  },
  second: {
    paddingTop:5,
    width: '80%',
  },
  inputwrap:{
    marginTop:10,
  },
  inputbox: {
    marginTop:5,
    backgroundColor: '#FFF',
    height: 40,
    borderWidth:1,
    borderColor:'#D2D2D2'
  },
  btnwrap: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '80%',
    paddingVertical:5,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#FF7C5E'
  },
  calendarwrap: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#FFF'
  }
});