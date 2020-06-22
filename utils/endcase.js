const endcase_main = require('../chonggou/endcase_main')
const accountrandom = require('./accountrandom')
const log4js = require('../log4')
const db = require('../db/db')
const other = require('../utils/other')


    let UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`

    
    async function login(tasknumber){
        try{
            let cookiejson = await endcase_main.login()
            return cookiejson
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("endcase--------login----------")
            console.log(err)
            console.log("------------------------------")
           log4js.getLogger.info(err)
        }
    }

    async function listdata(tasknumber,reqcookie,tasknumber){
        try{
            let jsondata = await endcase_main.listdata(tasknumber,reqcookie)
            return jsondata
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("endcase--------listdata----------")
            console.log(err)
            console.log("------------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function listmenu(rec,act,reqcookie,tasknumber){
        try{
            await endcase_main.listmenu(rec,act,reqcookie)
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("endcase--------listmenu----------")
            console.log(err)
            console.log("------------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function formdata(rec,act,reqcookie,tasknumber){
        try{
            await endcase_main.formdata(rec,act,reqcookie)
        }
        catch(err){

            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("endcase--------formdata----------")
            console.log(err)
            console.log("------------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function assign(tasknum,rec,act,act_property_id,reqcookie,tasknumber){
        try{
            await endcase_main.assign(tasknum,rec,act,act_property_id,reqcookie)
        }
        catch(err){
            await accountrandom.serverWrong(tasknum)
            await db.updateunlockedall(tasknum)
            console.log("endcase--------assign----------")
            console.log(err)
            console.log("------------------------------")
            log4js.getLogger.info(err)
        }
    }

    async function finish(act,reqcookie,tasknumber){
        try{
            let message = await endcase_main.finish(act,reqcookie)
			return message 
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("endcase--------finish----------")
            console.log(err)
            console.log("------------------------------")
            log4js.getLogger.info(err)
        }
    }

exports.endcase = async function(tasknumber){
	let cookiejson = await login(tasknumber);
	if(cookiejson.isWrong == false){
		let reqcookie  = cookiejson['reqcookie']
		let jsondata1  = await listdata(tasknumber,reqcookie,tasknumber);
		if(jsondata1.isWrong == false){
			let isrecommend = jsondata1['isrecommend']
			if (isrecommend == true ) {
				let rec = jsondata1['rec']
				let act = jsondata1['act']
				let tasknum2 = jsondata1['tasknum']
				let act_property_id = jsondata1['act_property_id']
				await listmenu(rec,act,reqcookie,tasknum2);
				await formdata(rec,act,reqcookie,tasknum2);
				await assign(tasknum2,rec,act,act_property_id,reqcookie);
				let message = await finish(act,reqcookie);
				if(message.success == true){
					return true
				}
				else{
					console.log("finish失败")
					return false
				}
			}
				else{
					//ctx.body = '未找到对应任务号'
					console.log('慈溪结案步骤未找到对应任务号')
					//await db.updateunlockedall(tasknumber)
					await db.updateischanged(tasknumber)
					return false 
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
    