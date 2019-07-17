import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView} from 'react-native';
import common from '../styles/Style';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';

export default class Diary extends Component{
    constructor(props){
        super(props);
        this.state={popupdata:false, ishidden:0}
    }

    _renderItem =({item}) => {//Flatlist list 내용
        return(
            <View style = {{alignItems: 'center'}}>
                    <View style = {{marginVertical: 15, backgroundColor: '#FFF', width: '80%', padding: 20, shadowColor: '#000', shadowRadius: 3, shadowOffset: {width:0, height: 2}, shadowOpacity : 0.7, elevation: 5}}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize: 32, fontWeight: '400'}}>{item.month}</Text>
                                <Text style={{fontSize: 32, fontWeight: '400', color:'#FF7C5E'}}>/</Text>
                                <Text style={{fontSize: 32, fontWeight: '400'}}>{item.day}</Text>
                            </View>
                            <Text style={{fontSize: 24}}> {item.key}</Text>
                        </View>
                        <View><Text>소제목은 여기에</Text></View>
                        <View style={{alignItems:'flex-end'}}>
                            <TouchableOpacity style={{width: 50, padding:5, backgroundColor: '#FF7C5E', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'#FFF'}}>수정</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
        )
    } 

    render() {
        return (
            <View style={common.greycontainer}>
                <View style={common.greybar} />
                <View style={{maxHeight:'85%',}}>
                    <ScrollView>
                        <FlatList
                            data={[{ month: '4', day: '3', key: '속초' }, { month: '4', day: '4', key: '양평' }]}
                            renderItem={this._renderItem}
                        />
                    </ScrollView>
                </View>
                
                <View style = {styles.btnwrap}>
                    <TouchableOpacity style = {styles.circlebtn} onPress={() => this.setState({popupdata:true})}></TouchableOpacity>
                </View>
                <Modal isVisible={this.state.popupdata}>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <View style={{backgroundColor:'#FFF', width:'90%', height: '80%'}}>
                            <View><Text>Template</Text></View>
                            <View style={{width:'100%', height:'80%'}}>
                            <Swiper style={{backgroundColor: '#0f9'}} onIndexChanged={(index)=>this.setState({ishidden: index})} loop={false} showsButtons>
                                <View>
                                    {
                                        this.state.ishidden === 0 ? <Text>this is page one</Text> : null
                                    }
                                </View>
                                <View>
                                    {
                                        this.state.ishidden === 1 ? <Text>this is page two</Text> : null
                                    }
                                </View>
                            </Swiper>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({popupdata:false})}>
                                <Text>작성</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    btnwrap: {
        height:'15%',
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
})