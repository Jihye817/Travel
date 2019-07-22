import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Picker, TextInput, FlatList} from 'react-native';
import common from '../styles/Style';
import {CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';

export default class New_Schedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            value : "0",
            activeCheckbox: null,
            data: [{ month: '4', day: '3', key: '속초', id:0, checked: false }, { month: '4', day: '4', key: '양평', id:1, checked: false }, { month: '4', day: '4', key: '양평', id:2, checked: false }],
        }
    }

    /*componentWillMount() {
        let {data, checked} = this.state;
        let initialCheck = data.map(()=>false);
        this.setState({checked: initialCheck});
    }

    handleChange = (index) => {
        let checked = [this.state.checked];
        checked[index] = !checked[index];
        this.setState({checked});
    }

    handleChange = (index) => {
        this.setState({activeCheckbox: index});
    }*/

    handleChange =(itemID)=>{
        let data = this.state.data
        data[itemID].checked=!data[itemID].checked
        this.setState({data:data})
    }

    /*_renderItem =({item, index}) => {//Flatlist list 내용
        
        let {checked} = this.state;
        return(
            <TouchableOpacity style={styles.listitemwrap}>
                <View style={styles.checkwrap}>
                    <CheckBox
                        checked={checked[index]}
                        onPress={()=> this.handleChange(index)}
                    ></CheckBox>
                </View>
                <View style={styles.textwrap}>
                    <View><Text>제목</Text></View>
                    <View><Text>내용</Text></View>
                </View>
            </TouchableOpacity>
        )
    }*/

    render(){
        let {data, checked} = this.state;
        return(
            <View style={common.greycontainer}>
                <View style={styles.one}>
                    <Text style={styles.toptext}>일정 추가</Text>
                </View>
                <View style={styles.two}>
                    <View style={{height:'100%', width:'100%', alignItems: 'center'}}>
                        <View style={styles.firstwrap}>
                            <View style={styles.pickerwrap}>
                                <Picker
                                    selectedValue={this.state.value}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ value: itemValue })}
                                    style={styles.pickerstyle}>
                                    <Picker.Item label="분류" value="0" />
                                    <Picker.Item label="관광" value="1" />
                                    <Picker.Item label="음식" value="2" />
                                    <Picker.Item label="숙소" value="3" />
                                </Picker>
                            </View>

                            <TextInput style={styles.txtinput} placeholder='검색어를 입력하세요' placeholderTextColor='#D9D9D9' />

                            <TouchableOpacity style={styles.searchbtn}>
                                <Text style={styles.btntxt}>검색</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.scrollview}>
                            <FlatList
                                style={{width: '100%', height:'50%'}}
                                //renderItem={this._renderItem}
                                data={data}
                                extraData={this.state}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity style={styles.listitemwrap}>
                                        <View style={styles.checkwrap}>
                                            <CheckBox
                                                //onPress={() => this.handleChange(index)}
                                                //checked={checked[index]}
                                                //checked={this.state.activeCheckbox === index}
                                                checked={this.state.data[item.id].checked}
                                                onPress={()=>this.handleChange(item.id)}
                                            ></CheckBox>
                                        </View>
                                        <View style={styles.textwrap}>
                                            <View style={{}}><Text style={{fontSize: 18,}}>{item.month}</Text></View>
                                            <View><Text>내용</Text></View>
                                        </View>
                                    </TouchableOpacity>
                            }
                            />
                        </ScrollView>

                        <View style = {styles.btnwrap}>
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.btntxt}>저장</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.btntxt}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
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
        color:'#FFF',
    },
    two:{
        width: '100%',
        height: '90%',
        alignItems:'center',
    },
    firstwrap:{
        width:'90%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    pickerwrap: {
        width:'30%',
        borderWidth: 1,
        borderColor: '#FF7C5E',
        backgroundColor: '#FFF',
    },
    pickerstyle : {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FF7C5E'
    },
    txtinput: {
        width: '50%',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#B2B2B2',
        height: 40,
    },
    searchbtn: {
        width: '15%',
        height: 40,
        backgroundColor: '#FF7C5E',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    btnwrap: {
        width:'100%',
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btn: {
        width: '30%',
        padding: 10,
        backgroundColor: '#FF7C5E',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btntxt: {
        fontSize: 20,
        color: '#FFF',

    },
    scrollview: {
        marginTop: 15,
        width: '90%',
        backgroundColor: '#FFF',
        borderWidth:1,
        borderColor: '#B2B2B2'
    },
    listitemwrap: {
        width:'100%',
        flexDirection: 'row',
        justifyContent:'center',
        paddingVertical: 5,
        borderBottomWidth:1,
        borderBottomColor: '#D2D2D2'
    },
    checkwrap: {
        width: '15%',
        justifyContent:'center',
    },
    textwrap: {
        width:'85%',
        justifyContent:'center',
    }
})