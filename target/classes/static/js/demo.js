/**
 * Created by xiongxiaoyu on 2017/11/2.
 */
var EventUtil = {
    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent('on' + type, handler);
        } else {
            element['on'+type] = handler;
        }
    },
    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if(element.detachEvent){
            element.detachEvent('on' + type, handler);
        } else {
            element['on'+type] = null;
        }
    },
    getEvent: function(event){
        return event ? event : window.event;
    },
    getTarget: function(event){
        return event.target || event.srcElement;
    },
    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};
function ajax(options) {
    options = options || {};
    options.type = (options.type || 'GET').toUpperCase();
    options.dataType = options.dataType || 'json';
    /* var params = formatParams(options.data);*/
    var xhr = createXHR();
    if (options.type === 'GET'){
        xhr.open('GET', options.url/* + '?' + params*/, true);
        xhr.send(null);
    } else if (options.type === 'POST'){
        xhr.open('POST', options.url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(null);
    }
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
            if ((xhr.status >= 200 && xhr.status <300) || xhr.status === 304){

                options.success && options.success(xhr.responseText);
            } else {
                options.error && options.error(xhr.status);
            }
        }
    }
}
window.onload = function () {
    var sendValMsg = document.getElementById('sendValMsg');
    var email = document.getElementById('email');
    var name = document.getElementById('name');
    var sendForm = document.getElementById('sendForm');
    var loginForm = document.getElementById('loginForm');
    var msg = document.getElementById('msg');
    msg.onblur = function () {
        var validcode;
        $.ajax({
            method: 'get',
            url: 'http://localhost:8080/validcode',
            dataType: 'json',
            success: function (response) {
                console.log(JSON.stringify(response));

                validcode = JSON.stringify(response);
                if (validcode === msg.value){
                    console.log(1);
                } else {
                    console.log(0);
                }
            },
            error: function (status) {
                console.log('error');
            }
        })

    };
    sendValMsg.onclick = function(){
        var nameVal = name.value;
        var emailVal = email.value;
        $.ajax({
            method: 'post',
            url: 'http://localhost:8080/send',
            dataType: 'json',
            data: {
                'name': nameVal,
                'email': emailVal
            },
            success: function (response) {
                console.log('验证码已发送');
            },
            error: function (status) {
                console.log('error' + status);
            }
        })
    }
}