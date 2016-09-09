const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 连接数据库 
mongoose.connect('mongodb://127.0.0.1/zyqa');
// 获取数据库连接
const conn = mongoose.connection;
// 监听连接事件
conn.on('connected', () => {
    console.log('数据库连接成功...')
})
// 创建数据模型
// 数据模型是表示一个事物的对象（类）
// 在计算机中通常会使用模型来代表一类事物
// 模型中包含与该类事物相关的数据和功能
// 数据会变成模型中的属性
// 功能会变成模型中的方法（函数）
// 第一个参数表示模型的数据所在的集合
// 第二个参数表示模型中的数据都有哪些属性，及这些属性的数据类型
// Schema模式 对数据的描述
const userSchema = Schema({
    account: String,
    password: String,
    photo: String,
    createTime: Date,
    ip: String
})
exports.User = mongoose.model('users', userSchema)
const keywordSchema = Schema({
    text: String,
    createUser: {type:Schema.Types.ObjectId,ref:'users'},
    createTime: Date,
    ip: String
})
exports.Keyword = mongoose.model('keywords', keywordSchema)
const questionSchema = Schema({
    text: String,
    keyword: String,
    createUser: {type:Schema.Types.ObjectId,ref:'users'},
    createTime: Date,
    ip: String
})
exports.Question = mongoose.model('questions', questionSchema)
// 写法一
// exports.toData = function (m) {
//     // 通过数据库返回的models(集合)中的model不是纯数据
//     // 通过map方法将每一个model都转换成纯数据，并且
//     // 处理内部的——id（object），将之转换成字符串
//     // map返回的是数组
//     // console.log('models1==',models)
//     // console.dir('mm1=',m)
//     // console.log('mm2=',typeof m)
//     // console.log('m0=',m) 
//     //得到的是纯数据this._doc  
//     // (把一个模型转换为纯数据)                                             
//     m = m.toObject();
//     // console.log('m1=',m)
//     m.id = m._id.toString();
//     m.createTime = tools.formatDateTime(new Date(m.createTime));
//     // console.log('Time==',m.createTime)
//     // console.log('m2=',m)                
//     delete m._id;
//     // console.log('m3=',m)                
//     return m;
// }
// 写法二
exports.toData = m => {
    m = m.toObject();
    m.id = m._id.toString();
    delete m._id;
    return m;
}
exports.toDatas = function (models) {
    return models.map(m => exports.toData(m));
}