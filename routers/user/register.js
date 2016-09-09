const exp = require('express'),
    db = require('../../db'),
    tools = require('../../tools')
router = exp.Router();
router.get('/user/register', (req, res) => {
    // 这个地址是相对于views文件夹的
    res.render('user/register');
})

router.post('/api/user/register', (req, res) => {
    db.User.find({ account: req.body.account })
        .count(function (err, count) {
            if (count > 0) {
                res.json({ code: 'fail', message: '用户已存在' })
            } else {
                req.body.createTime = new Date();
                // console.log(req.body.createTime);
                // 处理ip
                req.body.ip = tools.formatIP(req.ip);
                // 使用数据模型类创建一个用户对象，并且填充数据
                var user = new db.User(req.body);
                // 调用save方法将数据保存到数据库中
                // 数据模型表示一类事物，他可以包含数据，还包含相应的数据操作方法
                user.save(function (err, model, count) {
                    if (err) {
                        res.json({ code: 'error', message: '服务端错误，请稍后再试' })
                    } else {
                        res.json({ code: 'success', message: '恭喜你注册成功！' })
                    }

                })
            }
        })

})
module.exports = router;