$('form').submit(function(ev){
    ev.preventDefault();
    // serialize()收集表单中的数据(提取表单数据，并转换成urlencoded格式)
    // name1=value1&name2=value2...（urlencoded）
    // 这种格式可以用post或者get请求发送到服务端 
    var data = $(this).serialize();
    console.log('formdata1==',data);
    // 认为这是一个接口
    $.ajax({
        url:'/api/user/signin',
        data:data,
        type:'POST',
        // 服务端返回的数据类型
        dataType:'JSON'
    })
    // 表示请求成功
    .done(function(res){
        alert(res.message)
        if(res.code == 'success'){
            location.href = '/';
        }
    })
    // 表示请求失败 ，通常是网络问题（无法连接到服务器）
    .fail(function(){
        console.log('网络连接失败，请稍后再试')
    })
})