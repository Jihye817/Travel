const request = require('request');

/******************************
findPwd 함수 설명
email과 name을 받아 해당 사용자의 이메일로 새 비밀번호를 보냄
성공했을 때 201 반환
실패했을 때:
    404: 해당 사용자를 찾을 수 없음
    503: 서버상 오류
******************************/
function findPwd(email, name) {
    return new Promise(function (resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/user/findpwd",
            method: "PUT",
            json: true,
            body: {
                "email": email,
                "name": name
            }
        }, function (error, response, body){
            if (error) {
                console.log(error);
                resolve(null);
            }
            else {
                console.log('response: ' + response.statusCode, body);
                resolve(response.statusCode);
            }
        });
    });
}

/******************************
changePwd 함수 설명
email, pwd, newPwd를 받아 이메일과 비밀번호가 일치할 경우 비밀번호를 바꿈
성공했을 때 201 반환
실패했을 때:
    400: 새 비밀번호가 입력되지 않았거나 범위를 초과함
    401: 비밀번호가 틀림
    503: 서버상 오류
******************************/
function changePwd(email, pwd, newPwd) {
    return new Promise(function (resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/user/changepwd",
            method: "PUT",
            json: true,
            body: {
                "email": email,
                "pwd": pwd,
                "newpwd": newPwd
            }
        }, function (error, response, body){
            if (error) {
                console.log(error);
                resolve(null);
            }
            else {
                console.log('response: ' + response.statusCode, body);
                resolve(response.statusCode);
            }
        });
    });
}

/******************************
changeName 함수 설명
email, pwd, newName를 받아 이메일과 비밀번호가 일치할 경우 이름을 바꿈
성공했을 때 201 반환
실패했을 때:
    400: 새 이름이 입력되지 않았거나 범위를 초과함
    401: 비밀번호가 틀림
    503: 서버상 오류
******************************/
function changeName(email, pwd, newName) {
    return new Promise(function (resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/user/changeName",
            method: "PUT",
            json: true,
            body: {
                "email": email,
                "pwd": pwd,
                "newName": newName
            }
        }, function (error, response, body){
            if (error) {
                console.log(error);
                resolve(null);
            }
            else {
                console.log('response: ' + response.statusCode, body);
                resolve(response.statusCode);
            }
        });
    });
}

/******************************
changeNickname 함수 설명
email, pwd, newNickname를 받아 이메일과 비밀번호가 일치할 경우 이름을 바꿈
성공했을 때 201 반환
실패했을 때:
    400: 새 별명이 입력되지 않았거나 범위를 초과함
    401: 비밀번호가 틀림
    503: 서버상 오류
******************************/
function changeNickname(email, pwd, newNickname) {
    return new Promise(function (resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/user/changeNickname",
            method: "PUT",
            json: true,
            body: {
                "email": email,
                "pwd": pwd,
                "newNickname": newNickname
            }
        }, function (error, response, body){
            if (error) {
                console.log(error);
                resolve(null);
            }
            else {
                console.log('response: ' + response.statusCode, body);
                resolve(response.statusCode);
            }
        });
    });
}
/*
var email = "unme0101@naver.com";
var pwd = "password";
var newPwd = "password";
var name = "혜영";
var nickname = "Judy";
*/
/*
findPwd(email, name).then(function(data){
    console.log(data);
});
*/
/*
changePwd(email, pwd, newPwd).then(function(data) {
    console.log(data);
});
*/
/*
changeName(email, pwd, name).then(function(data){
    console.log(data);
});
*/
/*
changeNickname(email, pwd, nickname).then(function(data){
    console.log(data);
});
*/
