import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import MyTabNavigator from '../pages/Router';

export default class Triptab extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            id: '',
        }
    }
    componentDidMount(){
        const email = this.props.navigation.getParam('email', 'nothing sent');
        const id = this.props.navigation.getParam('id', 'nothing sent');
        this.setState({email: email, id: id}); //다음 페이지로 넘기기 위한 이메일 및 id 저장
    }
    
    //screenProps를 이용해 각각의 screen으로 data를 넘길 수 있다.
    render() {
        const AppIndex = createAppContainer(MyTabNavigator)

        return (
            <View style ={{flex:1,}}>
                <AppIndex screenProps={{email:this.state.email, id:this.state.id}}></AppIndex>
            </View>
        )
    }
}