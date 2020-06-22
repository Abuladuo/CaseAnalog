var request = require('request');
const db = require('../db/db')
const utils = require('../utils/utils')
const checkover_main = require('../chonggou/checkover_main')
const accountrandom  = require('./accountrandom')
const log4js = require('../log4')
const other = require('../utils/other')

    let UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
    let a =  '核查反馈未处理'

    async function login(tasknumber,account,password){
        try{
            let cookiejson = await other.login(account,password)
            return cookiejson
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("checkover-------------login------------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function listdata(tasknumber,reqcookie){
        try{
            let jsondata = await checkover_main.listdata(tasknumber,reqcookie)
            return jsondata
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("checkover-------------listdata------------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function listmenu(tasknum2,rec,act,reqcookie){
        try{
            await checkover_main.listmenu(rec,act,reqcookie)
        }
        catch(err){
            await accountrandom.serverWrong(tasknum2)
            await db.updateunlockedall(tasknum2)
            console.log("checkover-------------listmenu------------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function formdata(tasknum2,rec,act,reqcookie){
        try{
            let checkmark = await checkover_main.formdata(rec,act,reqcookie)
            return checkmark
        }
        catch(err){
            await accountrandom.serverWrong(tasknum2)
            await db.updateunlockedall(tasknum2)
            console.log("checkover-------------formdata------------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function assign(tasknum,rec,act,act_property_id,reqcookie){
        try{
            await checkover_main.assign(tasknum,rec,act,act_property_id,reqcookie)
        }
        catch(err){
            await accountrandom.serverWrong(tasknum)
            await db.updateunlockedall(tasknum)
            console.log("checkover-------------assign------------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function transtree(tasknum2,act,reqcookie){
        try{
            await checkover_main.transtree(act,reqcookie)
        }
        catch(err){
            await accountrandom.serverWrong(tasknum2)
            await db.updateunlockedall(tasknum2)
            console.log("checkover-------------transtree------------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function transit(tasknum2,act,reqcookie){
        try{
            let message = await checkover_main.transit(act,reqcookie)
			return message
        }
        catch(err){
            await accountrandom.serverWrong(tasknum2)
            await db.updateunlockedall(tasknum2)
            console.log("checkover-------------transit------------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        }
    }


exports.checkover   = async function(tasknum,account,password){
	let tasknumber  = tasknum
	let cookiejson  = await login(tasknumber,account,password);
	if(cookiejson.isWrong == false){
		let reqcookie   = cookiejson['reqcookie']
		let jsondata1   = await listdata(tasknumber,reqcookie);
		if(jsondata1.isWrong == false){
			let isrecommend = jsondata1['isrecommend']
			if (isrecommend == true) {
				let rec = jsondata1['rec']
				let act = jsondata1['act']
				let tasknum2 = jsondata1['tasknum']
				let act_property_id = jsondata1['act_property_id']
				await listmenu(tasknum2,rec,act,reqcookie);
				let check = await formdata(tasknum2,rec,act,reqcookie);
				console.log("check: "+check)
				if(check.isWrong == false){
					//check = 1/2/3/4/5 表示 核查状态 例如1 = 未发送核查信息  5 = 核查信息已审核
					if (check.check == '5') { 
						await assign(tasknum2,rec,act,act_property_id,reqcookie);
						await transtree(tasknum2,act,reqcookie);
						let message = await transit(tasknum2,act,reqcookie);
						if(message.success == true){
							return true
						}
						else{
							console.log("transit失败")
							return false
						}
					}else{
							console.log('核查信息未通过')
							await db.updateunlockedall(tasknumber)
							return false 
						}
				}else{
						console.log('formdata出错')
						return false
					}
			}
				else{
					console.log('核查完成批转结案步骤未找到对应任务号')
					//await db.updateunlockedall(tasknumber)
					await db.updateischanged(tasknumber)
					return false  
				}
		}else{
			console.log('listdata出错')
			return false
		}
	}else{
		console.log("登录出错")
		return false
	}
    
    
}
   