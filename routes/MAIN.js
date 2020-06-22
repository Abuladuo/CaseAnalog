const router = require('koa-router')()
const bodyParser = require('koa-bodyparser');
var request = require('request');
var schedule = require('node-schedule');
var db = require('../db/db')
const conditionselect = require('../utils/conditionselect')
const caseapproval = require('../utils/caseapproval')
const partresponse = require('../utils/partresponse')
const sendcheck = require('../utils/sendcheck')
const checkover = require('../utils/checkover')
const endcase = require('../utils/endcase')
const mainfunction = require('../utils/mainfunction')
const gofunction = require('../utils/gofunction')
const timejudge = require('../utils/timejudge')
const accountrandom = require('../utils/accountrandom')
const utils = require('../utils/utils')
const other = require('../utils/other')
const sendcheck_main = require('../chonggou/sendcheck_main')
//const md5 = require('js-md5')
router.get('/caseStatus', async(ctx, _next) => {
    await ctx.render('caseStatus', {})
})
router.get('/endcase', async(ctx, _next) => {
    await ctx.render('endcase', {})
})
router.get('/shoudongcase', async(ctx, _next) => {
    await ctx.render('shoudongcase', {})
})
router.get('/addRead', async(ctx, _next) => {
    await ctx.render('addRead', {})
})
router.get('/test', async(ctx, _next) => {
    await ctx.render('test', {})
})

router.get('/tiancai',async(ctx,_next)=>{
	function getDay(num, str) {
	        var today = new Date();
	        var nowTime = today.getTime();
	        var ms = 24*3600*1000*num;
	        today.setTime(parseInt(nowTime + ms));
	        var oYear = today.getFullYear();
	        var oMoth = (today.getMonth() + 1).toString();
	        if (oMoth.length <= 1) oMoth = '0' + oMoth;
	        var oDay = today.getDate().toString();
	        if (oDay.length <= 1) oDay = '0' + oDay;
	        return oYear + str + oMoth + str + oDay;
	    }
	    
		var yesterday = getDay(-1, '-');		//    -1 代表前一天，-2前两天...
		//ctx.body = yesterday
		//console.log(yesterday);
		
		
})	



router.get('/shabi',async(ctx,_next)=>{
	let account  = 140700106
	let password = 'nbzhcg'
	ctx.body = await accountrandom.serverWrong(account)

})
///------------------------       view => caseState      ---------------------------
router.post('/casestateQuerychange',async(ctx,_next)=>{
	let createtimeMark = ctx.request.body.createtimeMark
	let autotimeMark = ctx.request.body.autotimeMark
	let tp = ctx.request.body.tp
	tp = tp*10
	tp = parseInt(tp)
	if(createtimeMark !== ""){
		if(createtimeMark =="createtimeMark_down"){
			let result = await db.createtimedown(tp)
			for(let i=0; i<result.length; i++){
				let tasknum = result[i].tasknum
				//await other.updateNingboStatus(tasknum)
			}
			ctx.body = await db.createtimedown(tp) 
		}else if(createtimeMark =="createtimeMark_up"){
			let result = await db.createtimeup(tp)
			for(let i=0; i<result.length; i++){
				let tasknum = result[i].tasknum
				//await other.updateNingboStatus(tasknum)
			}
			ctx.body = await db.createtimeup(tp)
		}
	}else if(autotimeMark !== ""){
		if(autotimeMark =="autotimeMark_down"){
			let result  = await db.autotimedown(tp)
			for(let i=0; i<result.length; i++){
				let tasknum = result[i].tasknum
				//await other.updateNingboStatus(tasknum)
			}
			ctx.body = await db.autotimedown(tp)
		}else if(autotimeMark =="autotimeMark_up"){
			let result  = await db.autotimeup(tp)
			for(let i=0; i<result.length; i++){
				let tasknum = result[i].tasknum
				//await other.updateNingboStatus(tasknum)
			}
			ctx.body = await db.autotimeup(tp)
		}
	}else{
		let result = await db.casestateQuerybytp(tp)
		for(let i=0; i<result.length; i++){
			let tasknum = result[i].tasknum
			//await other.updateNingboStatus(tasknum)
		}
		ctx.body = await db.casestateQuerybytp(tp)
	}
})
router.get('/findstopmark',async(ctx,_next)=>{
    ctx.body = await db.findstopmark()
})
router.get('/restart',async(ctx,_next)=>{
    let a  = await db.restart()
	console.log(a)
	let b = await db.restartUser()
	console.log(b)
	if(a ==true && b == true){
		ctx.body = {
			success:true
		}
	}else{
		ctx.body = {
			success:false
		}
	}
	
})
router.get('/stop',async(ctx,_next)=>{
    let a  = await db.stop()
	console.log(a)
    let b = await db.stopUser()
	console.log(b)
    if(a ==true && b == true){
    	ctx.body = {
    		success:true
    	}
    }else{
    	ctx.body = {
    		success:false
    	}
    }
})
router.get('/findbyjieru',async(ctx,_next)=>{
	ctx.body = await db.findbyjieru()
})
router.post('/jieru',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
    let data = await db.findbytasknum(tasknum)
	
	let oldStatus = data.state
	let newStatus = other.getnewStatus(oldStatus)
	ctx.body = await db.updatejieru(tasknum,oldStatus,newStatus)
})
router.post('/jieruRecover',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
    let data = await db.findbytasknum(tasknum)
	let newStatus = data.newStatus
	if(newStatus == "已批转，等待部门回复"){
		ctx.body = await other.Recover2_detail(tasknum,newStatus)
	}else if(newStatus == "已选择立案"){
		ctx.body = await other.Recover_detail(tasknum,newStatus)
	}else if(newStatus == "部门回复已完成"){
		ctx.body = await other.Recover3_detail(tasknum,newStatus)
	}else if(newStatus == "已发送核查信息"){
		ctx.body = await other.Recover4_detail(tasknum,newStatus)
	}else if(newStatus == "核查信息已通过，进入结案阶段"){
		ctx.body = await other.Recover5_detail(tasknum,newStatus)
	}else if(newStatus == "已结案"){
		ctx.body = await other.Recover6_detail(tasknum,newStatus)
	}
	
})
router.post('/updateNB',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
	let nbStatus = ctx.request.body.nbStatus
    ctx.body = await db.updateNingboStatus(nbStatus,tasknum)
})
router.get('/casestateQuery',async(ctx,_next)=>{
    ctx.body = await db.casestateQuery()
})
router.get('/casestateQuerycount',async(ctx,_next)=>{
    ctx.body = await db.casestateQuerycount()
})
router.post('/casestateQueryClick',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
    ctx.body = await db.casestateQueryClick(tasknum)
})
router.post('/casestateQueryClickcount',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
    ctx.body = await db.casestateQueryClickcount(tasknum)
})
router.post('/goto',async(ctx,_next)=>{
	let createtimeMark = ctx.request.body.createtimeMark
	let autotimeMark = ctx.request.body.autotimeMark
	let tasknum = ctx.request.body.tasknum
	let tp = ctx.request.body.tp
	tp = tp*10
	tp = parseInt(tp)
	if(createtimeMark !== ""){
		if(createtimeMark =="createtimeMark_down"){
			ctx.body = await db.createtimedown(tp)
		}else if(createtimeMark =="createtimeMark_up"){
			ctx.body = await db.createtimeup(tp)
		}
	}else if(autotimeMark !== ""){
		if(autotimeMark =="autotimeMark_down"){
			ctx.body = await db.autotimedown(tp)
		}else if(autotimeMark =="autotimeMark_up"){
			ctx.body = await db.autotimeup(tp)
		}
	}else{
		ctx.body = await db.gotowhere(tasknum,tp)
	}
    
})
router.post('/updateshoudong',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
	let person  = ctx.request.body.person
	let nowtime = Math.round(new Date() / 1000)
    ctx.body = await db.updateshoudong(tasknum,person,nowtime)
})
router.post('/queryCaseStatus',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
	let data =  await sendcheck_main.queryCaseStatus(tasknum)
	console.log(data)
	ctx.body = data
})
router.post('/sdsendcheck',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
	let nowtime = Math.round(new Date() / 1000)
	console.log("手动发送核查时间: "+nowtime)
	let yujitime = nowtime + 60*20
    ctx.body = await sendcheck_main.routerQuote(tasknum)
})
router.post('/createtimedown',async(ctx,_next)=>{
	let tp = ctx.request.body.tp
	tp = tp*10
	tp = parseInt(tp)
    ctx.body = await db.createtimedown(tp)
})
router.post('/createtimeup',async(ctx,_next)=>{
	let tp = ctx.request.body.tp
	tp = tp*10
	tp = parseInt(tp)
    ctx.body = await db.createtimeup(tp)
})
router.post('/autotimedown',async(ctx,_next)=>{
	let tp = ctx.request.body.tp
	tp = tp*10
	tp = parseInt(tp)
    ctx.body = await db.autotimedown(tp)
})
router.post('/autotimeup',async(ctx,_next)=>{
	let tp = ctx.request.body.tp
	tp = tp*10
	tp = parseInt(tp)
    ctx.body = await db.autotimeup(tp)
})
///------------------------       view => endcase      ---------------------------
router.get('/endcasestateQuery',async(ctx,_next)=>{
    ctx.body = await db.endcasestateQuery()
})
router.get('/endcasestateQuerycount',async(ctx,_next)=>{
    ctx.body = await db.endcasestateQuerycount()
})
router.post('/endcasestateQueryClick',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
    ctx.body = await db.endcasestateQueryClick(tasknum)
})
router.post('/endcasestateQueryClickcount',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
    ctx.body = await db.endcasestateQueryClickcount(tasknum)
})
router.post('/endgoto',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
	let tp = ctx.request.body.tp
	tp = tp*10
	tp = parseInt(tp)
    ctx.body = await db.endgotowhere(tasknum,tp)
})

///------------------------       view => shuodongcase      ---------------------------
router.get('/shoudongcasestateQuery',async(ctx,_next)=>{
    ctx.body = await db.shoudongcasestateQuery()
})
router.get('/shoudongcasestateQuerycount',async(ctx,_next)=>{
    ctx.body = await db.shoudongcasestateQuerycount()
})
router.post('/shoudongcasestateQueryClick',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
    ctx.body = await db.shoudongcasestateQueryClick(tasknum)
})
router.post('/shoudongcasestateQueryClickcount',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
    ctx.body = await db.shoudongcasestateQueryClickcount(tasknum)
})
router.post('/shoudonggoto',async(ctx,_next)=>{
	let tasknum = ctx.request.body.tasknum
	let tp = ctx.request.body.tp
	tp = tp*10
	tp = parseInt(tp)
    ctx.body = await db.shoudonggotowhere(tasknum,tp)
})



//----------------------------------------------------------------- 
router.get('/unlocked/:tasknum',async(ctx,_next)=>{
    let tasknumber = ctx.params.tasknum
    await db.updateunlockedall(tasknumber)
})
router.get('/isfinishcheck/:tasknum',async(ctx,_next)=>{
    let tasknum = ctx.params.tasknum
	var nowtime = Math.round(new Date() / 1000)
	nowtime = nowtime + 17*60
    try {
        let result = await db.updateNextstart(tasknum,nowtime)
        if(result == true){
            ctx.body = {
                success:true,
                massage:'成功'  
            }
        }else if(result == false){
            ctx.body = {
                success:false,
                massage:'失败'  
            }
        }
        
    } catch (error) {
        console.log("sendcheckover---------------")
        console.log(error)
        console.log("-----------------------------")
        ctx.body = {
            success:false,
            massage:'异常'
        }
    }
    
    
})

router.get('/query/:tasknum',async(ctx,_next)=>{
    var tasknum = ctx.params.tasknum
    if (tasknum.length == 12 ) {
        var alldata = await db.selectthing(tasknum)
        //console.log(alldata)
        if (alldata !== null) {
            var state = alldata.state
            ctx.body  = {
                success:true,
                tasknum:tasknum,
                state:state,
                massage:'查询成功'
            }
        }
            else{ctx.body = {
                success:false,
                tasknum:tasknum,
                state:'',
                massage:'未找到对应案件'
            }}
    }
        else{ctx.body = {
            
            success:false,
            tasknum:tasknum,
            state:'',
            massage:'请输入正确的任务号'
        }}
})

router.post('/add',async(ctx,_next)=>{
	let  nowtime = Math.round(new Date() / 1000)
	let  tasknum = ctx.request.body.tasknum
    let  userjson = accountrandom.accountrandom()
    let  account = userjson.account
    let  password = userjson.password
    let  newInstCondID = ctx.request.body.newInstCondID
    let  typeid = ctx.request.body.subtypeid
	let  departName = ctx.request.body.departName
	if(departName == ""){
		departName = "慈溪市综合行政执法局"
	}
	let data  = await db.findRealpartName(departName)
	departName = data.Realname
    console.log("获取到的参数信息-----tasknum: "+tasknum+"newInstCondID: "+newInstCondID+"subtypeid: "+typeid+"departName:"+departName)
    try{
        if (account !== undefined && password !== undefined ) {
            if(tasknum !== undefined && tasknum.length == 12 ) {
				console.log("任务号: "+tasknum+"分配的账号: "+account)
				//添加记录
                await db.addhumanCase(tasknum,account)
					//添加至数据库
                    await db.addUserFalse(tasknum,account,password,typeid,newInstCondID,departName,nowtime)
                    //await db.updateone(tasknum)
                    ctx.body = {
                        success:true,
                        massage:'案件添加成功'  
                    }
            }
            else { 
                ctx.body = {
                    success:false,
                    massage:'请输入正确的任务号'
                }
            }
        }
        else{
            ctx.body = {
                success:false,
                massage:'请输入正确的账号密码'
            }
        }

    }
    catch(error){
        console.log("add--------------------------")
        console.log(error)
        console.log("-----------------------------")
        ctx.body = {
            success:false,
            massage:'操作出错，请重新输入数据'
        }
    }
        
})


router.get('/monidelete',async(ctx,_next)=>{
    var tasknum = ctx.params.tasknum
    db.destroy(tasknum);
})





module.exports = router
