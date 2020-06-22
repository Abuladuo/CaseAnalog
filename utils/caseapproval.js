const log4js = require('../log4')
var request = require('request');
const db = require('../db/db')
const utils = require('../utils/utils')
const caseapproval_main = require('../chonggou/caseapproval_main')
const accountrandom = require('./accountrandom')
const other = require('../utils/other')
var UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
//let tasknumber = ctx.params.tasknumber






    async function login(tasknumber,account,password){
        try{
            let cookiejson2 = await other.login(account,password)
            return cookiejson2;
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("caseapproval-------------login------------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function gethumannavbaritem(tasknumber,reqcookie){
        try{
            await caseapproval_main.gethumannavbaritem(reqcookie)
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("caseapproval-------gethumannavbaritem-------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        } 
    }

    async function gethumantasklistdata(tasknumber,reqcookie){
        try{
            let jsondata = await caseapproval_main.gethumantasklistdata(tasknumber,reqcookie)
            return jsondata
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("caseapproval-------------listdata------------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        }
    }

    async   function gethumantasklistmenu(tasknum,rec,act,reqcookie){
        try{
            await caseapproval_main.gethumantasklistmenu(rec,act,reqcookie)
        }
        catch(err){
            await accountrandom.serverWrong(tasknum)
            await db.updateunlockedall(tasknum)
            console.log("caseapproval-------------listmenu------------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        }
    }
    async   function assign(tasknum,rec,act,act_property_id,reqcookie){
        try{
            await caseapproval_main.assign(tasknum,rec,act,act_property_id,reqcookie)
        }
        catch(err){
            await accountrandom.serverWrong(tasknum)
            await db.updateunlockedall(tasknum)
            console.log("caseapproval-------------assign------------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        }
    }


    async   function transtree(act,tasknum,reqcookie,departName){

        try{
            let jsondata = await caseapproval_main.transtree(act,tasknum,reqcookie,departName)
            return jsondata
        }
        catch(err){
            await accountrandom.serverWrong(tasknum)
            await db.updateunlockedall(tasknum)
            console.log("caseapproval-------------transtree------------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function transit(tasknum,act,numa,numb,reqcookie){
        try{
            let message = await caseapproval_main.transit(act,numa,numb,reqcookie)
			return message
        }
        catch(err){
            await db.updateunlockedall(tasknum)
            await accountrandom.serverWrong(tasknum)
            console.log("caseapproval-------------transit------------")
            console.log(err)
            console.log("------------------------------------------")
            log4js.getLogger.info(err)
        }
    }



exports.caseapproval = async function(tasknum123,account,password,departName){
	console.log("caseapproval ---- departName----")
	console.log(departName)
	let tasknumber = tasknum123
    let cookiejson = await login(tasknumber,account,password);
	if(cookiejson.isWrong == false){
		let reqcookie  = cookiejson['reqcookie']
		await gethumannavbaritem(tasknumber,reqcookie);
		let jsondata1 = await gethumantasklistdata(tasknumber,reqcookie);
		if(jsondata1.isWrong == false){
			let isrecommend = jsondata1['isrecommend']
			    if (isrecommend == true) {
			        let rec = jsondata1['rec']
			        let act = jsondata1['act']
			        let act_property_id = jsondata1['act_property_id']
			        let tasknum = jsondata1['tasknum']
			        await gethumantasklistmenu(tasknum,rec,act,reqcookie);
			        await assign(tasknum,rec,act,act_property_id,reqcookie);
			        let jsondata2 = await transtree(act,tasknum,reqcookie,departName);
					if(jsondata2.isWrong == false){
						let partID = jsondata2['numb']
						let numa = jsondata2['numa']
						let numb = jsondata2['numb']
						console.log("numa: "+numa)
						console.log("numb: "+numb)
						await db.updatepartID(partID,tasknumber)
						let message = await transit(tasknum,act,numa,numb,reqcookie);
						if(message.success == true){
							return true
						}
						else{
							console.log("transit失败")
							return false
						}
					}else{
						console.log("transtree失败")
						return false
					}
			    }
			        else{
			            console.log('案件流向批转步骤未找到对应任务号')
			            return false
			        }
		}else{
			console.log("gethumantasklistdata失败")
			return false
		}
	}else{
		console.log("登录失败")
		return false
	}
    
    
    

    
}