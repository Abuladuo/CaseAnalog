var request = require('request');
const db = require('../db/db')
const partresponse_main = require('../chonggou/partresponse_main')
const accountrandom = require('./accountrandom')
const log4js = require('../log4')
const other = require('../utils/other')

    let UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`


    async function login(tasknumber,account,password){
        try{
            let cookiejson = await other.login(account,password)
            return cookiejson
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("partresponse---------login--------")
            console.log(error)
            console.log("----------------------------------")
            log4js.getLogger.info(err)
        }
    }


    async function avbar(tasknumber,reqcookie){
        try{
            await partresponse_main.avbar(reqcookie)
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
			console.log("partresponse---------avbar--------")
            console.log(error)
            console.log("----------------------------------")
            log4js.getLogger.info(err)
        }
    }


    async function listdata(tasknumber,reqcookie){
        try{
            let jsondata = await partresponse_main.listdata(tasknumber,reqcookie)
            return jsondata
        }
        catch(err){
            await accountrandom.serverWrong(tasknumber)
            await db.updateunlockedall(tasknumber)
            console.log("partresponse---------listdata--------")
            console.log(error)
            console.log("----------------------------------")
            log4js.getLogger.info(err)
        }
    }


    async function listmenu(rec,act,tasknum,reqcookie){
        try{
            await partresponse_main.listmenu(rec,act,reqcookie)
        }
        catch(err){
            await accountrandom.serverWrong(tasknum)
            await db.updateunlockedall(tasknum)
            console.log("partresponse---------listmenu--------")
            console.log(error)
            console.log("----------------------------------")
            log4js.getLogger.info(err)
        }
    }



    async function assign(tasknum,rec,act,act_property_id,reqcookie){
        try{
            await partresponse_main.assign(tasknum,rec,act,act_property_id,reqcookie)
        }
        catch(err){
            await accountrandom.serverWrong(tasknum)
            await db.updateunlockedall(tasknum)
            console.log("partresponse---------assign--------")
            console.log(error)
            console.log("----------------------------------")
            log4js.getLogger.info(err)
        }
    }
    


    async function transtree(act,reqcookie,tasknum){
        try{
            let jsondata = await partresponse_main.transtree(act,reqcookie)
            return jsondata
        }
        catch(err){
            await accountrandom.serverWrong(tasknum)
            await db.updateunlockedall(tasknum)
            console.log("partresponse---------transtree--------")
            console.log(error)
            console.log("----------------------------------")
            log4js.getLogger.info(err)
        }
    }


    async function transit(act,nextActDefID,nextPartID,reqcookie,tasknum){
        try{
            let message = await partresponse_main.transit(act,nextActDefID,nextPartID,reqcookie)
			return message 
		}
        catch(err){
            await accountrandom.serverWrong(tasknum)
            await db.updateunlockedall(tasknum)
            console.log("partresponse---------transit--------")
            console.log(error)
            console.log("----------------------------------")
            log4js.getLogger.info(err)
        }
    }

exports.partresponse = async function(tasknum2,account,password){
	let tasknumber = tasknum2
	let cookiejson = await login(tasknumber,account,password);
	if(cookiejson.isWrong == false){
		let reqcookie  = cookiejson['reqcookie']
		await avbar(tasknumber,reqcookie);
		let jsondata1 =  await listdata(tasknumber,reqcookie);
		if(jsondata1.isWrong == false){
			let isrecommend = jsondata1['isrecommend']
			if (isrecommend == true) {
				let rec = jsondata1['rec']
				let act = jsondata1['act']
				let tasknum = jsondata1['tasknum']
				let act_property_id = jsondata1['act_property_id']
				await listmenu(rec,act,tasknum,reqcookie);
				await assign(tasknum,rec,act,act_property_id,reqcookie);
				let jsondata2 = await transtree(act,reqcookie);
				if(jsondata2.isWrong == false){
					let nextPartID   = jsondata2['nextPartID']
					let nextActDefID = jsondata2['nextActDefID']
					let message = await transit(act,nextActDefID,nextPartID,reqcookie,tasknum);
					if(message.success == true){
						return true
					}
					else{
						console.log("transit失败")
						return false
					}
				}else{
					console.log("transtree出错")
					return false
				}
			}
				else{
					console.log('未找到需要回复的任务号')
					//await db.updateunlockedall(tasknumber)
					await db.updateischanged(tasknumber)
					//db.updateisdel(tasknumber)
					return false
				}
		}else{
				console.log("listdata出错")
				return false
			}
	}else{
				console.log("登录出错")
				return false
			}
    
    
    
}


    
