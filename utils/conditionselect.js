var request = require('request');
const db = require('../db/db')
const utils = require('../utils/utils')
const conditionselect_main = require('../chonggou/conditionselect_main')
const accountrandom = require('./accountrandom')
const log4js = require('../log4')
const other = require('../utils/other')
async function login2(account,password,tasknumber){
    try{
        let cookiejson = await other.login(account,password);
        return cookiejson
    }
    catch(err){
        await accountrandom.serverWrong(tasknumber)
        await db.updateunlockedall(tasknumber)
        console.log("conditionselect------------login-------------")
        console.log(err)
        console.log("----------------------------------------------")
        log4js.getLogger.info(err)
    }
}

async function listdata2(tasknumber,reqcookie){
    try{
        let jsondata = await conditionselect_main.listdata(tasknumber,reqcookie)
        return jsondata
    }
    catch(err){
        await accountrandom.serverWrong(tasknumber)
        await db.updateunlockedall(tasknumber)
        console.log("conditionselect------------listdata-------------")
        console.log(err)
        console.log("----------------------------------------------")
        log4js.getLogger.info(err)
    }
}

async function listmenu2(rec,act,tasknum,reqcookie){
    try{
        await conditionselect_main.listmenu(rec,act,reqcookie)
    }
    catch(err){
        await accountrandom.serverWrong(tasknum)
        await db.updateunlockedall(tasknum)
        console.log("conditionselect------------listmenu-------------")
        console.log(err)
        console.log("----------------------------------------------")
        log4js.getLogger.info(err)
    }
}

async function assign2(tasknum,rec,act,reqcookie){
    try{
        await conditionselect_main.assign(tasknum,rec,act,reqcookie)
    }
    catch(err){
        await accountrandom.serverWrong(tasknum)
        await db.updateunlockedall(tasknum)
        console.log("conditionselect------------assign-------------")
        console.log(err)
        console.log("----------------------------------------------")
        log4js.getLogger.info(err)
    }
}

async function register2(tasknum,reqcookie){
    try{
        await conditionselect_main.register(reqcookie)
    }
    catch(err){
        await accountrandom.serverWrong(tasknum)
        await db.updateunlockedall(tasknum)
        console.log("conditionselect------------register-------------")
        console.log(err)
        console.log("----------------------------------------------")
        log4js.getLogger.info(err)
    }
}

async function onselectchange2(mainID,subID,newInstCondID,tasknum,reqcookie){
    try{
        let jsondata = await conditionselect_main.onselectchange(mainID,subID,newInstCondID,reqcookie)
        return jsondata
    }
    catch(err){
        await accountrandom.serverWrong(tasknum)
        await db.updateunlockedall(tasknum)
       console.log("conditionselect------------onselectchange-------------")
        console.log(err)
        console.log("----------------------------------------------")
        log4js.getLogger.info(err)
    }
}

async function formdata2(rec,act,tasknum,reqcookie){
    try{
        let jsondata = await conditionselect_main.formdata(rec,act,reqcookie)
        return jsondata
    }
    catch(err){
        await accountrandom.serverWrong(tasknum)
        await db.updateunlockedall(tasknum)
        console.log("conditionselect------------formdata-------------")
        console.log(err)
        console.log("----------------------------------------------")
        log4js.getLogger.info(err)
    }
}

async function getrecact2(act2,tasknum,reqcookie){
    try{
        await conditionselect_main.getrecact(act2,reqcookie)
    }
    catch(err){
        await accountrandom.serverWrong(tasknum)
        await db.updateunlockedall(tasknum)
        console.log("conditionselect------------getrecact-------------")
        console.log(err)
        console.log("----------------------------------------------")
        log4js.getLogger.info(err)
    }
}

async function saverec2(jsondataall,tasknum,reqcookie){
    try{
        await conditionselect_main.saverec(jsondataall,reqcookie)
    }
    catch(err){
        await accountrandom.serverWrong(tasknum)
        await db.updateunlockedall(tasknum)
        console.log("conditionselect------------saverec-------------")
        console.log(err)
        console.log("----------------------------------------------")
        log4js.getLogger.info(err)
    }
}

async function translist2(act2,tasknum,reqcookie){
    try{
        let jsondata = await conditionselect_main.translist(act2,reqcookie)
        return jsondata
    }
    catch(err){
        await accountrandom.serverWrong(tasknum)
        await db.updateunlockedall(tasknum)
        console.log("conditionselect------------translist-------------")
        console.log(err)
        console.log("----------------------------------------------")
        log4js.getLogger.info(err)
    }
}

async function transit2(act2,pre_act_def_id,pre_part_id,tasknum,reqcookie){
    try{
        let message = await conditionselect_main.transit(act2,pre_act_def_id,pre_part_id,reqcookie)
		return message
	}
    catch(err){
        await accountrandom.serverWrong(tasknum)
        await db.updateunlockedall(tasknum)
        console.log("conditionselect------------transit-------------")
        console.log(err)
        console.log("----------------------------------------------")
        log4js.getLogger.info(err)
    }
}




exports.conditionselect = async function(tasknum2,account,password,newInstCondID){
	let tasknumber = tasknum2
	let cookiejson = await login2(account,password,tasknumber);
	if(cookiejson.isWrong == false){
		let reqcookie = cookiejson.reqcookie
		let jsondata1 = await listdata2(tasknumber,reqcookie); 
		if(jsondata1.isWrong == false){
			let isrecommend = jsondata1['isrecommend']
			//console.log(isrecommend)
			if (isrecommend == true) {
				let rec = jsondata1.recID
				let act = jsondata1['act_id']
				let tasknum = jsondata1['taskNum']
				await listmenu2(rec,act,tasknum,reqcookie);
				await assign2(tasknum,rec,act,reqcookie);
				await register2(tasknum,reqcookie);
				let mainID = jsondata1['mainTypeID']
				let subID  = jsondata1['subTypeID']
				let jsondata2 = await onselectchange2(mainID,subID,newInstCondID,tasknum,reqcookie);
				if(jsondata2.isWrong == false){
					console.log("-------------------------------------")
					console.log("案件编号: "+ tasknum)
					console.log("立案条件编号: "+jsondata2['newInstCondID'])
					console.log("立案条件内容: "+jsondata2['newInstCondName'])
					console.log("-------------------------------------")
					let jsondata3 = await formdata2(rec,act,tasknum,reqcookie);
					if(jsondata3.isWrong == false){
						let act2 = jsondata3['b_act2']
						let jsondataall = {}
						Object.assign(jsondataall,jsondata1,jsondata2,jsondata3)
						//console.log(jsondataall)
						delete jsondataall['b_act2']
						delete jsondataall['act_id']
						delete jsondataall['isrecommend']
						delete jsondataall['isWrong']
						await getrecact2(act2,tasknum,reqcookie);
						await saverec2(jsondataall,tasknum,reqcookie);
						let jsondata4 = await translist2(act2,tasknum,reqcookie);
						if(jsondata4.isWrong == false){
							let pre_act_def_id = jsondata4['pre_act_def_id']
							let pre_part_id = jsondata4['pre_part_id']
							let message = await transit2(act2,pre_act_def_id,pre_part_id,tasknum,reqcookie);
							console.log(message.success)
							if(message.success == true){
								return true
							}
							else{
								console.log("transit2失败")
								return false
							}
						}else{
							console.log("translist2出错")
							return false
						}
						
					}else{
							console.log("formdata2出错")
							return false
						}
					
				}else{
							console.log("onselectchange2出错")
							return false
						}
				
			}
			else{
				//await db.updateunlockedall(tasknumber)
				console.log('立案步骤未找到对应任务号')
				await db.updateischanged(tasknumber)
				//await db.updateisdel(tasknumber)
				return false
			}
		}else{
			
			console.log("listdata2出错")
			return false
		}
	}else{
		console.log("登录失败")
		return false
	}
    
		
	
    
    	
}