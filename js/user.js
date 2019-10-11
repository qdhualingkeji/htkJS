var InterValObj; //timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount = 120;//当前剩余秒数
var isVerificationCode = false; // 是否需要验证码验证
var g_returnCitySN = {
    cip: "0.0.0.0", cid: "", cname: ""
};

var isregVerificationCode = false; // 是否需要验证码验证
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
    if (!window.localStorage) {
        return false;
    }
    else {
        var storage = window.localStorage;
        storage.setItem(name, value);
    }
}

// 读取LocalStorage
function getLocalStorage(name) {
    if (!window.localStorage) {
        return false;
    }
    else {
        var storage = window.localStorage;
        return storage.getItem(name);
    }
}

function removeLocalStorage(name) {
    if (!window.localStorage) {
        return false;
    }
    else {
        if (name != null && name != '' && name != undefined) {
            var storage = window.localStorage;
            storage.removeItem(name);
        }
    }
}

function isNullOrWhiteSpace(str) {
    if (str != null || str != undefined)
        str = str.trim();
    if (str == null || str == '' || str == undefined) {
        return false;
    }
    else {
        return true;
    }
}

$(document).ready(function () {
    var cookie_decerp_loginError_total = getCookie("decerp_loginError_total");
    var localStorage_decerp_loginError_total = getLocalStorage("decerp_loginError_total");
    if (cookie_decerp_loginError_total != null && cookie_decerp_loginError_total != undefined && cookie_decerp_loginError_total != '') {
        if (cookie_decerp_loginError_total >= 3) {
            $('#form_login').addClass('terbox2');
            $('#vierificationCode_li').show();
            isVerificationCode = true;
        }
    }
    else if (localStorage_decerp_loginError_total != null && localStorage_decerp_loginError_total != undefined && localStorage_decerp_loginError_total != '') {
        if (localStorage_decerp_loginError_total >= 3) {
            $('#form_login').addClass('terbox2');
            $('#vierificationCode_li').show();
            isVerificationCode = true;
        }
    }


    var strdec_user_Data_Pwd = GetRememberPwd();

    $.ajax({
        url: '/AjaxUser/IsLogin',
        type: 'post',
        data: { cookie: getCookie("DEC_siQsc8g6d9wHadEqAte5jptTI2xR"), declocalstorag: strdec_user_Data_Pwd },
        success: function(data) {
            //获取ip地址
            try
            {
                $.get("http://api.decerp.cc/api/login/GetClientIpAddress ").done(function(data) {
                    if (data)
                    {
                        g_returnCitySN.cip = data;
                    }
                });
            } catch (ex)
            {
                console.log(ex);
            }

            $.get('/AjaxUser/GetIndustryType', function(result) {
                var industryTypeHtml = '';
                industryTypeHtml += '<option value="-1">请选择行业</option>';
                if (result != null && result != '' && result != undefined)
                {
                    for (var i = 0; i < result.length; i++)
                    {
                        industryTypeHtml += ' <option value="' + result[i].industrytype_id + '">' + result[i].sv_uit_name + '</option>';
                    }
                    $('#sv_us_industrytype').html(industryTypeHtml);
                }
            });
            if (data.succeed) {
                if (data.errmsg >= 3) {
                    $('#form_login').addClass('terbox2');
                    $('#vierificationCode_li').show();
                    isVerificationCode = true;
                }
                $('#txtUserAccount').val(data.values);
                $('#txtUserPwd').val('############');
                $('#isRememberPassword').attr('checked', true);
            }
            else if (data.errmsg >= 3) {
                $('#form_login').addClass('terbox2');
                $('#vierificationCode_li').show();
                isVerificationCode = true;
            }
            //注册验证码
            if (location.pathname.toLowerCase() == '/register.html')
            {
                if (data.errorCode)
                {
                    isregVerificationCode = true;
                }
                if (isregVerificationCode)
                {
                    $("#txtVerificationCode").parent().show();
                } else
                {
                    $("#txtVerificationCode").parent().hide()
                }
            }

        }
    });
    //页面加载时只需绑定省份下拉框
    //$.get("/Ajaxdata/GetPCD/1", function (data) {

    //    if (data.length > 0) {
    //        for (var i in data) {

    //            $("#sv_us_province").append("<option value=\"" + data[i].code + "\">" + data[i].name + "</option>");
    //        }
    //       // $("#sv_us_province").val($(".sv_us_province").val()).change();
    //    }
    //});
    ////联动
    //$("#sv_us_province").change(function () {
    //    $("#sv_us_district").empty();

    //    $.get("/Ajaxdata/GetCityInterlock/" + $("#sv_us_province").val(), function (data1) {

    //        $("#sv_us_city").empty().append('  <option value="0">请选择城市*</option>');//清空城市下拉框

    //        for (var i in data1) {
    //            $("#sv_us_city").append("<option value=\"" + data1[i].code + "\">" + data1[i].name + "</option>");
    //        }
    //       // $("#sv_us_city").val($(".sv_us_city").val());
    //      //  $("#sv_us_city").change();
    //    });

    //});

    ////todo：判断验证码是否正确
    $("#btnSendCode").click(function () {

        var reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
        if (reg.test($("#sv_ul_mobile").val())) {
            //判断是否代理商
            var txtVerificationCoderes = $("#txtVerificationCode").val();
            var url = "/AjaxUser/Retrieve_Password2";
            if (checkDealer()) {
                url = "/AjaxUser/Retrieve_Password_Dealer";
            }
            if ((isregVerificationCode && txtVerificationCoderes != null && txtVerificationCoderes != undefined && txtVerificationCoderes != "") || !(isregVerificationCode))
            {
                $.post(url, {
                    "moble": $("#sv_ul_mobile").val(),
                    "sv_user_ip": g_returnCitySN.cip,
                    "sv_user_cityname": g_returnCitySN.cname,
                    "sv_code": g_returnCitySN.cid,
                    "ValidateCode": $("#txtVerificationCode").val()
                }, function (data) {
                    if (data == -1) {
                        layer.alert("该手机号码已经注册过会员啦！");
                        $("#sv_ul_mobile").addClass("err").focus();
                        $('#passwordimg').click();
                        return;
                    }
                    else if (data == -2) {
                        $('#passwordimg').click();
                        layer.alert("发送太多，已被锁定！");
                        return;
                    }
                    else if (data == -4) {
                        $('#passwordimg').click();
                        layer.alert("图形验证码输入为空！");
                        isregVerificationCode = true;
                        if (isregVerificationCode)
                        {
                            $("#txtVerificationCode").parent().show();
                        } else
                        {
                            $("#txtVerificationCode").parent().hide()
                        }
                        return;
                    }
                    else if (data == -5) {
                        $('#passwordimg').click();
                        layer.alert("图形验证码错误！");
                        showRegVerificationCode();
                        return;
                    }
                    else if (data == true) {
                        //设置button效果，开始计时
                        $("#btnSendCode").attr("disabled", "true");
                        $("#btnSendCode").val(+curCount + "秒再获取");
                        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次	
                    }
                    else {
                        layer.alert("发送失败！");
                        $('#passwordimg').click();
                        return;
                    }
                });
            }
            else {
                $("#txtVerificationCode").focus();
                layer.msg("请输入图形校验码");
            }
        }
        else {
            layer.msg("手机号码不合法，请检查后重新输入");
            $("#sv_ul_mobile").addClass("err").focus();
            $('#passwordimg').click();
            return false;
        }
    });

    //登录
    $("#userLogin").click(function () {
        var browserName = "";
        var systemName = "";
        var sv_app_version = "";
        var sv_language = "";
        if (navigator) {
            browserName = navigator.appName || "";
            systemName = navigator.platform || "";
            sv_app_version = navigator.appVersion || "";
            sv_language = navigator.browserLanguage || "";
        }
        var txtVerificationCode = $('#txtVerificationCode').val().trim();
        var isRememberPassword = document.getElementById("isRememberPassword").checked;
        if ($("#txtUserAccount").val() == "" || $("#txtUserAccount").val() == null) {
            $("#txtUserAccount").addClass("err").focus();
            layer.msg($("#txtUserAccount").attr("placeholder"), { time: 2000 });
            return;
        }
        if ($("#txtUserPwd").val() == "" || $("#txtUserPwd").val() == null) {
            $("#txtUserPwd").addClass("err").focus();
            layer.msg($("#txtUserPwd").attr("placeholder"), { time: 2000 });
            return;
        }
        if (isVerificationCode == true)
        {
            $('#vierificationCode_li').show();
            if (txtVerificationCode == null || txtVerificationCode == undefined || txtVerificationCode == '') {
                $('#txtVerificationCode').focus();
                layer.msg('验证码不能为空！', { time: 2000 });
                return;
            }
            if (txtVerificationCode.length != 4) {
                $('#txtVerificationCode').focus();
                layer.msg('请输入4位字符验证码！', { time: 2000 });
                return;
            }
        }
        //if ($("#txtIdentifyCode").val() == "" || $("#txtIdentifyCode").val() == null) {
        //    $("#txtIdentifyCode").addClass("err");
        //    layer.msg($("#txtIdentifyCode").attr("placeholder"), { time: 2000 });
        //    return;
        //}
        //$('input[data-identity="1"]').each(function () {
        //    if ($(this).val() == "" || $(this).val() == null) {
        //        $(this).addClass("err");
        //        layer.msg($(this).attr("placeholder"), { time: 2000 });
        //        return;
        //    }
        //});//returnCitySN['cip'],

        //todo： 判断验证码是否正确
        

        var data = {
            accountno: $("#txtUserAccount").val(),
            pwd: $("#txtUserPwd").val(),
            IsRememberPassword: isRememberPassword,
            VerificationCode: txtVerificationCode,
            LoginUserIp: g_returnCitySN.cip,
            LoginUserCode: g_returnCitySN.cid,
            LoginUserCityName: g_returnCitySN.cname,
            BrowserName: browserName,
            OperatingPlatform: "PC",
            SystemName: systemName,
            sv_app_version: sv_app_version,
            sv_language: sv_language,
            IsValidateCode: isVerificationCode,
            software_versionid: "2"
        };
        layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        $.ajax({
            url: '/AjaxUser/UserLogin',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
                if (data.succeed) {
                    if (isRememberPassword) {
                        setCookie("DEC_siQsc8g6d9wHadEqAte5jptTI2xR", data.values, 7);
                        SetRememberPwd(data.values)
                    } else {
                        RemoveRememberPwd();
                    }
                    delCookie("decerp_loginError_total");
                    removeLocalStorage("decerp_loginError_total");
                    if (data.is_firstlogin) {
                        window.location.href = "/Home/selectIndustry";
                    } else {
                        if (data.software_versionid == "3") {
                            window.location.href = "/Home/Index_N3";//新版
                        }
                        else {
                            window.location.href = "/Home/Index";//旧版
                        }
                    }
                }
                else {
                    layer.closeAll();
                    $('#passwordimg').click();
                    $('#txtVerificationCode').val('');
                    $("#txtUserAccount").focus();
                    if (data.errmsg == "loginError") {
                        if (data.values >= 3) {
                            isVerificationCode = true;
                            $('#vierificationCode_li').show();
                            $('#form_login').addClass('terbox2');
                            setCookie("decerp_loginError_total", data.values);
                            setLocalStorage("decerp_loginError_total", data.values);
                        }
                        layer.msg("账号或密码不正确，请检查后重试", { time: 7000 });
                    }
                    else {
                        layer.msg(data.errmsg, { time: 7000 });
                    }
                }
            }
        });
    });

    $('.yanshiulbox>li').click(function () {
        var browserName = "";
        var systemName = "";
        var sv_app_version = "";
        var sv_language = "";
        if (navigator) {
            browserName = navigator.appName || "";
            systemName = navigator.platform || "";
            sv_app_version = navigator.appVersion || "";
            sv_language = navigator.browserLanguage || "";
        }
        layer.closeAll();
        layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        $.post('/AjaxUser/TestAccount', {
            accountType: $(this).data("name"),
            LoginUserIp: g_returnCitySN.cip,
            LoginUserCode: g_returnCitySN.cid,
            LoginUserCityName: g_returnCitySN.cname,
            sv_app_version: sv_app_version,
            browserName: browserName,
            systemName: systemName,
            sv_language: sv_language,
            software_versionid: "2"
        }, function (data) {
            if (data) {
                //window.location.href = "/";
                window.location.href = "/Home/Index_N3";
            }
            else {
                layer.closeAll();
                layer.msg("抱歉，该行业暂时没有开通测试账，有需要请联系我们！", { time: 2000 });
            }
        });
    });


    // 失去焦点验证--登录
    $("#txtUserAccount,#txtUserPwd,#txtIdentifyCode").blur(function () {
        if ($(this).val() == "" || $(this).val() == null) {
            $(this).addClass("err");
            //$(this).focus();
            //layer.msg($(this).attr("placeholder"), { time: 2000 });
        }
    });

    // enter触发登录事件
    $("#txtUserAccount,#txtUserPwd,#txtIdentifyCode").keypress(function (e) {
        e = e || event;
        if (e.keyCode == 13) {
            $("#userLogin").click();
        }
    });

    //$(".loginpassword").click(function () {
    //    layer.tips('长度为6-15个字符,必须字母加数字、或字母加特殊字符、或数字加特殊字符组成', this, {
    //        tipa: 1,
    //        time: 5000,
    //        maxWidth: 150
    //    });
    //});


    $(".loginpassword").click(function () {
        layer.tips('长度为6-15个字符，不能输入空格', this, {
            tipa: 1,
            time: 5000,
            maxWidth: 150
        });
    });

    // 字符是否为空
    function isNullOrWhiteSpace(str) {
        if (str == null || str == '' || str == undefined) {
            return true;
        }
        else {
            return false;
        }
    }

    // 去除空格
    function clearInputSpace(value) {
        if (value != null && value != '' && value != undefined) {
            return value.replace(/\s/g, "");
        }
        return "";
    }

    // 注册
    $("#UserRegister").click(function () {
        var sv_us_name = clearInputSpace($("#sv_us_name").val());
        var sv_ul_name = clearInputSpace($('#sv_ul_name').val());
        var sv_ul_mobile = clearInputSpace($('#sv_ul_mobile').val());
        var code = clearInputSpace($('#code').val());
        var sv_ul_loginpwd = clearInputSpace($('#sv_ul_loginpwd').val());
        var sv_ul_loginpwd2 = clearInputSpace($('#sv_ul_loginpwd2').val());
        var sv_us_industrytype = 23;
        var sv_user_ip = "";
        var sv_user_code = "";
        var sv_user_cityname = "";
        var verificationPwd = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{6,15}$/;
        //if (isNullOrWhiteSpace(sv_us_name)) {
        //    $("#sv_us_name").addClass("err").focus();
        //    $("#sv_us_name").val("");
        //    layer.msg($("#sv_us_name").attr("placeholder"), { time: 2000 });
        //    return;
        //}

        //if (sv_us_name.length > 30) {
        //    $("#sv_us_name").addClass("err").focus();
        //    layer.msg('店铺名称长度不能超过30个字符！', { time: 2000 });
        //    return;
        //}

        //if (sv_us_industrytype < 0) {
        //    $('#sv_us_industrytype').addClass("err");
        //    layer.msg('请选择行业！', { time: 2000 });
        //    return;
        //}

        //if (isNullOrWhiteSpace(sv_ul_name)) {
        //    $("#sv_ul_name").addClass("err").focus();
        //    $("#sv_ul_name").val("");
        //    layer.msg($("#sv_ul_name").attr("placeholder"), { time: 2000 });
        //    return;
        //}

        if (sv_ul_name.length > 15) {
            $("#sv_ul_name").addClass("err").focus();
            layer.msg("姓名长度不能超过15个字符", { time: 2000 });
            return;
        }

        if (isNullOrWhiteSpace(sv_ul_mobile)) {
            $("#sv_ul_mobile").addClass("err").focus();
            $("#sv_ul_mobile").val("");
            layer.msg($("#sv_ul_mobile").attr("placeholder"), { time: 2000 });
            return;
        }
        if (!(/^1[3|4|5|6|7|8|9]\d{9}$/).test($("#sv_ul_mobile").val())) {
            $("#sv_ul_mobile").focus();
            layer.msg("手机格式不合法", { time: 2000 });
            return;
        }
        else {
            $.ajax({
                url: '/AjaxUser/IsSameMobile?mobile=' + $("#sv_ul_mobile").val(),
                type: 'post',
                success: function (d) {
                    if (!d) {
                        $("#sv_ul_mobile").focus();
                        layer.msg("手机号码重复", { time: 2000 });
                        return;
                    }
                }
            });
        }

        if (isNullOrWhiteSpace(sv_ul_loginpwd)) {
            $("#sv_ul_loginpwd").addClass("err").focus();
            $("#sv_ul_loginpwd").val("");
            layer.msg($("#sv_ul_loginpwd").attr("placeholder"), { time: 2000 });
            return;
        }

        //if (!verificationPwd.test(sv_ul_loginpwd)) {
        //    $("#sv_ul_loginpwd").addClass("err").focus();
        //    layer.tips('长度为6-15个字符,必须字母加数字、或字母加特殊字符、或数字加特殊字符组成', '#sv_ul_loginpwd', {
        //        tipa: 1,
        //        time: 5000,
        //        maxWidth: 150
        //    });
        //    layer.msg("长度为6-15个字符,必须字母加数字、或字母加特殊字符、或数字加特殊字符组成！", { time: 2000 });
        //    return;
        //}

        //if (isNullOrWhiteSpace(sv_ul_loginpwd2)) {
        //    $("#sv_ul_loginpwd2").addClass("err").text("").focus();
        //    $("#sv_ul_loginpwd2").val("");
        //    layer.msg("确认密码不能为空！", { time: 2000 });
        //    return;
        //}

        //if ($("#sv_ul_loginpwd2").val() != $("#sv_ul_loginpwd").val()) {
        //    $("#sv_ul_loginpwd2").addClass("err").text("").focus();
        //    layer.msg("两次登录密码不一至！请重新输入。", { time: 2000 });
        //    return;
        //}

        if (isNullOrWhiteSpace(code)) {
            $("#code").addClass("err").focus();
            $("#code").val("");
            layer.msg($("#code").attr("placeholder"), { time: 2000 });
            return;
        }

        if (code.length != 6) {
            $("#code").addClass("err").focus();
            layer.msg("请输入正确的验证码", { time: 2000 });
            return;
        }

        // 勾选协议复选框
        var chkAgreeLicense = document.getElementById("chkAgreeLicense").checked;

        if (!chkAgreeLicense) {
            layer.msg("请阅读服务条款，及同意用户协议后才能注册！", { time: 2000 });
            return;
        }
        try {
            sv_user_ip = g_returnCitySN.cip;
            sv_user_code = g_returnCitySN.cid;
            sv_user_cityname = g_returnCitySN.cname;
        }
        catch (ex) {
        }
        
        var dCode = checkDealer();

        var data = {
            sv_us_name: (sv_us_name||sv_ul_mobile),
            sv_ul_name: (sv_ul_name ||sv_ul_mobile),
            sv_ul_mobile: sv_ul_mobile,
            sv_ul_loginpwd: sv_ul_loginpwd,
            sv_user_ip: sv_user_ip,
            sv_user_code: sv_user_code,
            sv_user_cityname: sv_user_cityname,
            distributor_code: dCode,
            sv_us_industrytype: sv_us_industrytype,
            sv_sharedby: (getQueryString('u')||''),
            sv_sharechannel: (getQueryString('s')||''),
            sv_regsource:'pc-web'
        };
        layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        $.ajax({
            url: '/AjaxUser/UserRegister/' + $("#code").val(),
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
                // layer.closeAll();
                if (data.succeed) {
                    layer.msg("注册成功", { time: 2000 });
                    ///h5register-cg.html
                    //判断注册来源
                    var vurl = location.href;

                    if ((vurl && vurl.indexOf('mispos.cc') > -1) || (checkDealer() && checkDealer() != "www" && checkDealer() != "decerp")) {
                        setTimeout(function () { window.location.href = "http://www.mispos.cc"; }, 2000);
                    } else {
                        setTimeout(function () { window.location.href = "/login.html"; }, 2000);
                    }

                }
                else {
                    layer.closeAll();
                    layer.msg(data.values, { time: 2000 });
                }
            }
        });
    });

    // 失去焦点验证--注册
    $("#sv_us_name,#sv_ul_name,#sv_ul_loginpwd,#sv_us_reference,#code,#sv_ul_loginpwd2").blur(function () {
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
    $("#isRememberPassword").click(function () {
        if (!document.getElementById("isRememberPassword").checked) {
            RemoveRememberPwd();
        }
    });
});

// timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj);//停止计时器
        $("#btnSendCode").removeAttr("disabled");//启用按钮
        $("#btnSendCode").val("重新发送验证码");
    }
    else {
        curCount--;
        $("#btnSendCode").val(+curCount + "秒再获取");
    }
}


//---------------代理商--------------------
function checkDealer() {
    var domain = location.href;
    var second_domain = domain.split('.')[0];
    showDealerInfo();
    if (checkDomain(domain)) {
        //顶级域名访问
        if (second_domain === "www" || second_domain == "http://www")
        {
            //判断代理商参数
            p = getQueryString("p");
            if (p) {
                return p;
            } else {
                return "";
            }
        } else {
            //二级域名
            //return getQueryString("p");
            return second_domain.replace("http://", "");
        }

    } else {
        //ip访问
        //判断代理商参数
        var p = getQueryString("p");
        if (p) {
            return p;
        } else {
            return "";
        }
    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


function checkDomain(url) {
    if (url.indexOf("mispos.cc") >= 0 || url.indexOf("decerp.cc") >= 0)
    {
        return true;
    }
    return false;
}

function showDealerInfo() {
    var p = getQueryString("p");
    var s = getQueryString("s");
    if (p == s)
    {
        $("#dealerid").html(s);
    }
}



//---------------分享注册信息-------------------
//保存
function SetRememberPwd(userData) {
    if (window.localStorage) {
        localStorage.setItem("DEC_siQsc8g6d9wHadEqAte5jptTI2xR", userData);//保存
    }
}
//读取
function GetRememberPwd() {
    var strdec_user_Data = localStorage.getItem("DEC_siQsc8g6d9wHadEqAte5jptTI2xR")
    var newUserData = "";
    if (strdec_user_Data != null) {
        newUserData = strdec_user_Data; //读取 
    }
    return newUserData;
}
//删除
function RemoveRememberPwd() {
    localStorage.removeItem("DEC_siQsc8g6d9wHadEqAte5jptTI2xR"); //删除
}

//点击刷新验证码
var timestamp = Date.parse(new Date());
$(document).on("click", "#passwordimg", function () {
    $(this).attr('src', '/AjaxUser/ValidateCode' + '?' + Date.parse(new Date()));
});


$(document).ready(function() {
    showRegVerificationCode();
});


function showRegVerificationCode() {
    if (isregVerificationCode)
    {
        $("#txtVerificationCode").parent().show();
    } else
    {
        $("#txtVerificationCode").parent().hide()
    }
}

