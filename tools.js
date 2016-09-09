exports.formatDateTime = function (t) {
    var M = t.getMonth() + 1,
        d = t.getDate(),
        h = t.getHours(),
        m = t.getMinutes()
        s = t.getSeconds()        

    M = M < 10 ? '0' + M : M
    d = d < 10 ? '0' + d : d
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s    

    return t.getFullYear() + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
}

exports.formatIP = function(ip){
    if (ip.startsWith('::1')) {
        return '127.0.0.1'
    }
    if (ip.startsWith('::ffff:')) {
        return ip.substr(7)
    }
    return ip
}

exports.signin = function(req,res,next){
    // console.log('name==',req.cookies.account)
    if(!req.cookies.account){
        // req.xhr用来判断是否是ajax请求
        // ajax请求不会刷新页面，所以无法重定向到登录页
        // 所以返回JSON提示信息
        if(req.xhr){
            res.json({code:'not signin',message:'登录超时，请重新登录'});
        }else{
            res.redirect('/user/signin');
        }
    }else{
        next();
    }
}
