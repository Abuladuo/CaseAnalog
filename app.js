const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const lian = require('./routes/lian')
const lianpw = require('./routes/lianpw')
const xietongpw = require('./routes/xietongpw')
const xietong = require('./routes/xietong')
const monilogin = require('./routes/monilogin')
const MAIN = require('./routes/MAIN')
const convert = require('koa-convert')
const static = require('koa-static')
const path = require('path')
const LogJS = require('./log4')
const gofunction = require('./utils/gofunction')


 //gofunction.goconditionselect()
 //gofunction.gopartresponse()
 //gofunction.gocaseapproval()
 //gofunction.gosendcheck()
 //gofunction.gocheckover()
 //gofunction.goendcase()
    // error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'html'
}))
app.use(views(__dirname + '/views', {
    extension: 'vue'
}))

const staticPath = './static'
app.use(convert(static(
    path.join(__dirname, staticPath)
)))

// logger
app.use(async(ctx, next) => {
        const start = new Date()
        await next()
        const ms = new Date() - start
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
    //
    //bodyParser配置
    /*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(async ctx => {

        ctx.body = ctx.request.body;

    })
    */

// routes

app.use(lian.routes(), lian.allowedMethods())
app.use(lianpw.routes(), lianpw.allowedMethods())
app.use(monilogin.routes(), monilogin.allowedMethods())
app.use(MAIN.routes(), MAIN.allowedMethods())
//app.use(test.routes(), test.allowedMethods())
    //app.use(index.routes(), indexroutes.allowedMethods())
    //app.use(statisticesroutes.routes(), statisticesroutes.allowedMethods())
    //app.use(updataroutes.routes(), updataroutes.allowedMethods())
app.use(xietong.routes(), xietong.allowedMethods())
app.use(xietongpw.routes(), xietongpw.allowedMethods())
    // error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app