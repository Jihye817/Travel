import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';

const DOWN_ARROW = require('../assets/images/down_arrow.png');
const UP_ARROW = require('../assets/images/up_arrow.png');

export default class Schedule extends Component{
    state = {
        contents: [
            {
                date: '4/3',
                money: '$15000',
                body: 'this is component 1',
            },
            {
                date: '4/4',
                money: '$200000',
                body: 'this is component 2',
            },
        ]
    }
    render() {
        return(
            <View>
                <Text>Schedule</Text>
                <ScrollView>
                    {
                        this.state.contents ? this.state.contents.map((param, i) => {
                            return(
                                <DropDownItem
                                    style={{marginTop: 10, backgroundColor: '#ff0'}}
                                    key={i}
                                    contentVisible={false}
                                    invisibleImage={DOWN_ARROW}
                                    visibleImage={UP_ARROW}
                                    header={
                                        <View style={styles.header}>
                                            <Text>{param.date}</Text>
                                        </View>
                                    }
                                >
                                    <Text>{param.body}</Text>

                                </DropDownItem>
                            );
                        })
                        : null
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        paddingVertical: 10,
        borderWidth:1,
        borderColor: '#D2D2D2'
    }
})