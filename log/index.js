var path = require("path");
const log4js = require('log4js');
log4js.configure({
  appenders: {
   cheese: {
    type: 'file',
     filename: 'log/cheese.log',
     maxLogSize:10,//文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
	} 
},
  //trace，debug，info，warn，error，fatal 
  categories: { default: { appenders: ['cheese'], level: 'trace' } }
});

const logger = log4js.getLogger('cheese');

module.exports=logger