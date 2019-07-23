import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Picker, TextInput, FlatList} from 'react-native';
import common from '../styles/Style';
import {CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';

export default class New_Schedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            popupdata: false,
            value : "0",
            activeCheckbox: null,
            data: [{ month: '4', day: '3', key: '속초', id:0, checked: false }, { month: '4', day: '4', key: '양평', id:1, checked: false }, { month: '4', day: '4', key: '전주', id:2, checked: false }],
        }
    }

    handleChange =(itemID)=>{
        let data = this.state.data
        data[itemID].checked=!data[itemID].checked
        this.setState({data:data})
    }

    render(){
        let {data, checked} = this.state;
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
                                    <Picker.Item label="관광" value="1" />
                                    <Picker.Item label="음식" value="2" />
                                    <Picker.Item label="숙소" value="3" />
                                </Picker>
                            </View>

                            <TextInput style={styles.txtinput} placeholder='검색어를 입력하세요' placeholderTextColor='#D9D9D9' />

                            <TouchableOpacity style={styles.searchbtn}>
                                <Text style={styles.btntxt}>검색</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.scrollview}>
                            <FlatList
                                style={{width: '100%', height:'50%'}}
                                data={data}
                                extraData={this.state}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity style={styles.listitemwrap} onPress={()=>this.setState({popupdata:true})}>
                                        <View style={styles.checkwrap}>
                                            <CheckBox
                                                checked={this.state.data[item.id].checked}
                                                onPress={()=>this.handleChange(item.id)}
                                                checkedColor='#FF7C5E'
                                            ></CheckBox>
                                        </View>
                                        <View style={styles.textwrap}>
                                            <View style={{}}><Text style={{fontSize: 18,}}>{item.month}</Text></View>
                                            <View><Text>{item.key}</Text></View>
                                        </View>
                                    </TouchableOpacity>
                            }
                            />
                        </ScrollView>

                        <View style = {styles.btnwrap}>
                            <TouchableOpacity style={styles.btn} onPress={()=>this.props.navigation.navigate('ScheduleScreen')}>
                                <Text style={styles.btntxt}>저장</Text>
                            </TouchableOpacity>
                            
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
                                <Image resizeMode='contain' style={{width:'80%'}} source={require('../assets/images/photoexample.jpg')}></Image>
                            </View>

                            <View style={{height: '35%',}}>
                                <View style={{width:'80%', alignItems:'center' }}>
                                    <View style={{width:'80%'}}>
                                        <Text style={{fontSize: 18,}}>장소이름</Text>
                                    </View>
                                    <View style={{width:'80%', marginTop: 10,}}>
                                        <Text>장소설명</Text>
                                    </View>
                                </View>
                            </View>


                            <View style={styles.bottombtnwrap}>
                                <TouchableOpacity style={{ width: '80%', padding: 10, backgroundColor: '#FF7C5E', alignItems:'center' }} onPress={()=>this.setState({popupdata:false})}>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
})