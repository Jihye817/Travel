import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native'

export default class Splash extends Component{
    constructor(props){
        super(props)
        this.state={timer:0}
    }
    render(){
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <Text style = {styles.teamname}>Monday Blues</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    teamname:{
        color: '#FFF'
    }
})