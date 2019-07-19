// login & signup
const request = require('request');

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

/******************************
login 함수 설명
이메일, 비밀번호, 이메일 인증 코드(디폴트 null)로 로그인 요청 보내기
로그인이 성공하면 해당 유저 데이터를 json 형태로 반환
로그인이 잘못되면 잘못된 이유를 반환
  - 503 Login failed. Please try again.: 서버상 이유로 로그인 요청이 제대로 처리되지 않음.
  - 404 Invalid user email: 이메일이 틀림.
  - 200 Wrong password! Please try again.: 비밀번호가 틀림
  - 200 Please enter verification code: 이메일 인증 코드 입력 필요
  - 200 Wrong verification code: 이메일 인증 코드가 다름
  - 200 Verification failure. Please try again: 서버상 문제로 인증 실패
http 요청에서 에러가 나면 에러를 출력하고 null 반환
******************************/
function login(email, pwd, verif=null) {
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
  - 503 Signup failed. Please try again.: 서버상 이유로 회원가입 요청이 제대로 처리되지 않음.
  - 400 Existing user!: 이미 해당 이메일의 사용자가 존재
http 요청에서 에러가 나면 에러를 출력하고 null 반환
******************************/
function signup(email, name, nickname, pwd) {
    // email, name, nickname, pwd 길이 확인
    if (email.length == 0 || email.length > 30 || !validateEmail(email)) return {'error': 'invalid email'};
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
                resolve(body);
            }
        });
    });
}

module.exports={ "Login": login, "Signup": signup };

/*
Example code for the function
var email = 'unme0101@naver.com';
var name = 'hye';
var nickname = 'H';
var pwd = 'password';

// 로그인, 회원가입 모두 요청이 완료될 때까지 기다리려면 함수().then(function(data){//처리할 내용})으로 써야 한다
login(email, pwd).then(function(data){
    console.log(JSON.stringify(data));
});

signup(email, name, nickname, pwd).then(function(data){
    console.log(data);
});
*/
