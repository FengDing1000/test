template = require('art-template');
template.config('cache', false);
template.helper('formatDateTime' ,function (t) {
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

    return t.getFullYear() + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
})
module.exports = template;
