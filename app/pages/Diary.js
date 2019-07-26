import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Image} from 'react-native';
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
                            <TouchableOpacity style={{width: 50, padding:5, backgroundColor: '#FF7C5E', justifyContent:'center', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('DchangeScreen')}>
                                <Text style={{color:'#FFF'}}>수정</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
        )
    }

    popFunction = () => {
        this.setState({popupdata : false});
        this.props.navigation.navigate('DwriteScreen');
    }

    render() {

        const { navigate } = this.props.navigation;

        const TempOne =
            <View style={{backgroundColor: '#FFF', width: '80%', height: '95%', marginTop:5, borderWidth: 1, borderColor:'#FF7C5E', alignItems:'center'}}>
                <View style={{marginTop:10, justifyContent: 'center', alignItems:'center'}}>
                    <Text style={{fontSize: 22, color: '#A2A2A2'}}>TITLE</Text>
                </View>
                <View style={{alignItems:'center', width: '90%', height:'50%', justifyContent:'flex-start'}}>
                    <Image style={{height:'90%', width: '100%'}} resizeMode='center' source={require('../assets/images/photoexample.jpg')}></Image>
                </View>
                <View style={{height:'40%', width:'100%', alignItems:'center', justifyContent:'center'}}>
                    <View style={{ borderTopWidth: 1, borderTopColor: '#D2D2D2', width: '90%', height: '22%' }} />
                    <View style={{ borderTopWidth: 1, borderTopColor: '#D2D2D2', width: '90%', height: '22%' }} />
                    <View style={{ borderTopWidth: 1, borderTopColor: '#D2D2D2', width: '90%', height: '22%' }} />
                    <View style={{ borderTopWidth: 1, borderTopColor: '#D2D2D2', width: '90%', height: '22%' }} />
                </View>
            </View>

        const TempTwo =
        <View style={{backgroundColor: '#FFF', width: '80%', height: '95%', marginTop:5, borderWidth: 1, borderColor:'#FF7C5E', alignItems:'center'}}>
            <View style={{marginTop:10, justifyContent: 'center', alignItems:'center'}}>
                <Text style={{fontSize: 22, color: '#A2A2A2'}}>TITLE</Text>
            </View>
            <View style={{height:'90%', width:'100%', alignItems:'center', justifyContent:'center'}}>
                <View style={{ borderTopWidth: 1, borderTopColor: '#D2D2D2', width: '90%', height: '10%' }} />
                <View style={{ borderTopWidth: 1, borderTopColor: '#D2D2D2', width: '90%', height: '10%' }} />
                <View style={{ borderTopWidth: 1, borderTopColor: '#D2D2D2', width: '90%', height: '10%' }} />
                <View style={{ borderTopWidth: 1, borderTopColor: '#D2D2D2', width: '90%', height: '10%' }} />
                <View style={{ borderTopWidth: 1, borderTopColor: '#D2D2D2', width: '90%', height: '10%' }} />
                <View style={{ borderTopWidth: 1, borderTopColor: '#D2D2D2', width: '90%', height: '10%' }} />
                <View style={{ borderTopWidth: 1, borderTopColor: '#D2D2D2', width: '90%', height: '10%' }} />
                <View style={{ borderTopWidth: 1, borderTopColor: '#D2D2D2', width: '90%', height: '10%' }} />
            </View>
        </View>

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
                    <TouchableOpacity style = {styles.circlebtn} onPress={() => this.setState({popupdata:true})}>
                        <Text style={styles.btnplus}>+</Text>
                    </TouchableOpacity>
                </View>
                
                <Modal isVisible={this.state.popupdata}>
                    <View style={styles.popwrap}>
                        <View style={styles.popwhite}>
                            <View style={{alignItems:'flex-end', marginRight:5, marginTop:2,}}>
                                <TouchableOpacity onPress={() => this.setState({popupdata:false})}>
                                    <Text style={{fontSize:20}}>X</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{alignItems:'center', paddingBottom: 5,}}>
                                <Text style={styles.temptext}>Template</Text>
                            </View>

                            <View style={{width:'100%', height:'75%'}}>
                                <Swiper style={{ width: '100%', height: '100%', justifyContent:'center', alignItems: 'center' }}
                                    onIndexChanged={(index) => this.setState({ ishidden: index })}
                                    loop={false}
                                    showsPagination={false}
                                    showsButtons
                                    nextButton = {<Text style={{color:'#FF7C5E', fontSize:26}}> ▶</Text>}
                                    prevButton = {<Text style={{color:'#FF7C5E', fontSize:26}}>◀ </Text>}
                                >
                                    <View style={{ justifyContent:'center', alignItems: 'center' }}>
                                        {
                                            this.state.ishidden === 0 ? TempOne : null
                                        }
                                    </View>
                                    <View style={{ justifyContent:'center', alignItems: 'center' }}>
                                        {
                                            this.state.ishidden === 1 ? TempTwo : null
                                        }
                                    </View>
                                </Swiper>
                            </View>

                            <View style={styles.bottombtnwrap}>
                                <TouchableOpacity style={{ width: '80%', padding: 10, backgroundColor: '#FF7C5E', alignItems:'center' }} onPress={this.popFunction}>
                                    <Text style={{color: '#FFF', fontSize:16}}>작성</Text>
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

    btnwrap: {
        height:'15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnplus: {
        color: '#FFF',
        fontSize:30,
    },
    circlebtn:{
        backgroundColor: '#FF7C5E',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popwrap: {
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    },
    popwhite: {
        backgroundColor:'#FFF',
        width:'90%',
        height: '80%'
    },
    temptext:{
        fontSize: 24,
    },
    bottombtnwrap: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})