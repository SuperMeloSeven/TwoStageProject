define(['jq_cookie'], () => {
  return {
    init() {
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
        if ($('.header_login').css('display') === 'block' || $('.header_register').css('display') === 'block') {
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

        if ($('.header_login').css('display') === 'block' || $('.header_register').css('display') === 'block') {
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

      // 购物车逻辑

      // 获取存储在cookie中的内容
      const $reduce_num = $('.reduce_num');
      const $add_num = $('.add_num');
      let $sidArray = []; // 用于赋值购物车商品总数量，不受勾选的影响
      let $numArray = []; // 用于赋值购物车商品总数量，不受勾选的影响

      // 1.获取cookie
      function getCookie() {
        if ($.cookie('cookieSid') && $.cookie('cookieNum')) {
          $sidArray = $.cookie('cookieSid').split(','); //[1,3,5]
          $numArray = $.cookie('cookieNum').split(','); //[10,33,50]

          $.each($sidArray, function (index, value) {
            renderCart($sidArray[index], $numArray[index]);
          });
        }

        if ($sidArray.length === 0) {
          $('.cart_goods_num').html('0');
        }

      }
      getCookie();

      // 2.渲染购物车列表
      function renderCart(sid, num) {
        $.ajax({
          url: 'http://10.31.161.62/dashboard/converse_project/php/detail_goods.php',
          dataType: 'json',
          data: {
            sid: sid
          }
        }).done((data) => {
          // console.log(data);

          if (sid === data.sid) {
            //:hidden:匹配所有不可见元素，或者type为hidden的元素
            //clone() 克隆匹配的DOM元素并且选中这些克隆的副本
            let $clone_li = $('.cart_goods_li:hidden').clone(true, true); //克隆
            $('.checkAll').prop('checked', true); //全选按钮在外部
            $clone_li.find('.goods_img img').attr('src', data.url);
            $clone_li.find('.goods_img img').attr('data-sid', data.sid);  //添加自定义属性
            $clone_li.find('.checkGoods').prop('checked', true);
            $clone_li.find('.goods_info_title').html(data.title);
            $clone_li.find('.goods_price_li span').html(parseInt(data.nowPrice).toFixed(2));
            $clone_li.find('.goods_price_num input').val(num);
            $clone_li.css('display', 'block');
            $('.cart_detail').append($clone_li);
            calc(); // 这里计算总价，刚渲染出来就要显示总价
          };

        });
      }

      // 3.计算总价和商品总件数
      function calc() {
        let $all_num = 0;
        let $total = 0;
        let $cart_title = 0;

        $('.cart_goods_li:visible').each(function (index, ele) {
          // console.log($(ele).find('.checkGoods').prop('checked'));

          if ($(ele).find('.checkGoods').prop('checked')) {
            $all_num += parseInt($(ele).find('.goods_num').val());
            $total += parseFloat($(ele).find('.goods_price_li span').html());
          }

          // 赋值购物车商品总数量
          $cart_title += parseInt($(ele).find('.goods_num').val());
        });
        
        $('.all_goods_num').html($all_num);
        $('.ca_pr_total').html($total.toFixed(2));
        $('.cart_goods_num').html($cart_title);
      }

      // 4.全选功能
      $('.checkAll').on('click', function () {
        // 全选功能选中状态赋值给商品前的选择框
        $('.cart_goods_li:visible').find('.checkGoods').prop('checked', $(this).prop('checked'));
        $('.checkAll').prop('checked', $(this).prop('checked'));
        calc(); //全选涉及商品总数量和总价的改变，所以这里需要调用
      });

      // 4.商品自身的选项功能
      let $checkGoods = $('.cart_goods_li:visible').find('.checkGoods');
      $('.cart_detail').on('click', $checkGoods, function () {
        //$(this):被委托的元素，checkbox
        if ($checkGoods.length === $('.cart_goods_li:visible').find('.checkGoods:checked').size()) {
          $('.checkAll').prop('checked', true);
        } else {
          $('.checkAll').prop('checked', false);
        }
        calc();
      });


      // 5.数量改变
      $reduce_num.on('click', function () {
        let $change_num = $(this).siblings('.goods_num').val();
        $change_num--;
        if ($change_num <= 1) {
          $change_num = 1;
        }
          
        $(this).siblings('.goods_num').val($change_num);
        $(this).parents('.goods_price').find('.goods_price_li').find('span').html(singlePrice($(this)));
        calc();
        setCookie($(this));
      });

      $add_num.on('click', function () {
        let $change_num = $(this).siblings('.goods_num').val();
        $change_num++;
        $(this).siblings('.goods_num').val($change_num);
        console.log(singlePrice($(this)));
        $(this).parents('.goods_price').find('.goods_price_li').find('span').html(singlePrice($(this)));
        calc();
        setCookie($(this));
      });

      $('.goods_num').on('input',function () {
        
      });
      function singlePrice(obj) {
        let $single_price = parseFloat(obj.parents('.goods_price').find('.goods_price_li').find('span').html());
        let $num = parseInt(obj.siblings('.goods_num').val());
        return ($single_price * $num).toFixed(2);
      }

      // 将改变后的数量存放在cookie中
      let $arrSid = [];
      let $arrNum = [];
      function existCookie() {
        if ($.cookie('cookieSid') && $.cookie('cookieNum')) {
            $arrSid = $.cookie('cookieSid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
            $arrNum = $.cookie('cookieNum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            $arrSid = [];
            $arrNum = [];
        }
      }
      function setCookie(obj) {
        existCookie();
        let $sid = obj.parents('.cart_goods_li').find('.goods_img img').attr('sid');
        $arrNum[$.inArray($sid, $arrSid)] = obj.siblings('.goods_num').val();
        $.cookie('cookieNum', $arrNum, { expires: 10, path: '/' });
      }

      // 6.删除
      function delCookie(sid,arrSid) {
        let $index = -1; //删除的索引位置
        $.each(arrSid, function(index, value) {
            if (sid === value) {
              $index = index;
            }
        });
        arrSid.splice($index, 1);
        arrNum.splice($index, 1);

        $.cookie('cookieSid', arrSid, { expires: -1, path: '/' });
        $.cookie('cookieNum', arrNum, { expires: -1, path: '/' });
      }



    }
  }
});