var InterValObj; //timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount = 120;//当前剩余秒数
var reg = /^1[3|4|5|7|8]\d{9}$/;
var isSendCode = false;

var isregVerificationCode = false; // 是否需要验证码验证
var isregVerificationCode_count = 1; // 是否需要验证码验证

$("#btnSendCode").click(function () {
    if (curCount == 0) {
        curCount = 120;
        isSendCode = false;
    }
    if ($("#sv_ul_mobile").val().trim() == null || $("#sv_ul_mobile").val().trim() == '' || $("#sv_ul_mobile").val().trim() == undefined) {
        layer.msg("请输入手机号码！");
        $("#sv_ul_mobile").focus();
        return;
    }
    if (reg.test($("#sv_ul_mobile").val())) {
        $.ajax({
            url: '/register2.ashx',
            type: 'post',
            dataType: 'json',
            data: {
                "requestType": 'sendCode',
                "moble": $("#sv_ul_mobile").val(),
                "sv_user_ip": returnCitySN['cip'],
                "sv_user_cityname": returnCitySN['cname'],
                "sv_code": returnCitySN['cid'],
                "ValidateCode": $("#ValidateCode").val()
            },
            success: function(data) {
                isregVerificationCode_count++;
                if (isregVerificationCode_count > 3)
                {
                    setShowVerificationCode();
                }
                if (data == -1) {
                    layer.alert("该手机号码已经注册过啦！");
                    $("#sv_ul_mobile").addClass("err").focus();
                    return;
                }
                else if (data == -2) {
                    layer.alert("发送太多，已被锁定！");
                    return;
                }
                else if (data == true) {
                    isSendCode = true;
                    //设置button效果，开始计时
                    $("#btnSendCode").attr("disabled", "true");
                    $("#btnSendCode").val(+curCount + "秒再获取");
                    InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次	
                }
                else
                {
                    if (data && data.values)
                    {
                        layer.alert("发送失败！" + data.values);
                    } else
                    {
                        layer.alert("发送失败！");
                    }
                    return;
                }
            }
        });
    }
    else {
        layer.msg("手机号码不合法，请检查后重新输入");
        $("#sv_ul_mobile").addClass("err").focus();
        return false;
    }
});

function setShowVerificationCode() {
    setCookie("decerp_loginError_total", true);
    setLocalStorage("decerp_loginError_total", true);
    isregVerificationCode = true;
    $("#ValidateCode_img_div").show();
}

checkShowVerificationCode();
function checkShowVerificationCode() {
    if (getCookie("decerp_loginError_total") || getLocalStorage("decerp_loginError_total"))
    {
        isregVerificationCode = true;
        $("#ValidateCode_img_div").show();
    } else
    {
        isregVerificationCode = false;
        $("#ValidateCode_img_div").hide();
    }
}

// 获取URL参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}


// 注册
$("#UserRegister").click(function () {
    var sv_us_name = $("#sv_us_name").val();
    var sv_ul_name = $("#sv_ul_name").val();
    var sv_ul_mobile = $("#sv_ul_mobile").val();
    if (sv_us_name == "" || sv_us_name == null) {
        sv_us_name = sv_ul_mobile;
    }

    if (sv_ul_name == "" || sv_ul_name == null) {
        sv_ul_name = sv_ul_mobile;
    }

    if ($("#sv_ul_mobile").val() == "" || $("#sv_ul_mobile").val() == null) {
        $("#sv_ul_mobile").addClass("err").focus();
        layer.msg($("#sv_ul_mobile").attr("placeholder"), { time: 2000 });
        return;
    }
    if (!reg.test($("#sv_ul_mobile").val().trim())) {
        $("#sv_ul_mobile").focus();
        layer.msg("请输入正确的手机号码");
        return;
    }
    if ($("#sv_ul_loginpwd").val().trim() == null || $("#sv_ul_loginpwd").val().trim() == '' || $("#sv_ul_loginpwd").val().trim() == undefined) {
        $("#sv_ul_loginpwd").focus();
        layer.msg($("#sv_ul_loginpwd").attr("placeholder"), { time: 2000 });
        return;
    }

    if ($("#sv_ul_loginpwd").val().trim() == "" || $("#sv_ul_loginpwd").val() == null || $("#sv_ul_loginpwd").val().length < 6) {
        $("#sv_ul_loginpwd").addClass("err").focus();
        layer.msg("登陆密码输入不正确，请重新输入", { time: 2000 });
        return;
    }


    //if ($("#sv_ul_loginpwd2").val() != $("#sv_ul_loginpwd").val()) {
    //    $("#sv_ul_loginpwd2").addClass("err").text("").focus();
    //    layer.msg("两次登陆密码不一至！请重新输入。", { time: 2000 });
    //    return;
    //}

    if (!isSendCode) {
        layer.msg("你还未发送验证码", { time: 2000 });
        return;
    }

    if ($("#code").val() == "" || $("#code").val() == null) {
        $("#code").addClass("err").focus();
        layer.msg($("#code").attr("placeholder"), { time: 2000 });
        return;
    }

    // 勾选协议复选框
    var chkAgreeLicense = document.getElementById("chkAgreeLicense").checked;

    if (!chkAgreeLicense) {
        layer.msg("请阅读服务条款，及同意用户协议后才能注册！", { time: 2000 });
        return;
    }
    var u = getQueryString("u") || "";
    var s = getQueryString("s") || "";
    var data = {
        sv_us_name: sv_us_name.trim(),
        sv_ul_name: sv_ul_name.trim(),
        sv_ul_mobile: $("#sv_ul_mobile").val().trim(),
        sv_ul_loginpwd: $("#sv_ul_loginpwd").val().trim(),
        sv_us_reference: ($("#sv_us_reference").val() || '手机官网'),
        sv_user_ip: returnCitySN['cip'],
        sv_user_code: returnCitySN['cid'],
        sv_user_cityname: returnCitySN['cname'],
        sendCode: $('#code').val(),
        u: u,
        s: s,
        ValidateCode: $("#ValidateCode").val()
    };
    layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
    try
    {
        $.ajax({
            url: '/register2.ashx?requestType=register',
            timeout: 100000,
            type: 'post',
            data: data,
            success: function (result) {
                var data = JSON.parse(result);
                if (data.succeed) {
                    layer.closeAll();
                    //layer.msg("注册成功,请使用PC端浏览器或使用APP登录", { time: 3000 });
                    layer.confirm('注册成功,请使用PC端浏览器或使用APP登录', {
                        btn: ['前往下载APP', '取消'] //按钮
                    }, function () {
                        location.href = "http://m.decerp.cn/down.html";
                    }, function () {
                        layer.closeAll();
                    });
                }
                else {
                    layer.closeAll();
                    layer.msg(data.values, { time: 2000 });
                }
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    ajaxTimeoutTest.abort();
                    layer.msg("请求超时，请刷新页面！");
                }
            }
        });
    }
    catch (ex) {
        layer.msg("请求超时，请刷新页面！");
    }
  
});

// 失去焦点验证--注册
$("#sv_us_name,#sv_ul_name,#sv_ul_loginpwd,#sv_us_reference,#code").blur(function () {
    if ($(this).val() == "" || $(this).val() == null) {
        $(this).addClass("err");
        //$(this).focus();
        //layer.msg($(this).attr("placeholder"), { time: 2000 });  
    }
});

$("#sv_ul_mobile").blur(function () {
    if ($(this).val() == "" || $(this).val() == null) {
        $(this).addClass("err");
        // $(this).focus();
        layer.msg($(this).attr("placeholder"), { time: 2000 });
        return;
    }
    else {

    }
});

// timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj);//停止计时器
        $("#btnSendCode").removeAttr("disabled");//启用按钮
        $("#btnSendCode").val("重新发送验证码");
        isSendCode = false;
    }
    else {
        curCount--;
        $("#btnSendCode").val(+curCount + "秒再获取");
    }
}




//写cookies
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return (arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

// 写入LocalStorage
function setLocalStorage(name, value) {
    if (!window.localStorage)
    {
        return false;
    }
    else
    {
        var storage = window.localStorage;
        storage.setItem(name, value);
    }
}

// 读取LocalStorage
function getLocalStorage(name) {
    if (!window.localStorage)
    {
        return false;
    }
    else
    {
        var storage = window.localStorage;
        return storage.getItem(name);
    }
}

function removeLocalStorage(name) {
    if (!window.localStorage)
    {
        return false;
    }
    else
    {
        if (name != null && name != '' && name != undefined)
        {
            var storage = window.localStorage;
            storage.removeItem(name);
        }
    }
}
