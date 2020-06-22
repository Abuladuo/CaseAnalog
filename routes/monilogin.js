const router = require('koa-router')()
const bodyParser = require('koa-bodyparser');
var request = require('request');
const utils = require('../utils/utils')




//第一步 选择立案条件---------------------------------------------------------------------------------------
router.get('/first/:tasknumber',async(ctx,_next)=>{
    //let tasknumber = ctx.querystring.body.tasknumber
    let tasknumber = ctx.params.tasknumber
    let tank = 0
    //tank 是一个mark
    let UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
    async function login(){
        let datas = {
            userName: 149001002,
            password: 'nbzhcg',
            ip: ' ',
            browserVersion: 'chrome/78.0.3904.108',
            osVersion: 'Win7/32'
        };
        let opts = {
            url: 'http://10.19.179.6/eUrbanMIS/login/validpassword',
            method: 'post',
            form: datas,
        };
        return new Promise(function(res,rej){
            request(opts,(err,request,body) =>{
                reqcookie = request.headers['set-cookie']
                //console.log(1)
                if (err) {rej(err)}
                else{res(request)}
            })
        })
    }

    async function listdata(){
        let opts = {
            url: 'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=29&currentPage=1&numPerPage=200&sortFieldID=-1&sortType=&onlyDataFlag=false&_=1574930745957',
            method:'get',
            headers: {
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie: reqcookie, //这里是登陆后得到的cookie,(重点)
            }
        };
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b1 = JSON.parse(b)
                var object = b1['resultInfo']['data']['listDataSet']['listData']
                var count = Object.keys(object).length;
                //console.log(count)
                if (count == 0) {tank = 10}
                else{
                    for(var i = 0;i<count;i++){
                        //console.log(i)
                        if (b1['resultInfo']['data']['listDataSet']['listData'][i].task_num == tasknumber ) {
                            tank = -1
                            break;
                        }
                            else{tank++}
                    }
                }
            
            //console.log(tank)
            //console.log(i)
            if (tank == -1 ) {
                secEventSrcID = ''
                recTypeID = b1['resultInfo']['data']['listDataSet']['listData'][i].rec_type_id
                eventTypeID = b1['resultInfo']['data']['listDataSet']['listData'][i].event_type_id
                maxEventTypeID = b1['resultInfo']['data']['listDataSet']['listData'][i].max_event_type_id
                maxEventTypeName = b1['resultInfo']['data']['listDataSet']['listData'][i].sub_type_name
                eventDesc = b1['resultInfo']['data']['listDataSet']['listData'][i].event_desc
                eventMarks = ''
                newInstAdvise = ''
                reviseOpinion = ''
                address = b1['resultInfo']['data']['listDataSet']['listData'][i].address
                districtname = b1['resultInfo']['data']['listDataSet']['listData'][i].district_name
                //districtID = utils.districtnametoID(districtname)
                partCode = ''
                coordinateX = b1['resultInfo']['data']['listDataSet']['listData'][i].coordinate_x
                coordinateY = b1['resultInfo']['data']['listDataSet']['listData'][i].coordinate_y
                patrolDealFlag = 0
                reportAreaLimitID = 0
                returnVisitFlag = 0
                telReply = ''
                callTypeID = 1
                reporterName = ''
                genderID = 1
                homeAddress = ''
                isPhoneReply = ''
                eventSrcName = b1['resultInfo']['data']['listDataSet']['listData'][i].event_src_name
                recTypeName = utils.recTypeIDtoname(recTypeID)
                eventTypeName = utils.eventTypeIDtoname(eventTypeID)
                //eventSrcID = utils.eventsrc(eventSrcName)
                mainTypeName = b1['resultInfo']['data']['listDataSet']['listData'][i].main_type_name
                subTypeName = b1['resultInfo']['data']['listDataSet']['listData'][i].sub_type_name
                streetName = b1['resultInfo']['data']['listDataSet']['listData'][i].street_name
                //streetID = utils.streetnametoID(streetName)
                communityName = b1['resultInfo']['data']['listDataSet']['listData'][i].community_name
                cellName = b1['resultInfo']['data']['listDataSet']['listData'][i].cell_name
                mainTypeID = b1['resultInfo']['data']['listDataSet']['listData'][i].main_type_id
                subTypeID = b1['resultInfo']['data']['listDataSet']['listData'][i].sub_type_id
                b_rec = b1['resultInfo']['data']['listDataSet']['listData'][i].rec_id
                b_act = b1['resultInfo']['data']['listDataSet']['listData'][i].act_id
                b_tasknum = b1['resultInfo']['data']['listDataSet']['listData'][i].task_num
                if (e) {rej(e)}
                    else{res(b1)}
                }
                    else{res('未找到')}
            })
        })
    }

    async function listmenu(){
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/menu/gethumantasklistmenu?recID='+b_rec+'&actID='+b_act+'&taskListID=29&_=1575506087640',
            method:'get',
            headers:{
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie:reqcookie,
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                if (e) {rej(e)}
                else{res(b)}
            })
        })
    }

    async function assign(){
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS//home/workflow/assign',
            method:'post',
            form:{
                taskListID: 29,
                taskListName: 'accept_newinstlist',
                tasknum: b_tasknum,
                recDispNum: '',
                menuName: 'editnewinst',
                recID: b_rec,
                actID: b_act
            },
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie:reqcookie,
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                if (e) {rej(e)}
                else{res(b)}
            })
        })
    }

    async function register(){
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS//home/mis/rec/getregisterform?sysID=19&_=1576203323996',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie:reqcookie,
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                if (e) {rej(e)}
                else{res(b)}
            })
        })
    }

    async function onselectchange(){

        let formJsonString222      = {"formID":18,"formName":"城管立案编辑表单","componentList":[{"id":{"componentID":6,"formID":18},"componentType":"select","style":"","fontStyleID":null,"text":"大类数据源","x":98,"y":73,"width":150,"height":25,"showFlag":null,"lineType":"","lineColor":"","valueSeparator":"","seniorIDs":"4","juniorIDs":"23","listTypeID":10,"listContent":"SELECT type_id as ItemID,type_name as ItemValue from tc_dic_event_any_type  where type_level = 2  and senior_id=?","validateBitID":0,"validateInfo":"{}","editRightID":null,"componentInfo":"","displayOrder":null,"formFieldID":4337,"disabledID":null,"newDateID":null,"extraClass":"mis-rec-register-mainType","showRight":null,"extraIDs":null,"formField":null,"formFieldList":null,"fieldPhyName":"main_type_id","validateIDs":null,"fieldName":null,"componentID":6,"formID":18,"dataSetID":13,"fieldUniqueName":"main_type_id","options":null,"dataTypeID":1,"tableName":"to_rec","clientID":"eGovaComponent_18_6","value":""+mainTypeID+"","fontStyle":""}],"fieldPhyName":"sub_type_id"}
        let componentJsonString222 = {"id":{"componentID":23,"formID":18},"componentType":"select","style":"","fontStyleID":null,"text":"小类名称-数据源","x":402,"y":74,"width":150,"height":25,"showFlag":null,"lineType":"","lineColor":"","valueSeparator":"","seniorIDs":"6","juniorIDs":"27","listTypeID":10,"listContent":"SELECT type_id as ItemID,type_name as ItemValue from tc_dic_event_any_type  where type_level = 3 and senior_id=?","validateBitID":0,"validateInfo":"{}","editRightID":0,"componentInfo":"","displayOrder":null,"formFieldID":4382,"disabledID":null,"newDateID":null,"extraClass":"mis-rec-register-subType","showRight":null,"extraIDs":null,"formField":null,"formFieldList":null,"fieldPhyName":"sub_type_id","validateIDs":null,"fieldName":null,"componentID":23,"formID":18,"dataSetID":13,"fieldUniqueName":"sub_type_id","options":null,"dataTypeID":1,"tableName":"to_rec","clientID":"eGovaComponent_18_23","value":""+ subTypeID +"","fontStyle":""}
        formJsonString222 = JSON.stringify(formJsonString222)
        componentJsonString222 = JSON.stringify(componentJsonString222)
        let datas2 = {
            formJsonString: formJsonString222,
            componentJsonString: componentJsonString222
        };
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/form/formpreview/onselectchange',
            method:'post',
            form: datas2 ,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie:reqcookie,  
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                newInstCondID = b3['resultInfo']['data']['juniorComponents'][0].options[0].itemID
                newInstCondName = b3['resultInfo']['data']['juniorComponents'][0].options[0].itemValue
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }

    async function formdata(){
        let opts = {
            //url 所有需要的数据都有
            url:'http://10.19.179.6/eUrbanMIS/home/form/formpreview/getformdata?formID=18&param=%7B%22recID%22%3A'+b_rec+'%2C%22actID%22%3A'+b_act+'%7D&_=1575853397309',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie:reqcookie,
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                cellID = b3['resultInfo']['data']['formTableData'][13].cell_id
                patrolID = b3['resultInfo']['data']['formTableData'][13].patrol_id
                communityID = b3['resultInfo']['data']['formTableData'][13].community_id
                timeAreaID = b3['resultInfo']['data']['formTableData'][13].time_area_id
                b_act2 = b3['resultInfo']['data']['formTableData'][14].act_id
                districtID = b3['resultInfo']['data']['formTableData'][14].district_id
                eventSrcID = b3['resultInfo']['data']['formTableData'][14].event_src_id
                streetID = b3['resultInfo']['data']['formTableData'][14].street_id
                if (e) {rej(e)}
                else{res(b)}
            })
        })
    }

    async function getrecact(){
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS//home/workflow/getrecact?actID='+b_act2+'&_=1576206771574',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie:reqcookie,
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                if (e) {rej(e)}
                    else{res(b)}
            })
        })
    }

    async function saverec(){
        let data4 = {
            eventSrcID:eventSrcID,
            secEventSrcID:secEventSrcID,
            recTypeID:recTypeID,
            eventTypeID:eventTypeID,
            mainTypeID:mainTypeID,
            subTypeID:subTypeID,
            maxEventTypeID:maxEventTypeID,
            maxEventTypeName:maxEventTypeName,
            eventDesc:eventDesc,
            eventMarks:eventMarks,
            newInstCondID:newInstCondID,
            newInstAdvise:newInstAdvise,
            reviseOpinion:reviseOpinion,
            timeAreaID:timeAreaID,
            address:address,
            districtID:districtID,
            streetID:streetID,
            communityID:communityID,
            cellID:cellID,
            patrolID:patrolID,
            partCode:partCode,
            coordinateX:coordinateX,
            coordinateY:coordinateY,
            patrolDealFlag:patrolDealFlag,
            reportAreaLimitID:reportAreaLimitID,
            returnVisitFlag:returnVisitFlag,
            telReply:telReply,
            callTypeID:callTypeID,
            reporterName:reporterName,
            genderID:genderID,
            homeAddress:homeAddress,
            isPhoneReply:isPhoneReply,
            eventSrcName:eventSrcName,
            recTypeName:recTypeName,
            eventTypeName:eventTypeName,
            mainTypeName:mainTypeName,
            subTypeName:subTypeName,
            newInstCondName:newInstCondName,
            streetName:streetName,
            communityName:communityName,
            cellName:cellName,
            recID:b_rec,
            taskNum:b_tasknum,
        }
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/mis/rec/saverec',
            method:'post',
            form:data4,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie:reqcookie,
            }    
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                if (e) {rej(e)}
                    else{res(b)}
            })
        })
    }
    async function translist(){
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/workflow/gettranslist?actID='+b_act2+'&itemType=transit&_=1576204153809',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie:reqcookie, 
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                if (e) {rej(e)}
                    else{res(b)}
            })
        })
    }

    async function transit(){
        let timestamp = new Date().getTime();
        let urla = 'http://10.19.179.6/eUrbanMIS/home/workflow/transit?actID='+b_act2+'&transInfo=326%2C7982%2C0%3B&_='+timestamp+''
        //console.log(urla)
        //console.log(data4)
        let opts = {
            url:urla,
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                Cookie:reqcookie, 
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b)}
            })
        })
    }

    await login();
    await listdata();
    if (tank == -1) {
        await listmenu();
        await assign();
        await register();
        await onselectchange();
        await formdata();
        await getrecact();
        await saverec();
        await translist();
        await transit();
        
    }
    else{ctx.body = '未找到对应任务号'}
})






//第二步 案件流向批转(推荐或者第一个)
router.get('/second/:tasknumber', async(ctx,_next)=>{
    var UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
    let tasknumber = ctx.params.tasknumber
    let tank = 0
    async function login(){
        //await gethumantasklistdata();
        //await gethumannavbaritem();
        let datas = {
            userName: 149001002,
            password: 'nbzhcg',
            ip: ' ',
            browserVersion: 'chrome/78.0.3904.108',
            osVersion: 'Win7/32'
        };
        let opts = {
            url: 'http://10.19.179.6/eUrbanMIS/login/validpassword',
            method: 'post',
            form: datas,
        };
        return new Promise(function(res,rej){
            request(opts,(e,r,b) =>{
                reqcookie = r.headers['set-cookie']
                //console.log(1)
                if (e) {rej(e)}
                    else{res(b)}
            })

        })
    }

    async  function gethumannavbaritem(){

        let opts = {
            url: 'http://10.19.179.6/eUrbanMIS/home/nav/gethumannavbaritems?sysName=mis&_=1576456422340',
            method: 'get',
            headers:{
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }
        };
        return new Promise(function(res,rej){
            request(opts,(e,r,b) =>{
                //console.log(2)
                if (e) {rej(e)}
                    else{res(b)}
            })
        })
    }

    async   function gethumantasklistdata(){
        let opts = {
            url: 'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=2&currentPage=1&numPerPage=200&sortFieldID=-1&sortType=&_=1576456422344',
            method: 'get',
            headers:{
                'User-Agent': UserAgent,
                Cookie:reqcookie,
            }
        };
        return new Promise(function(res,rej){
            request(opts,(e,r,b) =>{
                b3 = JSON.parse(b)
                var object = b3['resultInfo']['data']['listDataSet']['listData']
                var count = Object.keys(object).length;
                //console.log(count)
                if (count == 0) {tank = 10}
                    else{
                        for(i = 0;i<count;i++){
                        //console.log(i)
                            if (b3['resultInfo']['data']['listDataSet']['listData'][i].task_num == tasknumber ) {
                                tank = -1
                                break;
                            }
                                else{tank++}
                        }
                    }
                if (tank == -1) {
                    b_rec = b3['resultInfo']['data']['listDataSet']['listData'][i].rec_id
                    b_act = b3['resultInfo']['data']['listDataSet']['listData'][i].act_id
                    tasknum = b3['resultInfo']['data']['listDataSet']['listData'][i].task_num
                    act_property_id = b3['resultInfo']['data']['listDataSet']['listData'][i].act_property_id
                    //console.log(3)
                    if (e) {rej(e)}
                        else{res(b3)}
                }
                    else{
                        if (e) {rej(e)}
                            else{res(' 未找到对应任务号')}
                    }
            
            })
        })
    }
    async   function gethumantasklistmenu(){
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/menu/gethumantasklistmenu?recID='+b_rec+'&actID='+b_act+'&taskListID=2&_=1576456422727',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }  
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b) =>{
                b3 = JSON.parse(b)
                //console.log(4)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }
    async   function assign(){
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS//home/workflow/assign',
            method:'post',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
            form:{
                taskListID: 2,
                taskListName: 'rec_mylist',
                tasknum:tasknum,
                recDispNum: '',
                menuName: 'transit',
                recID:b_rec,
                actID:b_act,
                actPropertyID:act_property_id,
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b) =>{
                b3 = JSON.parse(b)
                //console.log(5)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }
    async   function transtree(){
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/workflow/gettranstreewithoutconfig?actID='+b_act+'&itemType=transit&_=1576456422952',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b) =>{
                b2 = b + ""
                b3 = JSON.parse(b)
                //if (e) {rej(e)}
                    //else{res(b3)}
                if (b2.indexOf("推荐" == 0)){
                    numa = b3['resultInfo']['data']['transList'][0].nextActDefID
                    numb = b3['resultInfo']['data']['transList'][0].nextPartID
                }
                    else{
                        numa = b3['resultInfo']['data']['recommendList'][0]['attributes'].nextActDefID
                        numb = b3['resultInfo']['data']['recommendList'][0]['attributes'].partID
                    }
                //console.log(numa)
                //console.log(numb)
                //console.log(6)
                if (e) {rej(e)}
                    else{res(b)}
            })
        })
    }
    async   function transit(){
        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/workflow/transit',
            method:'post',
            headers:{
                'User-Agent':UserAgent,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                Cookie:reqcookie,
            },
            form:{
                actID:b_act,
                taskListID:2,
                transInfo:''+numa+','+numb+',0;',
                opinion:'测试',
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b) =>{
                //console.log(7)
                b = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b)}
            })
        })
    }


    await login();
    await gethumannavbaritem();
    await gethumantasklistdata();
    if (tank == -1 ) {
        await gethumantasklistmenu();
        await assign();
        await transtree();
        await transit();
    }
        else{
            ctx.body = '未找到对应任务号'
        }


    })




//第三步 部门回复---------------------------------------------------------------------------
router.get('/third/:tasknumber',async (ctx,_next)=>{

    let UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
    let tasknumber = ctx.params.tasknumber
    let tank = 0
    async function login(){

        var username = '149000001'
        var password = 'nbzhcg'
      
        let datas = {
            userName: username,
            password: password,
            ip: ' ',
            browserVersion: 'chrome/78.0.3904.108',
            osVersion: 'Win7/32'
        };

        let opts = {
            url: 'http://10.19.179.6/eUrbanMIS/login/validpassword',
            method: 'post',
            form: datas,
        };
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                reqcookie =  r.headers['set-cookie']
                if (e) {rej(e)}
                else{res(b3)}
            })
        })
    }
    async function avbar(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/nav/gethumannavbaritems?sysName=mis&_=1576456422340',
            method:'get',
            headers:{
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
               'User-Agent': UserAgent,
               Cookie:reqcookie,
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }

    async function listdata(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=2&currentPage=1&numPerPage=200&sortFieldID=-1&sortType=&onlyDataFlag=false&_=1576543564700',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': UserAgent,
                Cookie:reqcookie,
            }  
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                var object = b3['resultInfo']['data']['listDataSet']['listData']
                var count = Object.keys(object).length;
                //console.log(count)
                if (count == 0) {tank = 10}
                else{
                    for(i = 0;i<count;i++){
                        //console.log(i)
                        if (b3['resultInfo']['data']['listDataSet']['listData'][i].task_num == tasknumber ) {
                            tank = -1
                            break;
                        }
                            else{tank++}
                    }
                }
                if (tank == -1) {
                    b_rec = b3['resultInfo']['data']['listDataSet']['listData'][i].rec_id
                    b_act = b3['resultInfo']['data']['listDataSet']['listData'][i].act_id
                    tasknum = b3['resultInfo']['data']['listDataSet']['listData'][i].task_num
                    act_property_id = b3['resultInfo']['data']['listDataSet']['listData'][i].act_property_id
                    //console.log(3)
                    if (e) {rej(e)}
                        else{res(b3)}
                }
                    else{
                        if (e) {rej(e)}
                            else{res('未找到对应任务号')}
                    }
            })
        })
    }
    async function listmenu(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/menu/gethumantasklistmenu?recID='+b_rec+'&actID='+b_act+'&taskListID=2&_=1576543564703',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }

    async function assign(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS//home/workflow/assign',
            method:'post',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
            form:{
                taskListID: 2,
                taskListName: 'rec_mylist',
                tasknum:tasknum,
                recDispNum: '',
                menuName: 'transit',
                recID:b_rec,
                actID:b_act,
                actPropertyID:act_property_id,
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }
    
    async function transtree(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/workflow/gettranstree?actID='+b_act+'&itemType=transit&_=1576546546916',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                nextActDefID = b3['resultInfo']['data']['transList'][0].nextActDefID
                nextPartID = b3['resultInfo']['data']['transList'][0].nextPartID
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }
    async function transit(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/workflow/transit',
            method:'post',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
            form:{
                actID:b_act,
                taskListID:'2',
                transInfo:''+nextActDefID+','+nextPartID+',0;',
                opinion:'测试'
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{
                        //test.update();
                        res(b3)
                    }
            })
        })
    }


    await login();
    await avbar();
    await listdata();
    if (tank == -1) {
        await listmenu();
        await assign();
        await transtree();
        ctx.body = await transit();

    }
        else{
            ctx.body = '未找到对应任务号'
        }
    

})







//第四步  发送核查信息--------------------------------------------------------------------------------------------------
router.get('/fourth/:tasknumber',async (ctx,_next)=>{

    let UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
    let tasknumber = ctx.params.tasknumber
    let tank =  0 
    async function login(){

        var username = '149001002'
        var password = 'nbzhcg'
      
        let datas = {
            userName: username,
            password: password,
            ip: ' ',
            browserVersion: 'chrome/78.0.3904.108',
            osVersion: 'Win7/32'
        };

        let opts = {
            url: 'http://10.19.179.6/eUrbanMIS/login/validpassword',
            method: 'post',
            form: datas,
        };
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                reqcookie =  r.headers['set-cookie']
                if (e) {rej(e)}
                else{res(b3)}
            })
        })
    }

   async function listdata(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=30&currentPage=1&numPerPage=200&sortFieldID=-1&sortType=&_=1576456422344',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': UserAgent,
                Cookie:reqcookie,
            }  
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b) =>{
                b3 = JSON.parse(b)
                var object = b3['resultInfo']['data']['listDataSet']['listData']
                var count = Object.keys(object).length;
                //console.log(count)
                if (count == 0) {tank = 10}
                else{
                    for(i = 0;i<count;i++){
                        //console.log(i)
                        if (b3['resultInfo']['data']['listDataSet']['listData'][i].task_num == tasknumber ) {
                            tank = -1
                            break;
                        }
                            else{tank++}
                    }
                }
                if (tank == -1) {
                    b_rec = b3['resultInfo']['data']['listDataSet']['listData'][i].rec_id
                    b_act = b3['resultInfo']['data']['listDataSet']['listData'][i].act_id
                    tasknum = b3['resultInfo']['data']['listDataSet']['listData'][i].task_num
                    act_property_id = b3['resultInfo']['data']['listDataSet']['listData'][i].act_property_id
                    //console.log(3)
                    if (e) {rej(e)}
                        else{res(b3)}
                }
                    else{
                        if (e) {rej(e)}
                        else{res(' 未找到对应任务号')}
                    }
            })
        })
    }

   async function listmenu(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/menu/gethumantasklistmenu?recID='+b_rec+'&actID='+b_act+'&taskListID=2&_=1576543564703',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }
    async function formdata(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/form/formpreview/getformdata?formID=6&param=%7B%22recID%22%3A'+b_rec+'%2C%22actID%22%3A'+b_act+'%7D&_=1576552412524',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }  
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                b_rec2 = b3['resultInfo']['data']['formTableData'][17].rec_id
                patrolID = b3['resultInfo']['data']['formTableData'][17].patrol_id
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }
    async function issendcheck(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/mis/inspect/issendcheck?recID='+b_rec2+'&_=1576552412587',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }  
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }
    async function sendchecktask(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/mis/inspect/sendchecktask',
            method:'post',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
            form:{
                recID:b_rec2,
                patrolID:patrolID,
                message:'测试2'
            }  
        }

        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }
    await login();
    await listdata();
    if (tank == -1) {
        await listmenu();
        await formdata();
        await issendcheck();
        ctx.body = await sendchecktask();
    }
        else{ctx.body = '未找到对应任务号'}
   
})



//第五步 核查完成批转结案--------------------------------------------------------------------------------
router.get('/fifth/:tasknumber',async (ctx,_next)=>{

    let UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
    let a =  '核查反馈未处理'
    let tasknumber = ctx.params.tasknumber
    let tank = 0 
    async function login(){

        var username = '149001002'
        var password = 'nbzhcg'
      
        let datas = {
            userName: username,
            password: password,
            ip: ' ',
            browserVersion: 'chrome/78.0.3904.108',
            osVersion: 'Win7/32'
        };

        let opts = {
            url: 'http://10.19.179.6/eUrbanMIS/login/validpassword',
            method: 'post',
            form: datas,
        };
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                reqcookie =  r.headers['set-cookie']
                if (e) {rej(e)}
                else{res(b3)}
            })
        })
    }

   async function listdata(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=30&currentPage=1&numPerPage=200&sortFieldID=-1&sortType=&_=1576456422344',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': UserAgent,
                Cookie:reqcookie,
            }  
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b) =>{
                b3 = JSON.parse(b)
                var object = b3['resultInfo']['data']['listDataSet']['listData']
                var count = Object.keys(object).length;
                //console.log(count)
                if (count == 0) {tank = 10}
                else{
                    for(i = 0;i<count;i++){
                        //console.log(i)
                        if (b3['resultInfo']['data']['listDataSet']['listData'][i].task_num == tasknumber ) {
                            tank = -1
                            break;
                        }
                            else{tank++}
                    }
                }
                if (tank == -1) {
                    b_rec = b3['resultInfo']['data']['listDataSet']['listData'][i].rec_id
                    b_act = b3['resultInfo']['data']['listDataSet']['listData'][i].act_id
                    tasknum = b3['resultInfo']['data']['listDataSet']['listData'][i].task_num
                    act_property_id = b3['resultInfo']['data']['listDataSet']['listData'][i].act_property_id
                    //console.log(3)
                    if (e) {rej(e)}
                        else{res(b3)}
                }
                    else{
                        if (e) {rej(e)}
                        else{res(' 未找到对应任务号')}
                    }
            })
        })
    }

   async function listmenu(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/menu/gethumantasklistmenu?recID='+b_rec+'&actID='+b_act+'&taskListID=30&_=1576657363543',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }
    async function formdata(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/form/formpreview/getformdata?formID=6&param=%7B%22recID%22%3A'+b_rec+'%2C%22actID%22%3A'+b_act+'%7D&_=1576744069571',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }  
        } 
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                check = b3['resultInfo']['data']['formTableData'][17].check_msg_state_id
                rqq = b3['resultInfo']['data']['formTableData'][17].rec_id
                //console.log(check)
                //console.log(rqq)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }
    async function assign(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS//home/workflow/assign',
            method:"post",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
            form:{
                taskListID: '30',
                taskListName: 'accept_checklist',
                tasknum:tasknum,
                recDispNum:'',
                menuName: 'transit',
                recID:b_rec,
                actID:b_act,
                actPropertyID:act_property_id
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }
    async function transtree(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/workflow/gettranstree?actID='+b_act+'&itemType=transit&_=1576552413176',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
                }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }
    async function transit(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/workflow/transit',
            method:'post',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
            form:{
                actID:b_act,
                taskListID: '30',
                transInfo:'313,6543,0;',
                opinion:'已批转(测试)'
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }


    await login();
    await listdata();
    if (tank == -1) {
        await listmenu();
        await formdata();
        //console.log(check)
        //check = 1/2/3/4/5 表示 核查状态 例如1 = 未发送核查信息/5 = 核查信息已审核 
        if (check == '5') { 
            await assign();
            await transtree();
            ctx.body = await transit();
        }
            else{ctx.body = a}
    }
        else{
            ctx.body = '未找到对应任务号'
        }

})




//第六步 结案--------------------------------------------------------------------------------
router.get('/sixth/:tasknumber',async(ctx,_next)=>{
    let UserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
    let tasknumber = ctx.params.tasknumber
    let tank = 0 
    async function login(){

        var username = '%E6%85%88%E6%BA%AA%E5%B8%82%E6%A1%88%E5%8D%B7%E5%AE%A1%E6%9F%A5%E5%91%98'
        var password = 'nbzhcg'
      
        let datas = {
            userName: username,
            password: password,
            ip: ' ',
            browserVersion: 'chrome/78.0.3904.108',
            osVersion: 'Win7/32'
        };

        let opts = {
            url: 'http://10.19.179.6/eUrbanMIS/login/validpassword',
            method: 'post',
            form: datas,
        };
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                reqcookie =  r.headers['set-cookie']
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }

    async function listdata(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=2&currentPage=1&numPerPage=200&sortFieldID=-1&sortType=&_=1576456422344',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': UserAgent,
                Cookie:reqcookie,
            }  
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b) =>{
                b3 = JSON.parse(b)
                var object = b3['resultInfo']['data']['listDataSet']['listData']
                var count = Object.keys(object).length;
                //console.log(count)
                if (count == 0) {tank = 10}
                    else{
                        for(i = 0;i<count;i++){
                        //console.log(i)
                        if (b3['resultInfo']['data']['listDataSet']['listData'][i].task_num == tasknumber ) {
                            tank = -1
                            break;
                        }
                            else{tank++}
                        }
                    }

                if (tank == -1) {
                    b_rec = b3['resultInfo']['data']['listDataSet']['listData'][i].rec_id
                    b_act = b3['resultInfo']['data']['listDataSet']['listData'][i].act_id
                    tasknum = b3['resultInfo']['data']['listDataSet']['listData'][i].task_num
                    act_property_id = b3['resultInfo']['data']['listDataSet']['listData'][i].act_property_id
                    //console.log(3)
                    if (e) {rej(e)}
                        else{res(b3)}
                }
                    else{
                        if (e) {rej(e)}
                            else{res(' 未找到对应任务号')}
                    }
            })
        })
    }

    async function listmenu(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/menu/gethumantasklistmenu?recID='+b_rec+'&actID='+b_act+'&taskListID=2&_=1576657363543',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }

    async function formdata(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/form/formpreview/getformdata?formID=6&param=%7B%22recID%22%3A'+b_rec+'0%2C%22actID%22%3A'+b_act+'%7D&_=1576657363552',
            method:'get',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }

    async function assign(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS//home/workflow/assign',
            method:'post',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
            form:{
                taskListID: 2,
                taskListName: 'rec_mylist',
                tasknum:tasknum,
                recDispNum:'',
                menuName: 'finish',
                recID: b_rec,
                actID: b_act
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }

    async function finish(){

        let opts = {
            url:'http://10.19.179.6/eUrbanMIS/home/workflow/finish',
            method:'post',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent':UserAgent,
                Cookie:reqcookie,
            },
            form:{
                actID: b_act,
                archiveTypeID: 1,
                opinion: '该问题经采集员核查，问题已经处理好，同意结案。'
            }
        }
        return new Promise(function(res,rej){
            request(opts,(e,r,b)=>{
                b3 = JSON.parse(b)
                if (e) {rej(e)}
                    else{res(b3)}
            })
        })
    }

   
    await login();
    await listdata();
    if (tank == -1 ) {
        await listmenu();
        await formdata();
        await assign();
        ctx.body = await finish();
    }
        else{
            ctx.body = '未找到对应任务号'
        }
})


module.exports = router