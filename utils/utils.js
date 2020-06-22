String.prototype.format = function() {
    var values = arguments;
    return this.replace(/\{(\d+)\}/g, function(match, index) {
        if (values.length > index) {
            return values[index];
        } else {
            return "";
        }
    });
};

exports.getRandom=function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
exports.eventsrc = function(a){
        if (a = '内河督办') {
            return 51
        }
        else if (a = '物联网上报') {
            return 50 
        }
        else if (a = 'E宁波') {
            return 49
        }
        else if (a = '北仑路长') {
            return 48 
        }
        else if (a = '井盖报警') {
            return 47
        }
        else if (a = '广告审批') {
            return 46 
        }
        else if (a = '卫星上报') {
            return 45
        }
        else if (a = '智能分析') {
            return 41
        }
        else if (a = '督查检查') {
            return 36
        }
        else if (a = '视频监控') {
            return 34
        }
        else if (a = '网络上报') {
            return 33
        } 
        else if (a = '媒体监督') {
            return 31
        } 
        else if (a = '热线举报') {
            return 11
        } 
        else if (a = '自行处置上报') {
            return 7
        } 
        else if (a = '甬城管+') {
            return 6
        } 
        else if (a = '领导督办') {
            return 5
        } 
        else if (a = '专项普查') {
            return 4
        } 
        else if (a = '执法发现') {
            return 3
        } 
        else if (a = '考评发现') {
            return 2
        } 
        else if (a = '巡查发现') {
            return 1
        } 
}


exports.streetnametoID = function(a){
        if (a = '坎墩街道') {
            return 143
        }
        else if (a = '白沙路街道') {
            return 144 
        }
        else if (a = '横河镇') {
            return 145
        }
        else if (a = '古塘街道') {
            return 146 
        }
        else if (a = '浒山街道') {
            return 147
        }
        else if (a = '宗汉街道') {
            return 148 
        }
        else if (a = '慈溪市网格外街道') {
            return 178
        }
        else if (a = '周巷镇') {
            return 184
        }
        else if (a = '观海卫镇') {
            return 191
        }
        else if (a = '逍林镇') {
            return 192
        }
        else if (a = '龙山镇') {
            return 193
        } 
        else if (a = '匡堰镇') {
            return 215
        } 
        else if (a = '桥头镇') {
            return 220
        } 
        else if (a = '横河镇') {
            return 250
        } 
        else if (a = '新浦镇+') {
            return 251
        } 
        else if (a = '附海镇') {
            return 252
        } 
        else if (a = '长河镇') {
            return 253
        } 
        else if (a = '胜山镇') {
            return 254
        } 
        else if (a = '掌起镇') {
            return 255
        } 
        else if (a = '崇寿镇') {
            return 256
        } 
}


exports.communitynametoID = function(a){
        if (a = '二灶江') {
            return 10019
        }
        else if (a = '隆兴村') {
            return 10012 
        }
        else if (a = '八字桥村') {
            return 10013
        }
        else if (a = '后赖王') {
            return 10014 
        }
        else if (a = '华东轻纺针织城') {
            return 10015
        }
        else if (a = '慈溪育才中学') {
            return 10021 
        }
        else if (a = '宏坚村') {
            return 10022
        }
        else if (a = '乌山村') {
            return 10009
        }
        else if (a = '相士地村') {
            return 10025
        }
        else if (a = '剑山村') {
            return 10026
        }
        else if (a = '乌山村') {
            return 10027
        } 
        else if (a = '石桥头村') {
            return 10002
        } 
        else if (a = '上傅家村') {
            return 10003
        } 
        else if (a = '太屺村') {
            return 10004
        } 
        else if (a = '西洋寺村') {
            return 10005
        } 
        else if (a = '担山跟社区') {
            return 10006
        } 
        else if (a = '界牌社区') {
            return 10020
        } 
        else if (a = '团圈村') {
            return 10029
        } 
        else if (a = '新世纪实验学校') {
            return 10949
        } 
        else if (a = '三碰桥社区') {
            return 10007
        } 
                else if (a = '楼家社区') {
            return 10008 
        }
        else if (a = '东山村') {
            return 10010
        }
        else if (a = '虞波社区') {
            return 10011 
        }
        else if (a = '天香桥村') {
            return 10023
        }
        else if (a = '阳明社区') {
            return 10024 
        }
        else if (a = '建字地村') {
            return 10032
        }
        else if (a = '乌山村') {
            return 10009
        }
        else if (a = '相士地村') {
            return 10025
        }
        else if (a = '剑山村') {
            return 10026
        }
        else if (a = '乌山村') {
            return 10027
        } 
        else if (a = '石桥头村') {
            return 10002
        } 
        else if (a = '上傅家村') {
            return 10003
        } 
        else if (a = '太屺村') {
            return 10004
        } 
        else if (a = '西洋寺村') {
            return 10005
        } 
        else if (a = '担山跟社区') {
            return 10006
        } 
        else if (a = '界牌社区') {
            return 10020
        } 
        else if (a = '团圈村') {
            return 10029
        } 
        else if (a = '新世纪实验学校') {
            return 10949
        } 
        else if (a = '崇寿镇') {
            return 256
        } 
}

exports.recTypeIDtoname = function(a){
        if (a = 1) {
            return '城市管理类'
        }
        else if (a = 2) {
            return '社会服务类' 
        }
        else if (a = 4) {
            return '专项普查'
        }
        else if (a = 5) {
            return '违法广告' 
        }
        else if (a = 6) {
            return '统一抄告'
        }
        else if (a = 7) {
            return '照明亮灯类' 
        }
        else if (a = 8) {
            return '古树名木类'
        }
        else if (a = 20) {
            return '简易执法'
        }
        else if (a = 40) {
            return '户外广告'
        }
        else if (a = 41) {
            return '三改一拆'
        }
        else if (a = 42) {
            return '综合执法'
        } 
        else if (a = 43) {
            return '广告案件'
        } 
        else if (a = 44) {
            return '内河管理类'
        } 
}

exports.eventTypeIDtoname = function(a){
        if (a = 1) {
            return '事件'
        }
        else if (a = 2) {
            return '部件' 
        }
        else if (a = 4) {
            return '专项普查'
        }
        else if (a = 405) {
            return '古树名木养护任务' 
        }
        else if (a = 448) {
            return '三改一拆'
        }
        else if (a = 452) {
            return '户外广告案件' 
        }
        else if (a = 612) {
            return '内河案件' 
        }
}

