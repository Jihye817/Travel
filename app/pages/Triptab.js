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
            area1: '',
            area2: '',
            area3: '',
        }
    }
    componentDidMount(){
        const email = this.props.navigation.getParam('email', 'nothing sent');
        const id = this.props.navigation.getParam('id', 'nothing sent');
        const area1 = this.props.navigation.getParam('area1', 'nothing sent');
        const area2 = this.props.navigation.getParam('area2', 'nothing sent');
        const area3 = this.props.navigation.getParam('area3', 'nothing sent');
        
        this.setState({email: email, id: id, area1: area1, area2: area2, area3: area3}); //다음 페이지로 넘기기 위한 이메일 및 id 저장
    }
    
    //screenProps를 이용해 각각의 screen으로 data를 넘길 수 있다.
    render() {
        const AppIndex = createAppContainer(MyTabNavigator)

        return (
            <View style ={{flex:1,}}>
                <AppIndex screenProps={{email:this.state.email, id:this.state.id, area1:this.state.area1, area2:this.state.area2, area3:this.state.area3}}></AppIndex>
            </View>
        )
    }
}