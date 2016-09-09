$('form').submit(function(ev){
    ev.preventDefault();
    var data = $(this).serialize();
    console.log('formdata2=',data)
    $.ajax({
        url:'/api/user/register',
        data:data,
        type:'POST',
        dataType:'JSON'
    }).done(function(res){
        alert(res.message)
        if(res.code == 'success'){
            location.href = '/user/signin'
        }
    }).fail(function(){
        console.log('网络连接失败，请稍后再试')
    })
})