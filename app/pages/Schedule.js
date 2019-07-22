import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Picker, TextInput} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import common from '../styles/Style';
import Modal from 'react-native-modal';

export default class Schedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed : false,
            popupdata : false,
            value : "0"
            }
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
        return(
            <View style = {common.greycontainer}>
                <View style={common.greybar} />
                <ScrollView style={{alignSelf: 'stretch'}}>
                    {
                        this.data.contents ? this.data.contents.map((param, index) => {
                            return(
                                <View style={styles.container}>
                                    <View style={styles.dropwrap}>
                                        <View style={styles.dropdown} key={index}>
                                            <Collapse style={{width:'100%'}} key={index} isCollapsed={this.state.collapsed}>
                                                <CollapseHeader style={{width:'100%'}}>
                                                <View style={{width: '100%', flexDirection:'row', justifyContent:'space-between'}}>
                                                        <View style={{flexDirection: 'row'}}>
                                                            <Text>{param.date}</Text>
                                                            <TouchableOpacity style={{justifyContent:'center', marginLeft: 5,}} onPress={() => this.props.navigation.navigate('New_ScheduleScreen')}>
                                                                <Image style={{height:16, width: 16,}} resizeMode='contain' source={require('../assets/images/plus_circle.png')}/>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View>
                                                            <Text>▼</Text>
                                                        </View>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>
                                                    <View><Text>{param.body}</Text></View>
                                                </CollapseBody>
                                            </Collapse>
                                        </View>
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
    },
})