import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Picker, TextInput, Platform} from 'react-native';
import common from '../styles/Style';
import { ScrollView } from 'react-native-gesture-handler';
import PhotoUpload from 'react-native-photo-upload';
import * as diarydataFunc from '../../serverRequest/diary_request';

export default class Dwrite extends Component{

    constructor(props) {
        super(props);
        this.state = {
            value : "0",
            date: "0000-00-00",
            email: '',
            id: '',
            name: '',
            data: '',
            photo: null,
        }
    }

    componentDidMount(){
        const email = this.props.navigation.getParam('email', 'nothing sent');
        const id = this.props.navigation.getParam('id', 'nothing sent');

        this.setState({email:email, id:id})
    }

    saveBtnFunction(email, tripID, name, date, data, photo){
        this.postdiaryFunction(email, tripID, name, date, data, photo);
        this.props.navigation.navigate('DiaryScreen');
    }

    postdiaryFunction(email, tripID, name, date, data, photo){
        diarydataFunc.PostDiary(email, tripID, name, date, data, photo).then(function(response){
            return response.json();
        })
    }
    
    render() {
        const TempOne =
            <View style={styles.templatewrap}>
                <PhotoUpload
                    onPhotoSelect={avatar => {
                        this.setState({photo:avatar});
                        console.log("TTTTTTTTTT", this.state.photo)
                        if (avatar) {
                            console.log('image base 64 string', avatar)
                        }
                    }}

                    imagePickerProps={showImagePicker(options, (response) => {this.setState({photo:response})})}
                >
                    <Image resizeMode='cover' style={{width:320, height:120,marginBottom:10}} source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}></Image>
                </PhotoUpload>
                
                <TextInput
                    style={styles.txtinput}
                    placeholder='Enter title'
                    placeholderTextColor='#D9D9D9'
                    onChangeText={(text) => this.setState({name : text})}
                    
                />
                <ScrollView style={styles.multiinput}>
                    <TextInput
                        multiline={true}
                        maxLength={40}
                        style={{ backgroundColor: '#FFF' }}
                        placeholder='Enter memo'
                        placeholderTextColor='#D9D9D9'
                        onChangeText={(text) => this.setState({data : text})}
                    />
                </ScrollView>
            </View>

        const TempTwo =
            <View style={styles.templatewrap}>
                <TextInput
                    style={styles.txtinput}
                    placeholder='Enter title'
                    placeholderTextColor='#D9D9D9'
                    onChangeText={(text) => this.setState({name : text})}
                />
                <ScrollView style={styles.multiinput}>
                    <TextInput
                        multiline={true}
                        maxLength={40}
                        style={{ backgroundColor: '#FFF' }}
                        placeholder='Enter memo'
                        placeholderTextColor='#D9D9D9'
                        onChangeText={(text) => this.setState({data : text})}
                    />
                </ScrollView>
            </View>

        Templatechange = () => {
            if (this.state.value === "2") {
                return (TempTwo);
            }
            else {
                return (TempOne);
            }
        }

        return(
            <View style={common.greycontainer}>
                <View style={styles.one}>
                    <Text style={styles.toptext}>일기 작성</Text>
                </View>
                <View style={styles.two}>
                    <View style={styles.pickerwrap}>
                        <Picker
                            selectedValue={this.state.date}
                            onValueChange={(itemValue, itemIndex) => this.setState({date: itemValue})}
                            style={styles.pickerstyle}>
                            <Picker.Item label="날짜 선택" value="0000-00-00" />
                            <Picker.Item label="2019-08-05" value="2019-08-05" />
                            <Picker.Item label="2019-08-06" value="2019-08-06" />
                            <Picker.Item label="2019-08-07" value="2019-08-07" />
                        </Picker>
                    </View>
                    <View style={styles.pickerwrap}>
                        <Picker
                            selectedValue={this.state.value}
                            onValueChange={(itemValue2, itemIndex) => this.setState({value: itemValue2})}
                            style={styles.pickerstyle}>
                            <Picker.Item label="template 선택" value="0" />
                            <Picker.Item label="Template 1" value="1" />
                            <Picker.Item label="Template 2" value="2" />
                        </Picker>
                    </View>
                    {Templatechange()}
                    <View style = {styles.btnwrap}>
                        <TouchableOpacity style = {styles.btn} onPress={()=>this.saveBtnFunction(this.state.email, this.state.id, this.state.name, this.state.date, this.state.data, this.state.photo)}>
                            <Text style = {styles.btntxt}>저장</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.btn} onPress={()=>this.props.navigation.navigate('DiaryScreen')}>
                            <Text style = {styles.btntxt}>취소</Text>
                        </TouchableOpacity>
                    </View>
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
    two: {
        alignItems: 'center'
    },
    pickerwrap: {
        width:'80%',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#FF7C5E',
        backgroundColor: '#FFF'

    },
    pickerstyle : {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FF7C5E'
    },
    templatewrap: {
        height: '67%',
        width: '80%',
        marginTop: 10,
    },
    photoselect: {
        width: '100%',
        backgroundColor: '#FF7C5E',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        marginBottom: 10,
    },
    txtinput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#FF7C5E',
        backgroundColor: '#FFF',
        height: 40,
    },
    multiinput: {
        marginTop:10,
        height: 100,
        borderWidth:1,
        borderColor: '#B2B2B2',
        backgroundColor: '#FFF'
    },
    btnwrap: {
        width: '80%',
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    btn: {
        width: '25%',
        backgroundColor: '#FF7C5E',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    btntxt: {
        fontSize: 16,
        color: '#FFF'
    },
})