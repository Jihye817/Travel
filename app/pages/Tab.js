import * as React from 'react'
import {Animated, TouchableOpacity} from 'react-native'

const Tab = ({focusAnim, title, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Animated.View
                style={{
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                    backgroundColor: focusAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['transparent', '#EE5A3C']
                    })
                }}
            >
            <Animated.Text
                style = {{
                    fontSize: 18,
                    color: focusAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#FFF', '#FFF']
                    })
                }}
            >{title}</Animated.Text>
            </Animated.View>
        </TouchableOpacity>
    )
}

export default Tab