const request = require('request');

/******************************
GetSchedule 함수 설명
email, tripID에 해당하는 여행의 일정 반환
실패했을 때:
    404: 해당 사용자의 여행이 존재하지 않음
    503: 서버상 오류
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
                    resolve(body);
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


/*
Example code
GetSchedule("unme0101@naver.com", 19).then(function(data){
    console.log(data);
});

PutSchedule("unme0101@naver.com", 19, "2019-1-22", 'tour', 3).then(function(data){
    console.log(data);
});
*/