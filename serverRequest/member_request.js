// login & signup
const request = require('request');

function ValidateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

/******************************
login 함수 설명
이메일, 비밀번호, 이메일 인증 코드(디폴트 null)로 로그인 요청 보내기
로그인이 성공하면 해당 유저 데이터를 json 형태로 반환
로그인이 잘못되면 잘못된 이유를 반환
  - 503 failure due to server errors: 서버상 이유로 로그인 요청이 제대로 처리되지 않음.
  - 404 invalid user email: 이메일이 틀림.
  - 400 invalid password: 비밀번호가 틀림.
  - 200 json - email, name, nickname: 로그인 성공
http 요청에서 에러가 나면 에러를 출력하고 null 반환
******************************/
function Login(email, pwd, verif=null) {
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/login",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                "email": email,
                "pwd": pwd,
                "verifCode": verif
            }
        }, function (error, response, body){
            if (error) {
                console.log(error);
                resolve(null);
            }
            else {
                console.log('response: ' + response.statusCode, body);
                resolve(body);
            }
        });
    });
}

/******************************
signup 함수 설명
이메일, 이름, 별명, 비밀번호, 비밀번호로 회원가입 요청 보내기
회원가입이 성공하면 statusCode 201 "Signup Successful! Please check for verification email!" 반환
회원가입이 잘못되면 잘못된 이유를 반환
  - 503 failure due to server errors: 서버상 이유로 회원가입 요청이 제대로 처리되지 않음.
  - 400 existing user: 이미 존재하는 사용자임.
  - 401 email verification needed: 이메일 인증이 필요함.
  - 201 signup successful: 회원가입 성공
  - 해당 상태 코드를 반환함.
http 요청에서 에러가 나면 에러를 출력하고 null 반환
******************************/
function Signup(email, name, nickname, pwd) {
    // email, name, nickname, pwd 길이 확인
    if (email.length == 0 || email.length > 30 || !ValidateEmail(email)) return {'error': 'invalid email'};
    if (name.length == 0 || name.length > 10) return {'error': 'name should be 1~10 characters'};
    if (nickname.length == 0 || nickname.length > 10) return {'error': 'nickname should be 1~10 characters'};
    if (pwd.length < 6 || pwd.length > 12) return {'error': 'pwd should be 6~12 characters'};

    // http 요청 보내기
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/signup",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                "email": email,
                "name": name,
                "nickname": nickname,
                "pwd": pwd
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
SendVerifEmail 함수 설명
이메일로 인증 코드를 보냄
  - 503 failure due to server errors: 서버상 이유로 요청이 제대로 처리되지 않음.
  - 400 existing user: 이미 해당 이메일로 인증을 완료한 사용자가 있음.
  - 201 verification email sent: 인증 메일 보내기에 성공함. (해당 이메일을 가진 사용자가 없거나 해당 이메일로 인증을 완료하지 않음)
http 요청에서 에러가 나면 에러를 출력하고 null 반환
******************************/
function SendVerifEmail(email) {
    // email 길이 확인
    if (email.length == 0 || email.length > 30 || !ValidateEmail(email)) return {'error': 'invalid email'};

    // http 요청 보내기
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/signup/verif",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                "email": email
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
VerifyEmail 함수 설명
이메일로 보낸 인증 코드를 확인함
  - 503 failure due to server errors: 서버상 이유로 요청이 제대로 처리되지 않음.
  - 400 wrong verification code: 인증 코드가 틀림.
  - 201 email verification completed: 이메일 인증에 성공함.
  - 해당 상태 코드를 반환함.
http 요청에서 에러가 나면 에러를 출력하고 null 반환
******************************/
function VerifyEmail(email, verifCode) {
    // email과 인증 코드 확인
    if (email.length == 0 || email.length > 30 || !ValidateEmail(email)) return {'error': 'invalid email'};
    if (verifCode == undefined || verifCode.length == 0) return {'error': 'no verification code'};

    // http 요청 보내기
    return new Promise(function(resolve, reject) {
        request({
            url: "http://106.10.53.87:8080/signup/verif",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                "email": email,
                "verifCode": verifCode
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

module.exports=[Login, Signup, SendVerifEmail, VerifyEmail];

/*
Example code for the function

var email = 'unme0101@naver.com';
var name = 'hye';
var nickname = 'H';
var pwd = 'password';

SendVerifEmail(email);
VerifyEmail(email, "4b4+xqT8");

Signup(email, name, nickname, pwd).then(function(data) {
    console.log(data);
});
Login(email, pwd).then(function(data) {
    console.log(data);
});
*/
