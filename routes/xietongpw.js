const router = require('koa-router')()
const bodyParser = require('koa-bodyparser');
var http = require('http');
var url = require("url");
var querystring = require("querystring");
var request = require('request');
const fs = require('fs')





//协同平台 => 待办案件
router.get('/xietong/daiban/:username/:password', async (ctx,_next)=>{

      var username = ctx.params.username
      var password = ctx.params.password
     // var password = 'nbzhcg'

var getdata = function(username,password){

     var url2 = 'http://10.19.179.6/eUrbanMIS/login/validpassword'
     var url3 = 'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=2&currentPage=1&numPerPage=20&sortFieldID=-1&sortType=&onlyDataFlag=false&_=1574930745957'
  
    let datas = {
        userName: username,
        password: password,
        ip: ' ',
        browserVersion: 'chrome/78.0.3904.108',
        osVersion: 'Win7/32'
    };

    let opts = {
        url: url2,
        method: 'post',
        form: datas,
    };
    
    //模拟登陆                        

    
    return new Promise (function(res,rej){
        request(opts,(e, r, b) => {
                // console.log(r.headers['set-cookie']);
                // 登陆后
                let opts = {
                    url: url3,
                    method:'get',
                    headers: {
                        'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                        Cookie: r.headers['set-cookie'], //这里是登陆后得到的cookie,(重点)
                    }
                };
                request(opts,(e, r, b) => {
                        b =  JSON.parse(b)
                        b = b['resultInfo']['data']['listDataSet']['listData']
                        if (e) {rej(e)}
                            else{res(b)}
                });   
        })
    })
    
}
    ctx.body = await getdata(username,password)
    
})





//协同平台 => 挂账那件
router.get('/xietong/guazhang/:username/:password', async (ctx,_next)=>{

      var username = ctx.params.username
      var password = ctx.params.password
     // var password = 'nbzhcg'

var getdata = function(username,password){

     var url2 = 'http://10.19.179.6/eUrbanMIS/login/validpassword'
     var url3 = 'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=35&currentPage=1&numPerPage=20&sortFieldID=-1&sortType=&onlyDataFlag=false&_=1574930745957'
  
    let datas = {
        userName: username,
        password: password,
        ip: ' ',
        browserVersion: 'chrome/78.0.3904.108',
        osVersion: 'Win7/32'
    };

    let opts = {
        url: url2,
        method: 'post',
        form: datas,
    };
    
    //模拟登陆                        

    
    return new Promise (function(res,rej){
        request(opts,(e, r, b) => {
                // console.log(r.headers['set-cookie']);
                // 登陆后
                let opts = {
                    url: url3,
                    method:'get',
                    headers: {
                        'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                        Cookie: r.headers['set-cookie'], //这里是登陆后得到的cookie,(重点)
                    }
                };
                request(opts,(e, r, b) => {
                        b =  JSON.parse(b)
                        b = b['resultInfo']['data']['listDataSet']['listData']
                        if (e) {rej(e)}
                            else{res(b)}
                });   
        })
    })
    
}
    ctx.body = await getdata(username,password)
    
})





//协同平台 => 经办案件
router.get('/xietong/jingban/:username/:password', async (ctx,_next)=>{

     var username = ctx.params.username
     var password = ctx.params.password

var getdata = function(username,password){

     var url2 = 'http://10.19.179.6/eUrbanMIS/login/validpassword'
     var url3 = 'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=39&currentPage=1&numPerPage=20&sortFieldID=-1&sortType=&onlyDataFlag=false&_=1574930745957'
  
    let datas = {
        userName: username,
        password: password,
        ip: ' ',
        browserVersion: 'chrome/78.0.3904.108',
        osVersion: 'Win7/32'
    };

    let opts = {
        url: url2,
        method: 'post',
        form: datas,
    };
    
    //模拟登陆                        

    
    return new Promise (function(res,rej){
        request(opts,(e, r, b) => {
                // console.log(r.headers['set-cookie']);
                // 登陆后
                let opts = {
                    url: url3,
                    method:'get',
                    headers: {
                        'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
                        Cookie: r.headers['set-cookie'], //这里是登陆后得到的cookie,(重点)
                    }
                };
                request(opts,(e, r, b) => {
                        b =  JSON.parse(b)
                        b = b['resultInfo']['data']['listDataSet']['listData']
                        if (e) {rej(e)}
                            else{res(b)}
                });   
        })
    })
    
}
    ctx.body = await getdata(username,password)
    
})

module.exports = router