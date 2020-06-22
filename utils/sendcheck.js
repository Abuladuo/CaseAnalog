var request = require('request');
const db = require('../db/db')
const utils = require('../utils/utils')
const sendcheck_main = require('../chonggou/sendcheck_main')
const accountrandom = require('./accountrandom')
const log4js = require('../log4')
const other = require('../utils/other')

    let UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`

    async function login(account,password,tasknumber){
        try{
            let cookiejson = await other.login(account,password)
            return cookiejson
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("sendcheck--------login------")
            console.log(err)
            console.log("----------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function listdata(tasknumber,reqcookie){
        try{
            let jsondata = await sendcheck_main.listdata(tasknumber,reqcookie)
            return jsondata
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("sendcheck--------listdata------")
            console.log(err)
            console.log("----------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function listmenu(rec,act,reqcookie,tasknumber){
        try{
            await sendcheck_main.listmenu(rec,act,reqcookie)
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("sendcheck--------listmenu------")
            console.log(err)
            console.log("----------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function formdata(rec,act,reqcookie,tasknumber){
        try{
            let jsondata = await sendcheck_main.formdata(rec,act,reqcookie)
            return jsondata
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("sendcheck--------formdata------")
            console.log(err)
            console.log("----------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function issendcheck(rec,reqcookie,tasknumber){
        try{
            await sendcheck_main.issendcheck(rec,reqcookie)
			
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("sendcheck--------issendcheck------")
            console.log(err)
            console.log("----------------------------")
            log4js.getLogger.info(err)
        }
    }


    async function sendchecktask(rec,patrolID,reqcookie,tasknumber){
        try{
            let message = await sendcheck_main.sendchecktask(rec,patrolID,reqcookie)
			return message
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("sendcheck--------sendchecktask------")
            console.log(err)
            console.log("----------------------------")
            log4js.getLogger.info(err)
        }
    }
	
	async function routerQuote(tasknumber){
	    try{
	        await sendcheck_main.routerQuote(tasknumber)
	    }
	    catch(err){
	        await accountrandom.serverWrong(tasknumber)
	        await db.updateunlockedall(tasknumber)
	        console.log("sendcheck--------routerQuote------")
	        console.log(err)
	        console.log("----------------------------")
	        log4js.getLogger.info(err)
	    }
	}
	
exports.sendcheck = async function(tasknum,account,password){
	let tasknumber = tasknum
    let cookiejson = await login(account,password,tasknumber);
	if(cookiejson.isWrong == false){
		let reqcookie  = cookiejson['reqcookie']
		let jsondata1 = await listdata(tasknumber,reqcookie);
		if(jsondata1.isWrong == false){
			let check = jsondata1['check']
			if(check == 2){
				await routerQuote(tasknumber);
				return true
			}else{
				let isrecommend = jsondata1['isrecommend']
				if (isrecommend == true) {
					let rec = jsondata1['rec']
					let act = jsondata1['act']
					await listmenu(rec,act,reqcookie,tasknumber);
					let jsondata2 = await formdata(rec,act,reqcookie,tasknumber);
					if(jsondata2.isWrong ==false){
						let rec2 = jsondata2['rec']
						let patrolID = jsondata2['patrolID']
						await issendcheck(rec,reqcookie,tasknumber);
						let message = await sendchecktask(rec,patrolID,reqcookie,tasknumber);
						if(message.success == true){
							await routerQuote(tasknumber);
							return true
						}else{
								console.log("transit失败")
								return false
							}
					}else{
							console.log("formdata失败")
							return false
						}
				}else{
						//await db.updateunlockedall(tasknumber)
						await db.updateischanged(tasknumber)
						console.log('核查信息发送步骤未找到对应任务号')
						return false
					}
			}
			
		}else{
				console.log("listdata失败")
				return false
			}
	}else{
			console.log("登录失败")
			return false
		}
    
    
}
