const exp = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    template = require('./template'),
    app = exp();
// 设置视图引擎
app.engine('.html', template.__express);
app.set('view engine', 'html');
// 处理静态资源请求
app.use(exp.static('www'));
// 提取请求头中的Cookie，将Cookie数据放到req.cookies中
// 对cookie签名用的 用处不大
// app.use(cookieParser('123456'));
// 提取请求头中的Cookie，将Cookie数据放到req.cookies中
app.use(cookieParser());
// 提取请求体中urlencoded格式的数据到req.body中（对象）
app.use(bodyParser.urlencoded({extended:true}));
// 处理首页请求
app.use(require('./routers/index'));
// 处理登录请求
app.use(require('./routers/user/signin'));
// 处理注册请求
app.use(require('./routers/user/register'));
// 处理退出请求
app.use(require('./routers/user/signout'));
// 处理ask请求
app.use(require('./routers/ask'));
// 监听端口
app.listen(8888, (err) => {
    console.log('8888 正在运行...');
})

