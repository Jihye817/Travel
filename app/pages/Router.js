import React, {Component} from 'react';
import {createMaterialTopTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import Schedule from '../pages/Schedule';
import Diary from '../pages/Diary';
import Money from '../pages/Money';
import Tabbar from '../pages/Tabbar';
import Dwrite from '../pages/Dwrite';
import New_Schedule from '../pages/New_Schedule';
import Dchange from '../pages/Dchange';

const MyTabNavigator = createMaterialTopTabNavigator({
    //탭 메뉴를 위한 네비게이터

    ScheduleScreen : {screen : Schedule,
        navigationOptions : {title: '일정', tabBarLabel: '일정'}},
    DiaryScreen : {screen : Diary,
        navigationOptions : {title: '일기'}},
},
{
    tabBarComponent : Tabbar,
});

const DiaryStackNavigator = createStackNavigator({
    DwriteScreen : {screen : Dwrite,
    },
    DchangeScreen : {screen : Dchange,
    }
},{headerMode : 'none'});

const ScheduleStackNavigator = createStackNavigator({
    New_ScheduleScreen : {screen: New_Schedule,
    },
},{headerMode : 'none'});

const TotalStackNavigator = createStackNavigator({
    Tabstack : {screen : MyTabNavigator},
    Diarystack : {screen: DiaryStackNavigator},
    Schedulestack : {screen: ScheduleStackNavigator},
},{initialRouteName : 'Tabstack', headerMode : 'none'});

Navs = createAppContainer(TotalStackNavigator);

export default Navs;