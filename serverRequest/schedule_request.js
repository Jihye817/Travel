const request = require('request');

/******************************
GetSchedule 함수 설명
email, tripID에 해당하는 여행의 일정 반환
반환하는 값 형태: [날짜1: [{일정1}, {일정2}], 날짜2: [{일정1}, {일정2}]] ===> object
실패했을 때:
    404: 해당 사용자의 여행이 존재하지 않음
    503: 서버상 오류
    null: http 요청을 보낼 때 오류
******************************/
export function GetSchedule(email, tripID) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/data/schedule',
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
                    resolve(JSON.parse(JSON.parse(body).data));
                }
            }
        });
    });
}

/******************************
PutSchedule 함수 설명
email, tripID에 해당하는 여행의 일정의 date의 끝 일정으로 {"id": id, "type": type}을 추가한다.

-----Params example-----
    email: "unme0101@naver.com"
    date: "2019-1-4"
    type: "tour" || "stay" || "eat"
    id: 숫자
------------------------

반환 값
    201: 일정 추가 성공
    404: 해당 사용자의 여행이 존재하지 않음
    503: 서버상 오류
******************************/
export function PutSchedule(email, tripID, date, type, id) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/data/schedule',
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                'date': date,
                'id': id
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
};

/******************************
DeleteSchedule 함수 설명
email, tripID에 해당하는 여행의 일정에서 date의 index번째 일정을 지운다.
수정된 일정을 반환한다.
******************************/
export function DeleteSchedule(email, tripID, date, index) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/data/schedule/' + date + '/' + index,
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (error, response, body){
            if (error) {
                console.log(error);
            }
            request({
                url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/data/schedule',
                method: "GET"
            }, function (error2, response2, body2){
                if (error2) {
                    console.log(error2);
                    resolve(null);
                }
                else {
                    console.log(response2.statusCode, body2);
                    if (response2.statusCode != 200) resolve(response2.statusCode);
                    else {
                        resolve(JSON.parse(JSON.parse(body2).data));
                    }
                }
            });
        });
    });
}



//Example code
/*
GetSchedule("unme0101@naver.com", 20).then(function(data){
    console.log(data);
});

PutSchedule("unme0101@naver.com", 19, "2019-1-22", 'tour', 3).then(function(data){
    console.log(data);
});
*/