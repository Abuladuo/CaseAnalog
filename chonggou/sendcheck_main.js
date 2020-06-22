var request = require('request');
const db = require('../db/db')
const utils = require('../utils/utils')
const other = require("../utils/other")


let UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
exports.login = function(account,password){

        var username = account
        var password = password
        
        let datas = {
            userName: username,
            password: password,
            ip: ' ',
            browserVersion: 'chrome/78.0.3904.108',
            osVersion: 'Win7/32'
        };
		
        let opts = {
            url: 'http://10.19.179.6/eUrbanMIS/login/validpassword',
			timeout:10000,
            method: 'post',
            form: datas,
        };
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body)=>{
                try{
                	if(body.indexOf("html") < 0 ){
                		let reqcookie = response.headers['set-cookie']
						console.log(reqcookie)
                		let cookiejson = {
                			reqcookie:reqcookie,
                			isWrong:false
                		}
                		if (error) {reject(error)}
                			else{
                				resolve(cookiejson)
                			}
                	}else{
                		let cookiejson = {
                			isWrong:true,
                		}
                		resolve(cookiejson)
                	}
                }catch(e){
                	console.log(e)
                	let cookiejson = {
                		isWrong:true,
                	}
                	resolve(cookiejson)
                }
            })
        })
    }


exports.listdata = function(tasknumber,reqcookie){
    
        let isrecommend
        let timestamp = new Date().getTime();
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=30&currentPage=1&numPerPage=300&sortFieldID=-1&sortType=&_='+timestamp+'',
            method:'get',
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': UserAgent,
                Cookie:reqcookie,
            }  
        }
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body) =>{
				try{
					let xxx 
					let b3 = JSON.parse(body)
					var object = b3['resultInfo']['data']['listDataSet']['listData']
					var count = Object.keys(object).length;
					if (count == 0) {isrecommend = false}
					else{
					    for(let i = 0;i<count;i++){
					        if (b3['resultInfo']['data']['listDataSet']['listData'][i].task_num == tasknumber ) {
					            isrecommend = true
								xxx = i
					            break;
					        }

					    }
					}
					if (isrecommend == true) {
					    let b_rec = b3['resultInfo']['data']['listDataSet']['listData'][xxx].rec_id
					    let b_act = b3['resultInfo']['data']['listDataSet']['listData'][xxx].act_id
					    let tasknum = b3['resultInfo']['data']['listDataSet']['listData'][xxx].task_num
					    let act_property_id = b3['resultInfo']['data']['listDataSet']['listData'][xxx].act_property_id
						let check = b3['resultInfo']['data']['listDataSet']['listData'][xxx].check_msg_state_id
					    let jsondata = {
					        rec : b_rec,
					        act : b_act,
					        tasknum : tasknum,
					        act_property_id : act_property_id,
							check:check,
					        isrecommend:isrecommend,
							isWrong:false
					    }
					    if (error) {reject(error)}
					        else{resolve(jsondata)}
					}
					    else{
					        let jsondata1 = {
					            isrecommend:isrecommend,
								isWrong:false
					        }
					        if (error) {reject(error)}
					        else{resolve(jsondata1)}
					    }
				}catch(e){
					let jsondata1 = {
						isWrong:true
					}
					console.log(e)
					resolve(jsondata1)
				}
            })
        })
    }


exports.listmenu = function(rec,act,reqcookie){
        let b_rec = rec
        let b_act = act
        let timestamp = new Date().getTime();
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/menu/gethumantasklistmenu?recID='+b_rec+'&actID='+b_act+'&taskListID=2&_='+timestamp+'',
            method:'get',
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }
        }
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body)=>{
                if (error) {reject(error)}
                    else{resolve(body)}
            })
        })
    }


exports.formdata = function(rec,act,reqcookie){
        let b_rec = rec
        let b_act = act
        let timestamp = new Date().getTime();
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/form/formpreview/getformdata?formID=6&param=%7B%22recID%22%3A'+b_rec+'%2C%22actID%22%3A'+b_act+'%7D&_='+timestamp+'',
            method:'get',
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }  
        }
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body)=>{
				try{
					b3 = JSON.parse(body)
					b_rec2 = b3['resultInfo']['data']['formTableData'][17].rec_id
					patrolID = b3['resultInfo']['data']['formTableData'][17].patrol_id
					let jsondata = {
						rec : b_rec2,
						patrolID : patrolID,
						isWrong:false
					}
					if (error) {reject(error)}
						else{resolve(jsondata)}
				}catch(e){
					let jsondata1 = {
						isWrong:true
					}
					console.log(e)
					resolve(jsondata1)
				}
               
            })
        })
    }


exports.issendcheck = function(rec,reqcookie){
        let b_rec2 = rec
        let timestamp = new Date().getTime();
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/mis/inspect/issendcheck?recID='+b_rec2+'&_='+timestamp+'',
            method:'get',
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }  
        }
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body)=>{
                if (error) {reject(error)}
                    else{resolve(body)}
            })
        })
    }


exports.sendchecktask = async function(rec,patrolID2,reqcookie){
        let b_rec2 = rec
        let patrolID = patrolID2
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/mis/inspect/sendchecktask',
            method:'post',
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
            form:{
                recID:b_rec2,
                patrolID:patrolID,
                message:''
            }  
        }
		let result = await other.commonfinish(opts)
		return result
    //     return new Promise(function(resolve,reject){
    //         request(opts,(error,response,body)=>{
				// try{
				// 	let b3 = JSON.parse(body)
				// 	console.log("发送核查transit: "+b3)
				// 	let success = b3['resultInfo']['success']
				// 	let message = {
				// 		success:success,
				// 	}
				// 	if (error) {reject(error)}
				// 		else{resolve(message)}
				// }catch(e){
				// 	let message = {
				// 		success:false
				// 	}
				// 	console.log(e)
				// 	resolve(message)
				// }
				
    //         })
    //     })
    }
exports.routerQuote = function(tasknum){
	let opts = {
		//本地
		url:'http://172.19.48.181:8888/check/addQueue/'+tasknum,
		//服务器
		//url:'http://172.17.0.4:8888/check/addQueue/'+tasknum,
		method:'get',
		timeout:10000,
		headers:{
                'User-Agent':`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
            },
	}
	return new Promise(function(resolve,reject){
	    request(opts,(error,response,body)=>{
			try{
				let b3 = JSON.parse(body)
				if (error) {reject(error)}
					else{resolve(b3)}
			}catch(e){
				let message = {
					isWrong:true
				}
				resolve(isWrong)
			}
	    })
	})
}

exports.queryCaseStatus = function(tasknum){
	let opts = {
		//本地
		url:'http://172.19.48.181:8888/check/getStatus/'+tasknum, 
		//服务器
		//url:'http://172.17.0.4:8888/check/getStatus/'+tasknum,
		method:'get',
		timeout:10000,
		headers:{
                'User-Agent':`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
            },
	}
	return new Promise(function(resolve,reject){
	    request(opts,(error,response,body)=>{
			try{
				let b3 = JSON.parse(body)
				if (error) {reject(error)}
					else{resolve(b3)}
			}catch(e){
				
			}
			
	    })
	})
}