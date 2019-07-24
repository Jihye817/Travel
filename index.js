/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import Splash from './app/pages/Splash';
import Navigation from './app/pages/Navigation';
import './shim';

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {currentScreen: 'Splash'};
        setTimeout(()=> {
            this.setState({currentScreen: 'Loginpage'})
        }, 2000)
    }
    render(){
        const {currentScreen} = this.state
        let mainScreen = currentScreen === 'Splash' ? <Splash /> : <Navigation />
        return mainScreen
    }
}

AppRegistry.registerComponent('Travel', () => Index);