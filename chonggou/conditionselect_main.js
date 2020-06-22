var request = require('request');
const db = require('../db/db')
const utils = require('../utils/utils')
const other = require("../utils/other")
    //let tank = 0
    let UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
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
        let timestamp = new Date().getTime()-1000;
        let opts = {
            url: 'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=29&currentPage=1&numPerPage=300&sortFieldID=-1&sortType=&onlyDataFlag=false&_=1584503996719',
            method:'get',
			timeout:10000,
            headers: {
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie: reqcookie, //这里是登陆后得到的cookie,(重点)
            }
        };
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body)=>{
                try{
					let xxx
                	let b1 = JSON.parse(body)
                	    var object = b1['resultInfo']['data']['listDataSet']['listData']
                	    var count = Object.keys(object).length;
                	    //console.log(count)
                	    if (count == 0) {isrecommend = false}
                	    else{
                	        for(var i = 0;i<count;i++){
                	            if (b1['resultInfo']['data']['listDataSet']['listData'][i].task_num == tasknumber ) {
                	                isrecommend = true
									xxx = i
                	                break;
                	            }
                	        }
                	    }
                	if (isrecommend == true ) {
                	    let secEventSrcID = ''
                	    let recTypeID = b1['resultInfo']['data']['listDataSet']['listData'][xxx].rec_type_id
                	    let eventTypeID = b1['resultInfo']['data']['listDataSet']['listData'][xxx].event_type_id
                	    let maxEventTypeID = b1['resultInfo']['data']['listDataSet']['listData'][xxx].max_event_type_id
                	    let maxEventTypeName = b1['resultInfo']['data']['listDataSet']['listData'][xxx].sub_type_name
                	    let eventDesc = b1['resultInfo']['data']['listDataSet']['listData'][xxx].event_desc
                	    let eventMarks = ''
                	    let newInstAdvise = ''
                	    let reviseOpinion = ''
                	    let address = b1['resultInfo']['data']['listDataSet']['listData'][xxx].address
                	    let districtname = b1['resultInfo']['data']['listDataSet']['listData'][xxx].district_name
                	    //districtID = utils.districtnametoID(districtname)
                	    let partCode = ''
                	    let coordinateX = b1['resultInfo']['data']['listDataSet']['listData'][xxx].coordinate_x
                	    let coordinateY = b1['resultInfo']['data']['listDataSet']['listData'][xxx].coordinate_y
                	    let patrolDealFlag = 0
                	    let reportAreaLimitID = 0
                	    let returnVisitFlag = 0
                	    let telReply = ''
                	    let callTypeID = 1
                	    let reporterName = ''
                	    let genderID = 1
                	    let homeAddress = ''
                	    let isPhoneReply = ''
                	    let eventSrcName = b1['resultInfo']['data']['listDataSet']['listData'][xxx].event_src_name
                	    let recTypeName = utils.recTypeIDtoname(recTypeID)
                	    let eventTypeName = utils.eventTypeIDtoname(eventTypeID)
                	    //eventSrcID = utils.eventsrc(eventSrcName)
                	    let mainTypeName = b1['resultInfo']['data']['listDataSet']['listData'][xxx].main_type_name
                	    let subTypeName = b1['resultInfo']['data']['listDataSet']['listData'][xxx].sub_type_name
                	    let streetName = b1['resultInfo']['data']['listDataSet']['listData'][xxx].street_name
                	    //streetID = utils.streetnametoID(streetName)
                	    let communityName = b1['resultInfo']['data']['listDataSet']['listData'][xxx].community_name
                	    let cellName = b1['resultInfo']['data']['listDataSet']['listData'][xxx].cell_name
                	    let mainTypeID = b1['resultInfo']['data']['listDataSet']['listData'][xxx].main_type_id
                	    let subTypeID = b1['resultInfo']['data']['listDataSet']['listData'][xxx].sub_type_id
                	    let b_rec = b1['resultInfo']['data']['listDataSet']['listData'][xxx].rec_id
                	    let b_act = b1['resultInfo']['data']['listDataSet']['listData'][xxx].act_id
                	    let b_tasknum = b1['resultInfo']['data']['listDataSet']['listData'][xxx].task_num
                	    let jsondata = {
                	        secEventSrcID:secEventSrcID,
                	        recTypeID:recTypeID,
                	        eventTypeID:eventTypeID,
                	        maxEventTypeID:maxEventTypeID,
                	        maxEventTypeName: maxEventTypeName,
                	        eventDesc: eventDesc,
                	        eventMarks: '',
                	        newInstAdvise: '',
                	        reviseOpinion: '',
                	        address: address,
                	        partCode: '',
                	        coordinateX: coordinateX,
                	        coordinateY: coordinateY,
                	        patrolDealFlag: 0,
                	        reportAreaLimitID: 0,
                	        returnVisitFlag: 0,
                	        telReply: '',
                	        callTypeID: 1,
                	        reporterName: '',
                	        genderID: 1,
                	        homeAddress: '',
                	        isPhoneReply: '',
                	        eventSrcName: eventSrcName,
                	        recTypeName: recTypeName,
                	        eventTypeName: eventTypeName,
                	        mainTypeName: mainTypeName,
                	        subTypeName: subTypeName,
                	        streetName: streetName,
                	        communityName: communityName,
                	        cellName: cellName,
                	        mainTypeID: mainTypeID,
                	        subTypeID: subTypeID,
                	        recID: b_rec,
                	        act_id: b_act,
                	        taskNum: tasknumber,
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
                	resolve(jsondata1)
                }
            })
        })
    }

exports.listmenu = function(rec,act,reqcookie){
        let b_rec = rec
        let b_act = act
        let timestamp = new Date().getTime()-1000;
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/menu/gethumantasklistmenu?recID='+b_rec+'&actID='+b_act+'&taskListID=29&_=1584503996750',
            method:'get',
			timeout:10000,
            headers:{
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
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

exports.assign = function(tasknum,rec,act,reqcookie){
        let b_tasknum = tasknum
        let b_rec = rec
        let b_act = act
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS//home/workflow/assign',
            method:'post',
            form:{
                taskListID: 29,
                taskListName: 'accept_newinstlist',
                tasknum: b_tasknum,
                recDispNum: '',
                menuName: 'editnewinst',
                recID: b_rec,
                actID: b_act
            },
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
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

exports.register = function(reqcookie){
        let timestamp = new Date().getTime()-1000; 
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS//home/mis/rec/getregisterform?sysID=19&_=1584503996719',
            method:'get',
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
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

exports.onselectchange = function(mainID,subID,newInstCondID,reqcookie){
        let mainTypeID = mainID
        let subTypeID = subID
       
        let formJsonString222      = {"formID":18,"formName":"城管立案编辑表单","componentList":[{"id":{"componentID":6,"formID":18},"componentType":"select","style":"","fontStyleID":null,"text":"大类数据源","x":98,"y":73,"width":150,"height":25,"showFlag":null,"lineType":"","lineColor":"","valueSeparator":"","seniorIDs":"4","juniorIDs":"23","listTypeID":10,"listContent":"SELECT type_id as ItemID,type_name as ItemValue from tc_dic_event_any_type  where type_level = 2  and senior_id=?","validateBitID":0,"validateInfo":"{}","editRightID":null,"componentInfo":"","displayOrder":null,"formFieldID":4337,"disabledID":null,"newDateID":null,"extraClass":"mis-rec-register-mainType","showRight":null,"extraIDs":null,"formField":null,"formFieldList":null,"fieldPhyName":"main_type_id","validateIDs":null,"fieldName":null,"componentID":6,"formID":18,"dataSetID":13,"fieldUniqueName":"main_type_id","options":null,"dataTypeID":1,"tableName":"to_rec","clientID":"eGovaComponent_18_6","value":""+mainTypeID+"","fontStyle":""}],"fieldPhyName":"sub_type_id"}
        let componentJsonString222 = {"id":{"componentID":23,"formID":18},"componentType":"select","style":"","fontStyleID":null,"text":"小类名称-数据源","x":402,"y":74,"width":150,"height":25,"showFlag":null,"lineType":"","lineColor":"","valueSeparator":"","seniorIDs":"6","juniorIDs":"27","listTypeID":10,"listContent":"SELECT type_id as ItemID,type_name as ItemValue from tc_dic_event_any_type  where type_level = 3 and senior_id=?","validateBitID":0,"validateInfo":"{}","editRightID":0,"componentInfo":"","displayOrder":null,"formFieldID":4382,"disabledID":null,"newDateID":null,"extraClass":"mis-rec-register-subType","showRight":null,"extraIDs":null,"formField":null,"formFieldList":null,"fieldPhyName":"sub_type_id","validateIDs":null,"fieldName":null,"componentID":23,"formID":18,"dataSetID":13,"fieldUniqueName":"sub_type_id","options":null,"dataTypeID":1,"tableName":"to_rec","clientID":"eGovaComponent_18_23","value":""+ subTypeID +"","fontStyle":""}
        formJsonString222 = JSON.stringify(formJsonString222)
        componentJsonString222 = JSON.stringify(componentJsonString222)
        let datas2 = {
            formJsonString: formJsonString222,
            componentJsonString: componentJsonString222
        };
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/form/formpreview/onselectchange',
            method:'post',
			timeout:10000,
            form: datas2 ,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie:reqcookie,  
            }
        }
        return new Promise(async function(resolve,reject){
            request(opts,(error,response,body)=>{
				try{
					let b3 = JSON.parse(body)
					let i = Number(newInstCondID)-1
					let newInstCondName = b3['resultInfo']['data']['juniorComponents'][0].options[i].itemValue
					let jsondata = {
						newInstCondID:newInstCondID,
						newInstCondName:newInstCondName,
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


exports.formdata = function (rec,act,reqcookie){
        let b_rec = rec
        let b_act = act
        
        let timestamp = new Date().getTime()-1000;
        let opts = {
            //url 所有需要的数据都有
            url:'http://10.19.179.6/eUrbanMIS/home/form/formpreview/getformdata?formID=18&param=%7B%22recID%22%3A'+b_rec+'%2C%22actID%22%3A'+b_act+'%7D&_='+timestamp+'',
            method:'get',
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie:reqcookie,
            }
        }
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body)=>{
				try{
					let b3 = JSON.parse(body)
					let cellID = b3['resultInfo']['data']['formTableData'][13].cell_id
					let patrolID = b3['resultInfo']['data']['formTableData'][13].patrol_id
					let communityID = b3['resultInfo']['data']['formTableData'][13].community_id
					let timeAreaID = b3['resultInfo']['data']['formTableData'][13].time_area_id
					let b_act2 = b3['resultInfo']['data']['formTableData'][14].act_id
					let districtID = b3['resultInfo']['data']['formTableData'][13].district_id
					let eventSrcID = b3['resultInfo']['data']['formTableData'][13].event_src_id
					let streetID = b3['resultInfo']['data']['formTableData'][13].street_id
					/*let pre_act_def_id = b3['resultInfo']['data']['formTableData'][14].pre_act_def_id   //325
					let pre_part_id = b3['resultInfo']['data']['formTableData'][14].pre_part_id //1205
					let pre_role_id = b3['resultInfo']['data']['formTableData'][14].pre_role_id //1205*/
					let jsondata = {
						cellID: cellID,
						patrolID: patrolID,
						communityID: communityID,
						timeAreaID: timeAreaID,
						b_act2: b_act2,
						districtID: districtID,
						eventSrcID: eventSrcID,
						streetID: streetID,
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
exports.getrecact = function(act,reqcookie){
        let b_act2 = act
        let timestamp = new Date().getTime()-1000;
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS//home/workflow/getrecact?actID='+b_act2+'&_='+timestamp+'',
            method:'get',
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
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

exports.saverec = function(jsondataall,reqcookie){
        /*let data4 = {
            eventSrcID:eventSrcID,
            secEventSrcID:secEventSrcID,
            recTypeID:recTypeID,
            eventTypeID:eventTypeID,
            mainTypeID:mainTypeID,
            subTypeID:subTypeID,
            maxEventTypeID:maxEventTypeID,
            maxEventTypeName:maxEventTypeName,
            eventDesc:eventDesc,
            eventMarks:eventMarks,
            newInstCondID:newInstCondID,
            newInstAdvise:newInstAdvise,
            reviseOpinion:reviseOpinion,
            timeAreaID:timeAreaID,
            address:address,
            districtID:districtID,
            streetID:streetID,
            communityID:communityID,
            cellID:cellID,
            patrolID:patrolID,
            partCode:partCode,
            coordinateX:coordinateX,
            coordinateY:coordinateY,
            patrolDealFlag:patrolDealFlag,
            reportAreaLimitID:reportAreaLimitID,
            returnVisitFlag:returnVisitFlag,
            telReply:telReply,
            callTypeID:callTypeID,
            reporterName:reporterName,
            genderID:genderID,
            homeAddress:homeAddress,
            isPhoneReply:isPhoneReply,
            eventSrcName:eventSrcName,
            recTypeName:recTypeName,
            eventTypeName:eventTypeName,
            mainTypeName:mainTypeName,
            subTypeName:subTypeName,
            newInstCondName:newInstCondName,
            streetName:streetName,
            communityName:communityName,
            cellName:cellName,
            recID:b_rec,
            taskNum:b_tasknum,
        }*/
        let data4 = jsondataall
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/mis/rec/saverec',
            method:'post',
			timeout:10000,
            form:data4,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
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

exports.translist = function (act2,reqcookie){
        let b_act2 = act2
        let timestamp = new Date().getTime()-1000
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/workflow/gettranslist?actID='+b_act2+'&itemType=transit&_='+timestamp+'',
            method:'get',
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie:reqcookie, 
            }
        }
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body)=>{
				try{
					let b3 = JSON.parse(body)
					let pre_act_def_id = b3['resultInfo']['data']['transList'][0].nextActDefID   //325
					let pre_part_id = b3['resultInfo']['data']['transList'][0].nextPartID //1205
					let jsondata = {
						pre_act_def_id:pre_act_def_id,
						pre_part_id:pre_part_id,
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

exports.transit = async function(act2,pre_act_def_id,pre_part_id,reqcookie){
        let b_act2 = act2       
        let timestamp = new Date().getTime()-1000
        let urla = 'http://10.19.179.6/eUrbanMIS/home/workflow/transit?actID='+b_act2+'&transInfo='+pre_act_def_id+'%2C'+pre_part_id+'%2C0%3B&_='+timestamp+''
        let opts = {
            url:urla,
            method:'get',
			timeout:10000,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie:reqcookie, 
            }
        }
		let result = await other.commonfinish(opts)
		return result
    //     return new Promise(function(resolve,reject){
    //         request(opts,(error,response,body)=>{
				// try{
				// 	let b3 = JSON.parse(body)
				// 	console.log("立案transit: "+b3)
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
				// 	console.log("catch.message: "+message)
				// 	console.log(e)
				// 	resolve(message)
				// }
               
    //         })
    //     })
    }
