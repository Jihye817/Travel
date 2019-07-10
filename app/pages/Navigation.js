import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Login from '../Login';
import Register from '../pages/Register';
import Found from '../pages/Found';

const MyStackNavigator = createStackNavigator({
    //로그인-회원가입-아이디패스워드찾기 페이지 이동 네비게이터
    LoginScreen : {screen : Login,
       // navigationOptions:{header:null},
    },
    RegisterScreen : {screen : Register,
    },
    FoundScreen : {screen : Found,
    },
},{initialRouteName : 'LoginScreen', headerMode : 'none'},
);

Nav = createAppContainer(MyStackNavigator);

export default Nav;