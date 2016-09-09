const exp = require('express'),
    db = require('../../db'),
    router = exp.Router();

router.get('/user/signin', (req, res) => {
    res.render('user/signin');
})

router.post('/api/user/signin', (req, res) => {
    console.log('req.body1=', req.body);
    // 在数据库中查找用户账号是否存在 如果存在检查密码是否正确
    // 如果用户不存在或密码错误，则返回错误提示
    // 如果存在且密码正确，则登录成功

    // 查找条件
    var filter = {
        account:req.body.account,
        password:req.body.password
    }
    // 使用一个查询条件 查找数据 查找完成后exec()执行models中就是查询得到的数据
    // {account:1,photo:1,createTime:1,ip:1}1表示以后的models中只有后面为1的属性 _id默认为1
    db.User.find(filter, {account:1,photo:1,createTime:1,ip:1}).exec(function(err, models){
        // console.log('实参=',arguments);
        if(err){
            // 把一个对象序列化成一个json字符串
            res.json({code:'error',message:'服务端错误，请稍后再试'});
        }if(models.length > 0){
            // 发一个令牌(cookie) 首先设置cookie 还支持更多的参数 ，
            // 允许设置cookie的范围，cookie的过期时间，设置的cookie会通过响应头中的Set-Cookie头
            // 发送到浏览器浏览器再次请求时会自动在请求头中的Cookie中携带没有过期的cookie
            // 因为cookie会自动往还于浏览器和服务器之间
            // 所以经常会用来保存用户登录的令牌
            // 也因为这个原因，cookie只能保存小量数据，以免消耗太多的网络带宽（只能存几K的数据 4K）
            // 第三个参数是牵引（不是加密）不去除可能导致登录不成功
            // res.cookie('account', req.body.account, {signed:true});            
            res.cookie('account', req.body.account);
            // 将models数组中的第一个转换为纯数据 并对_id进行操作变为id:String方便后面模板的引用
            // 将之存到cookie中一以于后面用于判断和显示
            res.cookie('user', db.toData(models[0]));            
            res.json({code:'success',message:'登录成功！'});            
        }else{
            res.json({code:'fail', message:'账号或密码错误！'});
        }
    })
})
module.exports = router;