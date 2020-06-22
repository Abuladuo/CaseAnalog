var request = require('request');
const db = require('../db/db')
const other = require('../utils/other')
const utils = require('../utils/utils')
const accountrandom = require('../utils/accountrandom')
const sendcheck_main = require('../chonggou/sendcheck_main')
const timejudge = require("../utils/timejudge")
const md5 = require('js-md5');
exports.commonfinish = function(opts){
	console.log("commonfinish_opts: "+ opts)
	return new Promise(function(resolve,reject){
	    request(opts,(error,response,body)=>{
			try{
				console.log("transit: "+body)
				let b3 = JSON.parse(body)
				let success = b3['resultInfo']['success']
				let message = {
					success:success,
				}
				if (error) {reject(error)}
					else{resolve(message)}
			}catch(e){
				let message = {
					success:false
				}
				console.log(e)
				resolve(message)
			}
	    })
	})
}
exports.login = function(account,password){
    	//console.log(account,password)
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
            form: datas,
        };
        return new Promise(function(resolve,reject){
            request(opts,(error,response,body)=>{
                try{
                	if(body.indexOf("html")<0){
                		let reqcookie = response.headers['set-cookie']
                		let cookiejson = {
                			reqcookie:reqcookie,
                			isWrong:false
                		}
                		if (error) {rej(error)}
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

exports.listmenu = function(b_rec,b_act,reqcookie){
        let timestamp = new Date().getTime();
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/menu/gethumantasklistmenu?recID='+b_rec+'&actID='+b_act+'&taskListID=2&_='+timestamp+'',
            method:'get',
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
exports.lookforNingboStatus = async function(){
	let opts = {
		//服务器
		//url: "http://172.17.0.3:3000/detail/0/getAllNotFinishCasesFromNbzhcg",
		//本地
		url: "http://172.19.48.181:3000/detail/0/getAllNotFinishCasesFromNbzhcg",
	    method:'get',
		headers:{
		        'User-Agent':`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
		    },
	}
	return new Promise(function(reslove,reject){
	    request(opts,(error,response,body) =>{
			try{
				body = JSON.parse(body)
				if (error) {reject(error)}
					else{reslove(body)}
			}catch(e){
				console.log(e)
				reslove(false)
			}
	    })
	})
}
exports.getstep = function(arr){
	
	let step1 = "在区受理阶段登记案件"
	let step2 = "在区受理阶段批转区派遣"
	let step3 = "在区派遣阶段批转区直部门"
	let step4 = "在区直部门阶段批转区核查结案"
	let step5 = "在区核查结案阶段发送核查发送核查"
	let step6 = "在区核查结案阶段核查反馈"
	let step7 = "在区核查结案阶段批转市结案审核"
	let step8 = "在市结案审核阶段结案"
	let step9 = "在市不立案审核阶段作废"
	if(arr.indexOf(step8) !== -1){
		let a = '已结案'
		return a
	}else if(arr.indexOf(step7) !== -1){
		let a = '核查信息已通过'
		return a
	}else if(arr.indexOf(step6) !== -1){
		let a = '核查反馈已处理'
		return a
	}else if(arr.indexOf(step5) !== -1){
		let a = '已发送核查信息'
		return a
	}else if(arr.indexOf(step4) !== -1){
		let a = '部门回复已完成'
		return a
	}else if(arr.indexOf(step3) !== -1){
		let a = '已批转，等待部门回复'
		return a
	}else if(arr.indexOf(step2) !== -1){
		let a = '已选择立案'
		return a
	}else if(arr.indexOf(step1) !== -1){
		let a = '已加入数据库'
		return a
	}else if(arr.indexOf(step9) !== -1){
		let a = '作废'
		return a
		
	}
	else{
		let a = '其他状态，需要查询确认'
		return a
	}
}
exports.getnewstr = function(str,char){
	
	var num = str.lastIndexOf(char)
	var newstr = str.substring(num)
	return newstr
}
exports.updateNingboStatus = async function(tasknum){
	let a = await other.lookforNingboStatus(tasknum)
	if(a == false){
		return false
	}else{
		try{
			a = a + ""
			if(a.indexOf('case') < 0){
				return false
			}else{
				let arr = a['case'][0].processInfo
				let str = 2020
				let newarr = other.getnewstr(arr,str)
				let nbStatus =  other.getstep(newarr)
				let result = await db.updateNingboStatus(nbStatus,tasknum)
				return result
			}
		}
		catch(err){
			console.log(err)
			return false
		}
	}
}
exports.isnormalDec = async function(tasknum){
	
	let sitedata = await db.findbytasknum(tasknum)
	let site = sitedata.isnormal
	console.log("数据库中的isnormal: "+site)
	if(site == 2 ){
		site = 1
	}else if(site == 1){
		await accountrandom.serverWrong(tasknum)
		site = 0
	}else if(site == 3){
		site = 2
	}
	console.log("要更新的isnormal: " +site)
	await db.updateIsnormal(tasknum,site)
	
}
exports.getnewStatus = function(oldStatus){
	console.log(oldStatus)
	let newStatus
	if(oldStatus == "已选择立案" ){
		newStatus = "已批转，等待部门回复"
	}else if(oldStatus == "已批转，等待部门回复"){
		newStatus = "部门回复已完成"
	}else if(oldStatus == "部门回复已完成"){
		newStatus = "已发送核查信息"
	}else if(oldStatus == "已发送核查信息"){
		newStatus = "核查信息已通过，进入结案阶段"
	}else if(oldStatus == "核查信息已通过，进入结案阶段"){
		newStatus = "已结案"
	}else if(oldStatus == "已加入数据库"){
		newStatus = "已选择立案"
	}
	return newStatus
}

// 已加入数据库 => 已选择立案
exports.Recover_detail = async function(tasknum,newStatus){
	
	let mark = await db.Recover(tasknum,newStatus) 
	return mark 
	
}
// 已选择立案 => 已批转，等待部门回复
exports.Recover2_detail = async function(tasknum,newStatus){
	
	let data = await db.findbytasknum(tasknum)
	let departname = data.departName
	let typeid = data.typeid
	let newInstCondID = data.newInstCondID
	let result = await db.findpartIDbydepartName(departname)
	let partID = result.partID
	let departAccount = result.account
	await db.updatepartID(partID,tasknum)
	
	let jsondata =  await timejudge.timejudge2(typeid,newInstCondID)
	let endtimehalf = jsondata.endtimehalf
	let mark = await db.Recover2(tasknum,newStatus,endtimehalf,departAccount)
	return mark
	
}
// 已批转，等待部门回复 => 部门回复已完成
exports.Recover3_detail = async function(tasknum,newStatus){
	
	let mark = await db.Recover3(tasknum,newStatus) 
	return mark 
	
}
// 部门回复已完成 => 已发送核查信息
exports.Recover4_detail = async function(tasknum,newStatus){
	
	let  nowtime = Math.round(new Date() / 1000)
	nowtime = nowtime + 17*60
	let result = await sendcheck_main.routerQuote(tasknum)
	if(result.isWrong !== true ){
		let mark = await db.Recover4(tasknum,newStatus,nowtime)
		return mark 
	}else{
		return false
	} 
	// let mark = await db.Recover4(tasknum,newStatus,nowtime)
	// return mark 
}
// 已发送核查信息 => 核查信息已通过，进入结案阶段
exports.Recover5_detail = async function(tasknum,newStatus){
	
	let mark = await db.Recover5(tasknum,newStatus)
	return mark 
}
// 核查信息已通过，进入结案阶段 => 已结案
exports.Recover6_detail = async function(tasknum,newStatus){
	let  nowtime = Math.round(new Date() / 1000)
	let mark = await db.Recover6(tasknum,newStatus,nowtime)
	return mark 
}
exports.duanxin = async function(tasknum){
	
	let content   =tasknum + "案件出错"
    let ecName    = '慈溪市公共信息服务中心'
    let apId      = 'zzzxjs'
    let mima      = 'zzzx@123'
    //let mobiles   = 18069117734
	let mobiles   = 15757467436
    let sign      = 'mVbT46ltE'
    let addSerial ='106509712041871'
    let mac=md5(ecName+apId+mima+mobiles+content+sign+addSerial)
    let datas= {
            ecName: ecName,
            apId: apId,
            mobiles: mobiles,
            content: content,
            sign: sign,
            addSerial:addSerial,
            mac:mac
        };
	
    var str = JSON.stringify(datas);
    var b = new Buffer.from(str);
    var s = b.toString('base64','UTF-8');
            let opts = {
            url: 'http://112.35.1.155:1992/sms/norsubmit',
            method: 'post',
            headers:{
                'Content-Type': 'charset=UTF-8',
            },
            form: s,
        };
        return new Promise(function(reslove,rej){
            request(opts,(error,response,body) =>{
                //console.log(s)
                if (error) {rej(error)}
                    else{reslove(body)}
            })
        }) 
}