var Sequelize = require('sequelize');
const Op = Sequelize.Op
var sequelize = new Sequelize('hst', 'hst', 'hust123456', {
    host: '10.55.8.80', // 数据库地址
    dialect: 'mysql', // 指定连接的数据库类型
    operatorsAliases: false,
	logging: false,
    pool: {
        max: 100, // 连接池中最大连接数量
        min: 0, // 连接池中最小连接数量
        idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    }

});


// 创建 model
var User = sequelize.define('User', {
    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
    tasknum: {
        type: Sequelize.STRING, // 指定值的类型
    },
    // 没有指定 field，表中键名称则与对象键名相同，为 email
    state: {
        type: Sequelize.STRING
    },
	endtime:{
		type: Sequelize.STRING
	},
	endtimehalf:{
		type: Sequelize.STRING
	},
	istoday:{
		type: Sequelize.STRING
	},
	nextpartstart:{
		type: Sequelize.STRING
	},
	isnow:{
		type: Sequelize.STRING
	},
	isnormal:{
		type: Sequelize.STRING
	},
	ischanged:{
		type: Sequelize.STRING
	},
	typeid:{
		type: Sequelize.STRING
	},
	newInstCondID: {
        type: Sequelize.STRING
    },
	partID: {
        type: Sequelize.STRING
    },
	account: {
        type: Sequelize.STRING
    },
	password: {
        type: Sequelize.STRING
    },
	islocked: {
        type: Sequelize.STRING
    },
	finaltime:{
		type: Sequelize.STRING
	},
	shoudongtime:{
		type: Sequelize.STRING
	},
	person:{
		type: Sequelize.STRING
	},
	createTime:{
		type: Sequelize.STRING
	},
	departName:{
		type: Sequelize.STRING
	},
	nbStatus:{
		type: Sequelize.STRING
	},
	isWrong:{
		type: Sequelize.STRING
	},
	departAccount:{
		type: Sequelize.STRING
	},
	oldStatus:{
		type: Sequelize.STRING
	},
	newStatus:{
		type: Sequelize.STRING
	},
	isjieru:{
		type: Sequelize.STRING
	},
	isStop:{
		type: Sequelize.STRING
	},
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true
});
var stopmark = sequelize.define('stopmark', {
    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
    mainmark: {
        type: Sequelize.STRING, // 指定值的类型
    },
    // 没有指定 field，表中键名称则与对象键名相同，为 email
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true
});
var account = sequelize.define('account', {
    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
    name: {
        type: Sequelize.STRING, // 指定值的类型
    },
    // 没有指定 field，表中键名称则与对象键名相同，为 email
    partID: {
        type: Sequelize.STRING
    },
	account:{
		type: Sequelize.STRING
	},
	password: {
        type: Sequelize.STRING
    }
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true
});

var rechelper = sequelize.define('rechelper', {
    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
    typeID: {
        type: Sequelize.STRING, // 指定值的类型
    },
    // 没有指定 field，表中键名称则与对象键名相同，为 email
    typeName: {
        type: Sequelize.STRING
    },
	newInstCond:{
		type: Sequelize.STRING
	},
	newInstCondID: {
        type: Sequelize.STRING
    },
	deadlineLimit: {
        type: Sequelize.STRING
    },
	durationUnitName: {
        type: Sequelize.STRING
    },
	realtime: {
        type: Sequelize.STRING
    },
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true
});

var humanCase = sequelize.define('humanCase', {
    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
    human: {
        type: Sequelize.STRING, // 指定值的类型
    },
    // 没有指定 field，表中键名称则与对象键名相同，为 email
    Case: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});
var departName = sequelize.define('departName', {
    ID : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
    partname: {
        type: Sequelize.STRING, 
    },
    Realname: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});
exports.addUserFalse = function(tasknum,account,password,typeid,newInstCondID,departName,nowtime) {
    return User.create({
        tasknum: tasknum,
        state: '已加入数据库',
		account:account,
		password:password,
		typeid:typeid,
		newInstCondID:newInstCondID,
		islocked:'N',
		isnormal:3,
		ischanged:0,
		isWrong:2,
		departName:departName,
		createTime:nowtime,
		nbStatus:'案件已登记，处于立案阶段',
		isjieru:"N",
		isStop:"N"
    }).then(function(result){
		return '成功';
    }).catch(function(err){
        console.log("添加数据发生错误："+err)
		return '失败';
    });
};

exports.addUser = function(tasknum,account,password,typeid,newInstCondID,departName,nowtime) {
    return User.create({
        tasknum: tasknum,
        state: '已选择立案',
		account:account,
		password:password,
		typeid:typeid,
		newInstCondID:newInstCondID,
		islocked:'N',
		isnormal:3,
		ischanged:0,
		isWrong:2,
		departName:departName,
		createTime:nowtime,
		nbStatus:'已选择立案',
		isjieru:"N",
		isStop:"N"
    }).then(function(result){
        //console.log("插入操作成功"+result);
		return '成功';
    }).catch(function(err){
        console.log("添加数据发生错误："+err)
		return '失败';
    });
};

exports.addhumanCase = function(tasknum,account) {
    // 向 humanCase 表中插入数据
    return humanCase.create({
        Case: tasknum,
		human:account
    }).then(function(result){
        //console.log("插入操作成功"+result);
		return '成功';
    }).catch(function(err){
        console.log("添加数据发生错误："+err)
		return '失败';
    });
};

exports.destroy = function(tasknum){
    return User.destroy(
	{where:{tasknum:tasknum
		}}).then(function(result){
        	//console.log("delete success");
    	}).catch(function(err){
        	console.log("delete data err: "+err);
    	});
}
exports.restart = function(){
    return  stopmark.update({mainmark:"go"},
	{where:{ID:1
		}}).then(function(result){
			console.log("重新启动stopmark成功")
			return true;
        }).catch(function(err){
           	console.log("重新启动stopmark失败: " + err)
			return false;
    }); 
}
// exports.restartUser = function() {
// 	sql = "update User set isStop = 'go' where state !='已结案' and state !='手动'   "
// 	return User.sequelize.query(sql, {
//       type: User.sequelize.QueryTypes.SELECT
//     })
// }
exports.restartUser = function() {
    return User.update({isStop:"go"},
	{where:{state:{[Op.ne]:"已结案"}}
		}).then(function(result){
            console.log("重新启动成功")
			return true;
        }).catch(function(err){ 
            console.log("重新启动失败: " + err)
			return false;
        });
};
exports.stop = function(){
    return  stopmark.update({mainmark:"stop"},
	{where:{ID:1},
		}).then(function(result){
			console.log("暂停stopmark成功")
			return true;
        }).catch(function(err){
			console.log("暂停stopmark失败: " + err)
			return false;
    }); 
}
// exports.stopUser = function() {
// 	sql = "update User set isStop = 'stop' where state !='已结案' and state !='手动'   "
// 	return User.sequelize.query(sql, {
//       type: User.sequelize.QueryTypes.SELECT
//     })
// }
exports.stopUser = function() {
    return User.update({isStop:"stop"},
	{where:{state:{[Op.ne]:"已结案"}}
		}).then(function(result){
            console.log("暂停成功")
			return true;
        }).catch(function(err){ 
            console.log("暂停失败: " + err)
			return false;
        });
};

exports.findstopmark = function() {
    return stopmark.findOne(
	{where:{ID:1,
		}}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){ 
            console.log("发生错误：" + err);
			return null;
        });
};
exports.findbyjieru = function() {
    return User.findAll(
	{where:{isjieru:"Y"},
		}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){ 
            console.log("发生错误：" + err);
			return null;
        });
};
exports.findpartIDbydepartName = function(departName) {
    return User.findOne(
	{where:{departName:departName},
		}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){ 
            console.log("发生错误：" + err);
			return null;
        });
};
exports.findone = function() {
    return User.findOne(
	{where:{state:'已加入数据库',islocked:'N',isStop:"go",isnormal:{[Op.ne]:0}},'order':[['createTime']],
		}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){ 
            console.log("发生错误：" + err);
			return null;
        });
};
exports.updateAccount = function(account22,tasknum){
    return  User.update({departAccount:account22},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"更新部门账号成功");
			return true;
        }).catch(function(err){
           	console.log("任务号: "+tasknum+"更新部门账号成功出错："+err);
			return false;
    }); 
}
exports.updateonelocked = function(tasknum){
    return  User.update({islocked:'Y'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"选择立案条件步骤已锁定");
			return true;
        }).catch(function(err){
           	console.log("选择立案条件步骤锁定操作出错："+err);
			return false;
    }); 
}

exports.updateunlockedall = function(tasknum){
    return  User.update({islocked:'N'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"步骤解锁");
			return true;
        }).catch(function(err){
			console.log("解锁操作出错："+err);
			return false;
           	
    }); 
}
exports.updateunlockedone = function(tasknum){
    return  User.update({islocked:'N'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"步骤解锁");
			return true;
        }).catch(function(err){
			console.log("解锁操作出错："+err);
			return false;
           	
    }); 
}
exports.updateunlockedtwo = function(tasknum){
    return  User.update({islocked:'N'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"步骤解锁");
			return true;
        }).catch(function(err){
			console.log("解锁操作出错："+err);
			return false;
           	
    }); 
}
exports.updateunlockedthree = function(tasknum){
    return  User.update({islocked:'N'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"步骤解锁");
			return true;
        }).catch(function(err){
			console.log("解锁操作出错："+err);
			return false;
    }); 
}
exports.updateunlockedfour = function(tasknum){
    return  User.update({islocked:'N'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"步骤解锁");
			return true;
        }).catch(function(err){
			console.log("解锁操作出错："+err);
			return false;
           	
    }); 
}
exports.updateunlockedfive = function(tasknum){
    return  User.update({islocked:'N'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"步骤解锁");
			return true;
        }).catch(function(err){
			console.log("解锁操作出错："+err);
			return false;
           	
    }); 
}
exports.updateunlockedsix = function(tasknum){
    return  User.update({islocked:'N'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"步骤解锁");
			return true;
        }).catch(function(err){
			console.log("解锁操作出错："+err);
			return false;
    }); 
}
exports.findtwo = function() {
    return User.findOne(
	{where: {state:'已选择立案',islocked:'N',isStop:"go",isnormal:{[Op.ne]:0}},'order':[['createTime']],
		}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){ 
            console.log("查询已选择立案任务号发生错误：" + err);
			return null;
        });
};

exports.updatetwolocked = function(tasknum){
    return  User.update({islocked:'Y'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"案件批转步骤已锁定");
			return true;
        }).catch(function(err){
			console.log("锁定操作出错："+err);
			return false;
           	
    }); 
}

exports.findthreeUsual = function(time) {
    return User.findOne(
	{where: {state:'已批转，等待部门回复',islocked:'N',isStop:"go",endtimehalf:{[Op.lte]:time},isnormal:{[Op.ne]:0}},'order':[['endtimehalf']],
		}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){ 
            console.log("查询已批转任务号发生错误：" + err);
			return null;
        });
};

exports.findthree2 = function(time) {
    return User.findAll(
	{where: {state:'已批转，等待部门回复',islocked:'N',isStop:"go",endtimehalf:{[Op.lte]:time},isnormal:{[Op.ne]:0}},'order':[['endtimehalf']],limit:1
		}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){ 
            console.log("查询已批转任务号发生错误：" + err);
			return null;
        });
};

exports.updatethreelocked = function(tasknum){
    return  User.update({islocked:'Y'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"部门回复步骤已锁定");
			return true;
        }).catch(function(err){
			console.log("锁定操作出错："+err);
			return false;
    }); 
}

exports.findfour = function() {
    return User.findAll(
	{where: {state:'部门回复已完成',islocked:'N',isStop:"go",isnormal:{[Op.ne]:0}},limit:1,order:[['endtimehalf']]
		}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){ 
            console.log("查询部门回复完成任务号发生错误：" + err);
			return null;
        });
};

exports.updatefourlocked = function(tasknum){
    return  User.update({islocked:'Y'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"发送核查信息步骤已锁定");
			return true;
        }).catch(function(err){
           	console.log("锁定操作出错："+err);
			return false;
    }); 
}

exports.findfive = function() {
    return User.findAll(
	{where: {state:'已发送核查信息',isnow:1,isStop:"go",isnormal:{[Op.ne]:0}},'order':[['endtimehalf']],limit:1
		}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){
            console.log("查询已发送核查信息任务号发生错误：" + err);
			return null;
        });
};
exports.Recover = function(tasknum,newStatus){
    return  User.update({state:newStatus,isjieru:"N",isnormal:3},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"介入重启(已加入数据库 => 已选择立案)成功");
			return true;
        }).catch(function(err){
			console.log("任务号: "+tasknum+"介入重启(已加入数据库 =>已选择立案)失败: "+err);		
			return false;	
    }); 
}
exports.Recover2 = function(tasknum,newStatus,endtimehalf,departAccount){
    return  User.update({state:newStatus,isjieru:"N",endtimehalf:endtimehalf,departAccount:departAccount,isnormal:3},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"介入重启(已选择立案 => 已批转，等待部门回复)成功");
			return true;
        }).catch(function(err){
           	console.log("任务号: "+tasknum+"介入重启(已选择立案 => 已批转，等待部门回复)失败: "+err);	
			return false;	
    }); 
}
exports.Recover3 = function(tasknum,newStatus){
    return  User.update({state:newStatus,isjieru:"N",isnormal:3},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"介入重启(已批转，等待部门回复 =>部门回复已完成)成功");
			return true;
        }).catch(function(err){
			console.log("任务号: "+tasknum+"介入重启(已批转，等待部门回复 =>部门回复已完成)失败: "+err);	
			return false;	
    }); 
}
exports.Recover4 = function(tasknum,newStatus,nowtime){
    return  User.update({state:newStatus,isjieru:"N",nextpartstart:nowtime,isnormal:3},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"介入重启(部门回复已完成 => 已发送核查信息)成功");
			return true;
        }).catch(function(err){
			console.log("任务号: "+tasknum+"介入重启(部门回复已完成 => 已发送核查信息)失败: "+err);
			return false;	
    }); 
}
exports.Recover5 = function(tasknum,newStatus){
    return  User.update({state:newStatus,isjieru:"N",isnormal:3},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"介入重启(已发送核查信息 => 核查信息已通过，进入结案阶段)成功");
			return true;
        }).catch(function(err){
			console.log("任务号: "+tasknum+"介入重启(已发送核查信息 => 核查信息已通过，进入结案阶段)失败: "+err);	
			return false;	
    }); 
}
exports.Recover6 = function(tasknum,newStatus,nowtime){
    return  User.update({state:newStatus,isjieru:"N",finaltime:nowtime,isnormal:3},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"介入重启(核查信息已通过，进入结案阶段 => 已结案)成功");
			return true;
        }).catch(function(err){
			console.log("任务号: "+tasknum+"介入重启(核查信息已通过，进入结案阶段 => 已结案)失败: "+err);
			return false;	
    }); 
}
exports.updatejieru = function(tasknum,oldStatus,newStatus){
    return  User.update({oldStatus:oldStatus,newStatus:newStatus,isjieru:"Y"},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"介入成功,介入步骤为: "+oldStatus);
			return true;
        }).catch(function(err){
           	console.log("任务号: "+tasknum+"介入失败,介入步骤为: "+oldStatus+"失败原因: "+ err);
			return false;	
    }); 
}
exports.updatefivelocked = function(tasknum){
    return  User.update({islocked:'Y'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"核查信息完毕步骤已锁定");
			return true;
        }).catch(function(err){
           	console.log("锁定操作出错："+err);
			return false;	
    }); 
}

exports.findsix = function() {
    return User.findAll(
	{where: {state:'核查信息已通过，进入结案阶段',isStop:"go",islocked:'N',isnormal:{[Op.ne]:0}},'order':[['endtimehalf']],limit:1
		}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){
            console.log("查询核心信息通过任务号发生错误：" + err);
			return null;
        });
};

exports.updatesixlocked = function(tasknum){
    return  User.update({islocked:'Y'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"慈溪结案步骤已锁定");
			return true;
        }).catch(function(err){
			console.log("任务号: "+tasknum+"锁定出错："+err);
			return false;
           	
    }); 
}

exports.findpartID = function(tasknum) {
    return User.findOne(
	{where: {tasknum: tasknum
        }}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){
            console.log("查询partID发生错误：" + err);
			return null;
        });
};

exports.findaccount = function(partID) {
    return account.findOne(
	{where: {partID:partID
        }}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){
            console.log("查询partID对应账号发生错误：" + err);
			return null;
        });
};

exports.findreatime = function(typeid,newInstCondID) {
    return rechelper.findOne(
	{where: {typeid:typeid,newInstCondID:newInstCondID
        }}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){
            console.log("查询对应时间发生错误：" + err);
			return null;
        });
};

exports.selectthing = function(tasknum) {
    return User.findOne({where: {tasknum:tasknum
        }}).then(function(result){
            return result
        }).catch(function(err){
            console.log("发生错误：" + err);
        });
};

exports.selectthing2 = function() {
    return User.findAll({where: {state:'已结案'
        },limit:2}).then(function(result){
            return result
        }).catch(function(err){
            console.log("发生错误：" + err);
        });
};

exports.isWrongupdate = function(time){
	    return  User.update({isWrong:'1'},
		{where:{state:"已结案xx",nextpartstart:{[Op.lte]:time}
			}}).then(function(result){
				console.log('isWrongupdate完成');
				return true;
	        }).catch(function(err){
	           	console.log("isWrongupdate更新出错："+err);
				return false;
	    }); 
}

exports.updatestateEveryday2 = function(todaystart,todayend){
	    return  User.update({istoday:'Y',isnow:'N'},
		{where:{endtimehalf:{[Op.between]:[todaystart,todayend]},istoday:'N'
			}}).then(function(result){
				console.log('每日更行状态完成');
				return true;
	        }).catch(function(err){
	           	console.log("更新操作出错："+err);
				return err;
	    }); 
}

exports.updateone = function(tasknum){
    return  User.update({state:'已选择立案'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"选择立案步骤已完成，更新状态为: 已选择立案");
			return true;
        }).catch(function(err){
			console.log("更新操作出错："+err);
			return false;
           	
    }); 
}

exports.updatetwo = function(tasknum,endtime,endtimehalf){
    return  User.update({state:'已批转，等待部门回复',endtime:endtime,endtimehalf:endtimehalf},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"案件批转步骤已完成，更新状态为: 已批转，等待部门回复以及时间更新完成");
			return true;
           	//console.log("update success: "+result);
        }).catch(function(err){
			console.log("第二步更新操作出错："+err);
			return false;
           	
    }); 
}

exports.updatethree = function(tasknum){
    return  User.update({state:'部门回复已完成'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"部门回复步骤已完成，更新状态为: 部门回复已完成");
			return true;
           	//console.log("update success: "+result);
        }).catch(function(err){
			console.log("第三步更新操作出错："+err);
			return false;
    }); 
}

exports.updatefour = function(tasknum,nowtime){
    return  User.update({state:'已发送核查信息',nextpartstart:nowtime},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"发送核查信息步骤已完成，更新状态为: 已发送核查信息");
			return true;
           	//console.log("update success: "+result);
        }).catch(function(err){
			console.log("第四步更新操作出错："+err);
			return false;
           	
    }); 
}

exports.updatefive = function(tasknum){
    return  User.update({state:'核查信息已通过，进入结案阶段'},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"核查信息完毕步骤已完成，更新状态为: 核查信息已通过，进入结案阶段");
			return true;
           	//console.log("update success: "+result);
        }).catch(function(err){
			console.log("第五步更新操作出错："+err);
			return false;
           	
    }); 
}

exports.updatesix = function(tasknum,time){
    return  User.update({state:'已结案',finaltime:time},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"慈溪结案步骤已完成，更新状态为: 已结案");
			return true;
           	//console.log("update success: "+result);
        }).catch(function(err){
			console.log("第六步更新操作出错："+err);
			return false;
           	
    }); 
}



//更新partID在第二步caseapproval中的底部
exports.updatepartID = function(partID,tasknum){
    return  User.update({partID:partID},
	{where:{tasknum:tasknum
		}}).then(function(result){
			return result;
           	//console.log("update success: "+result);
        }).catch(function(err){
			console.log("partID更新操作出错："+err);
			return false; 	
    }); 
}
//更新isnormal
exports.updateIsnormal = function(tasknum,site){
    return  User.update({isnormal:site},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("updateIsnormal.tasknum: "+tasknum);
			return result;
        }).catch(function(err){
			console.log("isnormal更新操作出错："+err);
			return err;
    }); 
}
exports.IsnormalRecover = function(tasknum){
    return  User.update({isnormal:3},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("IsnormalRRecover: "+tasknum);
			return result;
        }).catch(function(err){
			console.log("IsnormalRRecover更新操作出错："+err);
			return err;
    }); 
}

exports.findbytasknum = function(tasknum) {
    return User.findOne(
	{where: {tasknum: tasknum
        }}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){
            console.log("查询partID发生错误：" + err);
			return null;
        });
};

//更新
exports.updateNextstart = function(tasknum,nowtime){
	return  User.update({isnow:1,nextpartstart:nowtime,},
	{where:{tasknum:tasknum
		}}).then(function(result){
			return true;
	    }).catch(function(err){
			console.log("updateNextstart出错："+err);
			return err;
	        
	}); 
}


exports.updateischanged = function(tasknum){
	    return  User.update({isnormal:0},
		{where:{tasknum:tasknum
			}}).then(function(result){
				return true;
	        }).catch(function(err){
				console.log("updateischanged出错："+err);
				return err;
	           	
	    }); 
}


///------------------------       view => caseState      ---------------------------
exports.casestateQuery = function() {
	sql = "select departAccount,isWrong,tasknum,state,endtimehalf,nextpartstart,isnormal,ischanged,isnow,islocked,createtime,nbStatus,departName,account from User where state !='已结案' and state !='手动' and isjieru ='N' order by islocked desc ,isnormal,isWrong,endtimehalf,nextpartstart  limit  10 "
	//console.log(sql)
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
exports.casestateQuerybytp = function(tp) {
	sql = "select departAccount,isWrong,tasknum,state,endtimehalf,nextpartstart,isnormal,ischanged,isnow,islocked,createtime,nbStatus,departName,account from User where state !='已结案' and state !='手动'and isjieru ='N' order by islocked desc ,isnormal,isWrong,endtimehalf,nextpartstart  limit ".format(tp) + tp +", 10 "
	//console.log(sql)
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
exports.casestateQuerycount = function() {
	sql = "select count(*) from User where state !='已结案' and state !='手动' order by isnormal,endtimehalf  limit 10 "
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
exports.casestateQueryClick = function(tasknum) {
	sql = "select departAccount,isWrong,tasknum,state,endtimehalf,nextpartstart,isnormal,ischanged,isnow,islocked,createtime,nbStatus,departName,account from User where state !='已结案' and state !='手动' and isjieru ='N'and (tasknum = '{0}' or '{0}' = '') order by islocked desc ,isnormal,isWrong,endtimehalf  limit 10 ".format(tasknum)
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
exports.casestateQueryClickcount = function(tasknum) {
	sql = "select count(*) from User where state !='已结案' and state !='手动' and (tasknum = '{0}' or '{0}' = '') order by isnormal,endtimehalf  limit 10 ".format(tasknum)
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
exports.gotowhere = function(tasknum,tp) {
	sql = "select departAccount,isWrong,tasknum,state,endtimehalf,nextpartstart,isnormal,ischanged,isnow,islocked,createtime,nbStatus,departName,account from User where state !='已结案' and state !='手动' and (tasknum = '{0}' or '{0}' = '') and isjieru ='N' order by  islocked desc ,isnormal ,isWrong,endtimehalf  limit ".format(tasknum,tp) + tp +", 10 "
   
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
}
//更新状态为手动
exports.updateshoudong = function(tasknum,person,time){
	    return  User.update({state:'手动',person:person,shoudongtime:time},
		{where:{tasknum:tasknum
			}}).then(function(result){
				return true;
	        }).catch(function(err){
				console.log("更新手动操作出错："+err);
				return err;
	    }); 
}
//createtime 降序
exports.createtimedown = function(tp) {
	sql = "select departAccount,isWrong,tasknum,state,endtimehalf,nextpartstart,isnormal,ischanged,isnow,islocked,createtime,nbStatus,departName,account from User where state !='已结案' and state !='手动' and isjieru ='N'order by createtime desc  limit  ".format(tp) + tp +", 10 "
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
//createtime 升序
exports.createtimeup = function(tp) {
	sql = "select departAccount,isWrong,tasknum,state,endtimehalf,nextpartstart,isnormal,ischanged,isnow,islocked,createtime,nbStatus,departName,account from User where state !='已结案' and state !='手动' and isjieru ='N'order by createtime  limit  ".format(tp) + tp +", 10 "
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
//autotime 降序
exports.autotimedown = function(tp) {
	sql = "select departAccount,isWrong,tasknum,state,endtimehalf,nextpartstart,isnormal,ischanged,isnow,islocked,createtime,nbStatus,departName,account from User where state !='已结案' and state !='手动' and isjieru ='N' order by endtimehalf desc  limit  ".format(tp) + tp +", 10 "
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
//autotime 升序
exports.autotimeup = function(tp) {
	sql = "select departAccount,isWrong,tasknum,state,endtimehalf,nextpartstart,isnormal,ischanged,isnow,islocked,createtime,nbStatus,departName,account from User where state !='已结案' and state !='手动' and isjieru ='N'order by endtimehalf  limit  ".format(tp) + tp +", 10 "
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};

///------------------------       view => endcase      ---------------------------
exports.endcasestateQuery = function() {
	sql = "select tasknum,state,endtimehalf,nextpartstart,isnormal,ischanged,isnow,finaltime from User where state ='已结案'  order by finaltime desc limit 10 "
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
exports.endcasestateQuerycount = function() {
	sql = "select count(*) from User where state ='已结案'  order by endtimehalf desc limit 10 "
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
exports.endcasestateQueryClick = function(tasknum) {
	sql = "select tasknum,state,endtimehalf,nextpartstart,ischanged,isnow,finaltime from User where state ='已结案'  and (tasknum = '{0}' or '{0}' = '') order by finaltime desc limit 10 ".format(tasknum)
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
exports.endcasestateQueryClickcount = function(tasknum) {
	sql = "select count(*) from User where state ='已结案'  and (tasknum = '{0}' or '{0}' = '') order by finaltime desc limit 10 ".format(tasknum)
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
//跳转
exports.endgotowhere = function(tasknum,tp) {
	sql = "select tasknum,state,endtimehalf,nextpartstart,ischanged,isnow,finaltime from User where state ='已结案'  and (tasknum = '{0}' or '{0}' = '')  order by  finaltime desc  limit ".format(tasknum,tp) + tp +", 10 "
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
}

///------------------------       view => shoudongcase      ---------------------------
exports.shoudongcasestateQuery = function() {
	sql = "select tasknum,state,endtimehalf,nextpartstart,isnormal,ischanged,isnow,shoudongtime,person from User where state ='手动'  order by shoudongtime desc limit 10 "
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
exports.shoudongcasestateQuerycount = function() {
	sql = "select count(*) from User where state ='手动'  order by shoudongtime desc limit 10 "
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
exports.shoudongcasestateQueryClick = function(tasknum) {
	sql = "select tasknum,state,endtimehalf,nextpartstart,ischanged,isnow,shoudongtime,person from User where state ='手动'  and (tasknum = '{0}' or '{0}' = '') order by shoudongtime desc limit 10 ".format(tasknum)
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
exports.shoudongcasestateQueryClickcount = function(tasknum) {
	sql = "select count(*) from User where state ='手动'  and (tasknum = '{0}' or '{0}' = '') order by shoudongtime desc limit 10 ".format(tasknum)
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
};
//跳转
exports.shoudonggotowhere = function(tasknum,tp) {
	sql = "select tasknum,state,endtimehalf,nextpartstart,ischanged,isnow,shoudongtime,person from User where state ='手动'  and (tasknum = '{0}' or '{0}' = '')  order by  shoudongtime desc  limit ".format(tasknum,tp) + tp +", 10 "
	return User.sequelize.query(sql, {
      type: User.sequelize.QueryTypes.SELECT
    })
}





exports.findRealpartName = function(partname) {
    return departName.findOne(
	{where: {partname:partname,
        }}).then(function(result){
            //console.log("成功：" + result);
			return result;
        }).catch(function(err){ 
            console.log("查询已批转任务号发生错误：" + err);
			return null;
        });
};





exports.updateNingboStatus = function(nbStatus,tasknum){
    return  User.update({nbStatus:nbStatus},
	{where:{tasknum:tasknum
		}}).then(function(result){
			console.log("任务号: "+tasknum+"更新宁波系统状态成功");
			return true;
        }).catch(function(err){
           	console.log("任务号: "+tasknum+"更新宁波系统状态出错: "+err);
			return false;
    }); 
}