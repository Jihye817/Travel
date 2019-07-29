const request = require('request');

export function ValidateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

/******************************
ConvertDate 함수 설명
여행 정보를 가져올 때 날짜를 "2019-08-04T15:00:00.000Z" 형태로 가져오는데 이는 UTC 시간이라서 한국 기준으로 yyyy-MM-dd 형태로 만들어주는 함수
******************************/
export function ConvertDate(date) {
    var result = new Date(Date.parse(date));
    var year = result.getFullYear();
    var month = result.getMonth()+1;
    var day = result.getDate();
    var final = year + '-' + month + '-' + day;
    return final;
}

/******************************
GetTrips 함수 설명
email을 가진 사용자가 저장한 여행들의 array 반환
실패했을 때:
    404: 해당 사용자의 여행이 존재하지 않음
    503: 서버상 오류
******************************/
export function GetTrips(email) {
    return new Promise(function(resolve, reject) {
        if (!ValidateEmail(email)) {
            resolve('invalid email');
        }
        else {
            request({
                url: "http://106.10.53.87:8080/trips/" + email,
                method: "GET"
            }, function (error, response, body){
                if (error) {
                    console.log(error);
                    resolve(response.statusCode);
                }
                else {
                    resolve(body);
                }
            });
        }
    });
}
/******************************
GetSingleTrip 함수 설명
email과 tripID에 해당하는 여행에 관한 정보를 반환
실패했을 때:
    404: 해당 여행을 찾을 수 없음
    503: 서버상 오류
******************************/
export function GetSingleTrip(email, tripID) {
    return new Promise(function(resolve, reject) {
        if (!ValidateEmail(email)) {
            resolve('invalid email');
        }
        else {
            request({
                url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID,
                method: "GET"
            }, function (error, response, body){
                if (error) {
                    console.log(error);
                    resolve(null);
                }
                else {
                    console.log('response: ' + response.statusCode, body);
                    if (response.statusCode != 200) {
                        resolve(response.statusCode);
                    }
                    else resolve(body);
                }
            });
        }
    });
}

/******************************
PostTrips 함수 설명
email을 가진 사용자로 새로운 여행을 생성해 저장
날짜는 2019-01-01형태로 보내기
성공하면 statusCode 201 반환
실패했을 때:
    400: 이름 / 시작*끝 날짜 / 지역이 제대로 지정되지 않음
    503: 서버상 오류
******************************/
export function PostTrip(email, name, start, end, area1, area2=null, area3=null) {
    return new Promise(function(resolve, reject) {
        if (!ValidateEmail(email)) resolve('invalid email');
        else {
            request({
                url: "http://106.10.53.87:8080/trips/" + email,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                json: true,
                body: {
                    "name": name,
                    "start": start,
                    "end": end,
                    "area1": area1,
                    "area2": area2,
                    "area3": area3
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
        }
    });
}

/******************************
EditTrip 함수 설명
email, tripID를 이용해 여행 정보 수정
날짜는 2019-01-01형태로 보내기
성공하면 statusCode 201 반환
실패했을 때:
    404: 변한 내용이 없거나 이메일/tripID가 틀림
    503: 서버상 오류
******************************/
function EditTrip(email, tripID, newName, newStart, newEnd, newArea1, newArea2, newArea3){
    return new Promise(function(resolve, reject) {
        if (!ValidateEmail(email)) resolve('invalid email');
        else {
            request({
                url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID,
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                json: true,
                body: {
                    "name": newName,
                    "start": newStart,
                    "end": newEnd,
                    "area1": newArea1,
                    "area2": newArea2,
                    "area3": newArea3
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
        }
    });
}

module.exports=[ConvertDate, GetTrips, GetSingleTrip, PostTrip, EditTrip];


//Example code for the function
/*
var email = 'unme0101@naver.com';
var name = '이상해씨';
var start = '2019-01-01';
var end = '2019-12-31';
var area1 = 7;
var area2 = 6;
var area3 = 35;

EditTrip(email, 4, name, start, end, area1, area2, area3).then(function(data){
    console.log(data);
});

GetTrips(email).then(function(data) {
    console.log(JSON.parse(data));
})

PostTrip(email, name, start, end, area1).then(function(data){
    console.log(data);
});

GetSingleTrip(email, 1).then(function(data){
    console.log(data);
    console.log(typeof(JSON.parse(data).start));
});

ConvertDate("2018-12-31T15:00:00.000Z");

EditTrip(email, 4, name, start, end, area1, area2, area3).then(function(data){
    console.log(data);
});
*/
