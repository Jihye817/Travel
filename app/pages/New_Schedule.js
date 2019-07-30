import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Picker, TextInput, FlatList} from 'react-native';
import common from '../styles/Style';
import Modal from 'react-native-modal';
import * as infodataFunc from '../../serverRequest/info_request';
import * as scheduledataFunc from '../../serverRequest/schedule_request';

export default class New_Schedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            popupdata: false,
            value : "0",
            tripId: '',
            email: '',
            date: '',
            area1: '',
            area2: '',
            area3: '',
            infoData: [],
            targetData: [],
            targetDetail: '',
            putData: [],
            tripData: [],
        }
    }

    componentDidMount(){
        const tripId = this.props.navigation.getParam('id', 'nothing sent');
        const email = this.props.navigation.getParam('email', 'nothing sent');
        const date = this.props.navigation.getParam('date', 'nothing sent');
        const area1 = this.props.navigation.getParam('area1', 'nothing sent');
        const area2 = this.props.navigation.getParam('area2', 'nothing sent');
        const area3 = this.props.navigation.getParam('area3', 'nothing sent');
        const tripData = this.props.navigation.getParam('tripData', 'nothing sent');
        this.setState({email: email, tripId: tripId, area1:area1, area2:area2, area3:area3, date:date, tripData:tripData});
    }

    handleChange =(itemID)=>{
        let data = this.state.infodata
        data[itemID].checked=!data[itemID].checked
        this.setState({data:data})
    }

    popFunction = (email, tripID, date, type, id) => {
        this.setState({popupdata : false});
        console.log("THIS is TYPE", id);
        this.updateTripFunction(email, tripID, date, type, id);
        this.props.navigation.navigate('ScheduleScreen');
    }

    searchFunction(type, area1, area2, area3){
        infodataFunc.GetInfoTypeArea(type, area1, area2, area3).then(function(response){
            return response;
        })
        .then((data)=>{
            console.log(data)
            this.setState({infoData:(data[0].concat(data[1])).concat(data[2])});
            console.log("the info datas : ", this.state.infoData);
        });
    }

    popFunction_data = (type, id) =>{
        this.setState({popupdata:true});
        this.getInfoFunction(type, id);
        this.getDetailFunction(type, id);
    }

    getInfoFunction(type, id){
        infodataFunc.GetFullInfoTypeID(type, id).then(function(response){
            return JSON.parse(response);
        })
        .then((data)=>{
            this.setState({targetData: data});
            console.log(data);
        })
    }

    getDetailFunction(type, id){
        infodataFunc.GetDetailInfoTypeID(type, id).then(function(response){
            return response;
        })
        .then((data)=>{
            this.setState({targetDetail: data});
        })
    }

    updateTripFunction(email, tripID, date, type, id){
        scheduledataFunc.PutSchedule(email, tripID, date, type, id).then(function(response){
            return response.json();
        })
        .then((data)=>{
            console.log(data);
        })
    }

    render(){
        return(
            <View style={common.greycontainer}>
                <View style={styles.one}>
                    <Text style={styles.toptext}>일정 추가</Text>
                </View>
                <View style={styles.two}>
                    <View style={{height:'100%', width:'100%', alignItems: 'center'}}>
                        <View style={styles.firstwrap}>
                            <View style={styles.pickerwrap}>
                                <Picker
                                    selectedValue={this.state.value}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ value: itemValue })}
                                    style={styles.pickerstyle}>
                                    <Picker.Item label="분류" value="0" />
                                    <Picker.Item label="관광" value="tour" />
                                    <Picker.Item label="음식" value="eat" />
                                    <Picker.Item label="숙소" value="stay" />
                                </Picker>
                            </View>

                            <TextInput style={styles.txtinput} placeholder='검색어를 입력하세요' placeholderTextColor='#D9D9D9' />

                            <TouchableOpacity style={styles.searchbtn} onPress={()=>this.searchFunction(this.state.value, this.state.area1, this.state.area2, this.state.area3)}>
                                <Text style={styles.btntxt}>검색</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.scrollview}>
                            <FlatList
                                style={{width: '100%', height:'50%'}}
                                data={this.state.infoData}
                                extraData={this.state}
                                renderItem={({ item }) =>
                                    <TouchableOpacity style={styles.listitemwrap} onPress={()=>this.popFunction_data(this.state.value, item._id)}>
                                        <View style={styles.checkwrap}>
                                            <Text>-</Text>
                                        </View>
                                        <View style={styles.textwrap}>
                                            <View style={{}}><Text style={{fontSize: 18,}}>{item.name}</Text></View>
                                            <View><Text>{item.addr}</Text></View>
                                        </View>
                                    </TouchableOpacity>
                            }
                            />
                        </ScrollView>

                        <View style = {styles.btnwrap}>                            
                            <TouchableOpacity style={styles.btn} onPress={()=>this.props.navigation.navigate('ScheduleScreen')}>
                                <Text style={styles.btntxt}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Modal isVisible={this.state.popupdata}>
                    <View style={styles.popwrap}>
                        <View style={styles.popwhite}>
                            <View style={{alignItems:'flex-end', marginRight:5, marginTop:2,}}>
                                <TouchableOpacity onPress={() => this.setState({popupdata:false})}>
                                    <Text style={{fontSize:20}}>X</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{alignItems:'center', paddingBottom: 5,}}>
                                <Text style={styles.temptext}>세부정보</Text>
                            </View>

                            <View style={{justifyContent:'center', alignItems:'center', height:'35%'}}>
                                <Image resizeMode='contain' style={{height:150, width:250}} source={{uri: this.state.targetData.imageurl}}></Image>
                            </View>

                            <View style={{height: '35%', alignItems:'center', justifyContent:'center'}}>
                                <View style={{width:'80%', alignItems:'center', justifyContent:'center'}}>
                                    <View style={{width:'80%'}}>
                                        <Text style={{fontSize: 18,}}>{this.state.targetData.name}</Text>
                                    </View>
                                    <View style={{width:'100%', marginTop: 10, justifyContent:'center', alignItems:'center'}}>
                                        <Text ellipsizeMode='tail' numberOfLines={6}>{this.state.targetDetail}</Text>
                                    </View>
                                </View>
                            </View>


                            <View style={styles.bottombtnwrap}>
                                
                                <TouchableOpacity style={{ width: '35%', padding: 10, backgroundColor: '#FF7C5E', alignItems:'center' }} onPress={()=>this.popFunction(this.state.email, this.state.tripId, this.state.date, this.state.value, this.state.targetData._id)}>
                                    <Text style={{color: '#FFF', fontSize:16}}>저장</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '35%', padding: 10, backgroundColor: '#FF7C5E', alignItems:'center' }} onPress={()=>this.setState({popupdata:false})}>
                                    <Text style={{color: '#FFF', fontSize:16}}>닫기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    one: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF7C5E',
        height: 60,
    },
    toptext:{
        fontSize: 20,
        color:'#FFF',
    },
    two:{
        width: '100%',
        height: '90%',
        alignItems:'center',
    },
    firstwrap:{
        width:'90%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    pickerwrap: {
        width:'30%',
        borderWidth: 1,
        borderColor: '#FF7C5E',
        backgroundColor: '#FFF',
    },
    pickerstyle : {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FF7C5E'
    },
    txtinput: {
        width: '50%',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#B2B2B2',
        height: 40,
    },
    searchbtn: {
        width: '15%',
        height: 40,
        backgroundColor: '#FF7C5E',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    btnwrap: {
        width:'100%',
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btn: {
        width: '30%',
        padding: 10,
        backgroundColor: '#FF7C5E',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btntxt: {
        fontSize: 20,
        color: '#FFF',

    },
    scrollview: {
        marginTop: 15,
        width: '90%',
        backgroundColor: '#FFF',
        borderWidth:1,
        borderColor: '#B2B2B2'
    },
    listitemwrap: {
        width:'100%',
        flexDirection: 'row',
        justifyContent:'center',
        paddingVertical: 5,
        borderBottomWidth:1,
        borderBottomColor: '#D2D2D2'
    },
    checkwrap: {
        width: '15%',
        justifyContent:'center',
        alignItems:'center'
    },
    textwrap: {
        width:'85%',
        justifyContent:'center',
    },
    popwrap: {
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    },
    popwhite: {
        backgroundColor:'#FFF',
        width:'90%',
        height: '80%'
    },
    temptext:{
        fontSize: 24,
    },
    bottombtnwrap: {
        marginTop: 15,
        flexDirection:'row', 
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})