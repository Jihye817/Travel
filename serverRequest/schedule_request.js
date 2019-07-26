const request = require('request');

/******************************
GetSchedule 함수 설명
email, tripID에 해당하는 여행의 일정 반환
실패했을 때:
    404: 해당 사용자의 여행이 존재하지 않음
    503: 서버상 오류
******************************/
function GetSchedule(email, tripID) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/schedule',
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
PostSchedule 함수 설명
email, tripID에 해당하는 여행의 일정 만들기
실패했을 때:
    503: 서버상 오류
******************************/
function PostSchedule(email, tripID, data) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/schedule',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                'schedule': data
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
UpdateSchedule 함수 설명
email, tripID에 해당하는 여행의 일정을 새롭게 수정
실패했을 때:
    503: 서버상 오류
    400: 사용자가 존재하지 않음
******************************/
function UpdateSchedule(email, tripID, data) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/schedule',
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                'schedule': data
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

module.exports = [GetSchedule, PostSchedule, UpdateSchedule];

/*
//Example code

var email = 'unme0101@naver.com';
var tripID = 4;
var data = {
    "2019-01-01": {
        1: {type: 'tour', id: 1},
        2: {type: 'tour', id: 2},
        3: {type: 'eat', id: 3},
        4: {type: 'tour', id: 5}
    }
};
*/

/*
PostSchedule(email, tripID, data).then(function(result){
    console.log(result);
});

GetSchedule(email, tripID).then(function(data){
    console.log(data);
});

UpdateSchedule(email, tripID, data).then(function(result) {
    console.log(result);
});
*/
