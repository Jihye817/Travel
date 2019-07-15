import React, {Component} from 'react';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import Schedule from '../pages/Schedule';
import Diary from '../pages/Diary';
import Money from '../pages/Money';
import Tabbar from '../pages/Tabbar';

const MyTabNavigator = createMaterialTopTabNavigator({
    //탭 메뉴를 위한 네비게이터

    ScheduleScreen : {screen : Schedule,
        navigationOptions : {title: '일정', tabBarLabel: '일정'}},
    DiaryScreen : {screen : Diary,
        navigationOptions : {title: '일기'}},
    MoneyScreen : {screen : Money,
        navigationOptions : {title: '가계부'}},
},
{
    tabBarComponent : Tabbar,
});

Navs = createAppContainer(MyTabNavigator);

export default Navs;