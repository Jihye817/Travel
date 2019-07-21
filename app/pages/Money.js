import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Picker} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import common from '../styles/Style';
import Modal from 'react-native-modal';

export default class Money extends Component{
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
            <View style={common.greycontainer}>
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
                                                            <TouchableOpacity style={{justifyContent:'center', marginLeft: 5,}} onPress={() => this.setState({popupdata:true})}>
                                                                <Image style={{height:16, width: 16,}} resizeMode='contain' source={require('../assets/images/plus_circle.png')}/>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{flexDirection: 'row'}}>
                                                            <Text style={{marginRight:5,}}>{param.money}</Text>
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

                <View style={styles.sumwrap}>
                    <View style={styles.sumbox}>
                        <Text>총합</Text>
                        <Text>$215000</Text>
                    </View>
                </View>

                <Modal isVisible={this.state.popupdata}>
                    <View style={styles.popwrap}>
                        <View style={styles.popwhite}>
                            <View style={styles.poptop}>
                                <Text style={{fontSize:24,}}>내역 추가</Text>
                            </View>

                            <View style={styles.popinput}>
                                <TextInput style={styles.txtinput} placeholder='내역' placeholderTextColor='#D9D9D9' />
                            </View>
                            <View style={styles.popinput}>
                                <View style={styles.pickerwrap}>
                                    <Picker
                                        selectedValue={this.state.value}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ value: itemValue })}
                                        style={styles.pickerstyle}>
                                        <Picker.Item label="카테고리" value="0" />
                                        <Picker.Item label="숙소" value="1" />
                                        <Picker.Item label="음식" value="2" />
                                        <Picker.Item label="기타" value="3" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.popinput}>
                                <TextInput style={styles.txtinput} placeholder='금액' placeholderTextColor='#D9D9D9' />
                            </View>

                            <View style={styles.popbtn}>
                                <TouchableOpacity style={styles.btn} onPress={() => this.setState({popupdata:false})}>
                                    <Text style={{fontSize: 20, color:'#FFF'}}>저장</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => this.setState({popupdata:false})}>
                                    <Text style={{fontSize: 20, color:'#FFF'}}>취소</Text>
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
    listwrap: {
        width: '100%',
        height: '85%',
    },
    sumwrap: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '15%'
    },
    sumbox: {
        flexDirection: 'row',
        width: '80%',
        padding : 5,
        justifyContent: 'space-between',
        backgroundColor: '#E3E3E3',
        borderWidth: 1,
        borderColor: '#B5B5B5'
    },
    popwrap: {
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    },
    popwhite: {
        backgroundColor:'#FFF',
        width:'90%',
    },
    poptop: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    popinput: {
        marginTop: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtinput: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#D2D2D2',
        backgroundColor: '#FFF',
        height: 40,
    },
    pickerwrap: {
        width:'80%',
        borderWidth: 1,
        borderColor: '#D2D2D2',
        backgroundColor: '#FFF'

    },
    pickerstyle : {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D2D2D2'
    },
    popbtn: {
        marginVertical: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btn: {
        width: '30%',
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF7C5E'
    }
})