const request = require('request');

/******************************
GetTripData 함수 설명
email, tripID에 해당하는 여행의 type(schedule / expense) 반환
type: 'schedule' / 'expense'
실패했을 때:
    404: 해당 사용자의 여행이 존재하지 않음
    503: 서버상 오류
******************************/
export function GetTripData(email, tripID, type) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/data/' + type,
            method: "GET"
        }, function (error, response, body){
            if (error) {
                console.log(error);
                resolve(null);
            }
            else {
                console.log(response.statusCode, body);
                if (response.statusCode != 200) resolve(response.statusCode);
                else {
                    resolve(body);
                }
            }
        });
    });
}

/******************************
PostTripData 함수 설명
email, tripID에 해당하는 여행의 일정/가계부를 DB에 저장
type: 'schedule' / 'expense'
실패했을 때:
    503: 서버상 오류
******************************/
export function PostTripData(email, tripID, type, data) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/data/' + type,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                'data': data
            }
        }, function (error, response, body){
            if (error) {
                console.log(error);
                resolve(null);
            }
            else {
                console.log(response.statusCode, body);
                resolve(response.statusCode);
            }
        });
    });
}

/******************************
UpdateTripData 함수 설명
email, tripID에 해당하는 여행의 일정/가계부 수정한 결과를 데베에 저장
바뀌지 않은 부분도 모두 넣어줘야 함
실패했을 때:
    503: 서버상 오류
    400: 사용자가 존재하지 않음
******************************/
export function UpdateTripData(email, tripID, type, data) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/data/' + type,
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                'data': data
            }
        }, function (error, response, body){
            if (error) {
                console.log(error);
                resolve(null);
            }
            else {
                console.log(response.statusCode, body);
                resolve(response.statusCode);
            }
        });
    });
}

//module.exports = [GetTripData, PostTripData, UpdateTripData];


//Example code

/*
var email = 'unme0101@naver.com';
var tripID = 4;
var type = 'schedule'   // diary, expense도 됨

var data = {
    "2019-01-01": [
        {type: 'tour', id: 1},
        {type: 'tour', id: 2},
        {type: 'eat', id: 3},
        {type: 'tour', id: 5}
    ]
};
*/

/*
PostTripData(email, tripID, type, data).then(function(result){
    console.log(result);
});

GetTripData(email, tripID, type).then(function(data){
    console.log(data);
});

UpdateTripData(email, tripID, type, data).then(function(result) {
    console.log(result);
});
*/
