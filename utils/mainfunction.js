const timejudge = require('../utils/timejudge')
const conditionselect = require('../utils/conditionselect')
const caseapproval = require('../utils/caseapproval')
const partresponse = require('../utils/partresponse')
const sendcheck = require('../utils/sendcheck')
const checkover = require('../utils/checkover')
const endcase = require('../utils/endcase')
const db = require('../db/db')
const other = require('../utils/other')

exports.first = async function(tasknum,account,password,newInstCondID){
 	
    let firstmark = await conditionselect.conditionselect(tasknum,account,password,newInstCondID)
    if (firstmark == true) {
        let result = await db.updateone(tasknum)	
		if(result == true){
			console.log('任务号: '+ tasknum +'立案步骤完成') 
			console.log("first.Isnormal恢复")
			await db.IsnormalRecover(tasknum)
			return true
		}else{
			console.log('任务号: '+ tasknum +'立案步骤更新状态失败') 
			await other.isnormalDec(tasknum)
			return false 
		} 
    }else{
		console.log("first.Isnormal更新")
		await other.isnormalDec(tasknum)
		return false
	}
}


exports.second = async function(tasknum,account,password,typeid,newInstCondID,departName){
	console.log("mainfuncion ----- departName --- ")
	console.log(departName)
    let secondmark = await caseapproval.caseapproval(tasknum,account,password,departName)
    if(secondmark == true){     
        let jsondata =  await timejudge.timejudge2(typeid,newInstCondID)
        let endtime = jsondata.endtime
        let endtimehalf = jsondata.endtimehalf
        let result = await db.updatetwo(tasknum,endtime,endtimehalf)
		if(result == true){
			console.log('任务号: '+ tasknum +'案件流向批转步骤完成')
			console.log("second.Isnormal恢复")
			await db.IsnormalRecover(tasknum)
			return true
		}else{
			console.log('任务号: '+ tasknum +'案件流向批转步骤更新状态失败') 
			await other.isnormalDec(tasknum)
			return false 
		}
    }else{
		console.log("second.Isnormal更新")
		await other.isnormalDec(tasknum)
		return false
	}
}


exports.third = async function(tasknum,account,password){

    let thirdmark = await partresponse.partresponse(tasknum,account,password)
    if (thirdmark == true) {
        let result = await db.updatethree(tasknum)
		if(result == true){
			console.log('任务号: '+ tasknum +'部门回复步骤完成') 
			console.log("third.Isnormal恢复")
			await db.IsnormalRecover(tasknum)
			return true 
		}else{
			console.log('任务号: '+ tasknum +'部门回复步骤更新状态失败') 
			await other.isnormalDec(tasknum)
			return false 
		}
    }else{
		console.log("third.Isnormal更新")
		await other.isnormalDec(tasknum)
		return false
	}
}

exports.four = async function(tasknum,account,password,nowtime){

    let fourthmark = await sendcheck.sendcheck(tasknum,account,password) 
    if (fourthmark == true) {
        let result = await db.updatefour(tasknum,nowtime)
		if(result == true){
			console.log('任务号: '+ tasknum +'核查信息发送步骤完成') 
			console.log("four.Isnormal恢复")
			await db.IsnormalRecover(tasknum)
			return true
		}else{
			console.log('任务号: '+ tasknum +'核查信息发送步骤更新状态失败') 
			await other.isnormalDec(tasknum)
			return false 
		}
    }else{
		console.log("four.Isnormal更新")
		await other.isnormalDec(tasknum)
		return false
	}
}

exports.five = async function(tasknum,account,password){

    let fivemark = await checkover.checkover(tasknum,account,password)
    if (fivemark == true) {
        let result = await db.updatefive(tasknum)
		if(result == true){
			console.log('任务号: '+ tasknum +'核查完成批转结案步骤完成') 
			console.log("five.Isnormal恢复")
			await db.IsnormalRecover(tasknum)
			return true
		}else{
			console.log('任务号: '+ tasknum +'核查完成批转结案步骤更新状态失败') 
			await other.isnormalDec(tasknum)
			return false 
		}
    }else{
		console.log("five.Isnormal更新")
		await other.isnormalDec(tasknum)
		return false
	}
}

exports.six = async function(tasknum){
    let sixmark = await endcase.endcase(tasknum)
	let nowtime = Math.round(new Date() / 1000)
    if (sixmark == true) {
        let result = await db.updatesix(tasknum,nowtime)
		if(result == true){
			console.log('任务号: '+ tasknum +'慈溪结案步骤完成')
			 console.log("six.Isnormal恢复")
			await db.IsnormalRecover(tasknum)
			return true
		}else{
			console.log('任务号: '+ tasknum +'慈溪结案步骤更新状态失败') 
			await other.isnormalDec(tasknum)
			return false 
		}
    }else{
		console.log("six.Isnormal更新")
		await other.isnormalDec(tasknum)
		return false
	}
}


