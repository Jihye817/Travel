import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Picker, TextInput} from 'react-native';
import common from '../styles/Style';
import * as diarydataFunc from '../../serverRequest/diary_request';
import * as tripdataFunc from '../../serverRequest/trip_request';

export default class Dshow extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            tripID: '',
            diaryID: '',
            diaryData: [],
        }
    }

    componentDidMount(){
        const email = this.props.navigation.getParam('email', 'nothing sent');
        const tripID = this.props.navigation.getParam('tripID', 'nothing sent');
        const diaryID = this.props.navigation.getParam('diaryID', 'nothing sent');
        this.setState({email: email, tripID: tripID, diaryID: diaryID});

        this.getDiaryFunction(email, tripID, diaryID);
    }


    getDiaryFunction(email, tripID, diaryID){
        diarydataFunc.GetSingleDiary(email, tripID, diaryID).then(function(response){
            return response;
        }).then((data)=>{
            this.setState({diaryData: data});
            console.log('diary data type', typeof(this.state.diaryData));
            console.log("This is diary datas : ", this.state.diaryData);
        })
    }

    render(){
        const viewOne = <View style={styles.container}>
            <View style={styles.imagecontainer}>
                <Image resizeMode='cover' style={{ width: 320, height: 200, marginBottom: 10 }} source={{ uri: this.state.diaryData.image }}></Image>
            </View>
            <View style={styles.titlecontainer}>
                <Text style={{ fontSize: 20 }}>{this.state.diaryData.name}</Text>
            </View>
            <View style={styles.dataconainer}>
                <Text style={{ fontSize: 16 }}>{this.state.diaryData.data}</Text>
            </View>
        </View>

        const viewTwo = <View style={styles.container}>
            <View style={styles.titlecontainer}>
                <Text style={{ fontSize: 20 }}>{this.state.diaryData.name}</Text>
            </View>
            <View style={styles.dataconainer}>
                <Text style={{ fontSize: 16 }}>{this.state.diaryData.data}</Text>
            </View>
        </View>

        return (
            <View style={common.greycontainer}>
                <View style={styles.one}>
                    <Text style={styles.toptext}>{tripdataFunc.ConvertDate(this.state.diaryData.date)}</Text>
                </View>
                <View style={common.greybar} />
                {
                    this.state.diaryData.image === undefined ? viewTwo : viewOne
                }
                <View style={styles.btncontainer}>
                    <TouchableOpacity style={styles.btn} onPress={()=>this.props.navigation.navigate('DiaryScreen')}>
                        <Text style={{fontSize:16, color:'#FFF'}}>뒤로가기</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
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
        color:'#FFF'
    },
    container:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    container2:{
        width:'100%',
        justifyContent:'center',
    },
    imagecontainer: {
        marginTop:20,
        width:'80%',
        justifyContent:'center',
        alignItems: 'center',
    },
    titlecontainer: {
        marginTop:10,
        width:'80%',
        alignItems: 'center',
        padding: 5,
        borderWidth:1,
        borderColor:'#FF7C5E',
        marginBottom:10
    },
    dataconainer: {
        width:'80%',
        minHeight: 200,
        padding: 5,
        borderWidth:1,
        borderColor:'#D2D2D2',
        alignItems: 'center',
    },
    btncontainer: {
        marginTop:20,
        width:'100%',
        justifyContent:'center',
        alignItems: 'center',
    },
    btn: {
        width: '60%',
        backgroundColor:'#FF7C5E',
        paddingVertical:5,
        justifyContent:'center',
        alignItems: 'center'
    }
})