define(['jq_cookie'],()=>{
  return {
    init(){
      // 头部相关
      const $nav_li = $('.nav_li');
      const $nav_extend = $('.nav_extend');
      const $log_a_btn = $('.log_a_btn');
      const $reg_a_btn = $('.reg_a_btn');
      const $confirm_btn = $('.confirm_btn');
      const $mask = $('.mask');

      // 二级菜单--tab选项卡
      if ($('.header_login').css('display') === 'none' || $('.header_register').css('display') === 'none') {
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
        
      }
      // 注册登录相关
      $log_a_btn.on('click', function () {
        $('.header_extend').css('display', 'block');
        $('.header_login').css('display', 'block');
        $('.header_register').css('display', 'none');
        $log_a_btn.addClass('reg_log_active').siblings('.reg_a_btn').removeClass('reg_log_active');
        $mask.show();

        // 防止在注册登录页面取消遮罩
        if ($('.header_login').css('display') === 'block' || $('.header_register').css('display') === 'block'){
          $nav_li.unbind('mouseenter').unbind('mouseleave');
          $nav_extend.unbind('mouseenter').unbind('mouseleave');
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
        }
      });
      $confirm_btn.on('click', function () {
        $('.header_login').css('display', 'none');
        $('.header_register').css('display', 'block');
        $reg_a_btn.addClass('reg_log_active').siblings('.log_a_btn').removeClass('reg_log_active');
      });
      $mask.on('click', function () {
        $('.header_extend').css('display', 'none');
        $('.header_login').css('display', 'none');
        $('.header_register').css('display', 'none');
        $reg_a_btn.removeClass('reg_log_active');
        $log_a_btn.removeClass('reg_log_active');
        $mask.show();
        $mask.hide();

        // 重新绑定nav对应事件
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
      });

      // -------------------------------------------------------

      let $sid = location.search.substring(1).split('=')[1];
      // 防止没有sid传入时，没有数据渲染
      if (!$sid) {
        $sid = 1;
      }

      $.ajax({
        url: 'http://10.31.161.62/dashboard/converse_project/php/detail_goods.php',
        dataType: 'json',
        data: {
          sid: $sid
        }
      }).done((data) => {
        console.log(data);

        // 根据传入的sid进行detail页面渲染
        let $curr_price = parseFloat(data.nowPrice) ;
        $('.goods_name').html(data.title);
        $('.curr_price').html($curr_price.toFixed(2));
        $('.detail_img img').attr('src',data.url);

        // 渲染放大镜小图
        let $small_pic = data.urls.split(',');
        let $s_pic_str = '';
        const $detail_pic_list = $('.detail_pic_list');
        $.each($small_pic,function (index,value) {
          // console.log(value);
          $s_pic_str += `
          <li class="pic_li active">
            <a href="#"><img src="${value}" alt=""></a>
          </li>
          `;
        });
        $detail_pic_list.html($s_pic_str);

        // -------------------------------------------------------


        // 放大镜逻辑


        // -------------------------------------------------------

        // 购物车逻辑
        let $arrSid = []; 
        let $arrNum = [];

        //通过获取cookie进行判断，每存储一个商品对应的商品编号存入cookie里面，cookie就会发生变化。如果cookie里面存在当前商品的编号，该商品不是第一次存储，直接数量累加。
        function existCookie() {
          if ($.cookie('cookieSid') && $.cookie('cookieNum')) {
            $arrSid = $.cookie('cookieSid').split(',');
            $arrNum = $.cookie('cookieNum').split(',');
          }
        }

        //第一次存储添加sid进入$arrSid，存储数量
        //第二次以上，直接修改数量。
        $('.go_cart').on('click', function() {
          existCookie();
          if ($.inArray($sid, $arrSid) === -1) { //第一次添加商品
              $arrSid.push($sid);
              $.cookie('cookieSid', $arrSid, { expires: 10, path: '/' });
              $arrNum.push(1);
              $.cookie('cookieNum', $arrNum, { expires: 10, path: '/' });
          } else {
              //通过$sid获取商品的数量所在的位置。
              let $index = $.inArray($sid, $arrSid);
              $arrNum[$index] = parseInt($arrNum[$index]) + 1;
              $.cookie('cookieNum', $arrNum, { expires: 10, path: '/' });
          }
          console.log('商品成功加入');
        });

      });
    }
  }
});