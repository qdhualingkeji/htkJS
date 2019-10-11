
var idsite;

var doc = document;
var domain = doc.domain;
var enName;

var scripts = doc.getElementsByTagName('script')
var hmOnlinetimer1;
var hmOnlinetimer2;
var hmOnlinetimer3;

var hOnlineTimer1 // getOnline() 计时器;
var hOnlineTimer2;// getOnline2() 计时器
var hOnlineTimer3;// getOnline3() 计时器

var hMobileOnlineIntervalTimes = 0; // getMobileOnline() 监听次数
var hMobileOnlineTimer;// getMobileOnline()

var hPhoneIntervalTimes = 0;// getPhone() 监听次数
var hPhoneTimer;// getPhone

var hPhoneIntervalTimes2 = 0;// getPhone2() 监听次数
var hPhoneTimer2;// getPhone

var messageIntervalTimes = 0;// 留言信息监听次数
var hMessageTimer2;

// 监听标签
var onlineTag = "yslistening-online";
var messageTag = "yslistening-message";

var mobileMessageTag = "yslistening-mobile-sms";
var onlineNbTag = "yslistening-nb-online";
var mobileOnlineNbTag = "yslistening-mobile-nb-online";

var live800OnlineTag = "yslistening-live800-online";
var qqonlineTag = "yslistening-QQ-online";
var phoneTag = "yslistening-phone";
var telMobileTag = "yslistening-mobile-tel";
var kflOnlineTag = "yslistening-kfl-online";

//添加自定义原昇在线咨询监听
var ysNisureOnlineTag = "yslistening-nisure-online";

var _paq = _paq || [];
_paq.push([ 'setDomains', [ '*.' + domain ] ]);
_paq.push([ 'trackPageView' ]);
_paq.push([ 'trackVisibleContentImpressions', true, 750 ]);
_paq.push([ 'enableLinkTracking' ]);

// 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
var url = "//www.nisure.cn/piwikdatalistener/getsite.do?callback=getResult";
//var url = "https://pre-release.nisure.net/piwikdatalistener/getsite.do?callback=getResult";
// 创建script标签，设置其属性
var script = document.createElement('script');
script.setAttribute('src', url);
// 把script标签加入head，此时调用开始
doc.getElementsByTagName('head')[0].appendChild(script);

var getResult = function(data) {
	// console.log(data);

	idsite = data.site;
	enName = data.consultName;

	if (idsite != 0) {
		var u = '//www.nisure.net/piwik/';
		_paq.push([ 'setTrackerUrl', u + 'piwik.php' ]);
		_paq.push([ 'setSiteId', idsite ]);
		var d = doc, g = d.createElement('script'), s = d
				.getElementsByTagName('script')[0];
		g.type = 'text/javascript';
		g.async = true;
		g.defer = true;
		g.src = u + 'piwik.js';
		s.parentNode.insertBefore(g, s);
		console.log('hit success');
	} else {
		console.log("hit fail");
	}

	wxListener();

	// console.log(doc.getElementById('qiao-mess-foot-send-btn'));

	setTimeout(getPublicAnalyze(), 500);

	/* PC在线咨询1 计时监听 */
	hOnlineTimer1 = setInterval("getOnline(clearAllOnlineTimer)", 1000);
	/* PC在线咨询2 计时监听 */
	hOnlineTimer2 = setInterval("getOnline2(clearAllOnlineTimer)", 1000);
	/* pc在线咨询3 计时监听 */
	hOnlineTimer3 = setInterval("getOnline3(clearAllOnlineTimer)", 1000);

	/* 手机端在线咨询 计时 */
	hMobileOnlineTimer = setInterval('getMobileOnline(clearAllOnlineTimer)',
			1000);

	/* PC 在线留言 计时 */
	hMessageTimer2 = setInterval("getHMessage2(clearMessageTimer)", 1000);

	/* 电话咨询 */
	var hPhoneTimer = setInterval("getPhone(clearPhone)", 1000);

	// setTimeout("getPublicAnalyze('"+enName+"')",50);

	// setTimeout("getNbOnline('"+enName+"')",500);

	getLive800Consult();
	setTimeout("getKFLConsult()", 500);

	var invite = document.getElementById("nb_invite_ok");
	// 狄腾马
	getHmOnlineJs1(clearAllHmTimer);
	getHmOnlineJs2(clearAllHmTimer);
	getHmOnlineJs3(clearAllHmTimer);
	if (isShuanQiaoHm) {
		hmOnlinetimer1 = setInterval("getHmOnlineJs1(clearAllHmTimer)", 1000);
		hmOnlinetimer2 = setInterval("getHmOnlineJs2(clearAllHmTimer)", 1000);
		hmOnlinetimer3 = setTimeout("getHmOnlineJs3(clearAllHmTimer)", 500);
	}

	/* 移动端 */
	// 可用于手机号和固话正则匹配以及400电话
	var isPhone = /^(1[3,5,8,7]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|((400)(\d{3})(\d{4}))|(?:(?:0\d{2,3}))?(?:\d{7,8})((?:\d{3,}))?|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
	var hrefArr = doc.getElementsByTagName('a');
	var phone_num;
	var telaccount = 0;
	var hreflength = hrefArr.length;
	for (var i = 0; i < hreflength; i++) {
		//添加自定义原昇在线咨询
		var YSHrefText = hrefArr[i].innerHTML;
		
		
		var hrefArrayElement = hrefArr[i];
		var href = hrefArrayElement.href;
		if (href.indexOf('tel:') != -1) {
			phone_num = href.substring(4, href.length);
			if (phone_num.match(isPhone) != null) {
				// console.log(phone_num);
				// telArray[telaccount] = hrefArr[i];

				hrefArrayElement.onclick = function() {
					_paq.push([ 'trackPageView', telMobileTag ]);
				}

				// hrefArrayElement.setAttribute("id","tel_phone");

			}
		}
		if (href.indexOf('sms:') != -1) {
			phone_num = href.substring(4, hrefArr[i].href.length);
			if (phone_num.match(isPhone) != null) {
				// console.log(phone_num);
				hrefArrayElement.setAttribute("id", "sms_phone");
			}
		}
		if (href.indexOf('http://wpa.qq.com') != -1
				|| href.indexOf('tencent://') != -1) {
			hrefArrayElement.setAttribute("id", "qq_online" + i);
			get_qq_online(i);
		}

		if (href.indexOf('qiao-icon-user') != -1) {
			get_online(hrefArrayElement.id);
		}
		//添加自定义原昇在线咨询监听
		if(YSHrefText.indexOf('yuansheng_chat') != -1){
			hrefArrayElement.setAttribute("id", "ys_nisure_online" + i);
			get_nisure_online(i);
		}

	}

}

//添加自定义原昇在线咨询监听
function get_nisure_online(i) {
	var text = doc.getElementById('ys_nisure_online' + i);
	if (text) {
		text.addEventListener('click', function() {
			_paq.push([ 'trackPageView', ysNisureOnlineTag ]);
			console.log("yslistening-nisure-online");
		}, false);

	}
}

function wxListener() {
	var flag = false;
	var wxNumber = doc.getElementsByTagName("wechatAccount");
	var wxNumberPic = doc.querySelector('.yisheng_wx_number_pic');
	eventIntervaArr = new Array();
	eventInterva = 300;
	if (wxNumber != null && wxNumber != undefined) {
		flag = true;
		for (var i = 0, len = wxNumber.length; i < len; i++) {
			wxNumber[i].addEventListener('copy', function() {
				// console.log("listening");
				_paq.push([ 'trackPageView', 'copyWechatAccount' ]);

			})
		}

	}
	if (wxNumberPic != null && wxNumberPic != undefined) {
		flag = true;
		var userAgentMessage = window.navigator.userAgent;
		// console.log(userAgentMessage);
		wxNumberPic.addEventListener('touchstart', function(event) {
			eventIntervaArr[0] = new Date();
		});
		if (userAgentMessage.indexOf('AppleWebKit') > -1
				&& userAgentMessage.indexOf('Android') > -1) {
			wxNumberPic.addEventListener('touchcancel', function() {
				eventIntervaArr[1] = new Date();
				if (eventIntervaArr[1] - eventIntervaArr[0] >= eventInterva) {
					// 输入长按执行函数
					_paq.push([ 'trackPageView', 'pressWechatCode' ]);
				}
				eventIntervaArr = [];
			})
		} else if (userAgentMessage.indexOf('AppleWebKit') > -1
				&& userAgentMessage.indexOf('iPhone') > -1) {
			wxNumberPic.addEventListener('touchend', function() {
				eventIntervaArr[1] = new Date();
				if (eventIntervaArr[1] - eventIntervaArr[0] >= eventInterva) {
					// 输入长按执行函数
					_paq.push([ 'trackPageView', 'pressWechatCode' ]);
				}
				eventIntervaArr = [];
			})
		}
	}

}

function getLive800Consult() {

	/* live800 插件点击监控 */
	if (getElementsClass("live800")) {
		var live800 = getElementsClass("live800");
		var i = 0;
		// console.log(live800);
		if (live800 != null && live800 != undefined && live800 != "") {
			for (i = 0; i < live800.length; i++) {
				addEventHandler(live800[i], "click", live800Online);
			}
			// console.log("live800 listening");
		}
	}

	if (document.getElementById("invite_btn")) {
		var invite_btn = document.getElementById("invite_btn");
		if (invite_btn != null && invite_btn != undefined && invite_btn != "") {
			addEventHandler(invite_btn, "click", live800Online);
			// console.log("invite_btn listening");
		}
	}

	/* live800 楼兰订制 */
	if (document.getElementById("lim_mini")) {
		var lim_enterbtn = document.getElementById("lim_mini");
		if (lim_enterbtn != null && lim_enterbtn != undefined
				&& lim_enterbtn != "") {
			addEventHandler(invite_btn, "click", live800Online);
			// console.log("lim_mini btn listening");
		}
	}

}

function live800Online() {

	_paq.push([ 'trackPageView', live800OnlineTag ]);

}

function getKFLConsult() {
	console.log(document.getElementsByClassName("Lelem"));
	if (document.getElementsByClassName("Lelem")) {
		var kFls = document.getElementsByClassName("Lelem");
		for (var i = 0; i < kFls.length; i++) {
			console.log("kfl listening");
			if (kFls[i].getElementsByTagName("img")) {
				addEventHandler(kFls[i].getElementsByTagName("img")[0],
						"click", function() {
							_paq.push([ 'trackPageView', kflOnlineTag ]);

						});

				break;

			}
		}
	}
}

function listentKFL() {

}

function isShuanQiaoHm() {
	var isHmJs = false;
	for (i = 0; i < scripts.length; i++) {
		var script = scripts[i]
		if (script.src.indexOf("hm.js")) {

			isHmJs = true;
			return isHmJs;
		}
	}

	return false;
}

function isShuanQiaoH() {
	var isHmJs = false;
	for (i = 0; i < scripts.length; i++) {
		var script = scripts[i]
		if (script.src.indexOf("h.js")) {

			isHmJs = true;
			return isHmJs;
		}
	}

	return false;
}

/** 封装ajax原生方法 */
function ajax(options) {
	options = options || {};
	options.type = (options.type || "GET").toUpperCase();
	options.dataType = options.dataType || "json";
	var params = formatParams(options.data);

	// 创建 - 非IE6 - 第一步
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else { // IE6及其以下版本浏览器
		var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	// 接收 - 第三步
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var status = xhr.status;
			if (status >= 200 && status < 300) {
				options.success
						&& options.success(xhr.responseText, xhr.responseXML);
			} else {
				options.fail && options.fail(status);
			}
		}
	}

	// 连接 和 发送 - 第二步
	if (options.type == "GET") {
		// xhr.open("GET", options.url + "?" + params, true);
		xhr.open("GET", options.url, true);
		xhr.send(null);
	} else if (options.type == "POST") {
		xhr.open("POST", options.url, true);
		// 设置表单提交时的内容类型
		xhr.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded");
		xhr.send(params);
	}
}
// 格式化参数
function formatParams(data) {
	var arr = [];
	for ( var name in data) {
		arr.push(encodeURIComponent(name) + "="
				+ encodeURIComponent(data[name]));
	}
	arr.push(("v=" + Math.random()).replace(".", ""));
	return arr.join("&");
}

/* 在线咨询 */
function get_online(id) {
	if (doc.getElementById(id)) {
		var a = doc.getElementById(id);
		a.addEventListener('click', function() {
			_paq.push([ 'trackPageView', onlineTag ]);
		}, false);
		// console.log("link online listening");
	}
}
/* QQ咨询 */
function get_qq_online(i) {
	if (doc.getElementById('qq_online' + i)) {
		var a = doc.getElementById('qq_online' + i);
		a.addEventListener('click', function() {
			_paq.push([ 'trackPageView', qqonlineTag ]);
			// console.log("qq listening ");
		}, false);

	}
}

/*
 * 获取 h.js Message1
 */
function getOnline3(callback) {

	/* 在线咨询 */
	if (getElementsClass('qiao-invite-accept')) {
		var a = getElementsClass('qiao-invite-accept');
		if (a != null && a != "") {
			a[0].onclick = function() {
				_paq.push([ 'trackPageView', onlineTag ]);
				// console.log("message1-listening");
				// console.log("qiao-invite-accept listening");

			}

			callback();
		}

	}

}

/*
 * 获取 h.js Message2
 */
function getHMessage2(callback) {

	/* 在线留言 */

	if (doc.getElementById('qiao-mess-foot-send-btn')) {
		// console.log(enName+"-message");
		var a = doc.getElementById('qiao-mess-foot-send-btn')
		a.addEventListener("click", function() {
			_paq.push([ 'trackPageView', messageTag ]);
			// console.log("qiao-mess-foot-send-btn listening");

		});
		callback();
	}

}

function getPublicAnalyze() {

	/* 狄腾马 手机端代码2 */
	// console.log("dtm:"+getElementsClass("nb-icon-bridge0
	// nb-icon-bridge-base"));
	/**
	 * if(getElementsClass("nb-icon-bridge0 nb-icon-bridge-base")){ var
	 * invite=getElementsClass("nb-icon-bridge0 nb-icon-bridge-base");
	 * if(invite[0]){ invite[0].onclick=function(){ _paq.push(['trackPageView',
	 * enName+"-mobile-nb-online"]); } } }
	 */

	if (doc.getElementById('tel_phone')) {
		var a = doc.getElementById('tel_phone');
		eventDelegate(a, 'click', function() {
			_paq.push([ 'trackPageView', phoneTag ]);
		});
	}
	if (doc.getElementById('sms_phone')) {
		var a = doc.getElementById('sms_phone');
		eventDelegate(a, 'click', function() {
			_paq.push([ 'trackPageView', mobileMessageTag ]);
		});
	}
	/* 移动端在线咨询 */
	if (getElementsClass('qiao-icon-sector-inner')) {
		var a = getElementsClass('qiao-icon-sector-inner');
		if (a != null && a != "") {
			a[0].onclick = function() {
				_paq.push([ 'trackPageView', onlineTag ]);
			}
		}
	}
	/* 移动端在线咨询 */
	if (getElementsClass('qiao-invite-chat')) {
		var a = getElementsClass('qiao-invite-chat')
		// console.log("chatting");
		if (a != null && a != "") {
			a[0].onclick = function() {
				_paq.push([ 'trackPageView', onlineTag ]);
				// console.log("chatting");
			}
		}
	}
	// /*移动端电话咨询，输入手机号，商家打给访问者*/
	// if(getElementsClass('lxb-cb-input-btn')){
	// var a = getElementsClass('lxb-cb-input-btn')
	// var b = getElementsClass("lxb-cb-input");
	// if(a != null && a != ""){
	//				
	// a[0].mouseleave= function(){
	// if(isMobile(b[0].value)||isTel(b[0].value)){
	// _paq.push(['trackPageView', phoneTag]);
	// }
	// }
	//						
	//					
	//				
	// }
	// }
}

function getHmOnlineJs1(callback) {
	/* ditengma 咨询代码 */

	if (doc.getElementById("nb_icon_wrap")) {

		wrap = doc.getElementById("nb_icon_wrap");
		wrap.onclick = function(){
			_paq.push([ 'trackPageView', onlineNbTag ]);
			console.log("nb_icon_wrap");
		}

		
	}

}

function getHmOnlineJs2(callback) {

	/* 狄腾马 手机端代码1 */

	if (doc.getElementById("nb_invite_ok")) {

		var invite = doc.getElementById("nb_invite_ok");
		invite.onclick = function() {
			_paq.push([ 'trackPageView', onlineNbTag ]);
			console.log("nb_invite_ok");

		}
		// console.log(enName+"-nb-online2");
		callback();

	}
}

function getHmOnlineJs3(callback) {
	if (getElementsClass("nb-icon-bridge0 nb-icon-bridge-base")) {
		var invite = getElementsClass("nb-icon-bridge0 nb-icon-bridge-base");
		if (invite[0]) {
			invite[0].onclick = function() {
				_paq.push([ 'trackPageView', onlineNbTag ]);
				console.log("nb-icon-bridge0 ");
			}
			// console.log(enName+"-nb-online3");
			callback();
			return;
		}
	}
}

function getOnline(callback) {

	if (doc.getElementById('qiao-icon-wrap')) {
		for (var i = 0; i < 10; i++) {
			s = doc.getElementById('qiao-icon-group' + i);
			if (s) {
				s.addEventListener('click', function() {
					_paq.push([ 'trackPageView', onlineNbTag ]);
					console.log("listening online ");
				}, false);
			}
			if (i == 10) {
				callback();
			}
		}

	}
}

function getMobileOnline(callback) {
	hMobileOnlineIntervalTimes++;

	if (doc.getElementById('QIAO_ICON_CONTAINER')) {
		var s = doc.getElementById('QIAO_ICON_CONTAINER');
		s.addEventListener('click', function() {
			_paq.push([ 'trackPageView', onlineNbTag ]);
			// console.log("listening phone");
		}, false);
		callback();
	}

}

function getOnline2(callback) {

	var a = getElementsClass('m-lite-opt');
	if (a != null && a != "") {
		a[0].click = function() {
			_paq.push([ 'trackPageView', onlineNbTag ]);
			// console.log("online1 listening");

		}

		callback();
	}
}

// 在线电话咨询
function getPhone(callback) {

	if (getElementsClass('lxb-container')) {
		var a = getElementsClass('lxb-cb-input-btn');
		var b = getElementsClass("lxb-cb-input");
		if (a != null && a != "") {
			for (i = 0; i < a.length; i++) {

				addEventHandler(a[i], 'click', function() {
					// console.log("phone2 listening");
					if (isMobile(b[0].value) || isTel(b[0].value)) {
						_paq.push([ 'trackPageView', phoneTag ]);
						console.log("phone1 listening");
					}

				});
			}
		}
		callback();
	}

	if (doc.getElementById('LXB_CONTAINER_SHOW')) {
		var a = doc.getElementById('LXB_CONTAINER_SHOW');
		a.addEventListener('click', function() {
			_paq.push([ 'trackPageView', phoneTag ]);
			// console.log("phone2 listening");
		}, false);
		callback();
	}

}

/*
 * 
 * 
 * function getMobilePhoneCall(enName){ var tel=doc.getElementById("tel_phone");
 * //console.log(tel); if(tel){ console.log("tel pass"); eventDelegateChild(tel,
 * 'click', function() { console.log("tel onclick"); _paq.push(['trackPageView',
 * enName+'-mobile-phone']); }); }
 *  }
 */

/** 封装ajax原生方法 */
function ajax(options) {
	options = options || {};
	options.type = (options.type || "GET").toUpperCase();
	options.dataType = options.dataType || "json";
	var params = formatParams(options.data);

	// 创建 - 非IE6 - 第一步
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else { // IE6及其以下版本浏览器
		var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	// 接收 - 第三步
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var status = xhr.status;
			if (status >= 200 && status < 300) {
				options.success
						&& options.success(xhr.responseText, xhr.responseXML);
			} else {
				options.fail && options.fail(status);
			}
		}
	}

	// 连接 和 发送 - 第二步
	if (options.type == "GET") {
		// xhr.open("GET", options.url + "?" + params, true);
		xhr.open("GET", options.url, true);
		xhr.send(null);
	} else if (options.type == "POST") {
		xhr.open("POST", options.url, true);
		// 设置表单提交时的内容类型
		xhr.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded");
		xhr.send(params);
	}
}
// 格式化参数
function formatParams(data) {
	var arr = [];
	for ( var name in data) {
		arr.push(encodeURIComponent(name) + "="
				+ encodeURIComponent(data[name]));
	}
	arr.push(("v=" + Math.random()).replace(".", ""));
	return arr.join("&");
}

function getElementsClass(classnames) {
	var classobj = new Array();// 定义数组
	var classint = 0;// 定义数组的下标
	var tags = doc.getElementsByTagName("*");// 获取HTML的所有标签
	for ( var i in tags) {// 对标签进行遍历
		if (tags[i].nodeType == 1) {// 判断节点类型
			if (tags[i].getAttribute("class") == classnames)// 判断和需要CLASS名字相同的，并组成一个数组
			{
				classobj[classint] = tags[i];
				classint++;
			}
		}
	}
	return classobj;// 返回组成的数组
}

/* 事件委托 */
/*
 * function eventDelegate(parentElement, childElement, type, handler) {
 * parentElement.addEventListener(type, function(e) { if (event.target &&
 * event.target.nodeName.toLowerCase() == childElement) { handler(); } }); }
 */

/* 清除hm 在线计时器 */
function clearAllHmTimer() {
	clearInterval(hmOnlinetimer1);
	clearInterval(hmOnlinetimer2);
	clearInterval(hmOnlinetimer3);
}

/* 清除h在线计时器 */
function clearAllOnlineTimer() {
	clearInterval(hOnlineTimer1);
	clearInterval(hOnlineTimer2);
	clearInterval(hOnlineTimer3);

}

/* 清除留言在线监听 */
function clearMessageTimer() {
	clearInterval(hMessageTimer2);
}

/* 清除在线电话计时器监听 */
function clearPhone() {
	clearInterval(hPhoneTimer);
}

function eventDelegate(parentElement, type, handler) {
	parentElement.addEventListener(type, function(e) {
		handler();
	});
}

/*
 * addEventListener:监听Dom元素的事件
 * 
 * target：监听对象 type：监听函数类型，如click,mouseover func：监听函数
 */
function addEventHandler(target, type, func) {

	if (target.addEventListener) {
		// 监听IE9，谷歌和火狐
		target.addEventListener(type, func, false);
	} else if (target.attachEvent) {
		target.attachEvent("on" + type, func);
	} else {
		target["on" + type] = func;
	}
}

function isMobile(val) {
	return (/^(?:13\d|15[789])-?\d{5}(\d{3}|\*{3})$/.test(trim(val)));
}
function isTel(val) {
	return (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
			.test(trim(val)));
}

function trim(str) { // 删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
var l = document.getElementsByTagName("head")[0]
var css = document.createElement("link")
css.href = "//www.nisure.cn/piwikdatalistener/css/yuansheng_main.css"
//css.href="http://192.168.3.33:8080/piwikdatalistener/css/yuansheng_main.css"
//css.href="https://pre-release.nisure.net/piwikdatalistener/css/yuansheng_main.css"
css.rel = 'stylesheet';
css.type = 'text/css';
l.appendChild(css);


document.write("<a href='javascript:void(0)' onclick='openChat()' ><ins class='yuansheng_chat' id='yuansheng_chat'  ></ins><a>");
//url = 'https://www.nisure.cn/piwikdatalistener/im/index.jsp?domain='+document.domain
//url = 'http://192.168.3.33:8080/piwikdatalistener/websdk/im/im.html?domain='+document.domain
//url = '//www.nisure.cn/piwikdatalistener/websdk/im/im.html?domain='+document.domain
//url = 'https://pre-release.nisure.net/piwikdatalistener/websdk/im/im.html?domain='+document.domain
//zijideIM
//url = 'https://pre-release.nisure.net/piwikdatalistener/websdk/conversation/conversation.html?domain='+document.domain
url = '//www.nisure.cn/piwikdatalistener/websdk/conversation/conversation.html?domain='+document.domain


document.write("<script>");

document.write("function openChat(){window.open('"+url+"','top=100,left=100,width=300,height=200');}");
document.write("</script>");


