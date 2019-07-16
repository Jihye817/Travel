import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import common from '../styles/Style';

export default class Diary extends Component{

    _renderItem =() => {//Flatlist list 내용
        return(
            <View style = {{alignItems: 'center'}}>
                    <View style = {{marginVertical: 15, backgroundColor: '#FFF', width: '80%', padding: 20, shadowColor: '#000', shadowRadius: 3, shadowOffset: {width:0, height: 2}, shadowOpacity : 0.7, elevation: 5}}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize: 32, fontWeight: '400'}}>4</Text>
                                <Text style={{fontSize: 32, fontWeight: '400', color:'#FF7C5E'}}>/</Text>
                                <Text style={{fontSize: 32, fontWeight: '400'}}>3</Text>
                            </View>
                            <Text style={{fontSize: 24}}> 속초</Text>
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
        /*return(
            <View style={common.greycontainer}>
                <View style={common.greybar} />
                <View style = {{alignItems: 'center'}}>
                    <View style = {{marginVertical: 15, backgroundColor: '#FFF', width: '80%', padding: 20, shadowColor: '#000', shadowRadius: 3, shadowOffset: {width:0, height: 2}, shadowOpacity : 0.7, elevation: 5}}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize: 32, fontWeight: '400'}}>4</Text>
                                <Text style={{fontSize: 32, fontWeight: '400', color:'#FF7C5E'}}>/</Text>
                                <Text style={{fontSize: 32, fontWeight: '400'}}>3</Text>
                            </View>
                            <Text style={{fontSize: 24}}> 속초</Text>
                        </View>
                        <View><Text>소제목은 여기에</Text></View>
                        <View style={{alignItems:'flex-end'}}>
                            <TouchableOpacity style={{width: 50, padding:5, backgroundColor: '#FF7C5E', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'#FFF'}}>수정</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )*/

        return (
            <View style={common.greycontainer}>
                <View style={common.greybar} />
                <FlatList 
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}