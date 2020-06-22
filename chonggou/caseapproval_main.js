var request = require('request');
const db = require('../db/db')
const utils = require('../utils/utils')
const other = require("../utils/other")



//哈喽
var UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
//let tasknumber = ctx.params.tasknumber

exports.login = function(account,password){
        //await gethumantasklistdata();
        //await gethumannavbaritem();
        let datas = {
            userName: account,
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
            request(opts,(error,response,body) =>{
                try{
                	if(body.indexOf("html") < 0 ){
                		let reqcookie = response.headers['set-cookie']
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

exports.gethumannavbaritem = function(reqcookie){
        let timestamp = new Date().getTime();
        let opts = {
            url: 'http://10.19.179.6/eUrbanMIS/home/nav/gethumannavbaritems?sysName=mis&_='+timestamp+'',
            //timeout:10000,
			method: 'get',
            headers:{
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }
        };
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body) =>{
                if (error) {reject(error)}
                    else{resolve(body)}
            })
        })
    }


exports.gethumantasklistdata = function(tasknumber,reqcookie){
        let isrecommend
		let xxx
        let timestamp = new Date().getTime();
        let opts = {
            url: 'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=2&currentPage=1&numPerPage=300&sortFieldID=-1&sortType=&_='+timestamp+'',
            timeout:10000,
			method: 'get',
            headers:{
                'User-Agent': UserAgent,
                Cookie:reqcookie,
            }
        };
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body) =>{
				try{
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
					    let typeid = b3['resultInfo']['data']['listDataSet']['listData'][xxx].sub_type_id
					    let jsondata = {
					        rec : b_rec,
					        act : b_act,
					        tasknum : tasknum,
					        act_property_id : act_property_id,
					        isrecommend:isrecommend,
					        typeid:typeid,
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
					//await db.isWrongupdate(tasknumber)
					resolve(jsondata1)
				}

            })
        })
    }

exports.gethumantasklistmenu = function(rec,act,reqcookie){
        let b_rec = rec
        let b_act = act
        let timestamp = new Date().getTime();
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/menu/gethumantasklistmenu?recID='+b_rec+'&actID='+b_act+'&taskListID=2&_='+timestamp+'',
            method:'get',
			//timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }  
        }
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body) =>{
                if (error) {reject(error)}
                    else{resolve(body)}
            })
        })
    }

/*exports.getformdata = function(rec,act,reqcookie){
        let b_rec = rec
        let b_act = act
        let timestamp = new Date().getTime();
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/form/formpreview/getformdata?formID=6&param=%7B%22recID%22%3A'+b_rec+'%2C%22actID%22%3A'+b_act+'%7D&_='+timestamp+'',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }  
        }
        return new Promise(function(reslove,reject){
            request(opts,(error,response,body) =>{
                if (error) {reject(error)}
                    else{reslove(body)}
            })
        })
    }*/
exports.assign = function(tasknum,rec,act,act_property_id,reqcookie){
        let b_rec = rec
        let b_act = act
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS//home/workflow/assign',
            method:'post',
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
            form:{
                taskListID: 2,
                taskListName: 'rec_mylist',
                tasknum:tasknum,
                recDispNum: '',
                menuName: 'transit',
                recID:b_rec,
                actID:b_act,
                actPropertyID:act_property_id,
            }
        }
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body) =>{
                if (error) {reject(error)}
                    else{resolve(body)}
            })
        })
    }

exports.transtree = function(act,tasknum,reqcookie,departName){
		console.log("caseapproval_main ---  transtree函数中的departName: "+departName)
        let b_act = act
        let timestamp = new Date().getTime();
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/workflow/gettranstreewithoutconfig?actID='+b_act+'&itemType=transit&_='+timestamp+'',
            method:'get',
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
        }
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body) =>{
				try{
					let jsondata = {}
					let b2 = body + ""
					let b3 = JSON.parse(body)
					//if (e) {rej(e)}
						//else{res(b3)}
					let arr = b3['resultInfo']['data']['transList']
					for(var i =0;i<arr.length;i++){
						if(arr[i].nextActDefName == "区直部门"){
							let nextPartName = arr[i].nextPartName
							let nextActDefID = arr[i].nextActDefID
							let nextPartID = arr[i].nextPartID
							if(nextPartName == departName){
								jsondata = {
									numa:nextActDefID,
									numb:nextPartID,
									isWrong:false
								}
								break;
							}else{
								jsondata= {
									isWrong:true
								}
							}
						}
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

exports.transit = async function(act,numa,numb,reqcookie){
        let b_act = act
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/workflow/transit',
            method:'post',
			timeout:10000,
            headers:{
                'User-Agent':UserAgent,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                Cookie:reqcookie,
            },
            form:{
                actID:b_act,
                taskListID:2,
                transInfo:''+numa+','+numb+',0;',
                opinion:'请专业部门根据情况，妥善处理该问题，并在处理后反馈指挥中心。。'
            }
        }
		let result = await other.commonfinish(opts)
		return result
    //     return new Promise(function(resolve,reject){
    //         request(opts,(error,response,body) =>{
				// try{
				// 	let b3 = JSON.parse(body)
				// 	console.log("案件流转transit: "+b3)
				// 	let success = b3['resultInfo']['success']
				// 	let message = {
				// 		success:success,
				// 	}
				// 	if (error) {reject(error)}
				// 		else{resolve(message)}
				// }catch(e){
				// 	let message = {
				// 		success:false,
				// 	}
				// 	console.log(e)
				// 	resolve(message)
				// }
    //         })
    //     })
    }
