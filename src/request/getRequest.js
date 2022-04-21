import  serve from "./request";
function myserve(){
    this.serve = serve;
    this.nowhandle = null;
}
/**
 * name:String 模块的名字,如user,shop等
 * urlObj:Object 模块对应的接口对象
 * 作用:接口api化
 */
myserve.prototype.parseRouter = function(name,urlObj){
    this[name]={};
    Object.keys(urlObj).forEach(apiName=>{
        //固定参数,达到颗粒化
        this[name][apiName]=this.sendMsg.bind(this,name,apiName,urlObj[apiName])
        this[name][apiName].state="ready";
    })
}
//绑定组件
myserve.prototype.v = function(vueObj){
    this.nowhandle = vueObj
    return this;
}
/**
 * 核心操作
 * moduleName:接口模块名称
 * apiName:接口名称
 * urlName:接口地址
 * config:可扩展参数,可自定义
 */
myserve.prototype.sendMsg = function(moduleName,apiName,url,configs){
    var config= configs || {};          //传递的可扩展参数
    var type = config.type || "get";    //请求类型,get,post等以便于axios.get或者axios.post
    var data = config.data || {};       //请求参数,没有默认为{}
    var bindName = config.bindName || apiName;  //如果没有指定要在data上绑定的属性名,就把接口属性绑定到data上
    var self = this;           //绑定this指向,在该作用域中都可使用
    //分模块
    //效果模块 如loading
    /**
     * 
     * @param {*} mes 
     * 在这里可以做一系列操作,比如显示loading
     * 当前函数中的作用是请求之后把该方法的state=ready,
     * ready:可以请求  waiting:不可发起请求
     * @returns 
     */
    var before = function (mes) {
        self[moduleName][apiName].state="ready"
        return mes;
    }
    //数据处理模块 如获取数据
    /**
     * 在当前组件的data上绑定属性,属性名为接口名
     */
    var defaultFn = function (mes) {
        self.nowhandle[bindName]=mes.data
    }
    /**
     * 如果没有传入默认操作数据格式,则默认使用defaultFn绑定数据到data上
     */
    var success = config.success || defaultFn;
    /**
     * 判断该方法是否可以请求,如果可以,则开始请求,由于是异步请求,所以在请求开始后把状态改为不可请求(waiting)
     */
    if(this[moduleName][apiName].state=="ready"){
        /**
         * 发起请求 this.serve.type().then(before).then(success)
         * type:get/post/...
         */
        this.serve[type](url,data).then(before).then(success)
        /**
         * 请求发起,改当前请求的状态为不可再请求(waiting),只有请求结束后在before这个回调中改为可请求(ready)状态
         */
        this[moduleName][apiName].state="waiting"
    }
}

export default new myserve();