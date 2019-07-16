import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import common from '../styles/Style';

const DOWN_ARROW = require('../assets/images/ic_arr_down.png');
const UP_ARROW = require('../assets/images/ic_arr_up.png');

export default class Money extends Component{
    constructor(props){
        super(props);
        this.state = {showbody : true, activeImage : true}
    }
    toggleBody = () =>{
        this.setState({showbody : !this.state.showbody, activeImage : !this.state.activeImage,})
    }
    data = {
        contents: [
            {
                date: '4/3',
                money: '$15000',
                body: 'this is component 1',
            },
            {
                date: '4/4',
                money: '$200000',
                body: 'this is component 2',
            },
        ]
    }
    render() {
        let arrowImage = this.state.activeImage ? DOWN_ARROW : UP_ARROW;
        return(
            <View style = {common.greycontainer}>
                <View style={common.greybar} />
                <ScrollView style={{alignSelf: 'stretch'}}>
                    {
                        this.data.contents ? this.data.contents.map((param, i) => {
                            return(
                                <View style={styles.container}>
                                    <View style={styles.dropwrap}>
                                        <View style={styles.dropdown} key={i}>
                                            <Text style={{fontSize: 16}}>{param.date}</Text>
                                            <TouchableOpacity onPress={this.toggleBody}><Image source={arrowImage}/></TouchableOpacity>
                                        </View>
                                        {this.state.showbody ? (<View><Text>{param.body}</Text></View>) : null}
                                    </View>
                                </View>
                            );
                        })
                        : null
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
    }
})