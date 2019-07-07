/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import Splash from './app/pages/Splash';
import Login from './app/Login';

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {currentScreen: 'Splash'};
        setTimeout(()=> {
            this.setState({currentScreen:'Login'})
        }, 2000)
    }
    render(){
        const {currentScreen} = this.state
        let mainScreen = currentScreen === 'Splash' ? <Splash /> : <Login />
        return mainScreen
    }
}

AppRegistry.registerComponent('Travel', () => Index);

/*

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import Splash from './Splash';
import App from './App';
import {name as appName} from './app.json';

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {currentScreen: 'Splash'};
        setTimeout(()=> {
            this.setState({currentScreen:'Login'})
        }, 2000)
    }
    render(){ //splash 화면을 위한 코드. 현재 screen을 확인하여 splash를 띄운다
        const {currentScreen} = this.state
        let mainScreen = currentScreen === 'Splash' ? <Splash /> : <App />
        return mainScreen
    }
}
AppRegistry.registerComponent(appName, () => Index);
 */