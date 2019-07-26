import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity, ScrollView, Image} from 'react-native'
import common from '../styles/Style';
//import {GetTrips} from '../../serverRequest/trip_request';
//const tripReq = require('../../serverRequest/trip_request');
import * as tripFunc from '../../serverRequest/trip_request';

export default class Triplist_main extends Component{
    constructor(props){
        super(props);
        this.state = {
            tripData: [],
        }
    }

    componentDidMount(){
        const email = this.props.navigation.getParam('email', 'nothing sent');
        console.log(email);
        this.getTripFunction(email);
    }

    getTripFunction(email) {
        tripFunc.GetTrips(email).then(function(response) {
            console.log(email);
            //return response;
            return JSON.parse(response)
        })
        .then((data) => {
            this.setState({tripData : data})
            console.log(this.state.tripData) //data가 제대로 나오는지 확인하기 위함
        }).done();
    }

    areaFunction(key){
        switch(key) {
            case 1:
                return '서울';
            case 2:
                return '인천';
            case 7:
                return '울산';
        }
    }

    _renderItem =({item}) => {//Flatlist list 내용
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('TriptabScreen')}>
                <View style = {{alignItems: 'center'}}>
                    <View style = {styles.listwrap}>
                        <View style={styles.topwrap}>
                            <View style={styles.txtrowcenter}>
                                <Image style={{height:30, width:30, marginRight:10}} resizeMode='contain' source={require('../assets/images/location_orange.png')}></Image>
                                <Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize: 30}}>{item.name}</Text>
                            </View>
                        </View>
                        <View style={[styles.txtrowcenter, {marginLeft:30, marginVertical:5}]}>
                                <Text style={{fontSize: 22, fontWeight: '400'}}>{item.start.substring(2,4)}</Text>
                                <Text style={{fontSize: 22, fontWeight: '400'}}>/</Text>
                                <Text style={{fontSize: 22, fontWeight: '400'}}>{item.start.substring(5,7)}</Text>
                                <Text style={{fontSize: 22, fontWeight: '400'}}>/</Text>
                                <Text style={{fontSize: 22, fontWeight: '400'}}>{item.start.substring(8,10)}</Text>

                                <Text style={{fontSize: 22, fontWeight: '400', color:'#FF7C5E'}}>~</Text>

                                <Text style={{fontSize: 22, fontWeight: '400'}}>{tripFunc.ConvertDate(item.end)}</Text>
                                <Text style={{fontSize: 22, fontWeight: '400'}}>/</Text>
                                <Text style={{fontSize: 22, fontWeight: '400'}}>{item.end.substring(5,7)}</Text>
                                <Text style={{fontSize: 22, fontWeight: '400'}}>/</Text>
                                <Text style={{fontSize: 22, fontWeight: '400'}}>{item.end.substring(8,10)}</Text>
                            </View>
                        <View style={{marginLeft:30,}}><Text>{this.areaFunction(item.area1)}, {item.area2},{item.area3}</Text></View>
                        <View style={{alignItems:'flex-end'}}>
                            <TouchableOpacity style={{width: 50, padding:5, backgroundColor: '#FF7C5E', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'#FFF'}}>삭제</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return (
            <View style={[common.greycontainer,{flex:1}]}>
                <View style ={styles.one} >
                    <Text style={styles.toptext}>여행 리스트</Text>
                </View>
                <View style = {{maxHeight : '85%'}}>
                    <ScrollView>
                        <FlatList
                            //data={[{ month: '4', day: '3', key: '제목' }, { month: '4', day: '4', key: '제목' }]}
                            data={this.state.tripData}
                            renderItem={this._renderItem}
                        />
                    </ScrollView>
                </View>
                <View style = {styles.btnwrap}>
                    <TouchableOpacity style = {styles.circlebtn} onPress={() => this.props.navigation.navigate('NewtripScreen', {email: email})}>
                        <Text style={styles.btnplus}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
    btnwrap: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circlebtn:{
        backgroundColor: '#FF7C5E',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnplus: {
        color: '#FFF',
        fontSize:30,
    },
    listwrap: {
        marginVertical: 15, 
        backgroundColor: '#FFF',
        width: '80%',
        padding: 20,
        shadowColor: '#000',
        shadowRadius: 3,
        shadowOffset: {width:0, height: 2},
        shadowOpacity : 0.7,
        elevation: 5
    },
    topwrap: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#E2E2E2'
    },
    txtrowcenter: {
        flexDirection:'row',
        alignItems:'center'
    }

})