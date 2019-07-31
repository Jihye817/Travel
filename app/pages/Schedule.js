import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Picker, TextInput } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import common from '../styles/Style';
import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps';
import * as tripdataFunc from '../../serverRequest/tripdata_request';
import * as infodataFunc from '../../serverRequest/info_request';
import * as scheduledataFunc from '../../serverRequest/schedule_request';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDvIHlMNDs3IG6UO_6XbRy4PwkOPAXfaUg';

export default class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            id: '',
            area1: '',
            area2: '',
            area3: '',
            collapsed: false,
            popupdata: false,
            value: "0",
            tripData: [],
            tripDates: [],
            tripInfo: [],
            tripFull: [],
            lats: [],
            lons: [],
            originlat: '',
            originlon: '',
            destlat: '',
            destlon: '',
            tripDataData: [],
            tripDataData2: [],
            totCount: 10000,
            curCount: 0,
            render: false,
        }
    }

    componentDidMount() {
        const id = this.props.screenProps.id;
        const email = this.props.screenProps.email;
        const area1 = this.props.screenProps.area1;
        const area2 = this.props.screenProps.area2;
        const area3 = this.props.screenProps.area3;
        this.setState({ email: email, id: id, area1: area1, area2: area2, area3: area3 }); //다음 페이지로 넘기기 위한 이메일 저장

        //const type = 'schedule'
        this.getScheduleFunction(email, id);

        setTimeout(function () { //Start the timer
            this.setState({ render: true }) //After 1 second, set render to true
        }.bind(this), 2000)
    }

    getScheduleFunction(email, id) {
        //GetTripData에서 일정의 id 및 type을 읽어온다
        scheduledataFunc.GetSchedule(email, id).then(function (response) {
            console.log("this is scheduleget");
            return response;
        })
            .then((data) => {

                this.setState({ tripData: data });
                console.log('this is tripDATA', this.state.tripData);

                //tripData 안의 array를 따로 저장한다
                //this.setState({tripDataData : JSON.parse(this.state.tripData.data)}); 
                //console.log('this is tripDATADATA', this.state.tripDataData);

                //날짜별 일정 표시를 위해 날짜를 잘라낸다
                var x;
                var total = 0;
                for (x in this.state.tripData) {
                    this.setState({ tripDates: this.state.tripDates.concat([x]) })
                    this.state.tripDataData[x] = [];
                    this.state.tripDataData2[x] = [];
                    total = total + this.state.tripData[x].length;
                    console.log('check', this.state.tripData[x]);
                }
                this.state.totCount = total;
                console.log('total spots', this.state.totCount, this.state.curCount);
                //날짜별 일정의 내용을 가져온다
                this.state.tripDates.map((param, indexs) => {
                    console.log("param", param);
                    this.state.tripData[param] ? this.state.tripData[param].map((param2, index) => {
                        console.log("Schedule getting", param, param2.type, param2.id);
                        this.getInfoFunction(param2.type, param2.id, param);
                        this.getfullInfoFunction(param2.type, param2.id, param);
                    }) : null
                    console.log('after getschedule', this.state.tripDataData);
                })
            });
    }

    getInfoFunction(type, id, date) {
        console.log('datadata in info func', this.state.tripDataData);
        infodataFunc.GetInfoTypeID(type, id).then(function (response) {
            return JSON.parse(response);
        })
            .then((data) => {
                if (this.state.tripDataData[date] == undefined) {
                    this.state.tripDataData[date] = [];
                    this.state.tripDataData[date].push(data);
                }
                else this.state.tripDataData[date].push(data);

                console.log("this is getinfo func", this.state.tripDataData)
            })
    }

    getfullInfoFunction(type, id, date) {
        infodataFunc.GetFullInfoTypeID(type, id).then(function (respose) {
            return JSON.parse(respose);
        })
            .then((data) => {
                if (this.state.tripDataData2[date] == undefined) {
                    this.state.tripDataData2[date] = [];
                    this.state.tripDataData2[date].push(data);
                }
                else this.state.tripDataData2[date].push(data);
                this.state.curCount = this.state.curCount + 1;
                console.log('total spots', this.state.totCount, this.state.curCount);
                //console.log("This", this.state.tripDataData2[date]);
                //this.setState({tripFull: this.state.tripFull.concat([data])})
                //위도 경도를 null일때를 제외하여 각각 배열에 저장한다
                if(data.lat != undefined && data.lon != undefined){
                this.setState({lats: this.state.lats.concat([data.lon]), lons: this.state.lons.concat([data.lat])})}
                else{
                this.setState({lats: this.state.lats.concat([0]), lons: this.state.lons.concat([0])})}
            })
    }

    deleteSchduleFunction(email, tripID, date, index){
        scheduledataFunc.DeleteSchedule(email, tripID, date, index).then(function(response){
            return response;
        })
    }

    render() {
        let renderContainer = false //By default don't render anything
        if (this.state.render) { //If this.state.render == true, which is set to true by the timer.
            renderContainer = <View style={common.greycontainer}>
                <View style={common.greybar} />
                <ScrollView style={{ alignSelf: 'stretch' }}>
                    {
                        this.state.tripDates.map((param, index) => {
                            return (
                                <View style={styles.container}>
                                    <View style={styles.dropwrap}>
                                        <View style={styles.dropdown} key={index}>
                                            <Collapse style={{ width: '100%' }} key={index} isCollapsed={this.state.collapsed}>
                                                <CollapseHeader style={{ width: '100%' }}>
                                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text>{param}</Text>
                                                            <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 5, }} onPress={() => this.props.navigation.navigate('New_ScheduleScreen', { email: this.state.email, id: this.state.id, date: param, area1: this.state.area1, area2: this.state.area2, area3: this.state.area3, tripData: this.state.tripData })}>
                                                                <Image style={{ height: 16, width: 16, }} resizeMode='contain' source={require('../assets/images/plus_circle.png')} />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View>
                                                            <Text>▼</Text>
                                                        </View>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>
                                                    <View>
                                                        <View style={{ width: '100%', height: 150, backgroundColor: '#d2d2d2' }}>
                                                            <MapView style={{ width: '100%', height: 150, }}
                                                                initialRegion={{ longitude: 126.9770162, latitude: 37.5788408, latitudeDelta: 0.3, longitudeDelta: 0.3, }}>
                                                                {
                                                                    this.state.tripDataData2 ? this.state.tripDataData2[param].map((params, index) => {
                                                                        if (params.lat != undefined && params.lon != undefined) {
                                                                            console.log(params.lat, params.lon);
                                                                            console.log("lats", this.state.lats);
                                                                            return (<Marker coordinate={{ latitude: params.lon, longitude: params.lat }} title={params.name} description={params.addr} />);
                                                                        }
                                                                    }) : null
                                                                }
                                                                <MapViewDirections
                                                                    origin={{ latitude: this.state.originlat, longitude: this.state.originlon }}
                                                                    destination={{ latitude: this.state.destlat, longitude: this.state.destlon }}
                                                                    apikey={GOOGLE_MAPS_APIKEY}
                                                                    strokeWidth={3}
                                                                    strokeColor="#f09"
                                                                    mode="TRANSIT"
                                                                />
                                                            </MapView>
                                                        </View>
                                                        <View>
                                                            {
                                                                this.state.tripDataData2 ? this.state.tripDataData2[param].map((params, index) => {
                                                                    console.log("AAAAAAAA");
                                                                    console.log('total spots', this.state.totCount, this.state.curCount);
                                                                    return (
                                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                            <Text>{params.name}</Text>
                                                                            <View style={{ flexDirection: 'row', }}>
                                                                                <TouchableOpacity style={{ marginRight: 5, }}
                                                                                    onPress={() => this.setState({ originlat: this.state.lats[index], originlon: this.state.lons[index], destlat: this.state.lats[index + 1], destlon: this.state.lons[index + 1] })}>
                                                                                    <Text>길찾기</Text>
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity onPress={()=>{this.deleteSchduleFunction(this.state.email, this.state.id, param, index); this.getScheduleFunction(this.state.email, this.state.id);}}>
                                                                                    <Text>삭제</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </View>
                                                                    );
                                                                }) : console.log("BBBBBBBBBBB")
                                                            }
                                                        </View>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </View> //Add dom elements
        }
        return (
            renderContainer
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropwrap: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        width: '80%',
        marginTop: 15,
        padding: 5,
        borderColor: '#D2D2D2'
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})