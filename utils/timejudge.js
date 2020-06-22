var db = require('../db/db')
const utils = require('../utils/utils')
exports.timejudge2 = async function(typeid,newInstCondID2){
	
	let datatime = await db.findreatime(typeid,newInstCondID2)
	if(datatime !== null){
		let pangdi = new Date().toLocaleString()
		let hours = datatime.realtime
		let halfhours =hours/2
		let overdays = parseInt(halfhours/24)
		let morhours = halfhours%24
		let nowtime = new Date().getTime()/1000;
		let todayzero = new Date(new Date().toLocaleDateString()).getTime()/1000 
		let today17 = todayzero + 17*3600
		let today1650 = today17 - 25*60 -1  //修改为16点35--
		let today1630 = today17 - 60*60-1   //修改为16点--
		let randomtime = utils.getRandom(today1630,today1650)
		if(nowtime > randomtime){
			if(nowtime < today1650){
				randomtime = utils.getRandom(nowtime,today1650)
			}
		}
		let endtimehalf = nowtime + morhours*3600
		let endtimehalfreal1 = nowtime + halfhours*3600
		//当天16.35分之后同步的案子
		let endtimehalfrealtest = randomtime + 17*3600
		let endtimehalfreal2 = randomtime + overdays*24*3600 
		let endtime = nowtime + hours*3600
		if(nowtime>today1630 && nowtime<today1650){
			let jsondata1 = {
				endtime:endtime,
				//endtimehalf:endtimehalfrealtest
				endtimehalf:randomtime
			}
			//console.log(jsondata1)
			return jsondata1 
		}else if(nowtime > today1650){
			let jsondata1 = {
				endtime:endtime,
				//endtimehalf:endtimehalfrealtest
				endtimehalf:endtimehalfrealtest
			}
			return jsondata1
		}else if(endtimehalf<today1630) {
			let jsondata1 = {
				endtime:endtime,
				//endtimehalf:endtimehalfrealtest
				endtimehalf:endtimehalfreal1
			}
			//console.log(jsondata1)
			return jsondata1
		}else{
			let jsondata1 = {
				endtime:endtime,
				//endtimehalf:endtimehalfrealtest
				endtimehalf:endtimehalfreal2
			}
			//console.log(jsondata1)
			return jsondata1
		}
	}
	







	
    
    
    
    
} 