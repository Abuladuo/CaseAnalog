var request = require('request');
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
            method: 'post',
			timeout:10000,
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
					    for(let  i = 0;i<count;i++){
					        
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
					    let jsondata = {
					        rec:b_rec,
					        act:b_act,
					        tasknum:tasknum,
					        act_property_id:act_property_id,
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
					        if (error) {rej(error)}
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

exports.listmenu = function(b_rec,b_act,reqcookie){
        let timestamp = new Date().getTime();
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/menu/gethumantasklistmenu?recID='+b_rec+'&actID='+b_act+'&taskListID=30&_='+timestamp+'',
            method:'get',
			timeout:10000,
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

exports.formdata = function(b_rec,b_act,reqcookie){
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
					let b3 = JSON.parse(body)
					let check = b3['resultInfo']['data']['formTableData'][17].check_msg_state_id
					//rqq = b3['resultInfo']['data']['formTableData'][17].rec_id
					if (error) {reject(error)}
						else{
							let jsondata1 = {
								isWrong:false,
								check:check
							}
							resolve(jsondata1)
						}
				}catch(error){
					let jsondata1 = {
						isWrong:true
					}
					console.log(error)
					resolve(jsondata1)
				}
                
            })
        })
    }

exports.assign = function(tasknum,b_rec,b_act,act_property_id,reqcookie){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS//home/workflow/assign',
            method:"post",
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
            form:{
                taskListID: '30',
                taskListName: 'accept_checklist',
                tasknum:tasknum,
                recDispNum:'',
                menuName: 'transit',
                recID:b_rec,
                actID:b_act,
                actPropertyID:act_property_id
            }
        }
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body) =>{
                if (error) {reject(error)}
                    else{resolve(body)}
            })
        })
    }

exports.transtree = function(b_act,reqcookie){
        let timestamp = new Date().getTime();
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/workflow/gettranstree?actID='+b_act+'&itemType=transit&_='+timestamp+'',
            method:'get',
			timeout:10000,
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

exports.transit = async function(b_act,reqcookie){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/workflow/transit',
            method:'post',
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
            form:{
                actID:b_act,
                taskListID: '30',
                transInfo:'313,6543,0;',
                opinion:'经采集员现场核实，问题已处理完毕，申请结案。。'
            }
        }
		let result = await other.commonfinish(opts)
		return result
    //     return new Promise(function(resolve,reject){
    //         request(opts,(error,response,body) =>{
				// try{
				// 	let b3 = JSON.parse(body)
				// 	console.log("核查完毕transit: "+b3)
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
