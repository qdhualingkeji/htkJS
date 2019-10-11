//首页轮播
var mySwiper = new Swiper('.swiper-container_1', {
    direction: 'horizontal',
    loop: true,
    autoplay: 6000,
    speed: 500,
    autoplayDisableOnInteraction: false,
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
});
//行业案例
var mySwiper = new Swiper('.swiper-container_2', {
    direction: 'horizontal',
    loop: true,
    autoplay: 5000,
    speed: 300,
    autoplayDisableOnInteraction: false,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
});
//tab切换
$('#myTab a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
});

//导航事件
$('.nav_active').hover(function () {
    var index = $(this).index();
    $('.navbottom').removeClass('displayblock');
    $('.navbottom').eq(index).addClass('displayblock');
    $(this).addClass("active").siblings('.nav_active').removeClass("active");
    $('.sub-nav-bg').eq(index).fadeIn(150).siblings('.sub-nav-bg').fadeOut(150);
}, function () { });

$('.sub-nav-bg').mouseleave(function () {
    $('.sub-nav-bg').fadeOut(150);
});

//移动app
$(".fuction_box1").hover(function () {
    $(".app_shop_img").fadeIn(300).attr("src", "/Content/resource/img/shopapp1.png"), function () { };
});
$(".fuction_box2").hover(function () {
    $(".app_shop_img").fadeIn(300).attr("src", "/Content/resource/img/shopapp2.png"), function () { };
});
$(".fuction_box3").hover(function () {
    $(".app_shop_img").fadeIn(300).attr("src", "/Content/resource/img/shopapp3.png"), function () { };
});
$(".fuction_box4").hover(function () {
    $(".app_shop_img").fadeIn(300).attr("src", "/Content/resource/img/shopapp4.png"), function () { };
});
$(".fuction_box5").hover(function () {
    $(".app_shop_img").fadeIn(300).attr("src", "/Content/resource/img/shopapp5.png"), function () { };
});
$(".fuction_box6").hover(function () {
    $(".app_shop_img").fadeIn(300).attr("src", "/Content/resource/img/shopapp6.png"), function () { };
});
$(".fuction_box7").hover(function () {
    $(".app_shop_img").fadeIn(300).attr("src", "/Content/resource/img/shopapp7.png"), function () { };
});
$(".fuction_box8").hover(function () {
    $(".app_shop_img").fadeIn(300).attr("src", "/Content/resource/img/shopapp8.png"), function () { };
});
$(".fuction_box9").hover(function () {
    $(".app_shop_img").fadeIn(300).attr("src", "/Content/resource/img/shopapp9.png"), function () { };
});
$(".fuction_box10").hover(function () {
    $(".app_shop_img").fadeIn(300).attr("src", "/Content/resource/img/shopapp10.png"), function () { };
});
$(".fuction_box11").hover(function () {
    $(".app_shop_img").fadeIn(300).attr("src", "/Content/resource/img/shopapp11.png"), function () { };
});
//智慧软件
$(".zhihui_li_1").hover(function () {
    $(".zhihui_img").fadeIn(300).attr("src", "/Content/resource/img/zhihui1.png"), function () { };
});
$(".zhihui_li_2").hover(function () {
    $(".zhihui_img").fadeIn(300).attr("src", "/Content/resource/img/zhihui2.png"), function () { };
});
$(".zhihui_li_3").hover(function () {
    $(".zhihui_img").fadeIn(300).attr("src", "/Content/resource/img/zhihui3.png"), function () { };
});
$(".zhihui_li_4").hover(function () {
    $(".zhihui_img").fadeIn(300).attr("src", "/Content/resource/img/zhihui4.png"), function () { };
});
$(".zhihui_li_5").hover(function () {
    $(".zhihui_img").fadeIn(300).attr("src", "/Content/resource/img/zhihui5.png"), function () { };
});
$(".zhihui_li_6").hover(function () {
    $(".zhihui_img").fadeIn(300).attr("src", "/Content/resource/img/zhihui6.png"), function () { };
});
$(".zhihui_li_7").hover(function () {
    $(".zhihui_img").fadeIn(300).attr("src", "/Content/resource/img/zhihui7.png"), function () { };
});
$(".zhihui_li_8").hover(function () {
    $(".zhihui_img").fadeIn(300).attr("src", "/Content/resource/img/zhihui8.png"), function () { };
});

$("#zhihuiul li").hover(function () {
    $(this).addClass("active").siblings("li").removeClass("active");
});

//改变背景图片
//$("#li2").click(function(){
//	$(".Product_service").css("background-image","url(img/Productbg2.jpg)");
//	$(".Product_service").removeClass("bg");
//	$(".Product_service").addClass("activebg");
//});
//$("#li3").click(function(){
//	$(".Product_service").css("background-image","url(img/zhuhuibigbg.jpg)");
//	$(".Product_service").removeClass("bg");
//	$(".Product_service").addClass("activebg");
//});
//$("#li4").click(function(){
//	$(".Product_service").css("background-image","url(img/yjbg.jpg)");
//	$(".Product_service").removeClass("bg");
//	$(".Product_service").addClass("activebg");
//});
//侧边栏广告
var boradside = document.getElementsByClassName("boradside")[0];
//onscroll 滚动条事件，当滚动条滚动时触发事件
window.onscroll = function(){
    //获取当前滚动条高度
    var scrollTop = getST();
    //获取浏览器或设备的窗口高度
    var windowH = document.documentElement.clientHeight;
    boradside.style.top = scrollTop + windowH/1.6 + "px";
}
function getST(){
    return document.documentElement.scrollTop||document.body.scrollTop;
}
//置顶
$("#zhiding").on("click",function(){
    $("body,html").animate({scrollTop:0},500);
});
//侧边栏显示

var left_small_box = $(".left_small_box");
var right_small_box = $(".right_small_box");
right_small_box.each(function (index, item) {
    $(item).hover(function () {
        left_small_box.eq(index).fadeIn(150).siblings(".left_small_box").fadeOut(0);
    }, function () { });
});
$(".left_small_box").mouseleave(function () {
    $(this).fadeOut(150);
});



var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?9561a3e8eafa0027f9264fc14d2138f3";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
    //自动推送
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

//官网头部时间
//$(document).on("scroll",function(){
//	$(".container-fluid .header").animate({marginTop:"-80px"});
//	if($(document).scrollTop()==0){
//		$(".container-fluid .header").animate({marginTop:"0"});
		
//	}
//})
//下载页面的图片切换
$(".a1").mouseover(function () {
    $(".f-right").attr("src", "/productstyle/imags/ios.png");
});
$(".a1 ,a2").mouseout(function () {
    $(".f-right").attr("src", "/productstyle/imags/pcyingyong.png");
});
$(".a2").mouseover(function () {
    $(".f-right").attr("src", "/productstyle/imags/android.png");
});

//视屏页面的脚本
//var table1 = $('.table1 img');
//var tabh1 = $('.table1 h1');
//$(".tv_icon_show").each(function (index, item) {
//    $(this).hover(function () {
//        $(this).css("disp1ay", "none");
//        $(this).attr('src', $(this).attr('thissrc'));
//        $(tabh1).eq(index).css("color", "#fff");
//    }, function () {
//        $(this).attr('src', $(this).attr('prototyesrc'));
//        $(tabh1).eq(index).css("color", "gray");
//    });
//});
//var table1 = $('.table1 img');
//var tabh1 = $('.table1 h1');
//table1.each(function (index, item) {
//    $(this).hover(function () {
//        $(this).attr('src', $(this).attr('thissrc'));
//        $(tabh1).eq(index).css("color", "#fff");
//    }, function () {
//        $(this).attr('src', $(this).attr('prototyesrc'));
//        $(tabh1).eq(index).css("color", "gray");
//    });
//});

//智能硬件的图片的改动
$("#changesize li a").click(function () {
    var index = $(this).attr("data-index");
    $(this).parent("li").addClass("active").siblings("li").removeClass("active");
    $(".change-size").attr("src", '/productstyle/imags/t'+index+'.png');
});

$("#changecard li a").click(function () {
    var index = $(this).attr("data-index");
    $(this).parent("li").addClass("active").siblings("li").removeClass("active");
    $(".change-size").attr("src", '/productstyle/imags/ic' + index + '.png');
    $(".changecardsize").eq(index).removeClass("hidden").siblings(".changecardsize").addClass("hidden");
});

//下载软件
$(".donwsoftwareshowbox li").hover(function () {
    $(this).children(".cored").fadeIn(300);
}, function () {
    $(this).children(".cored").fadeOut(0);
});

$("#list-item li").hover(function () {
    var index = $(this).index();
    $(this).addClass("active").siblings("li").removeClass("active");
    if (index == 0) {
        $("#software_bgb").css("background-color", "#7977ef");
        $("#list-item li .after").css("background-color", "#7977ef");
    }
    else if (index == 1) {
        $("#software_bgb").css("background-color", "#a1943b");
        $("#list-item li.active .after").css("background-color", "#a1943b");
    }
    else if (index == 2) {
        $("#software_bgb").css("background-color", "#09b662");
        $("#list-item li.active .after").css("background-color", "#09b662");
    }
    else if (index == 3) {
        $("#software_bgb").css("background-color", "#7c17da");
        $("#list-item li.active .after").css("background-color", "#7c17da");
    }
    else if (index == 4) {
        $("#software_bgb").css("background-color", "#6ead0c");
        $("#list-item li.active .after").css("background-color", "#6ead0c");
    }
    
});