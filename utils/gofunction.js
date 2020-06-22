var db = require('../db/db')
var schedule = require('node-schedule');
const mainfunction = require('../utils/mainfunction')



exports.gopartresponse = function(){
	schedule.scheduleJob('0,8,10,18,20,28,30,38,40,48,50 * * * * *',async function(){
	var nowtime = Math.round(new Date() / 1000)
	await db.isWrongupdate(nowtime)
	let todayzero = new Date(new Date().toLocaleDateString()).getTime()/1000
	let starttime = todayzero + 8*3600 -1+30*60
	let today12 = todayzero + 12*3600 -1
	let today14 = todayzero + 14*3600 -1
	let endtime1 = todayzero + 16*3600 + 10*60 -1
	let endtime2 = todayzero + 17*3600 - 15*60
	console.log("---------gopartresponse--------------")
	if(nowtime > starttime && nowtime < endtime1){
		console.log("正常时间")
		let datathree = await db.findthreeUsual(nowtime)
			if (datathree !==null) {
				console.log(nowtime)
            	let tasknum = datathree.tasknum
           	 	let user_account = datathree.account
            	let user_password = datathree.password
           	 	console.log("查找到的需要回复的任务号:" + tasknum)
           	 	let result = await db.updatethreelocked(tasknum)
				//案件加锁------------------------
					if(result == true){
						var partIDdata = await db.findpartID(tasknum)
						if(partIDdata !== null){
							var partID = partIDdata.partID
							console.log("对应的partID:"+partID)
							var dataaccount = await db.findaccount(partID)
							var acc_account = dataaccount.account
							var acc_password = dataaccount.password
							console.log("账号:"+acc_account , " 密码"+acc_password)
							await mainfunction.third(tasknum,acc_account,acc_password) 
						} 
						//案件步骤解锁-----------------
						await db.updateunlockedthree(tasknum)
					}
        	}
	}
		else if(nowtime > endtime1 && nowtime <endtime2){
			console.log("特殊时间")
			let datathree2 = await db.findthree2(nowtime)
			if(datathree2 !==null){
				var count = Object.keys(datathree2).length;
				for(i=0;i<count;i++){
					console.log(nowtime)
					let tasknum = datathree2[i].tasknum
					let user_account = datathree2[i].account
            		let user_password = datathree2[i].password
           	 		console.log("查找到的需要回复的任务号:" + tasknum)
           	 		let result = await db.updatethreelocked(tasknum)
					//案件加锁----------------------------------
					if(result == true){
						var partIDdata = await db.findpartID(tasknum)
						if(partIDdata !==null){
							var partID = partIDdata.partID
							console.log("对应的partID:"+partID)
							var dataaccount = await db.findaccount(partID)
							if(dataaccount !== null){
								var acc_account = dataaccount.account
								var acc_password = dataaccount.password
								console.log("账号:"+acc_account , " 密码"+acc_password)
								await mainfunction.third(tasknum,acc_account,acc_password) 
							}
						}
						//案件步骤解锁-----------------------------
						await db.updateunlockedthree(tasknum)
					}
				}
			}
		}
		else{
			console.log("无效时间")
		}
	});
} 

exports.goconditionselect = function(){
	schedule.scheduleJob('0,10,20,30,40,50 * * * * *',async function(){
	var nowtime = Math.round(new Date() / 1000)
	let dataone = await db.findone()
		if (dataone !==null) {
			console.log(nowtime)
            let tasknum = dataone.tasknum
            let user_account = dataone.account
			let user_password = dataone.password
			let newInstCondID = dataone.newInstCondID
            console.log("查找到的需要立案的任务号:" + tasknum)
			//案件加锁----------------------------------
            let result = await db.updateonelocked(tasknum)
			if(result == true){
				await mainfunction.first(tasknum,user_account,user_password,newInstCondID)
				//案件步骤解锁-----------------------------
				await db.updateunlockedone(tasknum)
			}    
        }
	});
} 

exports.gocaseapproval = function(){
	schedule.scheduleJob('0,8,10,18,20,28,30,38,40,48,50 * * * * *',async function(){
		var nowtime = Math.round(new Date() / 1000)
		let datatwo = await db.findtwo()
		if (datatwo !==null) {
			console.log(nowtime)
        	let tasknum = datatwo.tasknum
        	let user_account = datatwo.account
			let user_password = datatwo.password
			let typeid = datatwo.typeid
			let newInstCondID = datatwo.newInstCondID
			let departName = datatwo.departName
			console.log("gofunction------departName-----")
			console.log(departName)
        	console.log("查找到的需要流向批转的任务号:" + tasknum)
			//案件加锁----------------------------------
        	let result = await db.updatetwolocked(tasknum)
			if(result == true){
				let xx = await mainfunction.second(tasknum,user_account,user_password,typeid,newInstCondID,departName)
				if(xx == true){
					var partIDdata = await db.findpartID(tasknum)
					if(partIDdata !== null){
						var partID = partIDdata.partID
						var dataaccount = await db.findaccount(partID)
						var acc_account = dataaccount.account
						console.log("账号:"+acc_account)
						await db.updateAccount(acc_account,tasknum)
					}
				}else{
					console.log("案件批转错误")
				}
				//案件步骤解锁-----------------------------
				await db.updateunlockedtwo(tasknum)
			}
        }
	});
} 

exports.gosendcheck = function(){
	schedule.scheduleJob('0,10,20,30,40,50 * * * * *',async function(){
		let datafour = await db.findfour() 
		var nowtime = Math.round(new Date() / 1000)
		nowtime = nowtime + 17*60
		if (datafour !==null) {
			var count = Object.keys(datafour).length;
			for(i=0;i<count;i++){
				console.log(nowtime)
				let tasknum = datafour[i].tasknum
        		let user_account = datafour[i].account
        		let user_password = datafour[i].password
        		console.log("查找到的需要发送核查消息任务号:" + tasknum)
				//案件加锁----------------------------------
        		let result = await db.updatefourlocked(tasknum)
				if(result == true){
					await mainfunction.four(tasknum,user_account,user_password,nowtime)
					//案件步骤解锁-----------------------------
					await db.updateunlockedfour(tasknum)
				}
			}  
        }
	});
} 

exports.gocheckover = function(){
	schedule.scheduleJob('0,10,20,30,40,50 * * * * *',async function(){
	var nowtime = Math.round(new Date() / 1000)
	let datafive = await db.findfive() 
		if (datafive !==null) {
			var count = Object.keys(datafive).length;
			for(i=0;i<count;i++){
				console.log(nowtime)
				let tasknum = datafive[i].tasknum
            	let user_account = datafive[i].account
            	let user_password = datafive[i].password
            	console.log("查找到的核查完成需要批转的任务号:" + tasknum)
				//案件加锁----------------------------------
            	let result =  await db.updatefivelocked(tasknum)
				if(result == true){
					await mainfunction.five(tasknum,user_account,user_password)
					//案件步骤解锁-----------------------------
					await db.updateunlockedfive(tasknum)
				}
			}
        }
	});
} 

exports.goendcase = function(){
	schedule.scheduleJob('0,10,20,30,40,50 * * * * *',async function(){
	var nowtime = Math.round(new Date() / 1000)
	let datasix = await db.findsix() 
		if (datasix !==null) {
			var count = Object.keys(datasix).length;
			for(i=0;i<count;i++){
				console.log(nowtime)
				let tasknum = datasix[i].tasknum
            	let user_account = datasix[i].account
            	let user_password = datasix[i].password
            	console.log("查找到的需要慈溪立案的任务号:" + tasknum)
				//案件加锁----------------------------------
            	let result =  await db.updatesixlocked(tasknum)
				if(result == true){
					await mainfunction.six(tasknum)  
					//案件步骤解锁-----------------------------
					await db.updateunlockedsix(tasknum)
				}
			}
        }
	});
} 