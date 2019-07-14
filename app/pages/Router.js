import React, {Component} from 'react';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import Schedule from '../pages/Schedule';
import Diary from '../pages/Diary';
import Money from '../pages/Money';

const MyTabNavigator = createMaterialTopTabNavigator({
    //탭 메뉴를 위한 네비게이터

    ScheduleScreen : {screen : Schedule,
        navigationOptions : {title:'스케쥴'}},
    DiaryScreen : {screen : Diary,
        navigationOptions : {title:'일기'}},
    MoneyScreen : {screen : Money,
        navigationOptions : {title:'가계부'}},
},
{
    tabBarOptions : {
        style: {backgroundColor: '#00f'}
    }
});

Navs = createAppContainer(MyTabNavigator);

export default Navs;