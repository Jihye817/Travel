const request = require('request');

/******************************
GetInfoTypeArea 함수 설명
tour, eat, stay 타입에서 해당 지역의 장소들의 이름, 주소 반환
type: 'tour' / 'eat' / 'stay'
******************************/
export function GetInfoTypeArea(type, area) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/info/area/" + type + '/' + area,
            method: "GET"
        }, function (error, response, body){
            if (error) {
                console.log(error);
                resolve(null);
            }
            else {
                resolve(body);
            }
        });
    });
}

/******************************
GetFullInfoTypeID 함수 설명
tour, eat, stay 타입에서 해당 종류의 해당 id를 가진 장소의 이름, 정보, 주소, 사진 url 반환
******************************/
export function GetFullInfoTypeID(type, id) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/info/full/" + type + '/' + id,
            method: "GET"
        }, function (error, response, body){
            if (error) {
                console.log(error);
                resolve(null);
            }
            else {
                resolve(body);
            }
        });
    });
}

/******************************
GetInfoTypeID 함수 설명
tour, eat, stay 타입에서 해당 종류의 해당 id를 가진 장소의 이름, 주소 반환
******************************/
export function GetInfoTypeID(type, id) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/info/brief/" + type + '/' + id,
            method: "GET"
        }, function (error, response, body){
            if (error) {
                console.log(error);
                resolve(null);
            }
            else {
                resolve(body);
            }
        });
    });
}

//module.exports=[GetInfoTypeArea, GetFullInfoTypeID, GetInfoTypeID];

/*
Example Code
GetInfoTypeArea('eat', 7).then(function(data) {
    console.log(data);
});

GetFullInfoTypeID('eat', 100).then(function(data){
    console.log(data);
});

GetInfoTypeID('eat', 100).then(function(data){
    console.log(data);
});
*/
