import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Tab from '../pages/Tab';

const Tabbar = (props) => {
    const {navigationState, navigation, position} = props
    return (
        <View style ={{
            height: 80,
            backgroundColor: '#FF7C5E',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        }}>
        {navigationState.routes.map((route, index) => {
            const focusAnim = position.interpolate({
                inputRange: [index -1, index, index + 1],
                outputRange: [0, 1, 0]
            })
            return (
                <Tab
                    focusAnim={focusAnim}
                    title={route.routeName}
                    onPress={() => navigation.navigate(route.routeName)}
                />
            )
        })}
        </View>
    )
}

export default Tabbar