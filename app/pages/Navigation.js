import React, {Component} from 'react';
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import Loginpage from '../Loginpage';
import Register from '../pages/Register';
import Found from '../pages/Found';
import Triplist_main from '../pages/Triplist_main';
import Newtrip from '../pages/Newtrip';
import Triptab from '../pages/Triptab';

const MyStackNavigator = createStackNavigator({
    //로그인-회원가입-아이디패스워드찾기 페이지 이동 네비게이터
    LoginScreen : {screen : Loginpage,
       // navigationOptions:{header:null},
    },
    RegisterScreen : {screen : Register,
    },
    FoundScreen : {screen : Found,
    },
},{initialRouteName : 'LoginScreen', headerMode : 'none'},
);

const MainStackNavigator = createStackNavigator({
    TriplistmainScreen : {screen : Triplist_main,
    },
    NewtripScreen : {screen : Newtrip,
    },
    TriptabScreen : {screen : Triptab,
    },
},{headerMode : 'none'});

const TotalNavigator = createSwitchNavigator({
    loginstack : {screen : MyStackNavigator},
    mainpagestack : {screen: MainStackNavigator},
},{initialRouteName : 'loginstack', headerMode : 'none'});

Nav = createAppContainer(TotalNavigator);

export default Nav;