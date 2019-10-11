$(document).ready(function () {
    var mySwiper = new Swiper('.swiper-container_1', {
        direction: 'horizontal',
        loop: true,
        autoplay: 3000,
        speed: 300,
        observer: true,
        observeParents: true,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

    });
    var mySwiper = new Swiper('.swiper-container_2', {
        direction: 'horizontal',
        slidesPerView: 2.5,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
    });

    var mySwiper = new Swiper('.swiper-container_3', {
        direction: 'horizontal',
        loop: true,
        autoplay: 3000,
        speed: 300,
        observer: true,
        observeParents: true,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    });

    var mySwiper = new Swiper('.swiper-container_4', {
        direction: 'horizontal',
        loop: true,
        autoplay: 3000,
        speed: 300,
        observer: true,
        observeParents: true,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

    });
    $("#closecansel").click(function () {
        $(".more_1").animate({ width: 'toggle' }, 500);
        $(".inbag-public").animate({ width: 'toggle' }, 500);
        $("#nb_toolbar_wrap").show(0);
    });
    $(".more_btn").click(function () {
        $(".inbag-public").css("display","block")
        $(".more_1").animate({ width: 'toggle' }, 500);
        $(".more_2").css("display", "none");
        $(".more_3").css("display", "none");
        $(".more_4").css("display", "none");
        $("#nb_toolbar_wrap").hide(0);
    })
    $(".more_case").click(function () {
        //$(".more_2").slideToggle(300);
        $(".more_1").css("display", "none");
        $(".more_3").css("display", "none");
        $(".more_4").css("display", "none");
    })
    $(".more_about").click(function () {
        $(".more_3").slideToggle(300);
        $(".more_1").css("display", "none");
        $(".more_2").css("display", "none");
        $(".more_4").css("display", "none");
    })
    $(".more_product").click(function () {
        $(".more_4").slideToggle(300);
        $(".more_1").css("display", "none");
        $(".more_2").css("display", "none");
        $(".more_3").css("display", "none");
    })
    //弹窗导航
    $("#setshowpro").click(function () {
        $(".pro-a--projiect").slideToggle(300);
        $("#service-Resources").css("display", "none");
        $("#hardware-list").css("display", "none");
    });
    $("#Resources").click(function () {
        $("#service-Resources").slideToggle(300);
        $(".pro-a--projiect").css("display", "none");
        $("#hardware-list").css("display", "none");
    });
    $("#harebtn").click(function () {
        $("#hardware-list").slideToggle(300);
        $("#service-Resources").css("display", "none");
        $(".pro-a--projiect").css("display", "none");
    });
    //置顶
    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 300) {
            $(".return_scr0").fadeIn(300);
        } else {
            $(".return_scr0").fadeOut(300);
        }
    })
    $(".return_scr0").on("click", function () {
        $("body,html").animate({ scrollTop: 0 }, 500);
    });
});

var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?136e56bddbd436554524c3fb4a4af61c";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "www.nisure.cn/piwikdatalistener/consultAnalyze.js' %3E%3C/script%3E"));
