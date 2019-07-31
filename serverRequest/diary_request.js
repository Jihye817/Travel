const request = require('request');

/******************************
GetDiaries 함수 설명
email, tripID에 해당하는 여행의 간단한 일기 목록(일기 번호, 제목, 날짜) 반환
실패했을 때:
    404: 해당 사용자의 여행이 존재하지 않음
    503: 서버상 오류
******************************/
export function GetDiaries(email, tripID) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/diary',
            method: "GET"
        }, function (error, response, body){
            if (error) {
                console.log(error);
                resolve(null);
            }
            else {
                console.log(response.statusCode, body);
                if (response.statusCode != 200) resolve(response.statusCode);
                else resolve(body);
            }
        });
    });
}

/******************************
GetSingleDiary 함수 설명
email, tripID에 해당하는 여행의 일기 (일기 번호, 제목, 날짜, 내용, 이미지 url) 반환
실패했을 때:
    404: 해당 사용자의 여행이 존재하지 않음
    503: 서버상 오류
******************************/
export function GetSingleDiary(email, tripID, diaryID) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/diary/' + diaryID,
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
                    body = JSON.parse(body);
                    var result = {
                        _id: body._id,
                        name: body.name,
                        date: body.date,
                        data: body.data
                    };
                    if (body.image != null) result.image = "http://106.10.53.87:8080/image/" + email + "/" + body.image;
                    resolve(result);
                }
            }
        });
    });
}

/******************************
PostDiary 함수 설명
email, tripID에 해당하는 여행의 일기를 DB에 저장
실패했을 때:
    503: 서버상 오류
일기일 때 사진도 올림: https://heartbeat.fritz.ai/how-to-upload-images-in-a-react-native-app-4cca03ded855 여기서 업로드 하는 법 참고함
photo에는 const { photo } = this.state;로 받아온 걸 넣으면 될 듯..? (리액트 네이티브 알못의 슬픔)
******************************/
export function PostDiary(email, tripID, name, date, data, photo = null) {
    return new Promise(function(resolve, reject) {
        if (photo != null) {
            request({
                url: "http://106.10.53.87:8080/image/upload",
                method: "POST",
                json: true,
                body: {
                    "user": email,
                    "image": photo
                }
            }, function (error2, response2, body2){
                if (error2) {
                    console.log(error2);
                    resolve(null);
                }
                else {
                    var filename = body2;
                    console.log('filename', filename);
                    request({
                        url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/diary',
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        json: true,
                        body: {
                            'name': name,
                            'date': date,
                            'data': data,
                            'image': filename
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
        else {
            request({
                url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/diary',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                json: true,
                body: {
                    'name': name,
                    'date': date,
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
        }
    });
}

/******************************
UpdateDiary 함수 설명
email, name: string
date: 날짜
tripID, diaryID: integer
data: json Object
photo: this.state 사진
email, tripID에 해당하는 여행의 일정/가계부/일기를 새롭게 수정
실패했을 때:
    503: 서버상 오류
    400: 사용자가 존재하지 않음
사진이 안 바뀌었으면 추가 안 해도 됨! data는 수정 안 되었어도 추가해야 함.
******************************/
export function UpdateDiary(email, tripID, diaryID, name, date, data, photo = null) {
    return new Promise(function(resolve, reject) {
        if (photo != null) {
            request({
                url: "http://106.10.53.87:8080/image/upload",
                method: "POST",
                body: {
                    "user": email,
                    "image": photo
                }
            }, function (error2, response2, body2){
                if (error2) {
                    console.log(error2);
                    resolve(null);
                }
                else {
                    var filename = body2;
                    console.log('filename', filename);
                    request({
                        url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/diary/' + diaryID,
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        json: true,
                        body: {
                            'name': name,
                            'date': date,
                            'data': data,
                            'image': filename
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
        else {
            request({
                url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/diary/' + diaryID,
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                json: true,
                body: {
                    'name': name,
                    'date': date,
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
        }
    });
}

/******************************
DeleteDiary 함수 설명
email, tripID, diaryID에 해당하는 일기를 지운다
성공했을 때: 202 반환
실패했을 때: 503(서버상 오류)
******************************/
export function DeleteSingleDiary(email, tripID, diaryID) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/trips/" + email + '/' + tripID + '/diary/' + diaryID,
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (error, response, body){
            console.log('diary delete response', response.statusCode);
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

/*
//Example code
var email = 'unme0101@naver.com';
var tripID = 20;
var diaryID = 9;

var name = "edit";
var date = "2019-07-30";
var data = {
    "content": "hello diary edited"
};
*/
/*
GetDiaries(email, tripID).then(function(data){
    console.log(data);
});

GetSingleDiary(email, tripID, diaryID).then(function(data){
    console.log(data);
});

PostDiary(email, tripID, name, date, data).then(function(data) {
    console.log(data);
});

UpdateDiary(email, tripID, diaryID, name, date, data).then(function(data) {
    console.log(data);
});

DeleteDiary(email, tripID, diaryID).then(function(data){
    console.log(data);
});
*/
