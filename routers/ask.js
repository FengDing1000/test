const exp = require('express'),
    db = require('../db'),
    tools = require('../tools'),
    router = exp.Router();
// tools.signin 拦截请求 检查用户是否登录
router.get('/ask', tools.signin, (req, res) => {
    // console.log('****************')
    db.Keyword.find().exec((err, models) => {
        if (err) {
            res.render('error', err);
        } else {
            // 通过数据库返回的models(集合)中的model不是纯数据
            // 通过map方法将每一个model都转换成纯数据，并且
            // 处理内部的——id（object），将之转换成字符串
            // map返回的是数组
            res.render('ask', { keywords: db.toDatas(models) });
        }
    })
})

router.post('/api/keyword/add', tools.signin, (req, res) => {
    // 跳过检查

    // 看看关键词是否存在
    db.Keyword.find({ text: req.body.keyword }).count((err, count) => {
        if (err) {
            res.json({ code: 'error', message: '服务端错误，请稍后再试' })
        } else {
            if (count > 0) {
                res.json({ code: 'exists', message: '关键词已存在' })
            } else {
                req.body.text = req.body.keyword;
                console.log('user=',req.cookies.user);
                req.body.createUser = req.cookies.user.id;
                req.body.createTime = new Date();
                req.body.ip = tools.formatIP(req.ip);
                var keyword = new db.Keyword(req.body);
                keyword.save((err, model, count) => {
                    if (err) {
                        res.json({ code: 'error', message: '服务端错误，请稍后再试' })
                    } else {
                        res.json({ code: 'success', message: '添加成功' })
                    }
                })
            }
        }
    })
})

router.post('/api/ask/add', tools.signin, (req, res) => {
    req.body.createUser = req.cookies.user.id;
    req.body.createTime = new Date();
    req.body.ip = tools.formatIP(req.ip);
    var question = new db.Question(req.body);
    question.save((err, model)=>{
        if(err){
            res.json({code:'error',message:'服务端错误，请稍后再试！'})
        }else{
            res.json({code:'success', message:'添加成功！'})
        }
    })
})
module.exports = router;