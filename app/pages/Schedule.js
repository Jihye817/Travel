import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Picker, TextInput} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import common from '../styles/Style';
import Modal from 'react-native-modal';
import MapView, {Marker} from 'react-native-maps';
import * as tripdataFunc from '../../serverRequest/tripdata_request';
import * as infodataFunc from '../../serverRequest/info_request';

export default class Schedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            id: '',
            collapsed : false,
            popupdata : false,
            value : "0",
            tripData: [],
            tripDataData: [],
            tripDates : [],
            tripInfo: [],
            tripName: '',
            }
    }

    data = {
        contents: [
            {
                date: '4/3',
                body: 'this is component 1',
            },
            {
                date: '4/4',
                body: 'this is component 2',
            },
        ]
    }

    componentDidMount(){
        const id = this.props.screenProps.id;
        const email = this.props.screenProps.email;
        this.setState({email: email, id: id}); //다음 페이지로 넘기기 위한 이메일 저장

        const type = 'schedule'
        this.getScheduleFunction(email, id, type);
    }

    getScheduleFunction(email, id, type){
        //GetTripData에서 일정의 id 및 type을 읽어온다
        tripdataFunc.GetTripData(email, id, type).then(function(response){
            return JSON.parse(response);
        })
        .then((data)=>{
            
            this.setState({tripData : data});
            console.log('this is tripDAta', this.state.tripData);
            //tripData 안의 array를 따로 저장한다
            this.setState({tripDataData : JSON.parse(this.state.tripData.data)}); 
            console.log('this is datadata', this.state.tripDataData);
            var x;
            for(x in this.state.tripDataData){
                this.setState({tripDates: this.state.tripDates.concat([x])})
                console.log('check', this.state.tripDataData[x]);
            }
            console.log('this is tripdates', this.state.tripDates.length);

            this.state.tripDates.map((param, index)=>{
                this.state.tripDataData[param] ? this.state.tripDataData[param].map((param, index) => {
                    this.getInfoFunction(param.type, param.id);
                }):null
            })
        });
    }

    getInfoFunction(type, id){
        infodataFunc.GetInfoTypeID(type, id).then(function(response){
            return JSON.parse(response);
        })
        .then((data)=>{
            this.setState({tripInfo: this.state.tripInfo.concat([data])})
            console.log(this.state.tripInfo)
        })
    }

    render() {
        return(
            <View style = {common.greycontainer}>
                <View style={common.greybar} />
                <ScrollView style={{alignSelf: 'stretch'}}>
                    {
                        this.state.tripDates.map((param, index)=>{
                            return(
                                <View style={styles.container}>
                                    <View style={styles.dropwrap}>
                                        <View style={styles.dropdown} key={index}>
                                            <Collapse style={{width:'100%'}} key={index} isCollapsed={this.state.collapsed}>
                                                <CollapseHeader style={{width:'100%'}}>
                                                    <View style={{width: '100%', flexDirection:'row', justifyContent:'space-between'}}>
                                                        <View style={{flexDirection: 'row'}}>
                                                            <Text>{param}</Text>
                                                            <TouchableOpacity style={{justifyContent:'center', marginLeft: 5,}} onPress={() => this.props.navigation.navigate('New_ScheduleScreen')}>
                                                                <Image style={{height:16, width: 16,}} resizeMode='contain' source={require('../assets/images/plus_circle.png')}/>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View>
                                                            <Text>▼</Text>
                                                        </View>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>
                                                    <View>
                                                        <View style={{width:'100%', height:150, backgroundColor:'#d2d2d2'}}>
                                                            <MapView style={{width:'100%', height:150,}}></MapView>
                                                        </View>
                                                        <View>
                                                            {
                                                                this.state.tripInfo ? this.state.tripInfo.map((param, index) => {
                                                                    return(
                                                                        <Text>{param.name}</Text>
                                                                    );
                                                                }) : null
                                                            }
                                                        </View>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                        /*
                        this.state.tripDataData[this.state.tripDates] ? this.state.tripDataData[this.state.tripDates].map((param, index) => {
                            return(
                                <View style={styles.container}>
                                    <View style={styles.dropwrap}>
                                        <View style={styles.dropdown} key={index}>
                                            <Collapse style={{width:'100%'}} key={index} isCollapsed={this.state.collapsed}>
                                                <CollapseHeader style={{width:'100%'}}>
                                                <View style={{width: '100%', flexDirection:'row', justifyContent:'space-between'}}>
                                                        <View style={{flexDirection: 'row'}}>
                                                            <Text>{param.id}</Text>
                                                            <TouchableOpacity style={{justifyContent:'center', marginLeft: 5,}} onPress={() => this.props.navigation.navigate('New_ScheduleScreen')}>
                                                                <Image style={{height:16, width: 16,}} resizeMode='contain' source={require('../assets/images/plus_circle.png')}/>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View>
                                                            <Text>▼</Text>
                                                        </View>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>
                                                    <View>
                                                        <View style={{width:'100%', height:150, backgroundColor:'#d2d2d2'}}>
                                                            <MapView style={{width:'100%', height:150,}}></MapView>
                                                        </View>
                                                        <Text>{param.id}</Text></View>
                                                </CollapseBody>
                                            </Collapse>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                        : null*/
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    header:{
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropwrap:{
        backgroundColor: '#FFF',
        borderWidth: 1,
        width: '80%',
        marginTop: 15,
        padding: 5,
        borderColor: '#D2D2D2'
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})