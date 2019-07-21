import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity, ScrollView, Image} from 'react-native'
import common from '../styles/Style';

export default class Triplist_main extends Component{
    constructor(props){
        super(props);
    }

    _renderItem =({item}) => {//Flatlist list 내용
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('TriptabScreen')}>
                <View style = {{alignItems: 'center'}}>
                    <View style = {{marginVertical: 15, backgroundColor: '#FFF', width: '80%', padding: 20, shadowColor: '#000', shadowRadius: 3, shadowOffset: {width:0, height: 2}, shadowOpacity : 0.7, elevation: 5}}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <Image style={{height:32, width:32}} resizeMode='contain' source={require('../assets/images/location_orange.png')}></Image>
                                <Text style={{fontSize: 32, fontWeight: '400'}}>{item.month}</Text>
                                <Text style={{fontSize: 32, fontWeight: '400', color:'#FF7C5E'}}>/</Text>
                                <Text style={{fontSize: 32, fontWeight: '400'}}>{item.day}</Text>
                            </View>
                            <Text style={{fontSize: 24}}> {item.key}</Text>
                        </View>
                        <View><Text>소제목은 여기에</Text></View>
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
                <View style ={styles.container} >
                    <Text>여행 리스트</Text>
                </View>
                <View style = {{maxHeight : '85%'}}>
                    <ScrollView>
                        <FlatList
                            data={[{ month: '4', day: '3', key: '속초' }, { month: '4', day: '4', key: '양평' }]}
                            renderItem={this._renderItem}
                        />
                    </ScrollView>
                </View>
                <View style = {styles.btnwrap}>
                    <TouchableOpacity style = {styles.circlebtn} onPress={() => this.props.navigation.navigate('NewtripScreen')}>
                        <Text style={styles.btnplus}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF7C5E',
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
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
    }

})