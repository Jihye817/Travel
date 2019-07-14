import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import MyTabNavigator from '../pages/Router';

export default class Triptab extends Component{
    render() {
        const AppIndex = createAppContainer(MyTabNavigator)

        return (
            <View style ={{flex:1,}}>
                <AppIndex></AppIndex>
            </View>
        )
    }
}