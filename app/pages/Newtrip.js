import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Picker} from 'react-native';
import {Calendar} from 'react-native-calendars';
import CalendarPicker from 'react-native-calendar-picker';
import common from '../styles/Style';
import ModalSelector from 'react-native-modal-selector'

export default class Newtrip extends Component{
  constructor(props) {
    super(props);
    this.state = {
      marked : null,
      selectedStartDate: null,
      selectedEndDate: null,
      location1 : "위치",
      location2 : "위치",
      location3 : "위치",
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
    const data = [
      {key: 0, section:true, label :'위치'},
      {key: 1, label :'서울'},
      {key: 2, label :'인천'},
      {key: 3, label :'대전'},
      {key: 4, label :'대구'},
      {key: 5, label :'광주'},
      {key: 6, label :'부산'},
      {key: 7, label :'울산'},
      {key: 31, label :'경기'},
      {key: 32, label :'강원'},
      {key: 33, label :'충북'},
      {key: 34, label :'충남'},
      {key: 35, label :'경북'},
      {key: 36, label :'경남'},
      {key: 37, label :'전북'},
      {key: 38, label :'전남'},
      {key: 39, label :'제주'}
    ];

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
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>

              <View style={styles.pickerwrap}>
                <ModalSelector
                  data={data}
                  initValue="위치"
                  onChange={(option) => { this.setState({ location1: option.label }) }}
                >
                  <TextInput
                    style={{color:'#333'}}
                    editable={false}
                    value={this.state.location1}
                  ></TextInput>
                </ModalSelector>
              </View>
              <View style={styles.pickerwrap}>
                <ModalSelector
                  data={data}
                  initValue="위치"
                  onChange={(option) => { this.setState({ location2: option.label }) }}
                >
                  <TextInput
                    style={{color:'#333'}}
                    editable={false}
                    value={this.state.location2}
                  ></TextInput>
                </ModalSelector>
              </View>
              <View style={styles.pickerwrap}>
                <ModalSelector
                  data={data}
                  initValue="위치"
                  onChange={(option) => { this.setState({ location3: option.label }) }}
                >
                  <TextInput
                    style={{color:'#333'}}
                    editable={false}
                    value={this.state.location3}
                  ></TextInput>
                </ModalSelector>
              </View>
            </View>
            
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
  pickerwrap: {
      width:'30%',
      marginTop: 10,
      justifyContent:'center',
      alignItems:'center',
      borderWidth: 1,
      borderColor: '#FF7C5E',
      backgroundColor: '#FFF'
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
  locationwrap:{
    paddingVertical:3,
    paddingHorizontal:10,
    backgroundColor:'#FF7C5E',
    flexDirection:'row',
    marginRight:15,
    borderRadius: 50,
    justifyContent:'center',
    alignItems:'center'
  },
  xbtn:{
    backgroundColor:'#FFF',
    height:16,
    width:16,
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center'
  },
  calendarwrap: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#FFF'
  }
});