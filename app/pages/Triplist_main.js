import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, Flatlist, TouchableOpacity} from 'react-native'
import common from '../styles/Style';

export default class Triplist_main extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={[common.greycontainer,{flex:1}]}>
                <View style ={styles.container} >
                    <Text>여행 리스트</Text>
                </View>
                <View style = {{borderColor:'#00f', borderWidth:1, height : '50%'}}>
                    <Text>리스트</Text>
                </View>
                <View style = {styles.btnwrap}>
                    <TouchableOpacity style = {styles.circlebtn} onPress={() => this.props.navigation.navigate('NewtripScreen')}></TouchableOpacity>
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

})