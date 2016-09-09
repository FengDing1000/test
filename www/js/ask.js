
function addKeyword() {
    var keyword = prompt('请填写要添加的关键词', '');
    if (keyword) {
        keyword = keyword.trim();
        $.ajax({
            url: '/api/keyword/add',
            // data:{keyword:keyword} 
            // 增加一个keyword属性其值是keyword   
            data: { keyword },
            type: 'POST',
            dataType: 'json'
        }).done(function (res) {
            console.log('askRes=', res)
            if (res.code == 'success') {
                $('<li>' + keyword + '</li>').appendTo('ul');
            }
        }).fail(function () {
            alert('网络连接失败，请稍后再试')
        })
    }
}

$('li').click(function () {
    $(this).addClass('selected')
        .siblings().removeClass('selected');
})
$('form').submit(function (ev) {
    ev.preventDefault();
    var keyword = $('li.selected').first().text();
    if (keyword) {
        var text = $('textarea').val().trim();
        if (text) {
            $.ajax({
                url: '/api/ask/add',
                data: { keyword, text },
                type: 'POST',
                dataType: 'json'
            }).done(function (res) {
                alert(res.message)
                if (res.code == 'success') {
                    location.href = '/';
                }
            }).fail(function (jqxhr) {
                console.log('实参=', arguments);
                console.log(jqxhr.getAllResponseHeaders())
                console.log(jqxhr.getResponseHeader('Content-Type'))
                console.log(jqxhr.responseText)
                alert('网络连接失败，请稍后再试')
            })
        } else {
            alert('请填写问题')
        }
    } else {
        alert('请选择一个关键词')
    }
})