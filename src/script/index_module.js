define(['jq_lazyload'], () => {
  return {
    init() {
      $.ajax({
        url: 'http://10.31.161.62/dashboard/converse_project/php/index_goods.php',
        dataType: 'json'
      }).done((data) => {
        // 二级菜单相关--tab选项卡
        const $nav_li = $('.nav_li');
        const $nav_extend = $('.nav_extend');
        const $mask = $('.mask');
        const $banner_height = $('.banner').height();


        // 幻灯片相关
        const $slide = $('.slide');
        const $slide_pic = $('.slide_pic');
        const $slide_prev = $('.slide_prev');
        const $slide_next = $('.slide_next');
        const $menu_li = $('.menu_li');
        const $pic_num = $slide_pic.size();
        let $timer = null;
        let $num = 0;
        $('.slide_pic img').height($banner_height);


        // 点击进入登录注册页面
        const $log_a_btn = $('.log_a_btn');
        const $reg_a_btn = $('.reg_a_btn');
        const $confirm_btn = $('.confirm_btn');


        // 二级菜单--tab选项卡
        if ($('.header_login').css('display') === 'none' || $('.header_register').css('display') === 'none') {
  
          // $nav_li.hover(function () {
          //   // $nav_extend.show();
          //   $nav_extend.eq($(this).index()).show().siblings('.nav_extend').hide();
          //   $mask.show();
          // }, function () {
          //   $nav_extend.hide();
          //   $mask.hide();
          // });
          // $nav_extend.hover(function () {
          //   $(this).show();
          //   $mask.show();
          // }, function () {
          //   $(this).hide();
          //   $mask.hide();
          // });


          $nav_li.bind({
            mouseenter: function () {
              $nav_extend.eq($(this).index()).show().siblings('.nav_extend').hide();
              $mask.show();
            },
            mouseleave: function () {
              $nav_extend.hide();
              $mask.hide();
            }
          });
          $nav_extend.bind({
            mouseenter: function () {
              $(this).show();
              $mask.show();
            },
            mouseleave: function () {
              $(this).hide();
              $mask.hide();
            }
          });
          console.log($('.header_login').css('display'));
          console.log($('.header_register').css('display'));
          
        }

        // 注册登录相关
        $log_a_btn.on('click', function () {
          $('.header_extend').css('display', 'block');
          $('.header_login').css('display', 'block');
          $('.header_register').css('display', 'none');
          $log_a_btn.addClass('reg_log_active').siblings('.reg_a_btn').removeClass('reg_log_active');
          $mask.show();
          console.log($('.header_login').css('display'));
          console.log($('.header_register').css('display'));

          // 防止在注册登录页面取消遮罩
          if ($('.header_login').css('display') === 'block' || $('.header_register').css('display') === 'block'){
            $nav_li.unbind('mouseenter').unbind('mouseleave');
            $nav_extend.unbind('mouseenter').unbind('mouseleave');
  
            console.log($('.header_login').css('display'));
            console.log($('.header_register').css('display'));
          }
        });
        $reg_a_btn.on('click', function () {
          $('.header_extend').css('display', 'block');
          $('.header_register').css('display', 'block');
          $('.header_login').css('display', 'none');
          $reg_a_btn.addClass('reg_log_active').siblings('.log_a_btn').removeClass('reg_log_active');
          $mask.show();

          if ($('.header_login').css('display') === 'block' || $('.header_register').css('display') === 'block'){
            $nav_li.unbind('mouseenter').unbind('mouseleave');
            $nav_extend.unbind('mouseenter').unbind('mouseleave');
  
            console.log($('.header_login').css('display'));
            console.log($('.header_register').css('display'));
          }
        });
        $confirm_btn.on('click', function () {
          $('.header_login').css('display', 'none');
          $('.header_register').css('display', 'block');
          $reg_a_btn.addClass('reg_log_active').siblings('.log_a_btn').removeClass('reg_log_active');
        });
        $mask.on('click', function () {
          console.log(111);
          $('.header_extend').css('display', 'none');
          $('.header_login').css('display', 'none');
          $('.header_register').css('display', 'none');
          $mask.hide();
        });

        // 轮播图逻辑
        $menu_li.eq(0).addClass('slide_active'); //默认初始第一个为样式

        $slide.hover(function () {
          clearInterval($timer);
        }, function () {
          $timer = setInterval(() => {
            $slide_next.click();
          }, 3000);
        });

        $menu_li.hover(function () {
          clearInterval($timer);
          $slide_pic.eq($(this).index()).show().siblings('.slide_pic').hide();
          $menu_li.eq($(this).index()).addClass('slide_active').siblings('.menu_li').removeClass('slide_active');
          $num = $(this).index();
        }, function () {
          $slide_pic.eq($(this).index()).show().siblings('.slide_pic').hide();
          $menu_li.eq($(this).index()).addClass('slide_active').siblings('.menu_li').removeClass('slide_active');

          $timer = setInterval(() => {
            $slide_next.click();
          }, 3000);
        });
        $slide_next.hover(() => {
          clearInterval($timer);
        }, () => {
          $timer = setInterval(() => {
            $slide_next.click();
          }, 3000);
        });
        $slide_prev.hover(() => {
          clearInterval($timer);
        }, () => {
          $timer = setInterval(() => {
            $slide_next.click();
          }, 3000);
        });
        $slide_next.on('click', function () {
          // console.log($pic_num);
          $num++;
          slide();
        });
        $slide_prev.on('click', function () {
          $num--;
          slide();
        });

        $timer = setInterval(() => { // 自动轮播
          $slide_next.click();
        }, 3000);

        function slide() {
          if ($num === $pic_num) {
            $num = 1;
          }

          if ($num === -1) {
            $num = $pic_num - 2;
          }

          if ($num === $pic_num - 1) {
            $menu_li.eq(0).addClass('slide_active').siblings('.menu_li').removeClass('slide_active');
            $slide_pic.eq(0).show().siblings('.slide_pic').hide();
          } else {
            $menu_li.eq($num).addClass('slide_active').siblings('.menu_li').removeClass('slide_active');
            $slide_pic.eq($num).show().siblings('.slide_pic').hide();
          }
        }

        // 渲染
        console.log(data);
        const $cate_detail = $('.cate_detail');
        let $renderStr = '';
        let $old_price = '';
        let $new_price = '';
        $.each(data, function (index, value) {
          // console.log(value);
          if (!value.oldPrice) {
            $old_price = `<p class="old_price" style="visibility:hidden"><del></del></p>`;
            $new_price = `<p class="now_price1">￥${value.nowPrice}</p>`;
          } else {
            $old_price = `<p class="old_price"><del>￥${value.oldPrice}</del></p>`;
            $new_price = `<p class="now_price2">￥${value.nowPrice}</p>`;
          }
          $renderStr += `
            <li class="cate_detail_li">
              <div class="ca_de_img"><a href="#" ><img class="lazy" data-original="${value.url}" width="165" height="165" /></a></div>
              <p class="ca_de_title"><a href="#">${value.title}</a></p>
              ${$old_price}
              ${$new_price}
            </li>
          `;
        });
        $cate_detail.html($renderStr);
        //懒加载---页面加载完成
        $(function () {
          $('img.lazy').lazyload({
            effect: 'fadeIn' //显示方法：谈入
          });
        })
      });
    }
  }
});