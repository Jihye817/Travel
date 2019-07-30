const request = require('request');

/******************************
GetInfoTypeArea 함수 설명
tour, eat, stay 타입에서 해당 지역의 장소들의 이름, 주소 반환
type: 'tour' / 'eat' / 'stay'
******************************/
export function GetInfoTypeArea(type, area1, area2=null, area3=null) {
        var promise1 = new Promise(function(resolve, reject) {
            request({
                url: "http://106.10.53.87:8080/info/area/" + type + '/' + area1,
                method: "GET"
            }, function (error, response, body){
                if (error) {
                    console.log(error);
                    resolve(null);
                }
                else {
                    resolve(body);
                }
            })
        });
        var promise2 = new Promise(function(resolve, reject) {
            if (area2 != null) {
            request({
                url: "http://106.10.53.87:8080/info/area/" + type + '/' + area2,
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
            }
            else resolve([]);
        });
        var promise3 = new Promise(function(resolve, reject) {
            if (area3 != null) {
            request({
                url: "http://106.10.53.87:8080/info/area/" + type + '/' + area3,
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
            }
            else resolve([]);
        });

        return Promise.all([promise1, promise2, promise3], function(values) {
            var finalArr = (values[0].concat(values[1])).concat(values[2]);
            resolve(finalArr);
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


//Example Code
/*
GetInfoTypeArea('tour', 1).then(function(data) {
    console.log(data);
});

GetFullInfoTypeID('eat', 100).then(function(data){
    console.log(data);
});

GetInfoTypeID('eat', 100).then(function(data){
    console.log(data);
});
*/
