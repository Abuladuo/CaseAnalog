var request = require('request');
const db = require('../db/db')
const utils = require('../utils/utils')
const log4js = require('../log4')


exports.accountrandom = function(){
	//140700104 徐帅 去掉
	var arr = ['140700106','140700108','140700111']
	var i = Math.floor((Math.random()*arr.length));
	let user = {
		account:arr[i],
		password:'nbzhcg'
	}
	return user

}

exports.serverWrong = async function(tasknum){

try{
	let opts = {                 
		url:"https://sc.ftqq.com/SCU89029Ta946ddb18afa72460e446eed9d837dc15e69a2f1a9809.send?text=tasknum:"+tasknum+"was Wrong",
		method:'get',
		headers:{
        	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
	}
	return new Promise(function(resolve,reject){
            request(opts,(error,response,body)=>{
                if (error) {reject(error)}
                else{resolve(body)}
            })
        })
}
catch(error){
	console.log(error)
}
}


exports.serverRight = async function(){

try{
	let opts = {
		url:'https://sc.ftqq.com/SCU89029Ta946ddb18afa72460e446eed9d837dc15e69a2f1a9809.send?text=Right',
		method:'get',
		headers:{
        	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
	}
	return new Promise(function(resolve,reject){
            request(opts,(error,response,body)=>{
                if (error) {reject(error)}
                else{resolve(body)}
            })
        })
}
catch(error){
	console.log(error)
}
	
}